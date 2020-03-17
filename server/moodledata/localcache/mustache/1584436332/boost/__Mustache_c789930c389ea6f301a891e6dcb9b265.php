<?php

class __Mustache_c789930c389ea6f301a891e6dcb9b265 extends Mustache_Template
{
    public function renderInternal(Mustache_Context $context, $indent = '')
    {
        $buffer = '';

        if ($partial = $this->mustache->loadPartial('core_form/element-selectgroups')) {
            $buffer .= $partial->renderInternal($context);
        }

        return $buffer;
    }
}
