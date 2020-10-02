<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * trees question definition class.
 *
 * @package    qtype
 * @subpackage trees
 * @copyright  THEYEAR YOURNAME (YOURCONTACTINFO)

 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */


defined('MOODLE_INTERNAL') || die();

/**
 * Represents a trees question.
 *
 * @copyright  THEYEAR YOURNAME (YOURCONTACTINFO)

 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class qtype_trees_question extends question_graded_automatically_with_countback {

    public $propertiesFraction = 0; // Used to get the result of a properties attempt when displaying the correct response on review
    public $resultString = '';

    public function get_expected_data() {
        // TODO.
        return array('answer' => PARAM_RAW);
    }

    public function summarise_response(array $response) {
        // TODO.
        return null;
    }

    public function is_complete_response(array $response) {
        // TODO.
        return true;
    }

    public function get_validation_error(array $response) {
        // TODO.
        return '';
    }

    public function is_same_response(array $prevresponse, array $newresponse) {
        // TODO.
        return question_utils::arrays_same_at_key_missing_is_blank(
                $prevresponse, $newresponse, 'answer');
    }

    public function get_correct_response() {
        // TODO.
        return array();
    }

    public function check_file_access($qa, $options, $component, $filearea,
            $args, $forcedownload) {
        // TODO.
        if ($component == 'question' && $filearea == 'hint') {
            return $this->check_hint_file_access($qa, $options, $args);

        } else {
            return parent::check_file_access($qa, $options, $component, $filearea,
                    $args, $forcedownload);
        }
    }

    public function grade_response(array $response) { // Response -> what student answered
        $fraction = 0;

        if($this->q_type == 'traversal') {
            $fraction = $this->grade_traversal($response);
        }
        else if($this->q_type == 'bst') {
            $fraction = $this->grade_bst($response);
        }
        else if($this->q_type == "properties") {
            $fraction = $this->grade_properties($response);
        }

        return array($fraction, question_state::graded_state_for_fraction($fraction));
    }

    public function compute_final_grade($responses, $totaltries) {
        // TODO.
        return 0;
    }

    public function grade_traversal(array $response) {
        $result = 0;
        $answer = $response["answer"];

        $traversalType = $this->preorder != "" ? $this->preorder : ($this->inorder != "" ? $this->inorder : $this->postorder);

        if($answer == $traversalType) $result = 1;

        return $result;
    }

    public function grade_bst(array $response) {
        $result = 0;
        $combinedString = $response["answer"];
        $splitString = explode("/", $combinedString);

        $answer = $splitString[0];
        
        if($answer === $this->bst_string) $result = 1;

        return $result;
    }

    public function grade_properties(array $response) {
        if($this->properties_string == "") { // If the lecturer didn't select any properties or the tree has no nodes (accounted for in js on lecturer's side) there is nothing to answer
            $this->propertiesFraction = 1; 
            return 1;
        }
        
        $result = 0;
        $num_items = 0; // Total number of property values student had to enter
        $num_items_correct = 0;
        $answer = $response["answer"];

        $this->resultString = $this->generateResultString($answer);

        $student_answer = $this->getPropertiesAnswerString($answer);
        $model_answer = $this->getPropertiesAnswerString($this->properties_string);

        $split_result_string = explode("#", $result_string);

        $split_student_answer = explode("#", $student_answer);
        $split_model_answer = explode("#", $model_answer);

        $num_items = count($split_model_answer);

        // echo "<script>console.log('$result_string')</script>";
        // echo "<script>console.log('student:$student_answer')</script>";
        // echo "<script>console.log('model:$model_answer')</script>";

        // echo "<script>console.log('num_items:$num_items')</script>";

        // echo "<script>console.log('".json_encode($split_student_answer)."')</script>";

        $studentNodeEntryInfo; // All info for a specific node entry for a node property (node value, node order and actual node property value for that node) 
        $studentNodeEntryPropertyValue; // The actual property value that the student entered for this node
        
        $modelNodeEntryInfo;
        $modelNodeEntryPropertyValue;

        for($i = 0; $i < $num_items; $i++) {
            $studentNodeEntryInfo = explode(":", $split_student_answer[$i]);
            $modelNodeEntryInfo = explode(":", $split_model_answer[$i]);
            
            if(count($modelNodeEntryInfo) > 1) { // Node property entry
                $studentNodeEntryPropertyValue = $studentNodeEntryInfo[1];
                $modelNodeEntryPropertyValue = $modelNodeEntryInfo[1];

                if($studentNodeEntryPropertyValue === $modelNodeEntryPropertyValue) { // TODO: Possibly revise: check first entry matches as well?
                    $num_items_correct++;
                }
            }
            else { // Tree property (so just a single value)
                if($studentNodeEntryInfo[0] === $modelNodeEntryInfo[0]) {
                    $num_items_correct++;
                }
            }
        }

        $result = $num_items_correct / $num_items;

        $this->propertiesFraction = $result;

        return $result;
    }

    /** Returns a combined string with all requested properties separated by # */
    public function getPropertiesAnswerString($answer) {
        $string = '';
        
        $propertyName = '';
        $propertyString = '';
        $properties = explode("|", $answer);

        foreach($properties as $property) {
            $propertyName = explode(".", $property)[0];
            $propertyString = explode(".", $property)[1];

            if($propertyString === "") $propertyString = "<>"; // No answer for tree property

            if($property === end($properties)) {
                $string .= $propertyString;
            }
            else {
                $string .= $propertyString . "#";
            }
        }

        return $string;
    }

    /** Generates a string where there is a 0 or 1 after each property / node value indicating whether the student input the correct answer (1) or not (0) */
    public function generateResultString($answer) {
        $split_student_answer = explode("|", $answer);
        $split_model_answer = explode("|", $this->properties_string);

        $student_property_info = '';
        $student_node_property_info = '';
        $student_node_value_and_order = '';
        $student_node_property_value = '';

        $model_property_info = '';
        $model_node_property_info = '';
        $model_node_value_and_order = '';
        $model_node_property_value = '';

        $result_string = '';

        for($i = 0; $i < count($split_model_answer); $i++) { // For each property
            $student_property_info = explode(".", $split_student_answer[$i]);
            $student_node_property_info = explode("#", $student_property_info[1]);

            $model_property_info = explode(".", $split_model_answer[$i]);
            $model_node_property_info = explode("#", $model_property_info[1]);

            $result_string .= $student_property_info[0] . "."; // Add property name to result string

            for($j = 0; $j < count($model_node_property_info); $j++) {
                $student_node_value_and_order = explode(":", $student_node_property_info[$j])[0];
                $model_node_value_and_order = explode(":", $model_node_property_info[$j])[0];

                if(count(explode(":", $student_node_property_info[$j])) === 1 && count(explode(":", $model_node_property_info[$j])) === 1) { // Tree property (so just a single value not a string of colon separated nodes)
                    if($student_node_value_and_order === $model_node_value_and_order) { // Correct tree property value
                        $result_string .= "1|";
                    }
                    else { // Incorrect tree property value
                        $result_string .= "0|";
                    }
                }
                else { // Node property
                    $student_node_property_value = explode(":", $student_node_property_info[$j])[1];
                    $model_node_property_value = explode(":", $model_node_property_info[$j])[1];

                    if($student_node_property_value === $model_node_property_value) { // Correct node property value
                        $result_string .= $student_node_value_and_order . ":1";
                    }
                    else { // Incorrect node property value
                        $result_string .= $student_node_value_and_order . ":0";
                    }

                    if($j !== count($model_node_property_info) - 1) {
                        $result_string .= "#";
                    }
                    else {
                        if($i !== count($split_model_answer) - 1) {
                            $result_string .= "|";
                        }
                    }
                }
            }
        }

        // echo "<script>console.log('student:".json_encode($split_student_answer)."')</script>";
        // echo "<script>console.log('model:".json_encode($split_model_answer)."')</script>";

        // echo "<script>console.log('$result_string');</script>";
        return $result_string;
    }
}
