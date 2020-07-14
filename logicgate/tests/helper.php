<?php

defined('MOODLE_INTERNAL') || die();

class qtype_logicgate_test_helper extends question_test_helper {
    public function get_test_questions() {
        return array('simple');
    }

    /**
     * Makes a logicate question
     * @return qtype_logicgate_question
     */
    public function make_logicgate_question_simple() {
        question_bank::load_question_definition_classes('logicgate');
        $sa = new qtype_logicgate_question();
        test_question_maker::initialise_a_question($sa);
        $sa->name = 'Logic Gate Question';
        $sa->questiontext = 'Create Logic Gate';
        $sa->generalfeedback = '';
        $sa->usecase = false;
        $sa->answers = array(
            13 => new question_answer(13, 'hi', 1.0, 'The Logic Gate is correct', FORMAT_HTML)
            // 13 => new question_answer(13, 'frog', 1.0, 'Frog is a very good answer.', FORMAT_HTML),
            // 14 => new question_answer(14, 'toad', 0.8, 'Toad is an OK good answer.', FORMAT_HTML),
            // 15 => new question_answer(15, '*', 0.0, 'That is a bad answer.', FORMAT_HTML),
        );
        $sa->qtype = question_bank::get_qtype('logicgate');

        return $sa;
    }

    /**
     * Gets the question data for a logicgate question with with correct
     * answer 'hi', partially correct answer ' ' and defaultmark 1.
     * @return stdClass
     */
    public function get_logicgate_question_data_simple() {
        $qdata = new stdClass();
        test_question_maker::initialise_question_data($qdata);

        $qdata->qtype = 'logicgate';
        $qdata->name = 'Logic Gate Question';
        $qdata->questiontext = 'Create Logic Gate';
        $qdata->generalfeedback = '';

        $qdata->options = new stdClass();
        $qdata->options->usecase = 0;
        $qdata->options->answers = array(
            13 => new question_answer(13, 'hi', 1.0, 'The Logic Gate is correct', FORMAT_HTML)
        );

        return $qdata;
    }

}
