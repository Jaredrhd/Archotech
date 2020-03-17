<?php

class __Mustache_0e79205746d3dc23f3bc97716b7a8247 extends Mustache_Template
{
    public function renderInternal(Mustache_Context $context, $indent = '')
    {
        $buffer = '';

        $buffer .= $indent . '<span class="overlay-icon-container ';
        $blockFunction = $context->findInBlock('hiddenclass');
        if (is_callable($blockFunction)) {
            $buffer .= call_user_func($blockFunction, $context);
        } else {
            // 'visible' inverted section
            $value = $context->find('visible');
            if (empty($value)) {
                
                $buffer .= 'hidden';
            }
        }
        $buffer .= '" data-region="overlay-icon-container">
';
        if ($partial = $this->mustache->loadPartial('core/loading')) {
            $buffer .= $partial->renderInternal($context, $indent . '    ');
        }
        $buffer .= $indent . '</span>
';

        return $buffer;
    }
}
