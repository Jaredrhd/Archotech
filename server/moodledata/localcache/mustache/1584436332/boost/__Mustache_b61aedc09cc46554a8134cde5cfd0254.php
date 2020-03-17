<?php

class __Mustache_b61aedc09cc46554a8134cde5cfd0254 extends Mustache_Template
{
    private $lambdaHelper;

    public function renderInternal(Mustache_Context $context, $indent = '')
    {
        $this->lambdaHelper = new Mustache_LambdaHelper($this->mustache, $context);
        $buffer = '';

        $buffer .= $indent . '<div data-region="course-items-loading-placeholder">
';
        $buffer .= $indent . '    <ul class="list-group unstyled">
';
        if ($partial = $this->mustache->loadPartial('block_timeline/course-item-loading-placeholder')) {
            $buffer .= $partial->renderInternal($context, $indent . '        ');
        }
        if ($partial = $this->mustache->loadPartial('block_timeline/course-item-loading-placeholder')) {
            $buffer .= $partial->renderInternal($context, $indent . '        ');
        }
        $buffer .= $indent . '    </ul>
';
        $buffer .= $indent . '    <div class="bg-pulse-grey mt-1" style="width: 100px; height: 30px; margin-left: auto; margin-right: auto"></div>
';
        $buffer .= $indent . '</div>
';
        $buffer .= $indent . '<ul class="list-group unstyled" data-region="courses-list"></ul>
';
        $buffer .= $indent . '<div class="hidden text-xs-center text-center pt-3" data-region="more-courses-button-container">
';
        $buffer .= $indent . '    <button type="button" class="btn btn-secondary" data-action="more-courses">
';
        $buffer .= $indent . '        ';
        // 'str' section
        $value = $context->find('str');
        $buffer .= $this->section73bb7631fd9d079911dc5c495910e160($context, $indent, $value);
        $buffer .= '
';
        $buffer .= $indent . '        <span class="hidden" data-region="loading-icon-container">
';
        if ($partial = $this->mustache->loadPartial('core/loading')) {
            $buffer .= $partial->renderInternal($context, $indent . '            ');
        }
        $buffer .= $indent . '        </span>
';
        $buffer .= $indent . '    </button>
';
        $buffer .= $indent . '</div>
';
        $buffer .= $indent . '<div class="hidden text-xs-center text-center mt-3" data-region="no-courses-empty-message">
';
        $buffer .= $indent . '    <img
';
        $buffer .= $indent . '        src="';
        $value = $this->resolveValue($context->findDot('urls.noevents'), $context);
        $buffer .= call_user_func($this->mustache->getEscape(), $value);
        $buffer .= '"
';
        $buffer .= $indent . '        alt="';
        // 'str' section
        $value = $context->find('str');
        $buffer .= $this->section8ac1faa3b604bd216bd6406aef5a4809($context, $indent, $value);
        $buffer .= '"
';
        $buffer .= $indent . '        role="presentation"
';
        $buffer .= $indent . '        style="height: 70px; width: 70px"
';
        $buffer .= $indent . '    >
';
        $buffer .= $indent . '    <p class="text-muted mt-1">';
        // 'str' section
        $value = $context->find('str');
        $buffer .= $this->section8ac1faa3b604bd216bd6406aef5a4809($context, $indent, $value);
        $buffer .= '</p>
';
        $buffer .= $indent . '</div>
';

        return $buffer;
    }

    private function section73bb7631fd9d079911dc5c495910e160(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = ' morecourses, block_timeline ';
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
                
                $buffer .= ' morecourses, block_timeline ';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section8ac1faa3b604bd216bd6406aef5a4809(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = ' nocoursesinprogress, block_timeline ';
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
                
                $buffer .= ' nocoursesinprogress, block_timeline ';
                $context->pop();
            }
        }
    
        return $buffer;
    }

}
