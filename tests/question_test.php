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

    //Test the compute grade function
    public function test_grade_response()
    {
        $question = test_question_maker::make_question('logicgate');
        list($fraction, $state)  = $question->grade_response(array("0:norGate:3:-2|2:node:-2:-1|4:node:2:1:-1:2:1:none:none:false|2:node:-2:1|4:node:2:-1:-1:2:-1:none:none:false"));
        $this->assertEquals(0, $fraction, false);
        $this->assertEquals(1, $fraction, false);
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