<?php

class __Mustache_29d1cc8bd02c283e61eec00f2c2c597d extends Mustache_Template
{
    public function renderInternal(Mustache_Context $context, $indent = '')
    {
        $buffer = '';

        if ($partial = $this->mustache->loadPartial('core_admin/setting_configfile')) {
            $buffer .= $partial->renderInternal($context);
        }

        return $buffer;
    }
}
