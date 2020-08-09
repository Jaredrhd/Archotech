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

    public $answerForDisplay;

    public function formulation_and_controls(question_attempt $qa,
            question_display_options $options) {

        //Get the whole question with everything (hints, penalties, length, feedback, etc)
        $question = $qa->get_question();

        $html = file_get_contents(new moodle_url('/question/type/trees/index.html'));
        $html = str_replace("var lecturer = true;", "var lecturer = false;", $html);
        $html = str_replace("var studentQType = '';", "var studentQType = '$question->q_type';", $html);
        
        if($question->q_type == "traversal") {
            $html = str_replace("var student = {treeString: '', bstValues: ''};", "var student = {treeString: '$question->lecturer_tree', bstValues: ''};", $html);
            $label = $question->preorder !== "" ? "Pre-order Traversal" : ($question->inorder !== "" ? "In-order Traversal" : "Post-order Traversal");
            $html = str_replace("<label for='ANSWER_ID'></label>", "<label for='ANSWER_ID'>$label</label>", $html);
        }
        else if($question->q_type == "bst") {
            $html = str_replace("var student = {treeString: '', bstValues: ''};", "var student = {treeString: '', bstValues: '$question->bstvalues'};", $html);
        }
        
        // echo "<script>console.log('$question->postorder');</script>";

        //Format the question (IE only get the question text back)
        $questiontext = $question->format_questiontext($qa);
        
        $placeholder = false;
        if (preg_match('/_____+/', $questiontext, $matches)) {
            $placeholder = $smatches[0];
        }
        $input = '**subq controls go in here**';

        $answer = $qa->get_last_qt_var('answer');

        // if ($placeholder) {
        //     $questiontext = substr_replace($questiontext, $input,
        //             strpos($questiontext, $placeholder), strlen($placeholder));
        // }

        //Displays the red x or tick
        $feedbackimg = '';

        //If we are showing their mark
        if ($options->correctness) {
            //Get the answer
            if($question->q_type == "traversal") {
                $html = str_replace("<input id='ANSWER_ID' type='text' name='ANSWER_NAME_ID' value=''>", "<input id='ANSWER_ID' type='text' name='ANSWER_NAME_ID' value='$answer' style='cursor: default;' readonly>", $html);
            }
            else if($question->q_type == "bst") {
                $values = explode("-", $answer);
                $studentTree = $values[1];

                $html = str_replace("treeString: ''", "treeString: '$studentTree'", $html);
            }

            $answer = $question->grade_response(array('answer' => $answer));
            $fraction = $answer[0];

            //Set input field diabled and set tick or cross
            $feedbackimg = $this->feedback_image($fraction);
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

    public function correct_response(question_attempt $qa) { // Displayed on review
        $string = '';

        $question = $qa->get_question();

        $answer = $qa->get_last_qt_var('answer');

        if($question->q_type == "traversal") {
            $string = $this->traversal_results($question, $answer);
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
}
