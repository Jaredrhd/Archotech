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

        //Get prev answers
        $currentanswer = $qa->get_last_qt_var('answer');
        $inputname = $qa->get_qt_field_name('answer');

        //Get the file
        $input = file_get_contents(new moodle_url('/question/type/logicgate/js/SceneGraph.html'));

        //Add stuff to be replaced
        $input = str_replace("QUESTIONID", str_replace(":","_", $inputname) , $input);
        $input = str_replace("ANSWER_ID", $inputname , $input);
        $input = str_replace("SAVED_DATA", $currentanswer , $input);
        $input = $this->change_spawners($question, $input);

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
                //$input = str_replace("var lockCanvas = false;","var lockCanvas = true;",$input);
            }
        }
        //Attach the tick or cross
        $input .= $feedbackimg; 

        //Add the question text
        $result = html_writer::tag('div', $question->name, array('class' => 'h2'));
        $result .= html_writer::tag('div', $questiontext, array('class' => 'qtext'));

        //Add the HTML
        $result .= html_writer::tag('span', $input, array('class' => 'answer'));

        //return result
        return $result;
    }

    public function change_spawners($question, $input) 
    {
        if($question->questiontype == "1")
            return $input;
            
        $startGate = $question->startgate == "on" || $question->startgate == "1" ? "StartGate" : "null";
        $endGate = $question->endgate == "on" || $question->endgate == "1" ? "EndGate" : "null";
        $bufferGate = $question->buffergate == "on" || $question->buffergate == "1" ? "BufferGate" : "null";
        $notGate = $question->notgate == "on" || $question->notgate == "1" ? "NotGate" : "null";
        $andGate = $question->andgate == "on" || $question->andgate == "1" ? "AndGate" : "null";
        $nandGate = $question->nandgate == "on" || $question->nandgate == "1" ? "NandGate" : "null";
        $orGate = $question->orgate == "on" || $question->orgate == "1" ? "OrGate" : "null";
        $norGate = $question->notgate == "on" || $question->notgate == "1" ? "NorGate" : "null";
        $xorGate = $question->xorgate == "on" || $question->xorgate == "1" ? "XorGate" : "null";
        $xnorGate = $question->xnorgate == "on" || $question->xnorgate == "1" ? "XnorGate" : "null";

        $format = '%s,%s,%s,%s,%s,%s,%s,%s,%s,%s';
        $gates = sprintf($format, $startGate, $endGate, $bufferGate, $notGate, $andGate, $nandGate, $orGate, $norGate, $xorGate, $xnorGate);
        return str_replace("StartGate,EndGate,BufferGate,NotGate,AndGate,NandGate,OrGate,NorGate,XorGate,XnorGate", $gates , $input);
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

