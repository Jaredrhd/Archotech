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
        list($fraction, $state)  = $question->grade_response(array("response"));
        $this->assertEquals(0, $fraction, false);
    }

    //Test the same response function
    public function test_is_same_response() 
    {
        $question = test_question_maker::make_question('logicgate');

        $this->assertEquals(true, $question->is_same_response("hi", "hi"), false);
        $this->assertEquals(false, $question->is_same_response("hi", "hello"), false);
    }
    
    //Make sure data is saved in raw format
    public function test_get_expected_data() 
    {
        $question = test_question_maker::make_question('logicgate');
        $value =  array('answer' => PARAM_RAW);
        $this->assertEquals($value, $question->get_expected_data(), false);
    }
}
?>