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

        $mform->addElement('header', 'Gates', 'Setup Question');

        //Set question mode
        $mform->addElement('radio', 'questiontype', '', 'Question Mode', 0, array());
        $mform->addElement('radio', 'questiontype', '', 'Sandbox Mode', 1, array());
        
        //How should we mark the circuit
        $mform->addElement('advcheckbox', 'markcharge', 'Mark the circuit based on charge', 'Mark Charge', array('group' => 0), array(0, 1));
        $mform->addElement('advcheckbox', 'markcircuit', 'Mark the circuit based on connections', 'Mark Circuit', array('group' => 0), array(0, 1));
        $mform->setDefault('markcharge', 1);
        $mform->setDefault('markcircuit', 1);

        //Hide if sandbox mode
        $mform->hideIf('markcharge','questiontype', 'eq', 1);
        $mform->hideIf('markcircuit','questiontype', 'eq', 1);

        //Add break to separate boxes
        $mform->addElement('html', '<hr style="border:none;border-bottom:1px solid #d9d9d9;">');

        //Adds checkboxes for logic gates
        $mform->addElement('advcheckbox', 'buffergate', 'Include Buffer Gates', 'Buffer Gate', array('group' => 1), array(0, 1));
        $mform->addElement('advcheckbox', 'notgate', 'Include Not Gates', 'Not Gate',  array('group' => 1), array(0, 1));
        $mform->addElement('advcheckbox', 'andgate', 'Include And Gates', 'And Gate',  array('group' => 1), array(0, 1));
        $mform->addElement('advcheckbox', 'nandgate', 'Include Nand Gates', 'Nand Gate',  array('group' => 1), array(0, 1));
        $mform->addElement('advcheckbox', 'orgate', 'Include Or Gates', 'Or Gate',  array('group' => 1), array(0, 1));
        $mform->addElement('advcheckbox', 'norgate', 'Include Nor Gates', 'Nor Gate',  array('group' => 1), array(0, 1));
        $mform->addElement('advcheckbox', 'xorgate', 'Include Xor Gates', 'Xor Gate',  array('group' => 1), array(0, 1));
        $mform->addElement('advcheckbox', 'xnorgate', 'Include Xnor Gates', 'Xnor Gate',  array('group' => 1), array(0, 1));

        //Turned on by default
        $mform->setDefault('buffergate', 1);
        $mform->setDefault('notgate', 1);
        $mform->setDefault('andgate', 1);
        $mform->setDefault('nandgate', 1);
        $mform->setDefault('orgate', 1);
        $mform->setDefault('norgate', 1);
        $mform->setDefault('xorgate', 1);
        $mform->setDefault('xnorgate', 1);

        //Hide checkboxes if not question mode
        $mform->hideIf('buffergate','questiontype', 'eq', 1);
        $mform->hideIf('notgate','questiontype', 'eq', 1);
        $mform->hideIf('andgate','questiontype', 'eq', 1);
        $mform->hideIf('nandgate','questiontype', 'eq', 1);
        $mform->hideIf('orgate','questiontype', 'eq', 1);
        $mform->hideIf('norgate','questiontype', 'eq', 1);
        $mform->hideIf('xorgate','questiontype', 'eq', 1);
        $mform->hideIf('xnorgate','questiontype', 'eq', 1);
        //$this->add_checkbox_controller(1, NULL, NULL, 0);

        #The Numerical limits
        $mform->addElement('html', '<h2> Set Numerical Limits </h2> <br /> <p> Set to 0 for unlimited amount. Note this only affects the student.</p>');
        $mform->addElement('text', 'startgateamount', 'Start Gate Limit', array('value'=>0));
        $mform->addElement('text', 'endgateamount', 'End Gate Limit', array('value'=>0));
        $mform->addElement('text', 'buffergateamount', 'Buffer Gate Limit', array('value'=>0));
        $mform->addElement('text', 'notgateamount', 'Not Gate Limit', array('value'=>0));
        $mform->addElement('text', 'andgateamount', 'And Gate Limit', array('value'=>0));
        $mform->addElement('text', 'nandgateamount', 'Nand Gate Limit', array('value'=>0));
        $mform->addElement('text', 'orgateamount', 'Or Gate Limit', array('value'=>0));
        $mform->addElement('text', 'norgateamount', 'Nor Gate Limit', array('value'=>0));
        $mform->addElement('text', 'xorgateamount', 'Xor Gate Limit', array('value'=>0));
        $mform->addElement('text', 'xnorgateamount', 'Xnor Gate Limit', array('value'=>0));

        //Hide numerical values if not selected
        $mform->hideIf('startgateamount', 'startgate');
        $mform->hideIf('endgateamount', 'endgate');
        $mform->hideIf('buffergateamount', 'buffergate');
        $mform->hideIf('notgateamount', 'notgate');
        $mform->hideIf('andgateamount', 'andgate');
        $mform->hideIf('nandgateamount', 'nandgate');
        $mform->hideIf('orgateamount', 'orgate');
        $mform->hideIf('norgateamount', 'norgate');
        $mform->hideIf('xorgateamount', 'xorgate');
        $mform->hideIf('xnorgateamount', 'xnorgate');

        //Hide numerical values if sandbox mode
        $mform->hideIf('startgateamount','questiontype', 'eq', 1);
        $mform->hideIf('endgateamount','questiontype', 'eq', 1);
        $mform->hideIf('buffergateamount','questiontype', 'eq', 1);
        $mform->hideIf('notgateamount','questiontype', 'eq', 1);
        $mform->hideIf('andgateamount','questiontype', 'eq', 1);
        $mform->hideIf('nandgateamount','questiontype', 'eq', 1);
        $mform->hideIf('orgateamount','questiontype', 'eq', 1);
        $mform->hideIf('norgateamount','questiontype', 'eq', 1);
        $mform->hideIf('xorgateamount','questiontype', 'eq', 1);
        $mform->hideIf('xnorgateamount','questiontype', 'eq', 1);

        //Add hidden field with circuit stuff
        $mform->addElement('header', 'Answer', 'Create Answer');
        
        //Add canvas
        $group[] =& $mform->createElement('static', 'text', '', file_get_contents(new moodle_url('/question/type/logicgate/js/SceneGraph.html')));
        $groupTemp = $mform->addGroup($group, 'hideCanvasGroup', '', ' ', false);
        $groupTemp->setAttributes(array('class'=>'flex-column'));

        $mform->hideIf('hideCanvasGroup', 'questiontype', 'eq', 1);

        //Add help text if canvas is hidden
        $newGroup[] =& $mform->createElement('static', 'text', '', 'Please set mode to question to create an answer');
        $mform->addGroup($newGroup, 'ShowHelpTextGroup', '', ' ', false);
        $mform->hideIf('ShowHelpTextGroup', 'questiontype', 'eq', 0);

        $mform->addElement('hidden', 'answer_id','',array('id'=>'answer_id'));
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
