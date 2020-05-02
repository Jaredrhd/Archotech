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
class qtype_logicgate_question extends question_graded_automatically_with_countback {

    //Saves the data by getting input controls onscreen
    public function get_expected_data() 
    {
        return array('answer' => PARAM_RAW);
    }

    public function summarise_response(array $response) {
        if (isset($response['answer'])) 
        {
            return $response['answer'];
        } 
        else 
        {
            return null;
        }
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

    public function grade_response(array $response) {
        $fraction = 0;
        return array($fraction, question_state::graded_state_for_fraction($fraction));
    }

    //Multiple tries with negative marking?
    public function compute_final_grade($responses, $totaltries) {
        // TODO find out what this function does
        return 1;
    }
}
