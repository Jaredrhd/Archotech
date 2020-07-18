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

    public $answersFromLecturer = array();

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
        //If there is no lecturer answer, return 0 since you can't pass
        if(empty($this->answersFromLecturer))
            return 0;

        //Get key and value from answer
        reset($this->answersFromLecturer);
        $first_key = key($this->answersFromLecturer);
        $res = $this->answersFromLecturer[$first_key]->answer;

        //Get student answer
        $val = $response["answer"];
        $fraction = (($this->compareCircuits($val,$res) == true) ? 1 : 0);

        //return answer
        return array($fraction, question_state::graded_state_for_fraction($fraction));
    }

    //Multiple tries with negative marking?
    public function compute_final_grade($responses, $totaltries) {
        // TODO find out what this function does
        return 1;
    }

    public function compareCircuits($dataToLoad, $dataToTestAgainst) 
    {
        $isCorrect = true;
        $arrayOfArrays = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
        $endNodeCharges = [0, 0];
        $comparingData = explode('|', $dataToLoad);
        $arrayOfArrays[0][0] += 0;

        for ($i = 0; $i < count($comparingData); $i+=1) 
            $comparingData[$i] = explode(':',$comparingData[$i]);
        
        for ($i = 0; $i < count($comparingData); $i+=1){
            if ($comparingData[$i][0] == "4") {
                if ($comparingData[$i][9] == "false") {
                    $endNodeCharges[1] += 1;    
                } else {
                    $endNodeCharges[0] += 1;
                }
                if ($comparingData[$i][4] != "-1") {
                    $arrayOfArrays = $this->adjustTable($comparingData, $arrayOfArrays, 4, 8, $i);
                }
            } else if ($comparingData[$i][0] == "1") {
                if ($comparingData[$i][1] == "bufferGate") {
                    if ($comparingData[$i][4] != "-1") {
                        $arrayOfArrays = $this->adjustTable($comparingData, $arrayOfArrays, 4, 0, $i);
                    }
                } else if ($comparingData[$i][1] == "notGate") {
                    if ($comparingData[$i][4] != "-1") {
                        $arrayOfArrays = $this->adjustTable($comparingData, $arrayOfArrays, 4, 1, $i);
                    }
                } else if ($comparingData[$i][1] == "andGate") {
                    if ($comparingData[$i][4] != "-1") {
                        $arrayOfArrays = $this->adjustTable($comparingData, $arrayOfArrays, 4, 2, $i);
                    }
                    if ($comparingData[$i][9] != "-1") {
                        $arrayOfArrays = $this->adjustTable($comparingData, $arrayOfArrays, 9, 2, $i);
                    }
                } else if ($comparingData[$i][1] == "nandGate") {
                    if ($comparingData[$i][4] != "-1") {
                        $arrayOfArrays = $this->adjustTable($comparingData, $arrayOfArrays, 4, 3, $i);
                    }
                    if ($comparingData[$i][9] != "-1") {
                        $arrayOfArrays = $this->adjustTable($comparingData, $arrayOfArrays, 9, 3, $i);
                    }
                } else if ($comparingData[$i][1] == "orGate") {
                    if ($comparingData[$i][4] != "-1") {
                        $arrayOfArrays = $this->adjustTable($comparingData, $arrayOfArrays, 4, 4, $i);
                    }
                    if ($comparingData[$i][9] != "-1") {
                        $arrayOfArrays = $this->adjustTable($comparingData, $arrayOfArrays, 9, 4, $i);
                    }
                } else if ($comparingData[$i][1] == "norGate") {
                    if ($comparingData[$i][4] != "-1") {
                        $arrayOfArrays = $this->adjustTable($comparingData, $arrayOfArrays, 4, 5, $i);
                    }
                    if ($comparingData[$i][9] != "-1") {
                        $arrayOfArrays = $this->adjustTable($comparingData, $arrayOfArrays, 9, 5, $i);
                    }
                } else if ($comparingData[$i][1] == "xorGate") {
                    if ($comparingData[$i][4] != "-1") {
                        $arrayOfArrays = $this->adjustTable($comparingData, $arrayOfArrays, 4, 6, $i);
                    }
                    if ($comparingData[$i][9] != "-1") {
                        $arrayOfArrays = $this->adjustTable($comparingData, $arrayOfArrays, 9, 6, $i);
                    }
                } else if ($comparingData[$i][1] == "xnorGate") {
                    if ($comparingData[$i][4] != "-1") {
                        $arrayOfArrays = $this->adjustTable($comparingData, $arrayOfArrays, 4, 7, $i);
                    }
                    if ($comparingData[$i][9] != "-1") {
                        $arrayOfArrays = $this->adjustTable($comparingData, $arrayOfArrays, 9, 7, $i);
                    }
                }
            }
        }

        $arrayOfArrays1 = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
        $endNodeCharges1 = [0, 0];
        $comparingData1 = explode('|',$dataToTestAgainst);
        for ($i = 0; $i < count($comparingData1); $i+=1) 
        { 
            $comparingData1[$i] = explode(':',$comparingData1[$i]);
        }
        for ($i = 0; $i < count($comparingData1); $i+=1) {
            if ($comparingData1[$i][0] == "4") {
                if ($comparingData1[$i][9] == "false") {
                    $endNodeCharges1[1] += 1;    
                } else {
                    $endNodeCharges1[0] += 1;
                }
                if ($comparingData1[$i][4] != "-1") {
                    $arrayOfArrays1 = $this->adjustTable($comparingData1, $arrayOfArrays1, 4, 8, $i);
                }
            } else if ($comparingData1[$i][0] == "1") {
                if ($comparingData1[$i][1] == "bufferGate") {
                    if ($comparingData1[$i][4] != "-1") {
                        $arrayOfArrays1 = $this->adjustTable($comparingData1, $arrayOfArrays1, 4, 0, $i);
                    }
                } else if ($comparingData1[$i][1] == "notGate") {
                    if ($comparingData1[$i][4] != "-1") {
                        $arrayOfArrays1 = $this->adjustTable($comparingData1, $arrayOfArrays1, 4, 1, $i);
                    }
                } else if ($comparingData1[$i][1] == "andGate") {
                    if ($comparingData1[$i][4] != "-1") {
                        $arrayOfArrays1 = $this->adjustTable($comparingData1, $arrayOfArrays1, 4, 2, $i);
                    }
                    if ($comparingData1[$i][9] != "-1") {
                        $arrayOfArrays1 = $this->adjustTable($comparingData1, $arrayOfArrays1, 9, 2, $i);
                    }
                } else if ($comparingData1[$i][1] == "nandGate") {
                    if ($comparingData1[$i][4] != "-1") {
                        $arrayOfArrays1 = $this->adjustTable($comparingData1, $arrayOfArrays1, 4, 3, $i);
                    }
                    if ($comparingData1[$i][9] != "-1") {
                        $arrayOfArrays1 = $this->adjustTable($comparingData1, $arrayOfArrays1, 9, 3, $i);
                    }
                } else if ($comparingData1[$i][1] == "orGate") {
                    if ($comparingData1[$i][4] != "-1") {
                        $arrayOfArrays1 = $this->adjustTable($comparingData1, $arrayOfArrays1, 4, 4, $i);
                    }
                    if ($comparingData1[$i][9] != "-1") {
                        $arrayOfArrays1 = $this->adjustTable($comparingData1, $arrayOfArrays1, 9, 4, $i);
                    }
                } else if ($comparingData1[$i][1] == "norGate") {
                    if ($comparingData1[$i][4] != "-1") {
                        $arrayOfArrays1 = $this->adjustTable($comparingData1, $arrayOfArrays1, 4, 5, $i);
                    }
                    if ($comparingData1[$i][9] != "-1") {
                        $arrayOfArrays1 = $this->adjustTable($comparingData1, $arrayOfArrays1, 9, 5, $i);
                    }
                } else if ($comparingData1[$i][1] == "xorGate") {
                    if ($comparingData1[$i][4] != "-1") {
                        $arrayOfArrays1 = $this->adjustTable($comparingData1, $arrayOfArrays1, 4, 6, $i);
                    }
                    if ($comparingData1[$i][9] != "-1") {
                        $arrayOfArrays1 = $this->adjustTable($comparingData1, $arrayOfArrays1, 9, 6, $i);
                    }
                } else if ($comparingData1[$i][1] == "xnorGate") {
                    if ($comparingData1[$i][4] != "-1") {
                        $arrayOfArrays1 = $this->adjustTable($comparingData1, $arrayOfArrays1, 4, 7, $i);
                    }
                    if ($comparingData1[$i][9] != "-1") {
                        $arrayOfArrays1 = $this->adjustTable($comparingData1, $arrayOfArrays1, 9, 7, $i);
                    }
                }
            }
        }

        if ($endNodeCharges[0] != $endNodeCharges1[0] || $endNodeCharges[1] != $endNodeCharges1[1]) {
            $isCorrect = false;
        }

        for ($i = 0; $i < count($arrayOfArrays1); ++$i) {
            for ($j = 0; $j < count($arrayOfArrays1[$i]); $j+=1) {
                if ($arrayOfArrays[$i][$j] < $arrayOfArrays1[$i][$j]) {
                    $isCorrect = false;
                }
            }
        }

        return $isCorrect;
    }
    
    public function adjustTable($comparedData, $formattedData, $inputNodeNumber, $logicGateNumber, $logicGatePosition) {
        if ($comparedData[(int)($comparedData[$logicGatePosition][$inputNodeNumber])][1] == "bufferGate") {
            $formattedData[$logicGateNumber][0] += 1;
        } else if ($comparedData[(int)($comparedData[$logicGatePosition][$inputNodeNumber])][1] == "notGate") {
            $formattedData[$logicGateNumber][1] += 1;
        } else if ($comparedData[(int)($comparedData[$logicGatePosition][$inputNodeNumber])][1] == "andGate") {
            $formattedData[$logicGateNumber][2] += 1;
        } else if ($comparedData[(int)($comparedData[$logicGatePosition][$inputNodeNumber])][1] == "nandGate") {
            $formattedData[$logicGateNumber][3] += 1;
        } else if ($comparedData[(int)($comparedData[$logicGatePosition][$inputNodeNumber])][1] == "orGate") {
            $formattedData[$logicGateNumber][4] += 1;
        } else if ($comparedData[(int)($comparedData[$logicGatePosition][$inputNodeNumber])][1] == "norGate") {
            $formattedData[$logicGateNumber][5] += 1;
        } else if ($comparedData[(int)($comparedData[$logicGatePosition][$inputNodeNumber])][1] == "xorGate") {
            $formattedData[$logicGateNumber][6] += 1;
        } else if ($comparedData[(int)($comparedData[$logicGatePosition][$inputNodeNumber])][1] == "xnorGate") {
            $formattedData[$logicGateNumber][7] += 1;
        } else if ($comparedData[(int)($comparedData[$logicGatePosition][$inputNodeNumber])][1] == "node") {
            $formattedData[$logicGateNumber][8] += 1;
        }
        return $formattedData;
    }
}
