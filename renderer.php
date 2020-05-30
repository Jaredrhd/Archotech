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
 * logicgate question renderer class.
 *
 * @package    qtype
 * @subpackage logicgate
 * @copyright  2020 Archotech

 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */


defined('MOODLE_INTERNAL') || die();


/**
 * Generates the output for logicgate questions.
 *
 * @copyright  2020 Archotech

 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class qtype_logicgate_renderer extends qtype_renderer 
{
    //Handles displaying  of question and rendering of answer
    public function formulation_and_controls(question_attempt $qa, question_display_options $options) 
    {
        //Get the whole question with everything (hints, penalties, length, feedback, etc)
        $question = $qa->get_question();

        //Format the question (IE only get the question text back)
        $questiontext = $question->format_questiontext($qa);

        //Check for reg expr placeholder (possibly remove)
        $placeholder = false;
        if (preg_match('/_____+/', $questiontext, $matches)) {
            $placeholder = $matches[0];
        }

        //TODO insert ans save
        $currentanswer = $qa->get_last_qt_var('answer');
        $inputname = $qa->get_qt_field_name('answer');

        //If the input box is read only
        if ($options->readonly) {
            $inputattributes['readonly'] = 'readonly';
        }

        //Displays the red x or tick
        $feedbackimg = '';

        //If we are showing their mark
        if ($options->correctness) {
            //Get the answer
            $answer = $question->grade_response(array('answer' => $currentanswer));
            $fraction = $answer[0];

            //Set input field diabled and set tick or cross
            $feedbackimg = $this->feedback_image($fraction);
        }

        //Get the file
        $input = file_get_contents(new moodle_url('/question/type/logicgate/Drag/SceneGraph.html')) . $feedbackimg;

        //Add the question text
        $result = html_writer::tag('div', $question->name, array('class' => 'h2'));
        $result .= html_writer::tag('div', $questiontext, array('class' => 'qtext'));

        //This is probably what we want to display since we dont have placeholder
        if (!$placeholder) {
            $result .= html_writer::tag('span', $input, array('class' => 'answer'));
        }

        //Set data for passing to JS
        $result = $this->answerNameID($currentanswer,$inputname,$result);
        $result = $this->restrictedGates($question,$result);

        //return result
        return $result;
    }

    private function answerNameID($currentanswer, $inputname, $result)
    {
        //Get the string pos at ANSWER_NAME_ID
        $position = strpos($result,"saveddata_name_id",0);

        //Get the value= position from the last position, this is the value we need to edit to show answer 
        //$position = strpos($result,"value=",$position);
        //Place answer at the calculated position
        //$currentanswer = '0:norGate:3:-2.5|2:node:-2:-1|4:node:2:1:-1:2:1:none:none:false|2:node:-2:1|4:node:2:-1:5:2:-1:0.8375:-1.01:true|1:norGate:-0.1:-1.01:-1:-1.0375:-0.76:none:none:1:-1.0375:-1.26:-2:-1';
        //$result = substr_replace($result, $currentanswer, $position+7, 0);

        if($currentanswer != '')
            $result = str_replace("0:norGate:3:-2|2:node:-2:-1|4:node:2:1:-1:2:1:none:none:false|2:node:-2:1|4:node:2:-1:-1:2:-1:none:none:false", $currentanswer, $result);

        //Replace the ANSWER_NAME_ID with the question id for saving
        $result = str_replace("saveddata_name_id", $inputname, $result);

        return $result;
    }

    private function restrictedGates($question, $result)
    {
        $data = 'buffergate:' . ((int)$question->buffergate * 1000);
        $data .= '|notgate:' . ((int)$question->notgate * 1000);
        $data .= '|andgate:' . ((int)$question->andgate * 1000);
        $data .= '|nandgate:' . ((int)$question->nandgate * 1000);
        $data .= '|orgate:' . ((int)$question->orgate * 1000);
        $data .= '|norgate:' . ((int)$question->norgate * 1000);
        $data .= '|xorgate:' . ((int)$question->xorgate * 1000);
        $data .= '|xnorgate:' . ((int)$question->xnorgate * 1000);

        //Get the string pos at ANSWER_NAME_ID
        $position = strpos($result,"RESTRICTEDGATES_NAME_ID",0);

        //Get the value= position from the last position, this is the value we need to edit to show answer 
        $position = strpos($result,"value=",$position);

        //Place answer at the calculated position
        $result = substr_replace($result, $data, $position+7, 0);

        return $result;
    }

    // TODO.
    public function specific_feedback(question_attempt $qa) {
        return '';
    }

    public function correct_response(question_attempt $qa) {
        
        //Get the file to display as the answer
        $input = file_get_contents(new moodle_url('/question/type/logicgate/Drag/SceneGraph.html'));
        
        //TODO inject lecturer code of logic gate save
        return '';
    }
}
?>

