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
 * Defines the editing form for the logicgate question type.
 *
 * @package    qtype
 * @subpackage logicgate
 * @copyright  2020 Archotech

 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */


defined('MOODLE_INTERNAL') || die();


/**
 * logicgate question editing form definition.
 *
 * @copyright  2020 Archotech

 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class qtype_logicgate_edit_form extends question_edit_form {

    protected function definition_inner($mform) {

        //Adds checkboxes for logic gates
        $mform->addElement('header', 'Gates', "Enable/Disable Gates");
        $mform->addElement('advcheckbox', 'buffergate', "Buffer Gate", "Buffer Gate", array('group' => 1), array(0, 1));
        $mform->addElement('advcheckbox', 'notgate', "", "Not Gate",  array('group' => 1), array(0, 1));
        $mform->addElement('advcheckbox', 'andgate', "", "And Gate",  array('group' => 1), array(0, 1));
        $mform->addElement('advcheckbox', 'nandgate', "", "Nand Gate",  array('group' => 1), array(0, 1));
        $mform->addElement('advcheckbox', 'orgate', "", "Or Gate",  array('group' => 1), array(0, 1));
        $mform->addElement('advcheckbox', 'norgate', "", "Nor Gate",  array('group' => 1), array(0, 1));
        $mform->addElement('advcheckbox', 'xorgate', "", "Xor Gate",  array('group' => 1), array(0, 1));
        $mform->addElement('advcheckbox', 'xnorgate', "", "Xnor Gate",  array('group' => 1), array(0, 1));
        $this->add_checkbox_controller(1, NULL, NULL, 1);

        #The Numerical limits
        $mform->addElement('html', '<h2> Set Numerical Limits </h2> <br /> <p> Set to 0 for unlimited amount, disable the gate above to overide these values</p>');
        $mform->addElement('float', 'buffergateamount', "Buffer Gate Limit", array('value'=>0));
        $mform->addElement('float', 'notgateamount', "Not Gate Limit", array('value'=>0));
        $mform->addElement('float', 'andgateamount', "And Gate Limit", array('value'=>0));
        $mform->addElement('float', 'nandgateamount', "Nand Gate Limit", array('value'=>0));
        $mform->addElement('float', 'orgateamount', "Or Gate Limit", array('value'=>0));
        $mform->addElement('float', 'norgateamount', "Nor Gate Limit", array('value'=>0));
        $mform->addElement('float', 'xorgateamount', "Xor Gate Limit", array('value'=>0));
        $mform->addElement('float', 'xnorgateamount', "Xnor Gate Limit", array('value'=>0));

        //Add hidden field with circuit stuff
        $mform->addElement('header', 'Answer', "Create Answer");
        $mform->addElement('html', file_get_contents(new moodle_url('/question/type/logicgate/Drag/SceneGraphLecturer.html')));

        $this->add_interactive_settings(true, true);

        //Hide the answer field  (NOTE this is forcibly hidden in the SceneGraphLecturer by getting th id. It is a hack but can't figure out how to hide this)
        $this->add_per_answer_fields($mform, get_string('answerno', 'qtype_logicgate', '{no}'), array(100,0),1,0);
    }

    //Perform a preprocessing needed on the data passed to set_data() before it is used to initialise the form. 
    protected function data_preprocessing($question) {
        $question = parent::data_preprocessing($question);
        $question = $this->data_preprocessing_answers($question);
        $question = $this->data_preprocessing_hints($question);
        return $question;
    }

    public function qtype() {
        return 'logicgate';
    }
}
