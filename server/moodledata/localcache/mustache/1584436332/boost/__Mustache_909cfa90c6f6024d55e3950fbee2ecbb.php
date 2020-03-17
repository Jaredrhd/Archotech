<?php

class __Mustache_909cfa90c6f6024d55e3950fbee2ecbb extends Mustache_Template
{
    private $lambdaHelper;

    public function renderInternal(Mustache_Context $context, $indent = '')
    {
        $this->lambdaHelper = new Mustache_LambdaHelper($this->mustache, $context);
        $buffer = '';

        if ($partial = $this->mustache->loadPartial('core/chooser')) {
            $buffer .= $partial->renderInternal($context);
        }
        // 'js' section
        $value = $context->find('js');
        $buffer .= $this->section8af7230d440de2feb678b456041e95c9($context, $indent, $value);

        return $buffer;
    }

    private function section8af7230d440de2feb678b456041e95c9(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
require([
    \'core/yui\',
    \'core/str\'
], function(Y, Str) {
    Str.get_strings([
        { key: \'addresourceoractivity\', component: \'moodle\' },
        { key: \'close\', component: \'editor\' },
    ]).then(function(add, close) {
        Y.use(\'moodle-course-modchooser\', function() {
            M.course.init_chooser({
                courseid: {{courseid}},
                closeButtonTitle: close
            });
        });
    });
});
';
            $result = call_user_func($value, $source, $this->lambdaHelper);
            if (strpos($result, '{{') === false) {
                $buffer .= $result;
            } else {
                $buffer .= $this->mustache
                    ->loadLambda((string) $result)
                    ->renderInternal($context);
            }
        } elseif (!empty($value)) {
            $values = $this->isIterable($value) ? $value : array($value);
            foreach ($values as $value) {
                $context->push($value);
                
                $buffer .= $indent . 'require([
';
                $buffer .= $indent . '    \'core/yui\',
';
                $buffer .= $indent . '    \'core/str\'
';
                $buffer .= $indent . '], function(Y, Str) {
';
                $buffer .= $indent . '    Str.get_strings([
';
                $buffer .= $indent . '        { key: \'addresourceoractivity\', component: \'moodle\' },
';
                $buffer .= $indent . '        { key: \'close\', component: \'editor\' },
';
                $buffer .= $indent . '    ]).then(function(add, close) {
';
                $buffer .= $indent . '        Y.use(\'moodle-course-modchooser\', function() {
';
                $buffer .= $indent . '            M.course.init_chooser({
';
                $buffer .= $indent . '                courseid: ';
                $value = $this->resolveValue($context->find('courseid'), $context);
                $buffer .= call_user_func($this->mustache->getEscape(), $value);
                $buffer .= ',
';
                $buffer .= $indent . '                closeButtonTitle: close
';
                $buffer .= $indent . '            });
';
                $buffer .= $indent . '        });
';
                $buffer .= $indent . '    });
';
                $buffer .= $indent . '});
';
                $context->pop();
            }
        }
    
        return $buffer;
    }

}
