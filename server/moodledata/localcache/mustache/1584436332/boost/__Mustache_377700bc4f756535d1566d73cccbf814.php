<?php

class __Mustache_377700bc4f756535d1566d73cccbf814 extends Mustache_Template
{
    private $lambdaHelper;

    public function renderInternal(Mustache_Context $context, $indent = '')
    {
        $this->lambdaHelper = new Mustache_LambdaHelper($this->mustache, $context);
        $buffer = '';

        $buffer .= $indent . '<div
';
        $buffer .= $indent . '    data-region="paging-control-container"
';
        $buffer .= $indent . '    class="d-flex"
';
        $buffer .= $indent . '>
';
        // 'showitemsperpageselector' section
        $value = $context->find('showitemsperpageselector');
        $buffer .= $this->section9270176a32f679c9fbf0fc740c37fcd8($context, $indent, $value);
        $buffer .= $indent . '
';
        $buffer .= $indent . '    <nav
';
        $buffer .= $indent . '        role="navigation"
';
        $buffer .= $indent . '        id="';
        $blockFunction = $context->findInBlock('pagingbarid');
        if (is_callable($blockFunction)) {
            $buffer .= call_user_func($blockFunction, $context);
        } else {
            $buffer .= 'paging-bar-';
            $value = $this->resolveValue($context->find('uniqid'), $context);
            $buffer .= call_user_func($this->mustache->getEscape(), $value);
        }
        $buffer .= '"
';
        $buffer .= $indent . '        class="';
        // 'showitemsperpageselector' section
        $value = $context->find('showitemsperpageselector');
        $buffer .= $this->section10a9709addcd88957ce766b6b87747a0($context, $indent, $value);
        $buffer .= '"
';
        $buffer .= $indent . '        data-region="paging-bar"
';
        $buffer .= $indent . '        data-ignore-control-while-loading="';
        $value = $this->resolveValue($context->find('ignorecontrolwhileloading'), $context);
        $buffer .= call_user_func($this->mustache->getEscape(), $value);
        $buffer .= '"
';
        $buffer .= $indent . '        data-hide-control-on-single-page="';
        $value = $this->resolveValue($context->find('hidecontrolonsinglepage'), $context);
        $buffer .= call_user_func($this->mustache->getEscape(), $value);
        $buffer .= '"
';
        // 'activepagenumber' section
        $value = $context->find('activepagenumber');
        $buffer .= $this->section5fd8343e4731c94d1f86be5a7cad6df9($context, $indent, $value);
        // 'activepagenumber' inverted section
        $value = $context->find('activepagenumber');
        if (empty($value)) {
            
            $buffer .= $indent . '            data-active-page-number="1"
';
        }
        // 'showitemsperpageselector' section
        $value = $context->find('showitemsperpageselector');
        $buffer .= $this->section7f6001cb308eef24adaa6e845ee42406($context, $indent, $value);
        // 'showitemsperpageselector' inverted section
        $value = $context->find('showitemsperpageselector');
        if (empty($value)) {
            
            $buffer .= $indent . '            data-items-per-page="';
            $value = $this->resolveValue($context->find('itemsperpage'), $context);
            $buffer .= call_user_func($this->mustache->getEscape(), $value);
            $buffer .= '"
';
        }
        // 'arialabels.paginationnav' section
        $value = $context->findDot('arialabels.paginationnav');
        $buffer .= $this->section7b6254eb0f3ef8dd9bb7b524e40f8948($context, $indent, $value);
        // 'arialabels.paginationnav' inverted section
        $value = $context->findDot('arialabels.paginationnav');
        if (empty($value)) {
            
            $buffer .= $indent . '            aria-label="';
            // 'str' section
            $value = $context->find('str');
            $buffer .= $this->sectionB3b9fe4a96cf8bd9421e25e08601e058($context, $indent, $value);
            $buffer .= '"
';
        }
        // 'arialabels.paginationnavitemcomponents' section
        $value = $context->findDot('arialabels.paginationnavitemcomponents');
        $buffer .= $this->sectionC5cecc4dd1a19463f63cfe7350458094($context, $indent, $value);
        // 'arialabels.paginationnavitemcomponents' inverted section
        $value = $context->findDot('arialabels.paginationnavitemcomponents');
        if (empty($value)) {
            
            $buffer .= $indent . '            data-aria-label-components-pagination-item="pagedcontentnavigationitem, core"
';
        }
        // 'arialabels.paginationactivenavitemcomponents' section
        $value = $context->findDot('arialabels.paginationactivenavitemcomponents');
        $buffer .= $this->section6be821101fa7e13a75fd10f4d39cd3a9($context, $indent, $value);
        // 'arialabels.paginationactivenavitemcomponents' inverted section
        $value = $context->findDot('arialabels.paginationactivenavitemcomponents');
        if (empty($value)) {
            
            $buffer .= $indent . '            data-aria-label-components-pagination-active-item="pagedcontentnavigationactiveitem, core"
';
        }
        // 'barsize' section
        $value = $context->find('barsize');
        $buffer .= $this->section99a5fb4ef1cc25e5a5a7c60a23920926($context, $indent, $value);
        $buffer .= $indent . '    >
';
        $buffer .= $indent . '
';
        $buffer .= $indent . '        <ul class="pagination mb-0">
';
        // 'previous' section
        $value = $context->find('previous');
        $buffer .= $this->section2f6827a9e045250a573973d053a6532b($context, $indent, $value);
        // 'first' section
        $value = $context->find('first');
        $buffer .= $this->section56d810fec5989698e1a77058aa6588cf($context, $indent, $value);
        // 'barsize' section
        $value = $context->find('barsize');
        $buffer .= $this->sectionB6099292302c51c41beb25daa5dc51fb($context, $indent, $value);
        // 'pages' section
        $value = $context->find('pages');
        $buffer .= $this->section1b35e6efa167f39dda3c160912c82289($context, $indent, $value);
        // 'barsize' section
        $value = $context->find('barsize');
        $buffer .= $this->section9d2d41cc87a8f5eac7ae02a75c1bef9a($context, $indent, $value);
        // 'last' section
        $value = $context->find('last');
        $buffer .= $this->section6b7d8acc775bceece2f29f7b3f962cbc($context, $indent, $value);
        // 'next' section
        $value = $context->find('next');
        $buffer .= $this->section7672881e2491432f739bdfde649603ea($context, $indent, $value);
        $buffer .= '        </ul>
';
        $buffer .= $indent . '    </nav>
';
        $buffer .= $indent . '</div>
';

        return $buffer;
    }

    private function sectionCcd25cc1479e8bb63945e84015765508(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = ' show ';
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
                
                $buffer .= ' show ';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section061c21bd6c4c7c5f9d61c256abcc3567(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
                        aria-label="{{.}}"
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
                
                $buffer .= $indent . '                        aria-label="';
                $value = $this->resolveValue($context->last(), $context);
                $buffer .= call_user_func($this->mustache->getEscape(), $value);
                $buffer .= '"
';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function sectionE1aa2fd25fafc048534b66e7545a9f28(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '{{value}}';
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
                
                $value = $this->resolveValue($context->find('value'), $context);
                $buffer .= call_user_func($this->mustache->getEscape(), $value);
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function sectionFd13aaa3df1a0092a84740d62c2cce89(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '{{#active}}{{value}}{{/active}}';
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
                
                // 'active' section
                $value = $context->find('active');
                $buffer .= $this->sectionE1aa2fd25fafc048534b66e7545a9f28($context, $indent, $value);
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section4bc1bddf6d969b41fde431a432c0af8e(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = ' pagedcontentpagingbaritemsperpage, core, {{#itemsperpage}}{{#active}}{{value}}{{/active}}{{/itemsperpage}}';
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
                
                $buffer .= ' pagedcontentpagingbaritemsperpage, core, ';
                // 'itemsperpage' section
                $value = $context->find('itemsperpage');
                $buffer .= $this->sectionFd13aaa3df1a0092a84740d62c2cce89($context, $indent, $value);
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function sectionCa566306ff1d7fec612b851f23e58402(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
                            {{value}}
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
                
                $buffer .= $indent . '                            ';
                $value = $this->resolveValue($context->find('value'), $context);
                $buffer .= call_user_func($this->mustache->getEscape(), $value);
                $buffer .= '
';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function sectionB20190dd2381b3371cc57b60377d21df(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
                        {{#active}}
                            {{value}}
                        {{/active}}
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
                
                // 'active' section
                $value = $context->find('active');
                $buffer .= $this->sectionCa566306ff1d7fec612b851f23e58402($context, $indent, $value);
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function sectionE6cce4e780c7f4deac974e8ffccf5902(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
                        data-active-item-button-aria-label-components="{{.}}"
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
                
                $buffer .= $indent . '                        data-active-item-button-aria-label-components="';
                $value = $this->resolveValue($context->last(), $context);
                $buffer .= call_user_func($this->mustache->getEscape(), $value);
                $buffer .= '"
';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section5749c750acb0d7477dd5257d00cc6d53(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = 'active';
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
                
                $buffer .= 'active';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function sectionFc0c0b051caebb6243b5c2bd6d728967(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = 'aria-current="true"';
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
                
                $buffer .= 'aria-current="true"';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function sectionE6922901afa7b60d3ce7403587f8d6c3(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '{{.}}';
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
                
                $value = $this->resolveValue($context->last(), $context);
                $buffer .= call_user_func($this->mustache->getEscape(), $value);
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section796b182c855d7b48f08d0295b8450703(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = ' all, core ';
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
                
                $buffer .= ' all, core ';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section373a182b26c8be6a053bb3aeb0c7b728(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
                        <a
                            class="dropdown-item {{#active}}active{{/active}}"
                            href="#"
                            data-limit={{value}}
                            {{#active}}aria-current="true"{{/active}}
                        >
                            {{#value}}{{.}}{{/value}}
                            {{^value}}{{#str}} all, core {{/str}}{{/value}}
                        </a>
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
                
                $buffer .= $indent . '                        <a
';
                $buffer .= $indent . '                            class="dropdown-item ';
                // 'active' section
                $value = $context->find('active');
                $buffer .= $this->section5749c750acb0d7477dd5257d00cc6d53($context, $indent, $value);
                $buffer .= '"
';
                $buffer .= $indent . '                            href="#"
';
                $buffer .= $indent . '                            data-limit=';
                $value = $this->resolveValue($context->find('value'), $context);
                $buffer .= call_user_func($this->mustache->getEscape(), $value);
                $buffer .= '
';
                $buffer .= $indent . '                            ';
                // 'active' section
                $value = $context->find('active');
                $buffer .= $this->sectionFc0c0b051caebb6243b5c2bd6d728967($context, $indent, $value);
                $buffer .= '
';
                $buffer .= $indent . '                        >
';
                $buffer .= $indent . '                            ';
                // 'value' section
                $value = $context->find('value');
                $buffer .= $this->sectionE6922901afa7b60d3ce7403587f8d6c3($context, $indent, $value);
                $buffer .= '
';
                $buffer .= $indent . '                            ';
                // 'value' inverted section
                $value = $context->find('value');
                if (empty($value)) {
                    
                    // 'str' section
                    $value = $context->find('str');
                    $buffer .= $this->section796b182c855d7b48f08d0295b8450703($context, $indent, $value);
                }
                $buffer .= '
';
                $buffer .= $indent . '                        </a>
';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section9270176a32f679c9fbf0fc740c37fcd8(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
        <div
            id="paging-control-limit-container-{{uniqid}}"
            data-region="paging-control-limit-container"
            class="d-inline-flex align-items-center"
        >
            <span class="mr-1">{{#str}} show {{/str}}</span>
            <div class="btn-group">
                <button
                    type="button"
                    class="btn btn-outline-secondary dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    data-action="limit-toggle"
                    {{#arialabels.itemsperpage}}
                        aria-label="{{.}}"
                    {{/arialabels.itemsperpage}}
                    {{^arialabels.itemsperpage}}
                        aria-label="{{#str}} pagedcontentpagingbaritemsperpage, core, {{#itemsperpage}}{{#active}}{{value}}{{/active}}{{/itemsperpage}}{{/str}}"
                    {{/arialabels.itemsperpage}}
                >
                    {{#itemsperpage}}
                        {{#active}}
                            {{value}}
                        {{/active}}
                    {{/itemsperpage}}
                </button>
                <div
                    role="menu"
                    class="dropdown-menu"
                    data-show-active-item
                    {{#arialabels.itemsperpagecomponents}}
                        data-active-item-button-aria-label-components="{{.}}"
                    {{/arialabels.itemsperpagecomponents}}
                    {{^arialabels.itemsperpagecomponents}}
                        data-active-item-button-aria-label-components="pagedcontentpagingbaritemsperpage, core"
                    {{/arialabels.itemsperpagecomponents}}
                >
                    {{#itemsperpage}}
                        <a
                            class="dropdown-item {{#active}}active{{/active}}"
                            href="#"
                            data-limit={{value}}
                            {{#active}}aria-current="true"{{/active}}
                        >
                            {{#value}}{{.}}{{/value}}
                            {{^value}}{{#str}} all, core {{/str}}{{/value}}
                        </a>
                    {{/itemsperpage}}
                </div>
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
                
                $buffer .= $indent . '        <div
';
                $buffer .= $indent . '            id="paging-control-limit-container-';
                $value = $this->resolveValue($context->find('uniqid'), $context);
                $buffer .= call_user_func($this->mustache->getEscape(), $value);
                $buffer .= '"
';
                $buffer .= $indent . '            data-region="paging-control-limit-container"
';
                $buffer .= $indent . '            class="d-inline-flex align-items-center"
';
                $buffer .= $indent . '        >
';
                $buffer .= $indent . '            <span class="mr-1">';
                // 'str' section
                $value = $context->find('str');
                $buffer .= $this->sectionCcd25cc1479e8bb63945e84015765508($context, $indent, $value);
                $buffer .= '</span>
';
                $buffer .= $indent . '            <div class="btn-group">
';
                $buffer .= $indent . '                <button
';
                $buffer .= $indent . '                    type="button"
';
                $buffer .= $indent . '                    class="btn btn-outline-secondary dropdown-toggle"
';
                $buffer .= $indent . '                    data-toggle="dropdown"
';
                $buffer .= $indent . '                    aria-haspopup="true"
';
                $buffer .= $indent . '                    aria-expanded="false"
';
                $buffer .= $indent . '                    data-action="limit-toggle"
';
                // 'arialabels.itemsperpage' section
                $value = $context->findDot('arialabels.itemsperpage');
                $buffer .= $this->section061c21bd6c4c7c5f9d61c256abcc3567($context, $indent, $value);
                // 'arialabels.itemsperpage' inverted section
                $value = $context->findDot('arialabels.itemsperpage');
                if (empty($value)) {
                    
                    $buffer .= $indent . '                        aria-label="';
                    // 'str' section
                    $value = $context->find('str');
                    $buffer .= $this->section4bc1bddf6d969b41fde431a432c0af8e($context, $indent, $value);
                    $buffer .= '"
';
                }
                $buffer .= $indent . '                >
';
                // 'itemsperpage' section
                $value = $context->find('itemsperpage');
                $buffer .= $this->sectionB20190dd2381b3371cc57b60377d21df($context, $indent, $value);
                $buffer .= $indent . '                </button>
';
                $buffer .= $indent . '                <div
';
                $buffer .= $indent . '                    role="menu"
';
                $buffer .= $indent . '                    class="dropdown-menu"
';
                $buffer .= $indent . '                    data-show-active-item
';
                // 'arialabels.itemsperpagecomponents' section
                $value = $context->findDot('arialabels.itemsperpagecomponents');
                $buffer .= $this->sectionE6cce4e780c7f4deac974e8ffccf5902($context, $indent, $value);
                // 'arialabels.itemsperpagecomponents' inverted section
                $value = $context->findDot('arialabels.itemsperpagecomponents');
                if (empty($value)) {
                    
                    $buffer .= $indent . '                        data-active-item-button-aria-label-components="pagedcontentpagingbaritemsperpage, core"
';
                }
                $buffer .= $indent . '                >
';
                // 'itemsperpage' section
                $value = $context->find('itemsperpage');
                $buffer .= $this->section373a182b26c8be6a053bb3aeb0c7b728($context, $indent, $value);
                $buffer .= $indent . '                </div>
';
                $buffer .= $indent . '            </div>
';
                $buffer .= $indent . '        </div>
';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section10a9709addcd88957ce766b6b87747a0(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = 'ml-auto';
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
                
                $buffer .= 'ml-auto';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section5fd8343e4731c94d1f86be5a7cad6df9(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
            data-active-page-number="{{.}}"
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
                
                $buffer .= $indent . '            data-active-page-number="';
                $value = $this->resolveValue($context->last(), $context);
                $buffer .= call_user_func($this->mustache->getEscape(), $value);
                $buffer .= '"
';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section8832b8c7a2d81c37e8b23d3fcebd439e(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
                    data-items-per-page="{{value}}"
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
                
                $buffer .= $indent . '                    data-items-per-page="';
                $value = $this->resolveValue($context->find('value'), $context);
                $buffer .= call_user_func($this->mustache->getEscape(), $value);
                $buffer .= '"
';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section5b3ab5e6fe4f83a220daff843e2146b1(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
                {{#active}}
                    data-items-per-page="{{value}}"
                {{/active}}
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
                
                // 'active' section
                $value = $context->find('active');
                $buffer .= $this->section8832b8c7a2d81c37e8b23d3fcebd439e($context, $indent, $value);
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section7f6001cb308eef24adaa6e845ee42406(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
            {{#itemsperpage}}
                {{#active}}
                    data-items-per-page="{{value}}"
                {{/active}}
            {{/itemsperpage}}
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
                
                // 'itemsperpage' section
                $value = $context->find('itemsperpage');
                $buffer .= $this->section5b3ab5e6fe4f83a220daff843e2146b1($context, $indent, $value);
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section7b6254eb0f3ef8dd9bb7b524e40f8948(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
            aria-label="{{.}}"
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
                
                $buffer .= $indent . '            aria-label="';
                $value = $this->resolveValue($context->last(), $context);
                $buffer .= call_user_func($this->mustache->getEscape(), $value);
                $buffer .= '"
';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function sectionB3b9fe4a96cf8bd9421e25e08601e058(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = ' pagedcontentnavigation, core ';
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
                
                $buffer .= ' pagedcontentnavigation, core ';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function sectionC5cecc4dd1a19463f63cfe7350458094(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
            data-aria-label-components-pagination-item="{{.}}"
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
                
                $buffer .= $indent . '            data-aria-label-components-pagination-item="';
                $value = $this->resolveValue($context->last(), $context);
                $buffer .= call_user_func($this->mustache->getEscape(), $value);
                $buffer .= '"
';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section6be821101fa7e13a75fd10f4d39cd3a9(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
            data-aria-label-components-pagination-active-item="{{.}}"
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
                
                $buffer .= $indent . '            data-aria-label-components-pagination-active-item="';
                $value = $this->resolveValue($context->last(), $context);
                $buffer .= call_user_func($this->mustache->getEscape(), $value);
                $buffer .= '"
';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section99a5fb4ef1cc25e5a5a7c60a23920926(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
            data-bar-size="{{.}}"
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
                
                $buffer .= $indent . '            data-bar-size="';
                $value = $this->resolveValue($context->last(), $context);
                $buffer .= call_user_func($this->mustache->getEscape(), $value);
                $buffer .= '"
';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section5e443b3f3fc6a26f93a9c6994805b986(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = ' i/previous, core ';
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
                
                $buffer .= ' i/previous, core ';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function sectionDa462c4f96b5089cd26ce12c5added68(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = ' i/next, core ';
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
                
                $buffer .= ' i/next, core ';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section2f6827a9e045250a573973d053a6532b(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
                {{< core/paged_content_paging_bar_item }}
                    {{$item-content}}
                        <span class="icon-no-margin dir-rtl-hide" aria-hidden="true">{{#pix}} i/previous, core {{/pix}}</span>
                        <span class="icon-no-margin dir-ltr-hide" aria-hidden="true">{{#pix}} i/next, core {{/pix}}</span>
                    {{/item-content}}
                    {{$attributes}}data-control="previous"{{/attributes}}
                {{/ core/paged_content_paging_bar_item }}
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
                
                $buffer .= $indent . '                ';
                if ($parent = $this->mustache->loadPartial('core/paged_content_paging_bar_item')) {
                    $context->pushBlockContext(array(
                        'item-content' => array($this, 'blockE999a904d29d58366c02bb78b63ba393'),
                        'attributes' => array($this, 'block12120e4d0151c4806def3156af195371'),
                    ));
                    $buffer .= $parent->renderInternal($context, $indent);
                    $context->popBlockContext();
                }
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section03d2c990698604a1f6c30efea4dea793(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = 'first';
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
                
                $buffer .= 'first';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section56d810fec5989698e1a77058aa6588cf(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
                {{< core/paged_content_paging_bar_item }}
                    {{$item-content}}
                        <span aria-hidden="true">{{#str}}first{{/str}}</span>
                    {{/item-content}}
                    {{$attributes}}data-control="first"{{/attributes}}
                {{/ core/paged_content_paging_bar_item }}
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
                
                $buffer .= '                ';
                if ($parent = $this->mustache->loadPartial('core/paged_content_paging_bar_item')) {
                    $context->pushBlockContext(array(
                        'item-content' => array($this, 'block32b9384f330c0f33e5fbe77bd764d5c9'),
                        'attributes' => array($this, 'blockCbc4a7430da26319add789cf520478eb'),
                    ));
                    $buffer .= $parent->renderInternal($context, $indent);
                    $context->popBlockContext();
                }
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function sectionB6099292302c51c41beb25daa5dc51fb(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
                {{< core/paged_content_paging_bar_item }}
                    {{$item-content}}
                        <span aria-hidden="true">&hellip;</span>
                    {{/item-content}}
                    {{$attributes}}data-dots="beginning"{{/attributes}}
                {{/ core/paged_content_paging_bar_item }}
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
                
                $buffer .= '                ';
                if ($parent = $this->mustache->loadPartial('core/paged_content_paging_bar_item')) {
                    $context->pushBlockContext(array(
                        'item-content' => array($this, 'blockDe39cb058b9c7dff02c54982ec4103de'),
                        'attributes' => array($this, 'block84c9c68d0243c1a0fad6a2c4622f8301'),
                    ));
                    $buffer .= $parent->renderInternal($context, $indent);
                    $context->popBlockContext();
                }
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section1b35e6efa167f39dda3c160912c82289(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
                {{< core/paged_content_paging_bar_item }}
                    {{$attributes}}data-page="true"{{/attributes}}
                {{/ core/paged_content_paging_bar_item }}
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
                
                $buffer .= '                ';
                if ($parent = $this->mustache->loadPartial('core/paged_content_paging_bar_item')) {
                    $context->pushBlockContext(array(
                        'attributes' => array($this, 'block05f529f34933f2c86559b32975b81c54'),
                    ));
                    $buffer .= $parent->renderInternal($context, $indent);
                    $context->popBlockContext();
                }
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section9d2d41cc87a8f5eac7ae02a75c1bef9a(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
                {{< core/paged_content_paging_bar_item }}
                    {{$item-content}}
                        <span aria-hidden="true">&hellip;</span>
                    {{/item-content}}
                    {{$attributes}}data-dots="ending"{{/attributes}}
                {{/ core/paged_content_paging_bar_item }}
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
                
                $buffer .= '                ';
                if ($parent = $this->mustache->loadPartial('core/paged_content_paging_bar_item')) {
                    $context->pushBlockContext(array(
                        'item-content' => array($this, 'blockDe39cb058b9c7dff02c54982ec4103de'),
                        'attributes' => array($this, 'block43fbef7eed3d1d713cc79dcab37b14c2'),
                    ));
                    $buffer .= $parent->renderInternal($context, $indent);
                    $context->popBlockContext();
                }
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section484651457d3987d348fb573f16f6422e(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = 'last';
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
                
                $buffer .= 'last';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section6b7d8acc775bceece2f29f7b3f962cbc(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
                {{< core/paged_content_paging_bar_item }}
                    {{$item-content}}
                        <span aria-hidden="true">{{#str}}last{{/str}}</span>
                    {{/item-content}}
                    {{$attributes}}data-control="last"{{/attributes}}
                {{/ core/paged_content_paging_bar_item }}
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
                
                $buffer .= '                ';
                if ($parent = $this->mustache->loadPartial('core/paged_content_paging_bar_item')) {
                    $context->pushBlockContext(array(
                        'item-content' => array($this, 'block79cdac58b31c30cd5ee708fa1b8e01e2'),
                        'attributes' => array($this, 'block76ecf06374cb515b4027dd1680730b5e'),
                    ));
                    $buffer .= $parent->renderInternal($context, $indent);
                    $context->popBlockContext();
                }
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section7672881e2491432f739bdfde649603ea(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
                {{< core/paged_content_paging_bar_item }}
                    {{$item-content}}
                        <span class="icon-no-margin dir-rtl-hide" aria-hidden="true">{{#pix}} i/next, core {{/pix}}</span>
                        <span class="icon-no-margin dir-ltr-hide" aria-hidden="true">{{#pix}} i/previous, core {{/pix}}</span>
                    {{/item-content}}
                    {{$attributes}}data-control="next"{{/attributes}}
                {{/ core/paged_content_paging_bar_item }}
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
                
                $buffer .= '                ';
                if ($parent = $this->mustache->loadPartial('core/paged_content_paging_bar_item')) {
                    $context->pushBlockContext(array(
                        'item-content' => array($this, 'block7b9d5894a71886a36030ce2cba3a926b'),
                        'attributes' => array($this, 'block6b9932538b9a38e61842fc27de1eab11'),
                    ));
                    $buffer .= $parent->renderInternal($context, $indent);
                    $context->popBlockContext();
                }
                $context->pop();
            }
        }
    
        return $buffer;
    }

    public function blockE999a904d29d58366c02bb78b63ba393($context)
    {
        $indent = $buffer = '';
        $buffer .= '                        <span class="icon-no-margin dir-rtl-hide" aria-hidden="true">';
        // 'pix' section
        $value = $context->find('pix');
        $buffer .= $this->section5e443b3f3fc6a26f93a9c6994805b986($context, $indent, $value);
        $buffer .= '</span>
';
        $buffer .= $indent . '                        <span class="icon-no-margin dir-ltr-hide" aria-hidden="true">';
        // 'pix' section
        $value = $context->find('pix');
        $buffer .= $this->sectionDa462c4f96b5089cd26ce12c5added68($context, $indent, $value);
        $buffer .= '</span>
';
    
        return $buffer;
    }

    public function block12120e4d0151c4806def3156af195371($context)
    {
        $indent = $buffer = '';
        $buffer .= $indent . 'data-control="previous"';
    
        return $buffer;
    }

    public function block32b9384f330c0f33e5fbe77bd764d5c9($context)
    {
        $indent = $buffer = '';
        $buffer .= '                        <span aria-hidden="true">';
        // 'str' section
        $value = $context->find('str');
        $buffer .= $this->section03d2c990698604a1f6c30efea4dea793($context, $indent, $value);
        $buffer .= '</span>
';
    
        return $buffer;
    }

    public function blockCbc4a7430da26319add789cf520478eb($context)
    {
        $indent = $buffer = '';
        $buffer .= $indent . 'data-control="first"';
    
        return $buffer;
    }

    public function blockDe39cb058b9c7dff02c54982ec4103de($context)
    {
        $indent = $buffer = '';
        $buffer .= '                        <span aria-hidden="true">&hellip;</span>
';
    
        return $buffer;
    }

    public function block84c9c68d0243c1a0fad6a2c4622f8301($context)
    {
        $indent = $buffer = '';
        $buffer .= $indent . 'data-dots="beginning"';
    
        return $buffer;
    }

    public function block05f529f34933f2c86559b32975b81c54($context)
    {
        $indent = $buffer = '';
        $buffer .= 'data-page="true"';
    
        return $buffer;
    }

    public function block43fbef7eed3d1d713cc79dcab37b14c2($context)
    {
        $indent = $buffer = '';
        $buffer .= $indent . 'data-dots="ending"';
    
        return $buffer;
    }

    public function block79cdac58b31c30cd5ee708fa1b8e01e2($context)
    {
        $indent = $buffer = '';
        $buffer .= '                        <span aria-hidden="true">';
        // 'str' section
        $value = $context->find('str');
        $buffer .= $this->section484651457d3987d348fb573f16f6422e($context, $indent, $value);
        $buffer .= '</span>
';
    
        return $buffer;
    }

    public function block76ecf06374cb515b4027dd1680730b5e($context)
    {
        $indent = $buffer = '';
        $buffer .= $indent . 'data-control="last"';
    
        return $buffer;
    }

    public function block7b9d5894a71886a36030ce2cba3a926b($context)
    {
        $indent = $buffer = '';
        $buffer .= '                        <span class="icon-no-margin dir-rtl-hide" aria-hidden="true">';
        // 'pix' section
        $value = $context->find('pix');
        $buffer .= $this->sectionDa462c4f96b5089cd26ce12c5added68($context, $indent, $value);
        $buffer .= '</span>
';
        $buffer .= $indent . '                        <span class="icon-no-margin dir-ltr-hide" aria-hidden="true">';
        // 'pix' section
        $value = $context->find('pix');
        $buffer .= $this->section5e443b3f3fc6a26f93a9c6994805b986($context, $indent, $value);
        $buffer .= '</span>
';
    
        return $buffer;
    }

    public function block6b9932538b9a38e61842fc27de1eab11($context)
    {
        $indent = $buffer = '';
        $buffer .= $indent . 'data-control="next"';
    
        return $buffer;
    }
}
