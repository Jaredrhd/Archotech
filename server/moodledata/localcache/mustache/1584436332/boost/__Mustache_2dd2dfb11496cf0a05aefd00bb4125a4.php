<?php

class __Mustache_2dd2dfb11496cf0a05aefd00bb4125a4 extends Mustache_Template
{
    public function renderInternal(Mustache_Context $context, $indent = '')
    {
        $buffer = '';

        if ($partial = $this->mustache->loadPartial('core_form/element-text')) {
            $buffer .= $partial->renderInternal($context);
        }

        return $buffer;
    }
}
