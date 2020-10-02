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
 * logicgate question definition class.
 *
 * @package    qtype
 * @subpackage logicgate
 * @copyright  2020 Archotech

 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */


defined('MOODLE_INTERNAL') || die();


/**
 * Represents a logicgate question.
 *
 * @copyright  2020 Archotech

 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class qtype_logicgate_question extends question_graded_automatically_with_countback 
{

    //Saves the data by getting input controls onscreen
    public function get_expected_data() 
    {
        return array('answer' => PARAM_RAW);
    }

    public function summarise_response(array $response) 
    {
        //Return just the string of the response
        if (isset($response['answer'])) 
            return $response['answer'];
        else 
            return null;
    }

    public function is_complete_response(array $response) 
    {
        return array_key_exists('answer', $response) && ($response['answer'] || $response['answer'] === '0');
    }

    public function get_validation_error(array $response) {
        return 'get_validation_error';
    }

    public function is_same_response(array $prevresponse, array $newresponse) 
    {
        //If there is no prev answer, it must be new
        if (count($prevresponse) == 0 )
            return false;

        //foreach new response
        foreach($newresponse as $arraykey => $value)
        {
            //if the key matches then its the 
            if($value == $prevresponse[$arraykey])
               return true;
        }

        //If no matching answers were found it must be new
        return false; 
    }

    public function get_correct_response() {
        return array();
    }

    public function check_file_access($qa, $options, $component, $filearea, $args, $forcedownload) 
    {
        if ($component == 'question' && $filearea == 'hint')
            return $this->check_hint_file_access($qa, $options, $args);
        else 
            return parent::check_file_access($qa, $options, $component, $filearea, $args, $forcedownload);
    }

    public function grade_response(array $response) 
    {
        //Get the answers
        $studentAnswer = $response["answer"];
        $lecturerAnswer = $this->answer_id;

        //If there is no lecturer answer, return 0 since you can't pass
        if(($lecturerAnswer == "" || $studentAnswer == "" || $studentAnswer == "SAVED_DATA") && $this->questiontype != "1")
            return array(0, question_state::graded_state_for_fraction(0));
        
        //If sandbox return it as if it is a pass
        if($this->questiontype == "1")
            return array(1, question_state::graded_state_for_fraction(1));

        $fraction = $this->compute_grade($studentAnswer,$lecturerAnswer, true, false);

        //return answer
        return array($fraction, question_state::graded_state_for_fraction($fraction));
    }

    //Multiple tries with negative marking?
    public function compute_final_grade($responses, $totaltries) 
    {
        return 1;
    }

    public function compute_grade($studentAnswer, $lecturerAnswer, $compareCharges, $compareCircuit)
    {
        //Get array, remove last element since it's blank: ""
        $studentAnswer = explode(";", $studentAnswer);
        $lecturerAnswer = explode(";", $lecturerAnswer);

        //If comparing charges
        if($compareCharges)
        {
            if($this->compare_charge($studentAnswer, $lecturerAnswer) == 0)
                return 0;
        }

        if($compareCircuit)
        {
            if($this->compare_circuit($studentAnswer, $lecturerAnswer) == 0)
                return 0;
        }

        return 1;
    }

    public function compare_charge($studentAnswer, $lecturerAnswer)
    {
        $studentGatesCount = explode(",", $studentAnswer[1]);
        $lecturerGatesCount = explode(",", $lecturerAnswer[1]);

        //If the student doesn't have enough end gates
        if($studentGatesCount[1] != $lecturerGatesCount[1])
            return 0;

        //Loop over endgates and compare
        for($i = 2; $i < pow(2, (int)$studentGatesCount[0]) + 2; $i++)
        {
            if($studentAnswer[$i] != $lecturerAnswer[$i])
                return 0;
        }

        return 1;
    }

    public function compare_circuit()
    {
        
        return 1;
    }
}
