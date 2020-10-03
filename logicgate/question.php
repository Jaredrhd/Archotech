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

        $studentAnswer = "42,StartGate,-1.18,1.39,false,[46:0:BufferGate]|46,BufferGate,0.40,1.37,false,[47:0:EndGate]|47,EndGate,2.01,1.51,false,[];1,1;false;true;";
        $lecturerAnswer = "42,StartGate,-1.18,1.39,false,[46:0:BufferGate]|46,BufferGate,0.40,1.37,false,[47:0:EndGate]|47,EndGate,2.01,1.51,false,[];1,1;false;true;";


        //If there is no lecturer or student answer, return 0 since you can't pass
        if(($lecturerAnswer == "" || $studentAnswer == "" || $studentAnswer == "SAVED_DATA") && $this->questiontype != "1")
            return array(0, question_state::graded_state_for_fraction(0));
        
        //If sandbox return it as if it is a pass
        if($this->questiontype == "1")
            return array(1, question_state::graded_state_for_fraction(1));

        //Get the fraction of computing the question
        $fraction = $this->compute_grade($studentAnswer,$lecturerAnswer, true, true);

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
        //Get the answer
        $studentAnswer = explode(";", $studentAnswer);
        $lecturerAnswer = explode(";", $lecturerAnswer);

        //If comparing charges
        if($compareCharges)
        {
            if($this->compare_charge($studentAnswer, $lecturerAnswer) == 0)
                return 0;
        }

        //If comparing exact circuit
        if($compareCircuit)
        {
            if($this->compare_circuit($studentAnswer, $lecturerAnswer) == 0)
                return 0;
        }

        //If we get here give 100%
        return 1;
    }

    public function compare_charge($studentAnswer, $lecturerAnswer)
    {
        //Get the count of the gates
        $studentGatesCount = explode(",", $studentAnswer[1]);
        $lecturerGatesCount = explode(",", $lecturerAnswer[1]);

        //If the student doesn't have enough end gates
        if($studentGatesCount[1] != $lecturerGatesCount[1])
            return 0;

        //Loop over endgates and compare it
        for($i = 2; $i < pow(2, (int)$studentGatesCount[0]) + 2; $i++)
        {
            if($studentAnswer[$i] != $lecturerAnswer[$i])
                return 0;
        }

        return 1;
    }

    public function compare_circuit($studentAnswer, $lecturerAnswer)
    {
        //Create a matrix for both lecturer and student
        $studentMatrix = $this->create_matrix(10);
        $lecturerMatrix = $this->create_matrix(10);

        //Split their answer by gates
        $studentAnswer = explode("|", $studentAnswer[0]);
        $lecturerAnswer = explode("|", $lecturerAnswer[0]);

        //Create the matrices of their connections
        $studentMatrix = $this->make_matrix($studentMatrix, $studentAnswer);
        $lecturerMatrix = $this->make_matrix($lecturerMatrix, $lecturerAnswer);

        //Compare the 2 matrices
        for ($i=0; $i < count($lecturerMatrix); $i++) 
        { 
            for ($j=0; $j < count($lecturerMatrix); $j++) 
            {
                if($lecturerMatrix[$i][$j] != $studentMatrix[$i][$j])
                    return 0;
            }
        }
 
        //If we get here return 100%
        return 1;
    }

    public function make_matrix($matrix, $fullData)
    {
        //Loop over different gates
        for ($i=0; $i < count($fullData); $i++) 
        { 
            //Get the gate properties
            $data = explode(",", $fullData[$i]);

            //Extract the specific gate
            $rowIndex = $this->get_gate_index($data[1]);

            //Get the outgoing connections
            $outgoingConnection = $data[5];
            $outgoingConnection = substr($outgoingConnection, 1, strlen($outgoingConnection)-2);
            $outgoingConnection = explode("/", $outgoingConnection);

            //If we don't have outgoing connections, skip
            if(count($outgoingConnection) == 1 && $outgoingConnection[0] == "")
                continue;
            
            //Looper over all outgoing connections
            for ($k=0; $k < count($outgoingConnection); $k++) 
            { 
                //get the col index
                $colIndex = explode(":",$outgoingConnection[$k])[2];
                $colIndex = $this->get_gate_index($colIndex);
                $matrix[$rowIndex][$colIndex] += 1;
            }
        }

        //Return the calculation
        return $matrix;
    }

    //Return Gate Index
    public function get_gate_index($gate)
    {
        $index = -1;
        switch ($gate) 
        {
            case 'StartGate':
                $index = 0;
                break;
            case 'EndGate':
                $index = 1;
                break;
            case 'BufferGate':
                $index = 2;
                break;
            case 'NotGate':
                $index = 3;
                break;
            case 'AndGate':
                $index = 4;
                break;
            case 'NandGate':
                $index = 5;
                break;
            case 'OrGate':
                $index = 6;
                break;
            case 'NorGate':
                $index = 7;
                break;
            case 'XorGate':
                $index = 8;
                break;
            case 'XnorGate':
                $index = 9;
                break;
        }

        return $index;
    }

    //Creates a matrix
    public function create_matrix($n)
    {
        $matrix = array();
        for ($i=0; $i < $n; $i++) 
        {
            for ($j=0; $j < $n; $j++)
                $matrix[$i][$j] = 0;
        } 
        return $matrix;
    }
}
