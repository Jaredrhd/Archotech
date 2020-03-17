<?php

class __Mustache_d680e3ac34c79476b4cdc918149f7bb1 extends Mustache_Template
{
    private $lambdaHelper;

    public function renderInternal(Mustache_Context $context, $indent = '')
    {
        $this->lambdaHelper = new Mustache_LambdaHelper($this->mustache, $context);
        $buffer = '';

        $buffer .= $indent . '
';
        $buffer .= $indent . '<div class="d-flex mt-1">
';
        $buffer .= $indent . '    <textarea
';
        $buffer .= $indent . '        dir="auto"
';
        $buffer .= $indent . '        data-region="send-message-txt"
';
        $buffer .= $indent . '        class="form-control bg-light"
';
        $buffer .= $indent . '        rows="3"
';
        $buffer .= $indent . '        data-auto-rows
';
        $buffer .= $indent . '        data-min-rows="3"
';
        $buffer .= $indent . '        data-max-rows="5"
';
        $buffer .= $indent . '        role="textbox"
';
        $buffer .= $indent . '        aria-label="';
        // 'str' section
        $value = $context->find('str');
        $buffer .= $this->section2244054c2b8c2f0af84a759e802290d0($context, $indent, $value);
        $buffer .= '"
';
        $buffer .= $indent . '        placeholder="';
        // 'str' section
        $value = $context->find('str');
        $buffer .= $this->section2244054c2b8c2f0af84a759e802290d0($context, $indent, $value);
        $buffer .= '"
';
        $buffer .= $indent . '        style="resize: none"
';
        $buffer .= $indent . '    ></textarea>
';
        $buffer .= $indent . '    <button
';
        $buffer .= $indent . '        class="btn btn-link btn-icon icon-size-3 ml-1 mt-auto"
';
        $buffer .= $indent . '        aria-label="';
        // 'str' section
        $value = $context->find('str');
        $buffer .= $this->sectionAb824786c8682f6171ef8d2596f84a5d($context, $indent, $value);
        $buffer .= '"
';
        $buffer .= $indent . '        data-action="send-message"
';
        $buffer .= $indent . '    >
';
        $buffer .= $indent . '        <span data-region="send-icon-container">';
        // 'pix' section
        $value = $context->find('pix');
        $buffer .= $this->sectionB8de6adc8a0c753970767678630ae6df($context, $indent, $value);
        $buffer .= '</span>
';
        $buffer .= $indent . '        <span class="hidden" data-region="loading-icon-container">';
        if ($partial = $this->mustache->loadPartial('core/loading')) {
            $buffer .= $partial->renderInternal($context);
        }
        $buffer .= '</span>
';
        $buffer .= $indent . '    </button>
';
        $buffer .= $indent . '</div>
';

        return $buffer;
    }

    private function section2244054c2b8c2f0af84a759e802290d0(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = ' writeamessage, core_message ';
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
                
                $buffer .= ' writeamessage, core_message ';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function sectionAb824786c8682f6171ef8d2596f84a5d(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = ' sendmessage, core_message ';
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
                
                $buffer .= ' sendmessage, core_message ';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function sectionB8de6adc8a0c753970767678630ae6df(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = ' i/sendmessage, core ';
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
                
                $buffer .= ' i/sendmessage, core ';
                $context->pop();
            }
        }
    
        return $buffer;
    }

}
