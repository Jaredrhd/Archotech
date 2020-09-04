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

        $mform->addElement('header', 'q_type_header', "Question Type");

        $this->setupTraversalControls($mform);
        $this->setupBSTControls($mform);
        $this->setupPropertiesControls($mform);
       
        $mform->setDefault('question_type', 0);

        /** SAVE / RETRIEVE TREE */
        $mform->addElement('header', 'save_retrieve_tree_header', "Copy / Paste Tree");
        $mform->addElement('text', 'copy_paste_tree', 'Copy / Paste Tree String');

        $mform->addElement('header', 'create_question_header', "Build Tree");
        $mform->addElement('html', file_get_contents(new moodle_url('/question/type/trees/lecturer.html')));

        $mform->addElement('hidden', 'lecturer_tree','', array('id'=>'lecturer_tree'));
        $mform->addElement('hidden', 'preorder','', array('id'=>'preorder'));
        $mform->addElement('hidden', 'inorder','', array('id'=>'inorder'));
        $mform->addElement('hidden', 'postorder','', array('id'=>'postorder'));
        $mform->addElement('hidden', 'bstvalues','', array('id'=>'bstvalues'));
        $mform->addElement('hidden', 'bst_string','', array('id'=>'bst_string'));
        $mform->addElement('hidden', 'requested_properties','', array('id'=>'requested_properties'));
        $mform->addElement('hidden', 'properties_string','', array('id'=>'properties_string'));
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

    public function setupTraversalControls($mform) {
        $mform->addElement('radio', 'question_type', '', "Perform Traversal", 0, array('qtype_name'=>'traversal'));
        /** CHECKBOXES FOR TRAVERSAL */
        $mform->addElement('radio', 'traversal_type', "", "Pre-Order", 0, array('traversal_type' => 'preorder'));
        $mform->addElement('radio', 'traversal_type', "", "In-Order", 1, array('traversal_type' => 'inorder'));
        $mform->addElement('radio', 'traversal_type', "", "Post-Order", 2, array('traversal_type' => 'postorder'));
        /** Hide the traversal radio buttons unless "Perform Traversal" is selected */
        $mform->hideIf('traversal_type', 'question_type', 'neq', 0);
    }

    public function setupBSTControls($mform) {
        $mform->addElement('radio', 'question_type', '', "Construct BST", 1, array('qtype_name'=>'bst'));
        $mform->addElement('radio', 'bst_value_type', '', "Random Values", 0, array('bst_value_type'=>'random'));
        $mform->addElement('radio', 'bst_value_type', '', "Input Values", 1, array('bst_value_type'=>'supplied'));
        /** Hide BST radio buttons unless "Construct BST" is selected */
        $mform->hideIf('bst_value_type', 'question_type', 'neq', 1);

        $mform->addElement('float', 'node_amount', "Number of Nodes", array('value'=>10));
        $mform->addElement('float', 'input_value', "Input Node Value");

        /** Hide node value boxes unless unless "Construct BST" is selected */
        $mform->hideIf('node_amount', 'question_type', 'neq', 1);
        $mform->hideIf('input_value', 'question_type', 'neq', 1);

        $mform->hideIf('node_amount', 'bst_value_type', 'neq', 0); // Hide node amount unless "Random Values" is selected
        $mform->hideIf('input_value', 'bst_value_type', 'neq', 1); // Hide node values input unless "Input Values" is selected
    }

    public function setupPropertiesControls($mform) {
        $mform->addElement('radio', 'question_type', '', "Tree Properties", 2, array('qtype_name' => 'properties'));

        $mform->addElement('advcheckbox', 'tree_option', '', "Properties of Tree", array('option_name' => 'tree_properties_check'), array(0, 1));
        /** TREE PROPERTIES */
        $mform->addElement('advcheckbox', 'tree_properties', '', "Number of Leaves", array('property_name' => 'tree:num_leaves'), array(0, 1));
        $mform->addElement('advcheckbox', 'tree_properties', '', "Number of Edges", array('property_name' => 'tree:num_edges'), array(0, 1));
        $mform->addElement('advcheckbox', 'tree_properties', '', "Number of Internal Nodes", array('property_name' => 'tree:num_internal_nodes'), array(0, 1));
 
        $mform->addElement('advcheckbox', 'node_option', '', "Properties of Nodes", array('option_name' => 'node_properties_check'), array(0, 1));
        /** NODE PROPERTIES */
        $mform->addElement('advcheckbox', 'node_properties', '', "Height", array('property_name' => 'node:height'), array(0, 1));
        $mform->addElement('advcheckbox', 'node_properties', '', "Depth", array('property_name' => 'node:depth'), array(0, 1));
        $mform->addElement('advcheckbox', 'node_properties', '', "Degree", array('property_name' => 'node:degree'), array(0, 1));
        $mform->addElement('advcheckbox', 'node_properties', '', "Level", array('property_name' => 'node:level'), array(0, 1));
        
        /** Hide option checkboxes unless "Tree Properties" is selected */
        $mform->hideIf('tree_option', 'question_type', 'neq', 2);
        $mform->hideIf('node_option', 'question_type', 'neq', 2);

        /** Hide property checkboxes unless respective options are checked */
        $mform->hideIf('tree_properties', 'tree_option', 'notchecked');
        $mform->hideIf('tree_properties', 'question_type', 'neq', 2);
        $mform->hideIf('node_properties', 'node_option', 'notchecked');
        $mform->hideIf('node_properties', 'question_type', 'neq', 2);
    }
}
