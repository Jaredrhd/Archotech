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
        list($fraction, $state)  = $question->grade_response(array("answer" => "8,1,StartGate,-1.92,2.58,false,[12:0:BufferGate]|12,1,BufferGate,-0.26,0.82,false,[13:0:EndGate]|13,1,EndGate,1.91,1.25,false,[];1,1;false;true;"));
        $this->assertEquals(0, $fraction, "Failed on lecturer answer is empty");

        //Student no solution
        $question = test_question_maker::make_question('logicgate');
        $question->questiontype = "0";
        $question->markcircuit = "1";
        $question->markcharge = "1";
        $question->answer_id = "8,1,StartGate,-1.92,2.58,false,[12:0:BufferGate]|12,1,BufferGate,-0.26,0.82,false,[13:0:EndGate]|13,1,EndGate,1.91,1.25,false,[];1,1;false;true;";
        list($fraction, $state)  = $question->grade_response(array("answer" => ""));
        $this->assertEquals(0, $fraction, "Failed on student answer is empty");

        //Student no solution 2
        $question = test_question_maker::make_question('logicgate');
        $question->questiontype = "0";
        $question->markcircuit = "1";
        $question->markcharge = "1";
        $question->answer_id = "8,1,StartGate,-1.92,2.58,false,[12:0:BufferGate]|12,1,BufferGate,-0.26,0.82,false,[13:0:EndGate]|13,1,EndGate,1.91,1.25,false,[];1,1;false;true;";
        list($fraction, $state)  = $question->grade_response(array("answer" => "SAVED_DATA"));
        $this->assertEquals(0, $fraction, "Failed on student answer is set to default");

        //Student solution matching lecturer
        $question = test_question_maker::make_question('logicgate');
        $question->questiontype = "0";
        $question->markcircuit = "1";
        $question->markcharge = "1";
        $question->answer_id = "8,1,StartGate,-1.92,2.58,false,[12:0:BufferGate]|12,1,BufferGate,-0.26,0.82,false,[13:0:EndGate]|13,1,EndGate,1.91,1.25,false,[];1,1;false;true;";
        list($fraction, $state)  = $question->grade_response(array("answer" => "8,1,StartGate,-1.92,2.58,false,[12:0:BufferGate]|12,1,BufferGate,-0.26,0.82,false,[13:0:EndGate]|13,1,EndGate,1.91,1.25,false,[];1,1;false;true;"));
        $this->assertEquals(1, $fraction, "Failed on lecturer solution exactly same as student");

        //Student solution matching lecturer Complex
        $question = test_question_maker::make_question('logicgate');
        $question->questiontype = "0";
        $question->markcircuit = "1";
        $question->markcharge = "1";
        $question->answer_id = "42,1,StartGate,-2.11,2.64,true,[47:0:BufferGate]|43,1,EndGate,2.92,-2.45,true,[]|47,1,BufferGate,-0.51,2.72,true,[51:0:NotGate]|51,1,NotGate,2.12,2.73,false,[56:0:AndGate/56:1:AndGate]|56,1,AndGate,0.18,2.00,false,[61:0:NandGate/61:1:NandGate]|61,1,NandGate,0.21,1.23,true,[66:0:OrGate/66:1:OrGate]|66,1,OrGate,0.22,0.44,true,[71:0:NorGate/71:1:NorGate]|71,1,NorGate,0.24,-0.35,false,[76:0:XorGate/76:1:XorGate]|76,1,XorGate,0.27,-1.19,false,[81:0:XnorGate/81:1:XnorGate]|81,1,XnorGate,0.19,-1.92,true,[43:0:EndGate];1,1;true;true;";
        list($fraction, $state)  = $question->grade_response(array("answer" => "42,1,StartGate,-2.11,2.64,true,[47:0:BufferGate]|43,1,EndGate,2.92,-2.45,true,[]|47,1,BufferGate,-0.51,2.72,true,[51:0:NotGate]|51,1,NotGate,2.12,2.73,false,[56:0:AndGate/56:1:AndGate]|56,1,AndGate,0.18,2.00,false,[61:0:NandGate/61:1:NandGate]|61,1,NandGate,0.21,1.23,true,[66:0:OrGate/66:1:OrGate]|66,1,OrGate,0.22,0.44,true,[71:0:NorGate/71:1:NorGate]|71,1,NorGate,0.24,-0.35,false,[76:0:XorGate/76:1:XorGate]|76,1,XorGate,0.27,-1.19,false,[81:0:XnorGate/81:1:XnorGate]|81,1,XnorGate,0.19,-1.92,true,[43:0:EndGate];1,1;true;true;"));
        $this->assertEquals(1, $fraction, "Failed on lecturer solution exactly same as student complex");

        //Student solution matching lecturer Complex Non exact
        $question = test_question_maker::make_question('logicgate');
        $question->questiontype = "0";
        $question->markcircuit = "1";
        $question->markcharge = "1";
        $question->answer_id = "42,1,StartGate,-2.11,2.64,true,[47:0:BufferGate]|43,1,EndGate,2.92,-2.45,true,[]|47,1,BufferGate,-0.51,2.72,true,[51:0:NotGate]|51,1,NotGate,2.12,2.73,false,[56:0:AndGate/56:1:AndGate]|56,1,AndGate,0.18,2.00,false,[61:0:NandGate/61:1:NandGate]|61,1,NandGate,0.21,1.23,true,[66:0:OrGate/66:1:OrGate]|66,1,OrGate,0.22,0.44,true,[71:0:NorGate/71:1:NorGate]|71,1,NorGate,0.24,-0.35,false,[76:0:XorGate/76:1:XorGate]|76,1,XorGate,0.27,-1.19,false,[81:0:XnorGate/81:1:XnorGate]|81,1,XnorGate,0.19,-1.92,true,[43:0:EndGate];1,1;true;true;";
        list($fraction, $state)  = $question->grade_response(array("answer" => "41,1,EndGate,2.81,-2.49,true,[]|43,1,StartGate,-1.93,2.61,false,[81:0:BufferGate]|48,1,XnorGate,-0.90,-2.60,true,[41:0:EndGate]|53,1,XorGate,-0.83,-1.82,false,[48:0:XnorGate/48:1:XnorGate]|58,1,NorGate,-0.78,-1.00,true,[53:0:XorGate/53:1:XorGate]|63,1,OrGate,-0.68,-0.16,false,[58:0:NorGate/58:1:NorGate]|68,1,AndGate,-0.68,1.31,true,[73:0:NandGate/73:1:NandGate]|73,1,NandGate,-0.81,0.60,false,[63:0:OrGate/63:1:OrGate]|77,1,NotGate,2.28,2.52,true,[68:0:AndGate/68:1:AndGate]|81,1,BufferGate,-0.28,2.52,false,[77:0:NotGate];1,1;true;true;"));
        $this->assertEquals(1, $fraction, "Failed on lecturer solution exactly same as student complex non exact");

        //Student solution not Matching lecturer but charge is the same, so should return false based on just circuit not matching
        $question = test_question_maker::make_question('logicgate');
        $question->questiontype = "0";
        $question->markcircuit = "1";
        $question->markcharge = "1";
        $question->answer_id = "42,1,StartGate,-2.11,2.64,true,[47:0:BufferGate]|43,1,EndGate,2.92,-2.45,true,[]|47,1,BufferGate,-0.51,2.72,true,[51:0:NotGate]|51,1,NotGate,2.12,2.73,false,[56:0:AndGate/56:1:AndGate]|56,1,AndGate,0.18,2.00,false,[61:0:NandGate/61:1:NandGate]|61,1,NandGate,0.21,1.23,true,[66:0:OrGate/66:1:OrGate]|66,1,OrGate,0.22,0.44,true,[71:0:NorGate/71:1:NorGate]|71,1,NorGate,0.24,-0.35,false,[76:0:XorGate/76:1:XorGate]|76,1,XorGate,0.27,-1.19,false,[81:0:XnorGate/81:1:XnorGate]|81,1,XnorGate,0.19,-1.92,true,[43:0:EndGate];1,1;true;true;";
        list($fraction, $state)  = $question->grade_response(array("answer" => "42,1,StartGate,-1.38,1.79,false,[46:0:NotGate/53:0:NandGate]|46,1,NotGate,-0.38,0.96,true,[53:1:NandGate]|47,1,EndGate,1.35,1.60,true,[]|53,1,NandGate,0.31,1.86,true,[47:0:EndGate];1,1;true;true;"));
        $this->assertEquals(0, $fraction, "Failed on lecturer solution exactly same as student complex non exact, should return 0, but got 1 instead.");

        //Student solution not Matching lecturer but charge is the same, so should return true based on just charge
        $question = test_question_maker::make_question('logicgate');
        $question->questiontype = "0";
        $question->markcircuit = "0";
        $question->markcharge = "1";
        $question->answer_id = "42,1,StartGate,-2.11,2.64,true,[47:0:BufferGate]|43,1,EndGate,2.92,-2.45,true,[]|47,1,BufferGate,-0.51,2.72,true,[51:0:NotGate]|51,1,NotGate,2.12,2.73,false,[56:0:AndGate/56:1:AndGate]|56,1,AndGate,0.18,2.00,false,[61:0:NandGate/61:1:NandGate]|61,1,NandGate,0.21,1.23,true,[66:0:OrGate/66:1:OrGate]|66,1,OrGate,0.22,0.44,true,[71:0:NorGate/71:1:NorGate]|71,1,NorGate,0.24,-0.35,false,[76:0:XorGate/76:1:XorGate]|76,1,XorGate,0.27,-1.19,false,[81:0:XnorGate/81:1:XnorGate]|81,1,XnorGate,0.19,-1.92,true,[43:0:EndGate];1,1;true;true;";
        list($fraction, $state)  = $question->grade_response(array("answer" => "42,1,StartGate,-1.38,1.79,false,[46:0:NotGate/53:0:NandGate]|46,1,NotGate,-0.38,0.96,true,[53:1:NandGate]|47,1,EndGate,1.35,1.60,true,[]|53,1,NandGate,0.31,1.86,true,[47:0:EndGate];1,1;true;true;"));
        $this->assertEquals(1, $fraction, "Failed on lecturer solution exactly same as student complex non exact, should return 1, but got 0 instead.");

        //Student solution Matching lecturer but student solution is flipped
        $question = test_question_maker::make_question('logicgate');
        $question->questiontype = "0";
        $question->markcircuit = "1";
        $question->markcharge = "1";
        $question->answer_id = "42,1,StartGate,-2.11,2.64,true,[47:0:BufferGate]|43,1,EndGate,2.92,-2.45,true,[]|47,1,BufferGate,-0.51,2.72,true,[51:0:NotGate]|51,1,NotGate,2.12,2.73,false,[56:0:AndGate/56:1:AndGate]|56,1,AndGate,0.18,2.00,false,[61:0:NandGate/61:1:NandGate]|61,1,NandGate,0.21,1.23,true,[66:0:OrGate/66:1:OrGate]|66,1,OrGate,0.22,0.44,true,[71:0:NorGate/71:1:NorGate]|71,1,NorGate,0.24,-0.35,false,[76:0:XorGate/76:1:XorGate]|76,1,XorGate,0.27,-1.19,false,[81:0:XnorGate/81:1:XnorGate]|81,1,XnorGate,0.19,-1.92,true,[43:0:EndGate];1,1;true;true;";
        list($fraction, $state)  = $question->grade_response(array("answer" => "42,1,StartGate,-1.38,1.79,false,[46:0:NotGate/53:0:NandGate]|46,1,NotGate,-0.38,0.96,true,[53:1:NandGate]|47,1,EndGate,1.35,1.60,true,[]|53,1,NandGate,0.31,1.86,true,[47:0:EndGate];1,1;true;true;"));
        $this->assertEquals(0, $fraction, "Failed on lecturer solution exactly same as student complex non exact, should return 0, but got 1 instead.");
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