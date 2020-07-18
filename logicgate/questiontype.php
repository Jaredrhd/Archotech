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
 * Question type class for the logicgate question type.
 *
 * @package    qtype
 * @subpackage logicgate
 * @copyright  2020 Archotech

 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */


defined('MOODLE_INTERNAL') || die();

require_once($CFG->libdir . '/questionlib.php');
require_once($CFG->dirroot . '/question/engine/lib.php');
require_once($CFG->dirroot . '/question/type/logicgate/question.php');


/**
 * The logicgate question type.
 *
 * @copyright  2020 Archotech

 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class qtype_logicgate extends question_type {

    public function extra_question_fields() {
        return array('qtype_logicgate_options', 'buffergate', 'notgate', 'andgate', 'nandgate', 'orgate', 'norgate','xorgate','xnorgate', 'buffergateamount','notgateamount','andgateamount','nandgateamount','orgateamount','norgateamount','xorgateamount','xnorgateamount','curated_data');
    }
    public function move_files($questionid, $oldcontextid, $newcontextid) {
        parent::move_files($questionid, $oldcontextid, $newcontextid);
        $this->move_files_in_hints($questionid, $oldcontextid, $newcontextid);
    }

    protected function delete_files($questionid, $contextid) {
        parent::delete_files($questionid, $contextid);
        $this->delete_files_in_hints($questionid, $contextid);
    }

    public function save_question_options($question) {
        parent::save_question_options($question);
        $this->save_question_answers($question);
        //$this->save_hints($question);
    }

    protected function initialise_question_instance(question_definition $question, $questiondata) {
        parent::initialise_question_instance($question, $questiondata);

        //Set up the data for renderer.php
        $question->bufferGate =  $questiondata->options->andgate;
        $question->notGate =  $questiondata->options->notgate;
        $question->andGate =  $questiondata->options->andgate;
        $question->nandGate =  $questiondata->options->nandgate;
        $question->orGate =  $questiondata->options->orgate;
        $question->norGate =  $questiondata->options->norgate;
        $question->xorGate =  $questiondata->options->xorgate;
        $question->xnorGate =  $questiondata->options->xnorgate;
        $question->xnorGate =  $questiondata->options->xnorgate;

        //Set value amounts
        $question->bufferGateAmount =  ($questiondata->options->buffergateamount == 0) ? 1000 : $questiondata->options->buffergateamount;
        $question->notGateAmount =  ($questiondata->options->notgateamount == 0) ? 1000 : $questiondata->options->notgateamount;
        $question->andGateAmount =  ($questiondata->options->andgateamount == 0) ? 1000 : $questiondata->options->andgateamount;
        $question->nandGateAmount =  ($questiondata->options->nandgateamount == 0) ? 1000 : $questiondata->options->nandgateamount;
        $question->orGateamount =  ($questiondata->options->orgateamount == 0) ? 1000 :  $questiondata->options->orgateamount;
        $question->norGateAmount =  ($questiondata->options->norgateamount == 0) ? 1000 : $questiondata->options->norgateamount;
        $question->xorGateAmount =  ($questiondata->options->xorgateamount == 0) ? 1000 : $questiondata->options->xorgateamount;
        $question->xnorGateAmount =  ($questiondata->options->xnorgateamount == 0) ? 1000 : $questiondata->options->xnorgateamount;

        //Pass curated data
        $question->curated_data = $questiondata->options->curated_data;
        
        //Set the answer
        $this->initialise_question_answers($question, $questiondata);
        $question->answersFromLecturer = $questiondata->options->answers;
    }

    //It is not possible to guess a score of a logic gate since it is too complex
    public function get_random_guess_score($questiondata) {
        return null;
    }

    //Since the logic gate is too complex to form a response, won't implement
    public function get_possible_responses($questiondata) {
        return array();
    }
}
