<?php

class __Mustache_efad63144f72708b6dc65d1b2a3311a4 extends Mustache_Template
{
    public function renderInternal(Mustache_Context $context, $indent = '')
    {
        $buffer = '';

        if ($partial = $this->mustache->loadPartial('core_form/element-group')) {
            $buffer .= $partial->renderInternal($context);
        }

        return $buffer;
    }
}
