<?php
 
 defined('MOODLE_INTERNAL') || die();
 
// Make sure the code being tested is accessible.
require_once('question/type/logicgate/question.php'); // Include the code to test

require_once('question/engine/tests/helpers.php');
require_once('question/type/logicgate/tests/helper.php');
 
/** This class contains the test cases for the functions in editlib.php. */
class qtype_logicgate_question_test extends advanced_testcase 
{
    //Test is there is a validation error
    public function test_get_validation_error() 
    {
        $question = test_question_maker::make_question('logicgate');
        $this->assertEquals("get_validation_error", $question->get_validation_error(array("hi")), false);
    }

    //Check that the reponse is correct
    public function test_get_correct_response() 
    {
        $question = test_question_maker::make_question('logicgate');
        $this->assertEquals(array(), $question->get_correct_response(), false);
    }

    //Test the compute grade function with no lecturer answer
    public function test_grade_response()
    {
        //Lecturer no solution
        $question = test_question_maker::make_question('logicgate');
        $question->questiontype = "0"; //Question mode
        $question->markcircuit = "1";
        $question->markcharge = "1";
        $question->answer_id = "";
        list($fraction, $state)  = $question->grade_response(array("answer" => "42,StartGate,-1.18,1.39,false,[46:0:BufferGate]|46,BufferGate,0.40,1.37,false,[47:0:EndGate]|47,EndGate,2.01,1.51,false,[];1,1;false;true;"));
        $this->assertEquals(0, $fraction, "Failed on lecturer answer is empty");

        //Student no solution
        $question = test_question_maker::make_question('logicgate');
        $question->questiontype = "0";
        $question->markcircuit = "1";
        $question->markcharge = "1";
        $question->answer_id = "42,StartGate,-1.18,1.39,false,[46:0:BufferGate]|46,BufferGate,0.40,1.37,false,[47:0:EndGate]|47,EndGate,2.01,1.51,false,[];1,1;false;true;";
        list($fraction, $state)  = $question->grade_response(array("answer" => ""));
        $this->assertEquals(0, $fraction, "Failed on student answer is empty");

        //Student no solution 2
        $question = test_question_maker::make_question('logicgate');
        $question->questiontype = "0";
        $question->markcircuit = "1";
        $question->markcharge = "1";
        $question->answer_id = "42,StartGate,-1.18,1.39,false,[46:0:BufferGate]|46,BufferGate,0.40,1.37,false,[47:0:EndGate]|47,EndGate,2.01,1.51,false,[];1,1;false;true;";
        list($fraction, $state)  = $question->grade_response(array("answer" => "SAVED_DATA"));
        $this->assertEquals(0, $fraction, "Failed on student answer is set to default");

        //Student solution matching lecturer
        $question = test_question_maker::make_question('logicgate');
        $question->questiontype = "0";
        $question->markcircuit = "1";
        $question->markcharge = "1";
        $question->answer_id = "42,StartGate,-1.18,1.39,false,[46:0:BufferGate]|46,BufferGate,0.40,1.37,false,[47:0:EndGate]|47,EndGate,2.01,1.51,false,[];1,1;false;true;";
        list($fraction, $state)  = $question->grade_response(array("answer" => "42,StartGate,-1.18,1.39,false,[46:0:BufferGate]|46,BufferGate,0.40,1.37,false,[47:0:EndGate]|47,EndGate,2.01,1.51,false,[];1,1;false;true;"));
        $this->assertEquals(1, $fraction, "Failed on lecturer solution exactly same as student");

        //Student solution matching lecturer Complex
        $question = test_question_maker::make_question('logicgate');
        $question->questiontype = "0";
        $question->markcircuit = "1";
        $question->markcharge = "1";
        $question->answer_id = "1,StartGate,-1.98,0.67,true,[6:0:NotGate]|2,EndGate,3.22,1.32,true,[]|6,NotGate,-0.34,2.64,false,[10:0:NotGate]|10,NotGate,-0.14,1.92,true,[15:0:AndGate/15:1:AndGate]|15,AndGate,-0.18,1.17,true,[20:0:NandGate/20:1:NandGate]|20,NandGate,-0.26,0.35,false,[25:0:OrGate/25:1:OrGate]|25,OrGate,-0.35,-0.49,false,[30:0:NorGate/30:1:NorGate]|30,NorGate,-0.34,-1.17,true,[35:0:XorGate/35:1:XorGate]|35,XorGate,-0.31,-1.93,false,[40:0:XnorGate/40:1:XnorGate]|40,XnorGate,-0.39,-2.60,true,[45:0:XnorGate/45:1:XnorGate]|45,XnorGate,1.46,-2.57,true,[50:0:XorGate/50:1:XorGate]|50,XorGate,1.44,-1.83,false,[55:0:NorGate/55:1:NorGate]|55,NorGate,1.36,-1.12,true,[60:0:OrGate/60:1:OrGate]|60,OrGate,1.39,-0.37,true,[65:0:NandGate/65:1:NandGate]|65,NandGate,1.57,0.35,false,[70:0:AndGate/70:1:AndGate]|70,AndGate,1.57,1.15,false,[74:0:NotGate]|74,NotGate,1.53,1.95,true,[78:0:BufferGate]|78,BufferGate,1.42,2.60,true,[2:0:EndGate];1,1;true;true;";
        list($fraction, $state)  = $question->grade_response(array("answer" => "1,StartGate,-1.98,0.67,true,[6:0:NotGate]|2,EndGate,3.22,1.32,true,[]|6,NotGate,-0.34,2.64,false,[10:0:NotGate]|10,NotGate,-0.14,1.92,true,[15:0:AndGate/15:1:AndGate]|15,AndGate,-0.18,1.17,true,[20:0:NandGate/20:1:NandGate]|20,NandGate,-0.26,0.35,false,[25:0:OrGate/25:1:OrGate]|25,OrGate,-0.35,-0.49,false,[30:0:NorGate/30:1:NorGate]|30,NorGate,-0.34,-1.17,true,[35:0:XorGate/35:1:XorGate]|35,XorGate,-0.31,-1.93,false,[40:0:XnorGate/40:1:XnorGate]|40,XnorGate,-0.39,-2.60,true,[45:0:XnorGate/45:1:XnorGate]|45,XnorGate,1.46,-2.57,true,[50:0:XorGate/50:1:XorGate]|50,XorGate,1.44,-1.83,false,[55:0:NorGate/55:1:NorGate]|55,NorGate,1.36,-1.12,true,[60:0:OrGate/60:1:OrGate]|60,OrGate,1.39,-0.37,true,[65:0:NandGate/65:1:NandGate]|65,NandGate,1.57,0.35,false,[70:0:AndGate/70:1:AndGate]|70,AndGate,1.57,1.15,false,[74:0:NotGate]|74,NotGate,1.53,1.95,true,[78:0:BufferGate]|78,BufferGate,1.42,2.60,true,[2:0:EndGate];1,1;true;true;"));
        $this->assertEquals(1, $fraction, "Failed on lecturer solution exactly same as student complex");

        //Student solution matching lecturer Complex Non exact
        $question = test_question_maker::make_question('logicgate');
        $question->questiontype = "0";
        $question->markcircuit = "1";
        $question->markcharge = "1";
        $question->answer_id = "42,StartGate,-1.98,0.67,true,[146:0:BufferGate]|43,EndGate,3.22,1.32,true,[]|47,NotGate,-0.14,1.92,false,[52:0:AndGate/52:1:AndGate]|52,AndGate,-0.18,1.17,false,[57:0:NandGate/57:1:NandGate]|57,NandGate,-0.26,0.35,true,[62:0:OrGate/62:1:OrGate]|62,OrGate,-0.35,-0.49,true,[67:0:NorGate/67:1:NorGate]|67,NorGate,-0.34,-1.17,false,[72:0:XorGate/72:1:XorGate]|72,XorGate,-0.31,-1.93,false,[77:0:XnorGate/77:1:XnorGate]|77,XnorGate,-0.39,-2.60,true,[82:0:XnorGate/82:1:XnorGate]|82,XnorGate,1.46,-2.57,true,[87:0:XorGate/87:1:XorGate]|87,XorGate,1.44,-1.83,false,[92:0:NorGate/92:1:NorGate]|92,NorGate,1.36,-1.12,true,[97:0:OrGate/97:1:OrGate]|97,OrGate,1.39,-0.37,true,[102:0:NandGate/102:1:NandGate]|102,NandGate,1.57,0.35,false,[107:0:AndGate/107:1:AndGate]|107,AndGate,1.57,1.15,false,[111:0:NotGate]|111,NotGate,1.53,1.95,true,[115:0:BufferGate]|115,BufferGate,1.42,2.60,true,[43:0:EndGate]|146,BufferGate,-0.27,2.64,true,[47:0:NotGate];1,1;true;true;";
        list($fraction, $state)  = $question->grade_response(array("answer" => "45,NandGate,-1.37,-0.00,false,[66:0:OrGate/66:1:OrGate]|49,NotGate,-1.50,1.41,true,[54:0:AndGate/54:1:AndGate]|54,AndGate,-1.53,0.71,true,[45:0:NandGate/45:1:NandGate]|58,BufferGate,-1.43,2.21,false,[49:0:NotGate]|59,EndGate,2.76,1.17,true,[]|61,StartGate,-2.19,2.74,false,[58:0:BufferGate]|66,OrGate,-1.22,-0.71,false,[71:0:NorGate/71:1:NorGate]|71,NorGate,-1.33,-1.30,true,[76:0:XorGate/76:1:XorGate]|76,XorGate,-1.17,-2.05,false,[81:0:XnorGate/81:1:XnorGate]|81,XnorGate,-1.15,-2.70,true,[100:0:XnorGate/100:1:XnorGate]|100,XnorGate,0.76,-2.66,true,[105:0:XorGate/105:1:XorGate]|105,XorGate,0.77,-1.86,false,[110:0:NorGate/110:1:NorGate]|110,NorGate,0.73,-1.12,true,[115:0:OrGate/115:1:OrGate]|115,OrGate,0.77,-0.37,true,[120:0:NandGate/120:1:NandGate]|120,NandGate,0.76,0.41,false,[125:0:AndGate/125:1:AndGate]|125,AndGate,0.67,1.11,false,[129:0:NotGate]|129,NotGate,0.51,1.74,true,[133:0:BufferGate]|133,BufferGate,0.59,2.39,true,[59:0:EndGate];1,1;true;true;"));
        $this->assertEquals(1, $fraction, "Failed on lecturer solution exactly same as student complex non exact");

        //Student solution not Matching lecturer but charge is the same
        $question = test_question_maker::make_question('logicgate');
        $question->questiontype = "0";
        $question->markcircuit = "1";
        $question->markcharge = "1";
        $question->answer_id = "42,StartGate,-1.98,0.67,true,[146:0:BufferGate]|43,EndGate,3.22,1.32,true,[]|47,NotGate,-0.14,1.92,false,[52:0:AndGate/52:1:AndGate]|52,AndGate,-0.18,1.17,false,[57:0:NandGate/57:1:NandGate]|57,NandGate,-0.26,0.35,true,[62:0:OrGate/62:1:OrGate]|62,OrGate,-0.35,-0.49,true,[67:0:NorGate/67:1:NorGate]|67,NorGate,-0.34,-1.17,false,[72:0:XorGate/72:1:XorGate]|72,XorGate,-0.31,-1.93,false,[77:0:XnorGate/77:1:XnorGate]|77,XnorGate,-0.39,-2.60,true,[82:0:XnorGate/82:1:XnorGate]|82,XnorGate,1.46,-2.57,true,[87:0:XorGate/87:1:XorGate]|87,XorGate,1.44,-1.83,false,[92:0:NorGate/92:1:NorGate]|92,NorGate,1.36,-1.12,true,[97:0:OrGate/97:1:OrGate]|97,OrGate,1.39,-0.37,true,[102:0:NandGate/102:1:NandGate]|102,NandGate,1.57,0.35,false,[107:0:AndGate/107:1:AndGate]|107,AndGate,1.57,1.15,false,[111:0:NotGate]|111,NotGate,1.53,1.95,true,[115:0:BufferGate]|115,BufferGate,1.42,2.60,true,[43:0:EndGate]|146,BufferGate,-0.27,2.64,true,[47:0:NotGate];1,1;true;true;";
        list($fraction, $state)  = $question->grade_response(array("answer" => "42,StartGate,-1.13,1.82,false,[47:0:NandGate/51:0:NotGate]|47,NandGate,0.76,1.66,true,[55:0:EndGate]|51,NotGate,-0.19,0.44,true,[47:1:NandGate]|55,EndGate,2.32,1.17,true,[];1,1;true;true;"));
        $this->assertEquals(0, $fraction, "Failed on lecturer solution exactly same as student complex non exact");
    }

    public function test_grade_response_sandbox()
    {

    }

    //Test the same response function
    public function test_is_same_response() 
    {
        $question = test_question_maker::make_question('logicgate');

        $this->assertEquals(true, $question->is_same_response(array("hi"), array("hi")), false);
        $this->assertEquals(false, $question->is_same_response(array("hi"), array("hello")), false);
    }
    
    //Make sure data is saved in raw format
    public function test_get_expected_data() 
    {
        $question = test_question_maker::make_question('logicgate');
        $value =  array('answer' => PARAM_RAW);
        $this->assertEquals($value, $question->get_expected_data(), false);
    }

    //Test compute final grade
    public function test_compute_final_grade() 
    {
        $question = test_question_maker::make_question('logicgate');
        $this->assertEquals(1, $question->compute_final_grade("reponses",0), false);
    }

    //Test that answer is returned as string
    public function test_summarise_response()
    {
        $question = test_question_maker::make_question('logicgate');
        $response = array('answer' => "the reponse");

        //Check that it returns the correct reponse
        $this->assertEquals("the reponse", $question->summarise_response($response), false);
        //Check that it returns null if no answer
        $this->assertEquals(null, $question->summarise_response(array('not answer' => "the reponse")), false);
    }

    //Test that answer is complete
    public function test_is_complete_response()
    {
        $question = test_question_maker::make_question('logicgate');
        $response = array('answer' => "the reponse");

        $this->assertEquals(true, $question->is_complete_response($response), false);
        $this->assertEquals(false, $question->is_complete_response(array('not answer' => "the reponse")), false);
    }
}
?>