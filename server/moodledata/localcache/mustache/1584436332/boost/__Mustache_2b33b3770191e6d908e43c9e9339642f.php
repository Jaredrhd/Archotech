<?php

class __Mustache_2b33b3770191e6d908e43c9e9339642f extends Mustache_Template
{
    private $lambdaHelper;

    public function renderInternal(Mustache_Context $context, $indent = '')
    {
        $this->lambdaHelper = new Mustache_LambdaHelper($this->mustache, $context);
        $buffer = '';

        $buffer .= $indent . '
';
        $buffer .= $indent . '<ul class="nav nav-tabs" role="tablist">
';
        $buffer .= $indent . '<!-- First the top most node and immediate children -->
';
        $buffer .= $indent . '    <li class="nav-item">
';
        $buffer .= $indent . '        <a class="nav-link active" href="#link';
        $value = $this->resolveValue($context->findDot('node.key'), $context);
        $buffer .= call_user_func($this->mustache->getEscape(), $value);
        $buffer .= '" data-toggle="tab" role="tab">';
        $value = $this->resolveValue($context->findDot('node.text'), $context);
        $buffer .= call_user_func($this->mustache->getEscape(), $value);
        $buffer .= '</a>
';
        $buffer .= $indent . '    </li>
';
        $buffer .= $indent . '<!-- Now the first level children with sub nodes -->
';
        // 'node.children' section
        $value = $context->findDot('node.children');
        $buffer .= $this->section1885727fd1e9d9431640e67b714d9976($context, $indent, $value);
        $buffer .= $indent . '</ul>
';
        $buffer .= $indent . '
';
        $buffer .= $indent . '<div class="tab-content mt-3">
';
        $buffer .= $indent . '    <div class="tab-pane active" id="link';
        $value = $this->resolveValue($context->findDot('node.key'), $context);
        $buffer .= call_user_func($this->mustache->getEscape(), $value);
        $buffer .= '" role="tabpanel">
';
        $buffer .= $indent . '        <div class="container">
';
        $buffer .= $indent . '            <div class="row">
';
        $buffer .= $indent . '                <div class="col-sm-3">
';
        $buffer .= $indent . '                </div>
';
        $buffer .= $indent . '                <div class="col">
';
        $buffer .= $indent . '                    <ul class="list-unstyled">
';
        // 'node.children' section
        $value = $context->findDot('node.children');
        $buffer .= $this->sectionE267c06f2090a763a8d9f5b3e72f5008($context, $indent, $value);
        $buffer .= $indent . '                    </ul>
';
        $buffer .= $indent . '                </div>
';
        $buffer .= $indent . '            </div>
';
        $buffer .= $indent . '
';
        // 'node.children' section
        $value = $context->findDot('node.children');
        $buffer .= $this->section0431d97b880b01341c8e7e0daadf32c4($context, $indent, $value);
        $buffer .= $indent . '        </div>
';
        $buffer .= $indent . '    </div>
';
        // 'node.children' section
        $value = $context->findDot('node.children');
        $buffer .= $this->section8ca475c220dc6489fa16d0b5ae96ffb8($context, $indent, $value);
        $buffer .= $indent . '</div>
';

        return $buffer;
    }

    private function section26ee26c8016182704af3427a2bece7c3(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
            {{^is_short_branch}}
                <li class="nav-item">
                    <a class="nav-link" href="#link{{key}}" data-toggle="tab" role="tab">{{text}}</a>
                </li>
            {{/is_short_branch}}
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
                
                // 'is_short_branch' inverted section
                $value = $context->find('is_short_branch');
                if (empty($value)) {
                    
                    $buffer .= $indent . '                <li class="nav-item">
';
                    $buffer .= $indent . '                    <a class="nav-link" href="#link';
                    $value = $this->resolveValue($context->find('key'), $context);
                    $buffer .= call_user_func($this->mustache->getEscape(), $value);
                    $buffer .= '" data-toggle="tab" role="tab">';
                    $value = $this->resolveValue($context->find('text'), $context);
                    $buffer .= call_user_func($this->mustache->getEscape(), $value);
                    $buffer .= '</a>
';
                    $buffer .= $indent . '                </li>
';
                }
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function sectionD86081dc90eb29b9b620fbd2d0c0355c(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
        {{#display}}
            {{^is_short_branch}}
                <li class="nav-item">
                    <a class="nav-link" href="#link{{key}}" data-toggle="tab" role="tab">{{text}}</a>
                </li>
            {{/is_short_branch}}
        {{/display}}
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
                
                // 'display' section
                $value = $context->find('display');
                $buffer .= $this->section26ee26c8016182704af3427a2bece7c3($context, $indent, $value);
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section1885727fd1e9d9431640e67b714d9976(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
    {{#children.count}}
        {{#display}}
            {{^is_short_branch}}
                <li class="nav-item">
                    <a class="nav-link" href="#link{{key}}" data-toggle="tab" role="tab">{{text}}</a>
                </li>
            {{/is_short_branch}}
        {{/display}}
    {{/children.count}}
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
                
                // 'children.count' section
                $value = $context->findDot('children.count');
                $buffer .= $this->sectionD86081dc90eb29b9b620fbd2d0c0355c($context, $indent, $value);
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function sectionEc392130f2bf2711ee960d73aad40d3e(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
                                    <li><a href="{{{action}}}">{{text}}</a></li>
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
                
                $buffer .= $indent . '                                    <li><a href="';
                $value = $this->resolveValue($context->find('action'), $context);
                $buffer .= $value;
                $buffer .= '">';
                $value = $this->resolveValue($context->find('text'), $context);
                $buffer .= call_user_func($this->mustache->getEscape(), $value);
                $buffer .= '</a></li>
';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function sectionE267c06f2090a763a8d9f5b3e72f5008(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
                            {{^children.count}}
                                {{#display}}
                                    <li><a href="{{{action}}}">{{text}}</a></li>
                                {{/display}}
                            {{/children.count}}
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
                
                // 'children.count' inverted section
                $value = $context->findDot('children.count');
                if (empty($value)) {
                    
                    // 'display' section
                    $value = $context->find('display');
                    $buffer .= $this->sectionEc392130f2bf2711ee960d73aad40d3e($context, $indent, $value);
                }
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function sectionB6e367e371fcb0da95b962d4ad85c9dc(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '<h4><a href="{{action}}">{{text}}</a><h4>';
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
                
                $buffer .= '<h4><a href="';
                $value = $this->resolveValue($context->find('action'), $context);
                $buffer .= call_user_func($this->mustache->getEscape(), $value);
                $buffer .= '">';
                $value = $this->resolveValue($context->find('text'), $context);
                $buffer .= call_user_func($this->mustache->getEscape(), $value);
                $buffer .= '</a><h4>';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function sectionAd3b906c06553db3566a6b2b7a89666b(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
                                            {{> core/settings_link_page_single }}
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
                
                if ($partial = $this->mustache->loadPartial('core/settings_link_page_single')) {
                    $buffer .= $partial->renderInternal($context, $indent . '                                            ');
                }
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section067ce1d0522e67e3433956cff2c607cd(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    {{#action}}<h4><a href="{{action}}">{{text}}</a><h4>{{/action}}
                                    {{^action}}<h4>{{text}}<h4>{{/action}}
                                </div>
                                <div class="col">
                                    <ul class="list-unstyled">
                                        {{#children}}
                                            {{> core/settings_link_page_single }}
                                        {{/children}}
                                    </ul>
                                </div>
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
                
                $buffer .= $indent . '                            <hr>
';
                $buffer .= $indent . '                            <div class="row">
';
                $buffer .= $indent . '                                <div class="col-sm-3">
';
                $buffer .= $indent . '                                    ';
                // 'action' section
                $value = $context->find('action');
                $buffer .= $this->sectionB6e367e371fcb0da95b962d4ad85c9dc($context, $indent, $value);
                $buffer .= '
';
                $buffer .= $indent . '                                    ';
                // 'action' inverted section
                $value = $context->find('action');
                if (empty($value)) {
                    
                    $buffer .= '<h4>';
                    $value = $this->resolveValue($context->find('text'), $context);
                    $buffer .= call_user_func($this->mustache->getEscape(), $value);
                    $buffer .= '<h4>';
                }
                $buffer .= '
';
                $buffer .= $indent . '                                </div>
';
                $buffer .= $indent . '                                <div class="col">
';
                $buffer .= $indent . '                                    <ul class="list-unstyled">
';
                // 'children' section
                $value = $context->find('children');
                $buffer .= $this->sectionAd3b906c06553db3566a6b2b7a89666b($context, $indent, $value);
                $buffer .= $indent . '                                    </ul>
';
                $buffer .= $indent . '                                </div>
';
                $buffer .= $indent . '                            </div>
';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section3d2db99041eeea4a2fe0613adf73296b(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
                        {{#is_short_branch}}
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    {{#action}}<h4><a href="{{action}}">{{text}}</a><h4>{{/action}}
                                    {{^action}}<h4>{{text}}<h4>{{/action}}
                                </div>
                                <div class="col">
                                    <ul class="list-unstyled">
                                        {{#children}}
                                            {{> core/settings_link_page_single }}
                                        {{/children}}
                                    </ul>
                                </div>
                            </div>
                        {{/is_short_branch}}
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
                
                // 'is_short_branch' section
                $value = $context->find('is_short_branch');
                $buffer .= $this->section067ce1d0522e67e3433956cff2c607cd($context, $indent, $value);
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section979eca476085ebd889d695a0c21dd0f4(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
                    {{#children.count}}
                        {{#is_short_branch}}
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    {{#action}}<h4><a href="{{action}}">{{text}}</a><h4>{{/action}}
                                    {{^action}}<h4>{{text}}<h4>{{/action}}
                                </div>
                                <div class="col">
                                    <ul class="list-unstyled">
                                        {{#children}}
                                            {{> core/settings_link_page_single }}
                                        {{/children}}
                                    </ul>
                                </div>
                            </div>
                        {{/is_short_branch}}
                    {{/children.count}}
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
                
                // 'children.count' section
                $value = $context->findDot('children.count');
                $buffer .= $this->section3d2db99041eeea4a2fe0613adf73296b($context, $indent, $value);
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section0431d97b880b01341c8e7e0daadf32c4(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
                {{#display}}
                    {{#children.count}}
                        {{#is_short_branch}}
                            <hr>
                            <div class="row">
                                <div class="col-sm-3">
                                    {{#action}}<h4><a href="{{action}}">{{text}}</a><h4>{{/action}}
                                    {{^action}}<h4>{{text}}<h4>{{/action}}
                                </div>
                                <div class="col">
                                    <ul class="list-unstyled">
                                        {{#children}}
                                            {{> core/settings_link_page_single }}
                                        {{/children}}
                                    </ul>
                                </div>
                            </div>
                        {{/is_short_branch}}
                    {{/children.count}}
                {{/display}}
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
                
                // 'display' section
                $value = $context->find('display');
                $buffer .= $this->section979eca476085ebd889d695a0c21dd0f4($context, $indent, $value);
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section2036dd12bd1df7c6c8d9f8331d25e4d0(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
                                        {{^children.count}}
                                            <li><a href="{{{action}}}">{{text}}</a></li>
                                        {{/children.count}}
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
                
                // 'children.count' inverted section
                $value = $context->findDot('children.count');
                if (empty($value)) {
                    
                    $buffer .= $indent . '                                            <li><a href="';
                    $value = $this->resolveValue($context->find('action'), $context);
                    $buffer .= $value;
                    $buffer .= '">';
                    $value = $this->resolveValue($context->find('text'), $context);
                    $buffer .= call_user_func($this->mustache->getEscape(), $value);
                    $buffer .= '</a></li>
';
                }
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section2051869608def53993eed4f4ff0eb451(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
                                    {{#display}}
                                        {{^children.count}}
                                            <li><a href="{{{action}}}">{{text}}</a></li>
                                        {{/children.count}}
                                    {{/display}}
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
                
                // 'display' section
                $value = $context->find('display');
                $buffer .= $this->section2036dd12bd1df7c6c8d9f8331d25e4d0($context, $indent, $value);
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function sectionE2636ed0abcb943510fd2f38963a0af5(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
                                                {{> core/settings_link_page_single }}
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
                
                if ($partial = $this->mustache->loadPartial('core/settings_link_page_single')) {
                    $buffer .= $partial->renderInternal($context, $indent . '                                                ');
                }
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section1ce832526a6751fc02aeebdce7fae244(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
                                <hr>
                                <div class="row">
                                    <div class="col-sm-3">
                                        {{#action}}<h4><a href="{{action}}">{{text}}</a><h4>{{/action}}
                                        {{^action}}<h4>{{text}}<h4>{{/action}}
                                    </div>
                                    <div class="col-sm-9">
                                        <ul class="list-unstyled">
                                            {{#children}}
                                                {{> core/settings_link_page_single }}
                                            {{/children}}
                                        </ul>
                                    </div>
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
                
                $buffer .= $indent . '                                <hr>
';
                $buffer .= $indent . '                                <div class="row">
';
                $buffer .= $indent . '                                    <div class="col-sm-3">
';
                $buffer .= $indent . '                                        ';
                // 'action' section
                $value = $context->find('action');
                $buffer .= $this->sectionB6e367e371fcb0da95b962d4ad85c9dc($context, $indent, $value);
                $buffer .= '
';
                $buffer .= $indent . '                                        ';
                // 'action' inverted section
                $value = $context->find('action');
                if (empty($value)) {
                    
                    $buffer .= '<h4>';
                    $value = $this->resolveValue($context->find('text'), $context);
                    $buffer .= call_user_func($this->mustache->getEscape(), $value);
                    $buffer .= '<h4>';
                }
                $buffer .= '
';
                $buffer .= $indent . '                                    </div>
';
                $buffer .= $indent . '                                    <div class="col-sm-9">
';
                $buffer .= $indent . '                                        <ul class="list-unstyled">
';
                // 'children' section
                $value = $context->find('children');
                $buffer .= $this->sectionE2636ed0abcb943510fd2f38963a0af5($context, $indent, $value);
                $buffer .= $indent . '                                        </ul>
';
                $buffer .= $indent . '                                    </div>
';
                $buffer .= $indent . '                                </div>
';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section773371444cb9d050c882d320122ef401(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
                            {{#children.count}}
                                <hr>
                                <div class="row">
                                    <div class="col-sm-3">
                                        {{#action}}<h4><a href="{{action}}">{{text}}</a><h4>{{/action}}
                                        {{^action}}<h4>{{text}}<h4>{{/action}}
                                    </div>
                                    <div class="col-sm-9">
                                        <ul class="list-unstyled">
                                            {{#children}}
                                                {{> core/settings_link_page_single }}
                                            {{/children}}
                                        </ul>
                                    </div>
                                </div>
                            {{/children.count}}
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
                
                // 'children.count' section
                $value = $context->findDot('children.count');
                $buffer .= $this->section1ce832526a6751fc02aeebdce7fae244($context, $indent, $value);
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function sectionB17a08d06735204e16ef89036f94b884(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
                        {{#display}}
                            {{#children.count}}
                                <hr>
                                <div class="row">
                                    <div class="col-sm-3">
                                        {{#action}}<h4><a href="{{action}}">{{text}}</a><h4>{{/action}}
                                        {{^action}}<h4>{{text}}<h4>{{/action}}
                                    </div>
                                    <div class="col-sm-9">
                                        <ul class="list-unstyled">
                                            {{#children}}
                                                {{> core/settings_link_page_single }}
                                            {{/children}}
                                        </ul>
                                    </div>
                                </div>
                            {{/children.count}}
                        {{/display}}
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
                
                // 'display' section
                $value = $context->find('display');
                $buffer .= $this->section773371444cb9d050c882d320122ef401($context, $indent, $value);
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section6944ae7f5373b93622fda89d973f1082(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
            <div class="tab-pane" id="link{{key}}" role="tabpanel">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-3">
                            {{#action}}<h4><a href="{{action}}">{{text}}</a><h4>{{/action}}
                            {{^action}}<h4>{{text}}<h4>{{/action}}
                        </div>
                        <div class="col-sm-9">
                            <ul class="list-unstyled">
                                {{#children}}
                                    {{#display}}
                                        {{^children.count}}
                                            <li><a href="{{{action}}}">{{text}}</a></li>
                                        {{/children.count}}
                                    {{/display}}
                                {{/children}}
                            </ul>
                        </div>
                    </div>
                    {{#children}}
                        {{#display}}
                            {{#children.count}}
                                <hr>
                                <div class="row">
                                    <div class="col-sm-3">
                                        {{#action}}<h4><a href="{{action}}">{{text}}</a><h4>{{/action}}
                                        {{^action}}<h4>{{text}}<h4>{{/action}}
                                    </div>
                                    <div class="col-sm-9">
                                        <ul class="list-unstyled">
                                            {{#children}}
                                                {{> core/settings_link_page_single }}
                                            {{/children}}
                                        </ul>
                                    </div>
                                </div>
                            {{/children.count}}
                        {{/display}}
                    {{/children}}
                </div>
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
                
                $buffer .= $indent . '            <div class="tab-pane" id="link';
                $value = $this->resolveValue($context->find('key'), $context);
                $buffer .= call_user_func($this->mustache->getEscape(), $value);
                $buffer .= '" role="tabpanel">
';
                $buffer .= $indent . '                <div class="container">
';
                $buffer .= $indent . '                    <div class="row">
';
                $buffer .= $indent . '                        <div class="col-sm-3">
';
                $buffer .= $indent . '                            ';
                // 'action' section
                $value = $context->find('action');
                $buffer .= $this->sectionB6e367e371fcb0da95b962d4ad85c9dc($context, $indent, $value);
                $buffer .= '
';
                $buffer .= $indent . '                            ';
                // 'action' inverted section
                $value = $context->find('action');
                if (empty($value)) {
                    
                    $buffer .= '<h4>';
                    $value = $this->resolveValue($context->find('text'), $context);
                    $buffer .= call_user_func($this->mustache->getEscape(), $value);
                    $buffer .= '<h4>';
                }
                $buffer .= '
';
                $buffer .= $indent . '                        </div>
';
                $buffer .= $indent . '                        <div class="col-sm-9">
';
                $buffer .= $indent . '                            <ul class="list-unstyled">
';
                // 'children' section
                $value = $context->find('children');
                $buffer .= $this->section2051869608def53993eed4f4ff0eb451($context, $indent, $value);
                $buffer .= $indent . '                            </ul>
';
                $buffer .= $indent . '                        </div>
';
                $buffer .= $indent . '                    </div>
';
                // 'children' section
                $value = $context->find('children');
                $buffer .= $this->sectionB17a08d06735204e16ef89036f94b884($context, $indent, $value);
                $buffer .= $indent . '                </div>
';
                $buffer .= $indent . '            </div>
';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section8ca475c220dc6489fa16d0b5ae96ffb8(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
        {{#children.count}}
            <div class="tab-pane" id="link{{key}}" role="tabpanel">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-3">
                            {{#action}}<h4><a href="{{action}}">{{text}}</a><h4>{{/action}}
                            {{^action}}<h4>{{text}}<h4>{{/action}}
                        </div>
                        <div class="col-sm-9">
                            <ul class="list-unstyled">
                                {{#children}}
                                    {{#display}}
                                        {{^children.count}}
                                            <li><a href="{{{action}}}">{{text}}</a></li>
                                        {{/children.count}}
                                    {{/display}}
                                {{/children}}
                            </ul>
                        </div>
                    </div>
                    {{#children}}
                        {{#display}}
                            {{#children.count}}
                                <hr>
                                <div class="row">
                                    <div class="col-sm-3">
                                        {{#action}}<h4><a href="{{action}}">{{text}}</a><h4>{{/action}}
                                        {{^action}}<h4>{{text}}<h4>{{/action}}
                                    </div>
                                    <div class="col-sm-9">
                                        <ul class="list-unstyled">
                                            {{#children}}
                                                {{> core/settings_link_page_single }}
                                            {{/children}}
                                        </ul>
                                    </div>
                                </div>
                            {{/children.count}}
                        {{/display}}
                    {{/children}}
                </div>
            </div>
        {{/children.count}}
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
                
                // 'children.count' section
                $value = $context->findDot('children.count');
                $buffer .= $this->section6944ae7f5373b93622fda89d973f1082($context, $indent, $value);
                $context->pop();
            }
        }
    
        return $buffer;
    }

}
