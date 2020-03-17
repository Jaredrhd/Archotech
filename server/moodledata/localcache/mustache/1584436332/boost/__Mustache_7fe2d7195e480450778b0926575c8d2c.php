<?php

class __Mustache_7fe2d7195e480450778b0926575c8d2c extends Mustache_Template
{
    private $lambdaHelper;

    public function renderInternal(Mustache_Context $context, $indent = '')
    {
        $this->lambdaHelper = new Mustache_LambdaHelper($this->mustache, $context);
        $buffer = '';

        $buffer .= $indent . '<div id="recentlyaccessedcourses-view-';
        $value = $this->resolveValue($context->find('uniqid'), $context);
        $buffer .= call_user_func($this->mustache->getEscape(), $value);
        $buffer .= '" data-region="recentlyaccessedcourses-view">
';
        $buffer .= $indent . '    <div data-region="loading-placeholder">
';
        $buffer .= $indent . '        <div class="card-deck dashboard-card-deck one-row overflow-hidden" style="height: 13.05rem">
';
        if ($partial = $this->mustache->loadPartial('core_course/placeholder-course')) {
            $buffer .= $partial->renderInternal($context, $indent . '            ');
        }
        if ($partial = $this->mustache->loadPartial('core_course/placeholder-course')) {
            $buffer .= $partial->renderInternal($context, $indent . '            ');
        }
        if ($partial = $this->mustache->loadPartial('core_course/placeholder-course')) {
            $buffer .= $partial->renderInternal($context, $indent . '            ');
        }
        if ($partial = $this->mustache->loadPartial('core_course/placeholder-course')) {
            $buffer .= $partial->renderInternal($context, $indent . '            ');
        }
        $buffer .= $indent . '        </div>
';
        $buffer .= $indent . '    </div>
';
        $buffer .= $indent . '    <div class="hidden" data-region="view-content">
';
        // 'pagingbar' section
        $value = $context->find('pagingbar');
        $buffer .= $this->section14075e01070871c84377e3414c122388($context, $indent, $value);
        $buffer .= $indent . '        ';
        if ($parent = $this->mustache->loadPartial('core_course/coursecards')) {
            $context->pushBlockContext(array(
                'classes' => array($this, 'blockD34247a254e15ef8146e7b87b1847bbd'),
            ));
            $buffer .= $parent->renderInternal($context, $indent);
            $context->popBlockContext();
        }
        $buffer .= '    </div>
';
        $buffer .= $indent . '    <div class="hidden text-xs-center text-center mt-3" data-region="empty-message">
';
        $buffer .= $indent . '        <img class="empty-placeholder-image-lg mt-1"
';
        $buffer .= $indent . '            src="';
        $value = $this->resolveValue($context->find('nocoursesimgurl'), $context);
        $buffer .= call_user_func($this->mustache->getEscape(), $value);
        $buffer .= '"
';
        $buffer .= $indent . '            alt="';
        // 'str' section
        $value = $context->find('str');
        $buffer .= $this->sectionF6add2e2e6b5799b6d4352012a0ac861($context, $indent, $value);
        $buffer .= '"
';
        $buffer .= $indent . '            role="presentation">
';
        $buffer .= $indent . '        <p class="text-muted mt-3">';
        // 'str' section
        $value = $context->find('str');
        $buffer .= $this->sectionF6add2e2e6b5799b6d4352012a0ac861($context, $indent, $value);
        $buffer .= '</p>
';
        $buffer .= $indent . '    </div>
';
        $buffer .= $indent . '</div>
';

        return $buffer;
    }

    private function section14075e01070871c84377e3414c122388(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
            <div class="d-flex paging-bar-container mb-3" data-region="paging-bar-container">
                {{> core/paged_content_paging_bar }}
            </div>
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
                
                $buffer .= $indent . '            <div class="d-flex paging-bar-container mb-3" data-region="paging-bar-container">
';
                if ($partial = $this->mustache->loadPartial('core/paged_content_paging_bar')) {
                    $buffer .= $partial->renderInternal($context, $indent . '                ');
                }
                $buffer .= $indent . '            </div>
';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function sectionF6add2e2e6b5799b6d4352012a0ac861(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = ' nocourses, block_recentlyaccessedcourses ';
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
                
                $buffer .= ' nocourses, block_recentlyaccessedcourses ';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    public function blockD34247a254e15ef8146e7b87b1847bbd($context)
    {
        $indent = $buffer = '';
        $buffer .= 'one-row fixed-width-cards justify-content-center overflow-hidden';
    
        return $buffer;
    }
}
