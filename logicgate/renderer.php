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

        //Get the file
        $input = file_get_contents(new moodle_url('/question/type/logicgate/js/SceneGraph.html'));

        $input = str_replace("QUESTIONID", str_replace(":","_", $inputname) , $input);

        
        //Displays the red x or tick
        $feedbackimg = '';

        //If we are showing their mark
        if ($options->correctness) {
            //Get the answer
            $answer = $question->grade_response(array('answer' => $currentanswer));
            $fraction = $answer[0];

            //Set input field diabled and set tick or cross
            $feedbackimg = $this->feedback_image($fraction);

            //Lock the canvas if question mode
            if($question->questiontype == "0"){
                $input = str_replace("var lockCanvas = false;","var lockCanvas = true;",$input);
            }
        }
        //Attach the tick or cross
        $input .= $feedbackimg; 

        //Add the question text
        $result = html_writer::tag('div', $question->name, array('class' => 'h2'));
        $result .= html_writer::tag('div', $questiontext, array('class' => 'qtext'));

        //This is probably what we want to display since we dont have placeholder
        if (!$placeholder) {
            $result .= html_writer::tag('span', $input, array('class' => 'answer'));
        }

        //Set data for passing to JS
        $result = $this->answerNameID($question,$currentanswer,$inputname,$result);
        $result = $this->restrictedGates($question,$result);

        //Set sandbox mode
        if($question->questiontype == "1"){
            $result = str_replace("var sandboxMode = false;","var sandboxMode = true;",$result);
        }

        //return result
        return $result;
    }

    private function answerNameID($question, $currentanswer, $inputname, $result)
    {
        //If the current answer is blank, Insert curated answer
        $data = $question->curated_data;

        if($currentanswer != '')
            $data = $currentanswer;

        //Get the string pos at ANSWER_NAME_ID
        $position = strpos($result,"ANSWER_NAME_ID",0);

        //Get the value= position from the last position, this is the value we need to edit to show answer 
        $position = strpos($result,"value=",$position);

        //Place answer at the calculated position
        //$result = substr_replace($result, $data, $position+7, 0);

        //Insert the data at this point
        $result = str_replace("0:startNode:-3:2|0:endNode:-3:1.5|6:draggableCanvas:0:0", $data, $result);

        //Replace the ANSWER_NAME_ID with the question id for saving
        $result = str_replace("ANSWER_NAME_ID", $inputname, $result);

        return $result;
    }

    private function restrictedGates($question, $result)
    {
        //Construct limits
        $data = 'buffergate:' . ((int)$question->bufferGate * $question->bufferGateAmount);
        $data .= '|notgate:' . ((int)$question->notGate * $question->notGateAmount);
        $data .= '|andgate:' . ((int)$question->andGate * $question->andGateAmount);
        $data .= '|nandgate:' . ((int)$question->nandGate * $question->nandGateAmount);
        $data .= '|orgate:' . ((int)$question->orGate * $question->orGateamount);
        $data .= '|norgate:' . ((int)$question->norGate * $question->norGateAmount);
        $data .= '|xorgate:' . ((int)$question->xorGate * $question->xorGateAmount);
        $data .= '|xnorgate:' . ((int)$question->xnorGate * $question->xnorGateAmount);

        //Place the new stuff in the correct position
        $result = str_replace('name="RESTRICTEDGATES_NAME_ID" value="bufferGate:1000|notGate:1000|andGate:1000|nandGate:1000|orGate:1000|norGate:1000|xorGate:1000|xnorGate:1000"','name="RESTRICTEDGATES_NAME_ID" value="'.$data .'"' ,$result);

        return $result;
    }

    // TODO.
    public function specific_feedback(question_attempt $qa) {
        return '';
    }

    public function correct_response(question_attempt $qa) 
    {
        //$question = $qa->get_question();
        
        //Get the file to display as the answer
        //$result = file_get_contents(new moodle_url('/question/type/logicgate/Drag/SceneGraphcopy.html'));
        
        //$result = $this->restrictedGates($question, $result);
        
        //TODO inject lecturer code of logic gate save
        return '';
    }
}
?>

