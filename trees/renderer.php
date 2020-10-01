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
 * trees question renderer class.
 *
 * @package    qtype
 * @subpackage trees
 * @copyright  THEYEAR YOURNAME (YOURCONTACTINFO)

 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */


defined('MOODLE_INTERNAL') || die();

/**
 * Generates the output for trees questions.
 *
 * @copyright  THEYEAR YOURNAME (YOURCONTACTINFO)

 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class qtype_trees_renderer extends qtype_renderer {

    public function formulation_and_controls(question_attempt $qa,
            question_display_options $options) {

        //Get the whole question with everything (hints, penalties, length, feedback, etc)
        $question = $qa->get_question();

        $html = file_get_contents(new moodle_url('/question/type/trees/student.html'));
        $canvasID = $qa->get_qt_field_name('answer');
        $html = str_replace("canvas id=''", "canvas id='$canvasID'", $html);
        $html = str_replace("id='layout'", "id='$canvasID':layout", $html);

        $answer = $qa->get_last_qt_var('answer');

        if($question->q_type == "traversal") {
            $html = str_replace("qtype='' treestring='' bstvalues=''", "qtype='$question->q_type' treestring='$question->lecturer_tree' bstvalues=''", $html);
            $label = $question->preorder !== "" ? "Pre-order Traversal" : ($question->inorder !== "" ? "In-order Traversal" : "Post-order Traversal");
            $html = str_replace("<label updateid for='ANSWER_ID' class='no-select'></label>", "<label updateid for='ANSWER_ID' class='no-select'>$label</label>", $html);
        }
        else if($question->q_type == "bst") {
            $html = str_replace("qtype='' treestring='' bstvalues=''", "qtype='$question->q_type' treestring='' bstvalues='$question->bstvalues'", $html);
        }
        else if($question->q_type == "properties") {
            $html = str_replace("qtype='' treestring=''", "qtype='$question->q_type' treestring='$question->lecturer_tree'", $html);
            $html = str_replace("properties=''", "properties='$question->requested_properties'", $html);
        }

        if($answer != "") {
            $html = str_replace("lastanswer=''", "lastanswer='$answer'", $html);
        }

        // echo "<script>console.log('$node_order_clicked');</script>";

        //Format the question (IE only get the question text back)
        $questiontext = $question->format_questiontext($qa);
        
        $placeholder = false;
        if (preg_match('/_____+/', $questiontext, $matches)) {
            $placeholder = $smatches[0];
        }
        $input = '**subq controls go in here**';

        // if ($placeholder) {
        //     $questiontext = substr_replace($questiontext, $input,
        //             strpos($questiontext, $placeholder), strlen($placeholder));
        // }

        //Displays the red x or green tick
        $feedbackimg = '';

        /** If the lecturer has 'Whether correct' checked in quiz settings. We are showing the student if they are correct or not */
        if ($options->correctness) {
            //Set input field diabled and set tick or cross
            $answer = $question->grade_response(array('answer' => $answer));
            $fraction = $answer[0];
            $feedbackimg = $this->feedback_image($fraction);

            if($question->q_type == "properties") {
                $html = str_replace("propertiescorrectness=''", "propertiescorrectness='$question->resultString'", $html);
            }
        }

        // /** If the lecturer has '' checked in quiz settings. We are showing the student the correct answer */
        // if($options->rightanswer) {
            
        // }

        /** ON REVIEW */
        if($options->readonly) {
            //Get the answer
            if($question->q_type == "traversal") {
                $html = str_replace("<input id='$canvasID:ANSWER_ID' type='text' name='ANSWER_NAME_ID' value=''>", "<input id='$canvasID:ANSWER_ID' type='text' name='ANSWER_NAME_ID' value='$answer' style='cursor: default;' readonly>", $html);
            }
            else if($question->q_type == "bst") {
                $splitString = explode("-", $answer);
                $treeString = $splitString[1];

                $html = str_replace("treestring=''", "treestring='$treeString'", $html);

                $html = str_replace("displaytools='true'", "displaytools='false'", $html);
            }
            else if($question->q_type == "properties") {
                $html = str_replace("disablepropertytools='false'", "disablepropertytools='true'", $html);
            }

            if($question->q_type != "properties") { // Can still interact with the canvas when reviewing a properties question
                $html = str_replace("disablecanvas='false'", "disablecanvas='true'", $html);
            }
        }

        //Get the file
        $input = $html.$feedbackimg;
        $inputname = $qa->get_qt_field_name('answer');

        //Add the question text
        $result = html_writer::tag('div', $question->name, array('class' => 'h2'));
        $result .= html_writer::tag('div', $questiontext, array('class' => 'qtext'));

        //This is probably what we want to display since we dont have placeholder
        if (!$placeholder) {
            $result .= html_writer::tag('span', $input, array('class' => 'answer'));
        }

        $result = str_replace("ANSWER_NAME_ID", $inputname, $result);
        
        /* if ($qa->get_state() == question_state::$invalid) {
            $result .= html_writer::nonempty_tag('div',
                    $question->get_validation_error(array('answer' => $currentanswer)),
                    array('class' => 'validationerror'));
        }*/
        return $result;
    }

    public function specific_feedback(question_attempt $qa) {
        return '';
    }

    public function correct_response(question_attempt $qa) { // Displayed on review if lecturer has 'Right Answer' checked in quiz settings
        $string = '';

        $question = $qa->get_question();

        $answer = $qa->get_last_qt_var('answer');

        if($question->q_type == "traversal") {
            $string = $this->traversal_results($question, $answer);
        }
        else if($question->q_type == "properties") {
            $string = $this->properties_results($question, $answer);
        }
        
        return $string;
    }

    public function traversal_results($question, $answer) {
        $string = '';
        
        $correctAnswer = $question->preorder != "" ? $question->preorder : ($question->inorder != "" ? $question->inorder : $question->postorder);

        $comparison = "Your answer: " . $answer . "\nCorrect answer: " . $correctAnswer;

        if($answer == $correctAnswer) {
            $string .= nl2br("Your answer is correct.\n\n" . "Your answer: " . $answer);
        }
        else {
            $string .= nl2br("Your answer is incorrect.\n\n" . $comparison);
        }

        return $string;
    }

    public function properties_results($question, $answer) {
        $string = '';

        $correctAnswer = $this->generateResultFromAnswerString($question->properties_string);
        $studentAnswer = $this->generateResultFromAnswerString($answer);

        // echo "<script>console.log('$answer');</script>";
        // echo "<script>console.log('$question->propertiesFraction');</script>";

        if($question->propertiesFraction == 1) {
            if($question->properties_string == "") {
                $string .= nl2br("Your answer is correct.");
            }
            else {
                $string .= nl2br("Your answer is correct.\n\n" . "<u>Your answer:</u>\n\n" . $studentAnswer);
            }
        }
        else if($question->propertiesFraction == 0) {
            $string .= nl2br("Your answer is incorrect.\n\n" . "<u>Correct answer:</u>\n\n" . $correctAnswer);
        }
        else { // Partially correct
            $string .= nl2br("Your answer is partially correct.\n\n" . "<u>Your answer:</u>\n\n" . $studentAnswer . "\n" . "<u>Correct answer:</u>\n\n" . $correctAnswer);
        }
    
        return $string;
    }

    public function generateResultFromAnswerString($answer) {
        $string = '';

        $propertyName = '';
        $propertyString = '';
        $properties = explode("|", $answer);

        $nodePropertyEntries = '';
        $nodeValueAndOrder = '';
        $nodeValue = '';
        $nodePropertyValue = '';

        foreach($properties as $property) {
            $propertyName = explode(".", $property)[0];
            $propertyString = explode(".", $property)[1];

            $string .= nl2br("<b>".$this->getpropertyName($propertyName). ": "."</b>");

            $nodePropertyEntries = explode("#", $propertyString);
            if(count(explode(":", $nodePropertyEntries[0])) === 1) { // Tree property value i.e. just a single value
                if($nodePropertyEntries[0] === "") $nodePropertyEntries[0] = "<>";
                $string .= nl2br($nodePropertyEntries[0] . "\n");
            }
            else { // Node property i.e. a list of node entries and their values for this specific node property
                foreach($nodePropertyEntries as $nodeEntry) {
                    $nodeValueAndOrder = explode(":", $nodeEntry);
                    $nodeValue = explode("-", $nodeValueAndOrder[0])[0];
                    $nodePropertyValue = $nodeValueAndOrder[1];

                    if($nodePropertyValue === "") $nodePropertyValue = "<>";

                    if($nodeEntry === end($nodePropertyEntries)) { // Last entry in the list of node entries for this specific node property
                        $string .= nl2br($nodeValue . ": " . $nodePropertyValue . "\n");
                    }
                    else {
                        $string .= nl2br($nodeValue . ": " . $nodePropertyValue . "<b> | </b>");
                    }
                }
            }
        }

        return $string;
    }

    public function getpropertyName($propertyName) {
        $name = '';

        switch($propertyName) {
            case "num_leaves": $name = "Number of Leaves"; break;
            case "num_edges": $name = "Number of Edges"; break;
            case "num_internal_nodes": $name = "Number of Internal Nodes"; break;
            case "num_children": $name = "Number of Children"; break;
            default: $name = ucfirst($propertyName); break;
        }

        return $name;
    }
}
