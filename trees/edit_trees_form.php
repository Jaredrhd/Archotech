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
 * Defines the editing form for the trees question type.
 *
 * @package    qtype
 * @subpackage trees
 * @copyright  THEYEAR YOURNAME (YOURCONTACTINFO)

 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */


defined('MOODLE_INTERNAL') || die();

/**
 * trees question editing form definition.
 *
 * @copyright  THEYEAR YOURNAME (YOURCONTACTINFO)

 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class qtype_trees_edit_form extends question_edit_form {

    protected function definition_inner($mform) {
        $this->add_interactive_settings();

        $mform->addElement('header', 'QuestionType', "Question Type");

        /** TRAVERSAL */
        $mform->addElement('radio', 'question_type', '', "Perform Traversal", 0, array('qtype_name'=>'traversal'));
        /** CHECKBOXES FOR TRAVERSAL */
        $mform->addElement('radio', 'traversal_type', "", "Pre-Order", 0, array('traversal_type' => 'preorder'));
        $mform->addElement('radio', 'traversal_type', "", "In-Order", 1, array('traversal_type' => 'inorder'));
        $mform->addElement('radio', 'traversal_type', "", "Post-Order", 2, array('traversal_type' => 'postorder'));
        /** Hide the traversal checkboxes unless "Perform Traversal" is selected */
        $mform->hideIf('traversal_type', 'question_type', 'neq', 0);

        /** BST */
        $mform->addElement('radio', 'question_type', '', "Construct BST", 1, array('qtype_name'=>'bst'));
        $mform->addElement('float', 'node_amount', "Number of Nodes", array('value'=>10));
        $mform->hideIf('node_amount', 'question_type', 'neq', 1); // Hide node amount unless "Construct BST" is selected

        $mform->setDefault('question_type', 0);

        $mform->addElement('header', 'Answer', "Build Tree");
        $mform->addElement('html', file_get_contents(new moodle_url('/question/type/trees/index.html')));

        $mform->addElement('hidden', 'curated_data','', array('id'=>'curated_data'));
        $mform->addElement('hidden', 'preorder','', array('id'=>'preorder'));
        $mform->addElement('hidden', 'inorder','', array('id'=>'inorder'));
        $mform->addElement('hidden', 'postorder','', array('id'=>'postorder'));
        $mform->addElement('hidden', 'q_type','', array('id'=>'q_type'));

        // $this->add_per_answer_fields($mform, get_string('answerno', 'qtype_trees', '{no}'), array(100,0),1,0);

        $this->add_interactive_settings();
    }

    protected function data_preprocessing($question) {
        $question = parent::data_preprocessing($question);
        $question = $this->data_preprocessing_hints($question);

        return $question;
    }

    public function qtype() {
        return 'trees';
    }
}
