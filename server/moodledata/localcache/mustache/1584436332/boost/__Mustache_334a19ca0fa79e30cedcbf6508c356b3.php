<?php

class __Mustache_334a19ca0fa79e30cedcbf6508c356b3 extends Mustache_Template
{
    private $lambdaHelper;

    public function renderInternal(Mustache_Context $context, $indent = '')
    {
        $this->lambdaHelper = new Mustache_LambdaHelper($this->mustache, $context);
        $buffer = '';

        $buffer .= $indent . '<div data-region="timeline-view">
';
        $buffer .= $indent . '    <div class="tab-content">
';
        $buffer .= $indent . '        <div class="tab-pane ';
        // 'sorttimelinedates' section
        $value = $context->find('sorttimelinedates');
        $buffer .= $this->section394210065fc120f40f05534a4cb50829($context, $indent, $value);
        $buffer .= ' fade" data-limit="';
        $value = $this->resolveValue($context->find('limit'), $context);
        $buffer .= call_user_func($this->mustache->getEscape(), $value);
        $buffer .= '" data-region="view-dates" id="view_dates_';
        $value = $this->resolveValue($context->find('uniqid'), $context);
        $buffer .= call_user_func($this->mustache->getEscape(), $value);
        $buffer .= '">
';
        if ($partial = $this->mustache->loadPartial('block_timeline/view-dates')) {
            $buffer .= $partial->renderInternal($context, $indent . '            ');
        }
        $buffer .= $indent . '        </div>
';
        $buffer .= $indent . '        <div
';
        $buffer .= $indent . '            class="tab-pane ';
        // 'sorttimelinecourses' section
        $value = $context->find('sorttimelinecourses');
        $buffer .= $this->section394210065fc120f40f05534a4cb50829($context, $indent, $value);
        $buffer .= ' fade"
';
        $buffer .= $indent . '            data-region="view-courses"
';
        $buffer .= $indent . '            data-midnight="';
        $value = $this->resolveValue($context->find('midnight'), $context);
        $buffer .= call_user_func($this->mustache->getEscape(), $value);
        $buffer .= '"
';
        $buffer .= $indent . '            data-limit="2"
';
        $buffer .= $indent . '            data-offset="0"
';
        $buffer .= $indent . '            data-days-limit="30"
';
        $buffer .= $indent . '            data-days-offset="0"
';
        $buffer .= $indent . '            data-no-events-url="';
        $value = $this->resolveValue($context->findDot('urls.noevents'), $context);
        $buffer .= call_user_func($this->mustache->getEscape(), $value);
        $buffer .= '"
';
        $buffer .= $indent . '            id="view_courses_';
        $value = $this->resolveValue($context->find('uniqid'), $context);
        $buffer .= call_user_func($this->mustache->getEscape(), $value);
        $buffer .= '"
';
        $buffer .= $indent . '        >
';
        if ($partial = $this->mustache->loadPartial('block_timeline/view-courses')) {
            $buffer .= $partial->renderInternal($context, $indent . '            ');
        }
        $buffer .= $indent . '        </div>
';
        $buffer .= $indent . '    </div>
';
        $buffer .= $indent . '</div>';

        return $buffer;
    }

    private function section394210065fc120f40f05534a4cb50829(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = 'active show';
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
                
                $buffer .= 'active show';
                $context->pop();
            }
        }
    
        return $buffer;
    }

}
