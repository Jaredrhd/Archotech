<?php

class __Mustache_390d4fbcf1725e9600b337294a168bc5 extends Mustache_Template
{
    private $lambdaHelper;

    public function renderInternal(Mustache_Context $context, $indent = '')
    {
        $this->lambdaHelper = new Mustache_LambdaHelper($this->mustache, $context);
        $buffer = '';

        $buffer .= $indent . '<form action="';
        $value = $this->resolveValue($context->find('actionurl'), $context);
        $buffer .= call_user_func($this->mustache->getEscape(), $value);
        $buffer .= '" method="post" id="adminsettings">
';
        $buffer .= $indent . '    <div>
';
        $buffer .= $indent . '        <input type="hidden" name="sesskey" value="';
        $value = $this->resolveValue($context->find('sesskey'), $context);
        $buffer .= call_user_func($this->mustache->getEscape(), $value);
        $buffer .= '">
';
        $buffer .= $indent . '        <input type="hidden" name="action" value="save-settings">
';
        $buffer .= $indent . '    </div>
';
        $buffer .= $indent . '    <fieldset>
';
        $buffer .= $indent . '        <div class="clearer"></div>
';
        $buffer .= $indent . '        <h2 class="main">';
        // 'str' section
        $value = $context->find('str');
        $buffer .= $this->section814f7ab309abbd3b4cf598dd0e446d9a($context, $indent, $value);
        $buffer .= '</h2>
';
        // 'hasresults' section
        $value = $context->find('hasresults');
        $buffer .= $this->section26bda256e8213f1271b75746b73eb5b2($context, $indent, $value);
        // 'hasresults' inverted section
        $value = $context->find('hasresults');
        if (empty($value)) {
            
            $buffer .= $indent . '            ';
            // 'str' section
            $value = $context->find('str');
            $buffer .= $this->section36817e26d3b370aa587ec3ea3b300e7a($context, $indent, $value);
            $buffer .= '
';
        }
        $buffer .= $indent . '    </fieldset>
';
        $buffer .= $indent . '</form>
';

        return $buffer;
    }

    private function section814f7ab309abbd3b4cf598dd0e446d9a(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = 'searchresults, admin';
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
                
                $buffer .= 'searchresults, admin';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function sectionA092cd08353bf6cb94ecbf78ed80133b(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = ' pagepath, core ';
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
                
                $buffer .= ' pagepath, core ';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function sectionD6dcb44b3e27aa1cd2d195137c64bc92(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
                    <li>{{.}}</li>
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
                
                $buffer .= $indent . '                    <li>';
                $value = $this->resolveValue($context->last(), $context);
                $buffer .= call_user_func($this->mustache->getEscape(), $value);
                $buffer .= '</li>
';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function sectionD19e3176d642e043d0f161863e32eb9b(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
                        <div class="clearer"></div>
                        {{{.}}}
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
                
                $buffer .= $indent . '                        <div class="clearer"></div>
';
                $buffer .= $indent . '                        ';
                $value = $this->resolveValue($context->last(), $context);
                $buffer .= $value;
                $buffer .= '
';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function sectionF9c0403d0b9908ab73c3da116086ce99(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
                <h3 class="adminpagetitle"><a href="{{url}}">{{{title}}}</a></h3>
                <ul class="adminpagepath" aria-label="{{#str}} pagepath, core {{/str}}">
                    {{#path}}
                    <li>{{.}}</li>
                    {{/path}}
                </ul>
                <fieldset class="adminsettings">
                    {{#settings}}
                        <div class="clearer"></div>
                        {{{.}}}
                    {{/settings}}
                </fieldset>
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
                
                $buffer .= $indent . '                <h3 class="adminpagetitle"><a href="';
                $value = $this->resolveValue($context->find('url'), $context);
                $buffer .= call_user_func($this->mustache->getEscape(), $value);
                $buffer .= '">';
                $value = $this->resolveValue($context->find('title'), $context);
                $buffer .= $value;
                $buffer .= '</a></h3>
';
                $buffer .= $indent . '                <ul class="adminpagepath" aria-label="';
                // 'str' section
                $value = $context->find('str');
                $buffer .= $this->sectionA092cd08353bf6cb94ecbf78ed80133b($context, $indent, $value);
                $buffer .= '">
';
                // 'path' section
                $value = $context->find('path');
                $buffer .= $this->sectionD6dcb44b3e27aa1cd2d195137c64bc92($context, $indent, $value);
                $buffer .= $indent . '                </ul>
';
                $buffer .= $indent . '                <fieldset class="adminsettings">
';
                // 'settings' section
                $value = $context->find('settings');
                $buffer .= $this->sectionD19e3176d642e043d0f161863e32eb9b($context, $indent, $value);
                $buffer .= $indent . '                </fieldset>
';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function sectionE5479b5825bee73d37f8a0a91fe85548(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = 'savechanges, admin';
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
                
                $buffer .= 'savechanges, admin';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function sectionCb4ed807c624bd0e4bd4b6a782675b1c(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
                <div class="row">
                    <div class="offset-sm-3 col-sm-3">
                        <button type="submit" class="btn btn-primary">{{#str}}savechanges, admin{{/str}}</button>
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
                
                $buffer .= $indent . '                <div class="row">
';
                $buffer .= $indent . '                    <div class="offset-sm-3 col-sm-3">
';
                $buffer .= $indent . '                        <button type="submit" class="btn btn-primary">';
                // 'str' section
                $value = $context->find('str');
                $buffer .= $this->sectionE5479b5825bee73d37f8a0a91fe85548($context, $indent, $value);
                $buffer .= '</button>
';
                $buffer .= $indent . '                    </div>
';
                $buffer .= $indent . '                </div>
';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section26bda256e8213f1271b75746b73eb5b2(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = '
            {{#results}}
                <h3 class="adminpagetitle"><a href="{{url}}">{{{title}}}</a></h3>
                <ul class="adminpagepath" aria-label="{{#str}} pagepath, core {{/str}}">
                    {{#path}}
                    <li>{{.}}</li>
                    {{/path}}
                </ul>
                <fieldset class="adminsettings">
                    {{#settings}}
                        <div class="clearer"></div>
                        {{{.}}}
                    {{/settings}}
                </fieldset>
            {{/results}}
            {{#showsave}}
                <div class="row">
                    <div class="offset-sm-3 col-sm-3">
                        <button type="submit" class="btn btn-primary">{{#str}}savechanges, admin{{/str}}</button>
                    </div>
                </div>
            {{/showsave}}
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
                
                // 'results' section
                $value = $context->find('results');
                $buffer .= $this->sectionF9c0403d0b9908ab73c3da116086ce99($context, $indent, $value);
                // 'showsave' section
                $value = $context->find('showsave');
                $buffer .= $this->sectionCb4ed807c624bd0e4bd4b6a782675b1c($context, $indent, $value);
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section36817e26d3b370aa587ec3ea3b300e7a(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
    
        if (!is_string($value) && is_callable($value)) {
            $source = 'noresults, admin';
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
                
                $buffer .= 'noresults, admin';
                $context->pop();
            }
        }
    
        return $buffer;
    }

}
