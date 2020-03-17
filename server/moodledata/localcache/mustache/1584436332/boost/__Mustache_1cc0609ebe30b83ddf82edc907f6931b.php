<?php

class __Mustache_1cc0609ebe30b83ddf82edc907f6931b extends Mustache_Template
{
    public function renderInternal(Mustache_Context $context, $indent = '')
    {
        $buffer = '';

        $buffer .= $indent . '<div data-region="timeline-view-dates">
';
        if ($partial = $this->mustache->loadPartial('block_timeline/event-list')) {
            $buffer .= $partial->renderInternal($context, $indent . '    ');
        }
        $buffer .= $indent . '</div>
';

        return $buffer;
    }
}
