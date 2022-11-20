var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},t={exports:{}};!function(t){var n=function(e){var t=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,n=0,a={},r={manual:e.Prism&&e.Prism.manual,disableWorkerMessageHandler:e.Prism&&e.Prism.disableWorkerMessageHandler,util:{encode:function e(t){return t instanceof s?new s(t.type,e(t.content),t.alias):Array.isArray(t)?t.map(e):t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).slice(8,-1)},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++n}),e.__id},clone:function e(t,n){var a,s;switch(n=n||{},r.util.type(t)){case"Object":if(s=r.util.objId(t),n[s])return n[s];for(var i in a={},n[s]=a,t)t.hasOwnProperty(i)&&(a[i]=e(t[i],n));return a;case"Array":return s=r.util.objId(t),n[s]?n[s]:(a=[],n[s]=a,t.forEach((function(t,r){a[r]=e(t,n)})),a);default:return t}},getLanguage:function(e){for(;e;){var n=t.exec(e.className);if(n)return n[1].toLowerCase();e=e.parentElement}return"none"},setLanguage:function(e,n){e.className=e.className.replace(RegExp(t,"gi"),""),e.classList.add("language-"+n)},currentScript:function(){if("undefined"==typeof document)return null;if("currentScript"in document)return document.currentScript;try{throw new Error}catch(a){var e=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(a.stack)||[])[1];if(e){var t=document.getElementsByTagName("script");for(var n in t)if(t[n].src==e)return t[n]}return null}},isActive:function(e,t,n){for(var a="no-"+t;e;){var r=e.classList;if(r.contains(t))return!0;if(r.contains(a))return!1;e=e.parentElement}return!!n}},languages:{plain:a,plaintext:a,text:a,txt:a,extend:function(e,t){var n=r.util.clone(r.languages[e]);for(var a in t)n[a]=t[a];return n},insertBefore:function(e,t,n,a){var s=(a=a||r.languages)[e],i={};for(var o in s)if(s.hasOwnProperty(o)){if(o==t)for(var l in n)n.hasOwnProperty(l)&&(i[l]=n[l]);n.hasOwnProperty(o)||(i[o]=s[o])}var c=a[e];return a[e]=i,r.languages.DFS(r.languages,(function(t,n){n===c&&t!=e&&(this[t]=i)})),i},DFS:function e(t,n,a,s){s=s||{};var i=r.util.objId;for(var o in t)if(t.hasOwnProperty(o)){n.call(t,o,t[o],a||o);var l=t[o],c=r.util.type(l);"Object"!==c||s[i(l)]?"Array"!==c||s[i(l)]||(s[i(l)]=!0,e(l,n,o,s)):(s[i(l)]=!0,e(l,n,null,s))}}},plugins:{},highlightAll:function(e,t){r.highlightAllUnder(document,e,t)},highlightAllUnder:function(e,t,n){var a={callback:n,container:e,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};r.hooks.run("before-highlightall",a),a.elements=Array.prototype.slice.apply(a.container.querySelectorAll(a.selector)),r.hooks.run("before-all-elements-highlight",a);for(var s,i=0;s=a.elements[i++];)r.highlightElement(s,!0===t,a.callback)},highlightElement:function(t,n,a){var s=r.util.getLanguage(t),i=r.languages[s];r.util.setLanguage(t,s);var o=t.parentElement;o&&"pre"===o.nodeName.toLowerCase()&&r.util.setLanguage(o,s);var l={element:t,language:s,grammar:i,code:t.textContent};function c(e){l.highlightedCode=e,r.hooks.run("before-insert",l),l.element.innerHTML=l.highlightedCode,r.hooks.run("after-highlight",l),r.hooks.run("complete",l),a&&a.call(l.element)}if(r.hooks.run("before-sanity-check",l),(o=l.element.parentElement)&&"pre"===o.nodeName.toLowerCase()&&!o.hasAttribute("tabindex")&&o.setAttribute("tabindex","0"),!l.code)return r.hooks.run("complete",l),void(a&&a.call(l.element));if(r.hooks.run("before-highlight",l),l.grammar)if(n&&e.Worker){var u=new Worker(r.filename);u.onmessage=function(e){c(e.data)},u.postMessage(JSON.stringify({language:l.language,code:l.code,immediateClose:!0}))}else c(r.highlight(l.code,l.grammar,l.language));else c(r.util.encode(l.code))},highlight:function(e,t,n){var a={code:e,grammar:t,language:n};if(r.hooks.run("before-tokenize",a),!a.grammar)throw new Error('The language "'+a.language+'" has no grammar.');return a.tokens=r.tokenize(a.code,a.grammar),r.hooks.run("after-tokenize",a),s.stringify(r.util.encode(a.tokens),a.language)},tokenize:function(e,t){var n=t.rest;if(n){for(var a in n)t[a]=n[a];delete t.rest}var r=new l;return c(r,r.head,e),o(e,r,t,r.head,0),function(e){var t=[],n=e.head.next;for(;n!==e.tail;)t.push(n.value),n=n.next;return t}(r)},hooks:{all:{},add:function(e,t){var n=r.hooks.all;n[e]=n[e]||[],n[e].push(t)},run:function(e,t){var n=r.hooks.all[e];if(n&&n.length)for(var a,s=0;a=n[s++];)a(t)}},Token:s};function s(e,t,n,a){this.type=e,this.content=t,this.alias=n,this.length=0|(a||"").length}function i(e,t,n,a){e.lastIndex=t;var r=e.exec(n);if(r&&a&&r[1]){var s=r[1].length;r.index+=s,r[0]=r[0].slice(s)}return r}function o(e,t,n,a,l,d){for(var p in n)if(n.hasOwnProperty(p)&&n[p]){var g=n[p];g=Array.isArray(g)?g:[g];for(var h=0;h<g.length;++h){if(d&&d.cause==p+","+h)return;var m=g[h],f=m.inside,v=!!m.lookbehind,y=!!m.greedy,b=m.alias;if(y&&!m.pattern.global){var w=m.pattern.toString().match(/[imsuy]*$/)[0];m.pattern=RegExp(m.pattern.source,w+"g")}for(var F=m.pattern||m,k=a.next,x=l;k!==t.tail&&!(d&&x>=d.reach);x+=k.value.length,k=k.next){var A=k.value;if(t.length>e.length)return;if(!(A instanceof s)){var E,P=1;if(y){if(!(E=i(F,x,e,v))||E.index>=e.length)break;var S=E.index,$=E.index+E[0].length,C=x;for(C+=k.value.length;S>=C;)C+=(k=k.next).value.length;if(x=C-=k.value.length,k.value instanceof s)continue;for(var L=k;L!==t.tail&&(C<$||"string"==typeof L.value);L=L.next)P++,C+=L.value.length;P--,A=e.slice(x,C),E.index-=x}else if(!(E=i(F,0,A,v)))continue;S=E.index;var j=E[0],T=A.slice(0,S),_=A.slice(S+j.length),Y=x+A.length;d&&Y>d.reach&&(d.reach=Y);var I=k.prev;if(T&&(I=c(t,I,T),x+=T.length),u(t,I,P),k=c(t,I,new s(p,f?r.tokenize(j,f):j,b,j)),_&&c(t,k,_),P>1){var q={cause:p+","+h,reach:Y};o(e,t,n,k.prev,x,q),d&&q.reach>d.reach&&(d.reach=q.reach)}}}}}}function l(){var e={value:null,prev:null,next:null},t={value:null,prev:e,next:null};e.next=t,this.head=e,this.tail=t,this.length=0}function c(e,t,n){var a=t.next,r={value:n,prev:t,next:a};return t.next=r,a.prev=r,e.length++,r}function u(e,t,n){for(var a=t.next,r=0;r<n&&a!==e.tail;r++)a=a.next;t.next=a,a.prev=t,e.length-=r}if(e.Prism=r,s.stringify=function e(t,n){if("string"==typeof t)return t;if(Array.isArray(t)){var a="";return t.forEach((function(t){a+=e(t,n)})),a}var s={type:t.type,content:e(t.content,n),tag:"span",classes:["token",t.type],attributes:{},language:n},i=t.alias;i&&(Array.isArray(i)?Array.prototype.push.apply(s.classes,i):s.classes.push(i)),r.hooks.run("wrap",s);var o="";for(var l in s.attributes)o+=" "+l+'="'+(s.attributes[l]||"").replace(/"/g,"&quot;")+'"';return"<"+s.tag+' class="'+s.classes.join(" ")+'"'+o+">"+s.content+"</"+s.tag+">"},!e.document)return e.addEventListener?(r.disableWorkerMessageHandler||e.addEventListener("message",(function(t){var n=JSON.parse(t.data),a=n.language,s=n.code,i=n.immediateClose;e.postMessage(r.highlight(s,r.languages[a],a)),i&&e.close()}),!1),r):r;var d=r.util.currentScript();function p(){r.manual||r.highlightAll()}if(d&&(r.filename=d.src,d.hasAttribute("data-manual")&&(r.manual=!0)),!r.manual){var g=document.readyState;"loading"===g||"interactive"===g&&d&&d.defer?document.addEventListener("DOMContentLoaded",p):window.requestAnimationFrame?window.requestAnimationFrame(p):window.setTimeout(p,16)}return r}("undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{});
/**
   * Prism: Lightweight, robust, elegant syntax highlighting
   *
   * @license MIT <https://opensource.org/licenses/MIT>
   * @author Lea Verou <https://lea.verou.me>
   * @namespace
   * @public
   */t.exports&&(t.exports=n),void 0!==e&&(e.Prism=n)}(t);var n=t.exports;Prism.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},Prism.languages.markup.tag.inside["attr-value"].inside.entity=Prism.languages.markup.entity,Prism.languages.markup.doctype.inside["internal-subset"].inside=Prism.languages.markup,Prism.hooks.add("wrap",(function(e){"entity"===e.type&&(e.attributes.title=e.content.replace(/&amp;/,"&"))})),Object.defineProperty(Prism.languages.markup.tag,"addInlined",{value:function(e,t){var n={};n["language-"+t]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:Prism.languages[t]},n.cdata=/^<!\[CDATA\[|\]\]>$/i;var a={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:n}};a["language-"+t]={pattern:/[\s\S]+/,inside:Prism.languages[t]};var r={};r[e]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,(function(){return e})),"i"),lookbehind:!0,greedy:!0,inside:a},Prism.languages.insertBefore("markup","cdata",r)}}),Object.defineProperty(Prism.languages.markup.tag,"addAttribute",{value:function(e,t){Prism.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+e+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[t,"language-"+t],inside:Prism.languages[t]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),Prism.languages.html=Prism.languages.markup,Prism.languages.mathml=Prism.languages.markup,Prism.languages.svg=Prism.languages.markup,Prism.languages.xml=Prism.languages.extend("markup",{}),Prism.languages.ssml=Prism.languages.xml,Prism.languages.atom=Prism.languages.xml,Prism.languages.rss=Prism.languages.xml,Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},Prism.languages.javascript=Prism.languages.extend("clike",{"class-name":[Prism.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),Prism.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:Prism.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:Prism.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),Prism.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),Prism.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),Prism.languages.markup&&(Prism.languages.markup.tag.addInlined("script","javascript"),Prism.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript")),Prism.languages.js=Prism.languages.javascript,function(e){var t=e.languages.javadoclike={parameter:{pattern:/(^[\t ]*(?:\/{3}|\*|\/\*\*)\s*@(?:arg|arguments|param)\s+)\w+/m,lookbehind:!0},keyword:{pattern:/(^[\t ]*(?:\/{3}|\*|\/\*\*)\s*|\{)@[a-z][a-zA-Z-]+\b/m,lookbehind:!0},punctuation:/[{}]/};Object.defineProperty(t,"addSupport",{value:function(t,n){"string"==typeof t&&(t=[t]),t.forEach((function(t){!function(t,n){var a="doc-comment",r=e.languages[t];if(r){var s=r[a];if(!s){var i={"doc-comment":{pattern:/(^|[^\\])\/\*\*[^/][\s\S]*?(?:\*\/|$)/,lookbehind:!0,alias:"comment"}};s=(r=e.languages.insertBefore(t,"comment",i))[a]}if(s instanceof RegExp&&(s=r[a]={pattern:s}),Array.isArray(s))for(var o=0,l=s.length;o<l;o++)s[o]instanceof RegExp&&(s[o]={pattern:s[o]}),n(s[o]);else n(s)}}(t,(function(e){e.inside||(e.inside={}),e.inside.rest=n}))}))}}),t.addSupport(["java","javascript","php"],t)}(Prism),function(e){e.languages.typescript=e.languages.extend("javascript",{"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,lookbehind:!0,greedy:!0,inside:null},builtin:/\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/}),e.languages.typescript.keyword.push(/\b(?:abstract|declare|is|keyof|readonly|require)\b/,/\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,/\btype\b(?=\s*(?:[\{*]|$))/),delete e.languages.typescript.parameter,delete e.languages.typescript["literal-property"];var t=e.languages.extend("typescript",{});delete t["class-name"],e.languages.typescript["class-name"].inside=t,e.languages.insertBefore("typescript","function",{decorator:{pattern:/@[$\w\xA0-\uFFFF]+/,inside:{at:{pattern:/^@/,alias:"operator"},function:/^[\s\S]+/}},"generic-function":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,greedy:!0,inside:{function:/^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,generic:{pattern:/<[\s\S]+/,alias:"class-name",inside:t}}}}),e.languages.ts=e.languages.typescript}(Prism),function(e){var t=e.languages.javascript,n=/\{(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})+\}/.source,a="(@(?:arg|argument|param|property)\\s+(?:"+n+"\\s+)?)";e.languages.jsdoc=e.languages.extend("javadoclike",{parameter:{pattern:RegExp(a+/(?:(?!\s)[$\w\xA0-\uFFFF.])+(?=\s|$)/.source),lookbehind:!0,inside:{punctuation:/\./}}}),e.languages.insertBefore("jsdoc","keyword",{"optional-parameter":{pattern:RegExp(a+/\[(?:(?!\s)[$\w\xA0-\uFFFF.])+(?:=[^[\]]+)?\](?=\s|$)/.source),lookbehind:!0,inside:{parameter:{pattern:/(^\[)[$\w\xA0-\uFFFF\.]+/,lookbehind:!0,inside:{punctuation:/\./}},code:{pattern:/(=)[\s\S]*(?=\]$)/,lookbehind:!0,inside:t,alias:"language-javascript"},punctuation:/[=[\]]/}},"class-name":[{pattern:RegExp(/(@(?:augments|class|extends|interface|memberof!?|template|this|typedef)\s+(?:<TYPE>\s+)?)[A-Z]\w*(?:\.[A-Z]\w*)*/.source.replace(/<TYPE>/g,(function(){return n}))),lookbehind:!0,inside:{punctuation:/\./}},{pattern:RegExp("(@[a-z]+\\s+)"+n),lookbehind:!0,inside:{string:t.string,number:t.number,boolean:t.boolean,keyword:e.languages.typescript.keyword,operator:/=>|\.\.\.|[&|?:*]/,punctuation:/[.,;=<>{}()[\]]/}}],example:{pattern:/(@example\s+(?!\s))(?:[^@\s]|\s+(?!\s))+?(?=\s*(?:\*\s*)?(?:@\w|\*\/))/,lookbehind:!0,inside:{code:{pattern:/^([\t ]*(?:\*\s*)?)\S.*$/m,lookbehind:!0,inside:t,alias:"language-javascript"}}}}),e.languages.javadoclike.addSupport("javascript",e.languages.jsdoc)}(Prism),function(e){function t(e,t){return RegExp(e.replace(/<ID>/g,(function(){return/(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/.source})),t)}e.languages.insertBefore("javascript","function-variable",{"method-variable":{pattern:RegExp("(\\.\\s*)"+e.languages.javascript["function-variable"].pattern.source),lookbehind:!0,alias:["function-variable","method","function","property-access"]}}),e.languages.insertBefore("javascript","function",{method:{pattern:RegExp("(\\.\\s*)"+e.languages.javascript.function.source),lookbehind:!0,alias:["function","property-access"]}}),e.languages.insertBefore("javascript","constant",{"known-class-name":[{pattern:/\b(?:(?:Float(?:32|64)|(?:Int|Uint)(?:8|16|32)|Uint8Clamped)?Array|ArrayBuffer|BigInt|Boolean|DataView|Date|Error|Function|Intl|JSON|(?:Weak)?(?:Map|Set)|Math|Number|Object|Promise|Proxy|Reflect|RegExp|String|Symbol|WebAssembly)\b/,alias:"class-name"},{pattern:/\b(?:[A-Z]\w*)Error\b/,alias:"class-name"}]}),e.languages.insertBefore("javascript","keyword",{imports:{pattern:t(/(\bimport\b\s*)(?:<ID>(?:\s*,\s*(?:\*\s*as\s+<ID>|\{[^{}]*\}))?|\*\s*as\s+<ID>|\{[^{}]*\})(?=\s*\bfrom\b)/.source),lookbehind:!0,inside:e.languages.javascript},exports:{pattern:t(/(\bexport\b\s*)(?:\*(?:\s*as\s+<ID>)?(?=\s*\bfrom\b)|\{[^{}]*\})/.source),lookbehind:!0,inside:e.languages.javascript}}),e.languages.javascript.keyword.unshift({pattern:/\b(?:as|default|export|from|import)\b/,alias:"module"},{pattern:/\b(?:await|break|catch|continue|do|else|finally|for|if|return|switch|throw|try|while|yield)\b/,alias:"control-flow"},{pattern:/\bnull\b/,alias:["null","nil"]},{pattern:/\bundefined\b/,alias:"nil"}),e.languages.insertBefore("javascript","operator",{spread:{pattern:/\.{3}/,alias:"operator"},arrow:{pattern:/=>/,alias:"operator"}}),e.languages.insertBefore("javascript","punctuation",{"property-access":{pattern:t(/(\.\s*)#?<ID>/.source),lookbehind:!0},"maybe-class-name":{pattern:/(^|[^$\w\xA0-\uFFFF])[A-Z][$\w\xA0-\uFFFF]+/,lookbehind:!0},dom:{pattern:/\b(?:document|(?:local|session)Storage|location|navigator|performance|window)\b/,alias:"variable"},console:{pattern:/\bconsole(?=\s*\.)/,alias:"class-name"}});for(var n=["function","function-variable","method","method-variable","property-access"],a=0;a<n.length;a++){var r=n[a],s=e.languages.javascript[r];"RegExp"===e.util.type(s)&&(s=e.languages.javascript[r]={pattern:s});var i=s.inside||{};s.inside=i,i["maybe-class-name"]=/^[A-Z][\s\S]*/}}(Prism);class a{#e;#t;#n=new Set;#a=!1;constructor(){if(!a.aPD){const e=window,t=(t,n)=>e.addEventListener(t,n);if(this.#t=e.PointerEvent?"pointer":e.TouchEvent?"touch":"mouse",this.#e="mouse"==this.#t?"mouse":"touch","pointer"==this.#t){const n=a=>{const r=a.pointerType;if(r==this.#e&&this.#a)return!1;this.#a=!0,"mouse"==r?e.removeEventListener("pointermove",n):t("pointermove",n),this.#e=r,this.#n.forEach((e=>e.apply(this,[r])))};t("pointermove",n),t("pointerdown",n)}a.aPD=this}return a.aPD}get type(){return this.#e}get interface(){return this.#t}class(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document.body;const n=n=>t.classList.add(e);if("pointer"==this.#t){const a=a=>"mouse"==a?n():t.classList.remove(e);this.on(a),a(this.#e)}else"mouse"==this.#t&&n();return this}on(e){return this.#n.add(e),this}off(e){return this.#n.delete(e),this}}var r=Object.freeze(new a);let s=window,i="pointer",o="touch",l="mouse";class c{static#r=s.PointerEvent?i:s.TouchEvent?o:l;static#s=s.PointerEvent?`${i}down`:s.TouchEvent?`${o}start`:`${l}down`;#i=null;#o=c.#r==o?o:l;#l;#c;#u;#d=!1;#p=null;#g;#h=null;#m=null;#f=null;#v=null;#y=null;#b=null;#w=null;#F=null;#k=null;#x=null;#A=0;#E=0;#P=20;#S(e){return Math.abs(e)}#$(e,t){return this.#i.addEventListener(e,t,!1),this}#C(e,t){return this.#i.removeEventListener(e,t,!1),this}#L(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"swiping",n=this.#j(e);n&&this.#i.dispatchEvent(new CustomEvent(t,{detail:n}))}#T(){this.#C(this.#l,this.#_).#C(this.#c,this.#Y).#C(this.#u,this.#I)}#q=e=>{if(c.#r==i&&!e.isPrimary)return;this.#g=e,this.#p=Date.now(),e=e.touches?e.touches[0]:e,this.#h=this.#y=e.pageX,this.#m=this.#b=e.pageY,this.#f=this.#w=this.#k=e.clientX,this.#v=this.#F=this.#x=e.clientY,this.#A=this.#E=0,e.pointerType&&(this.#o=e.pointerType);let t=this.#o==l;this.#l=t?`${l}move`:`${o}move`,this.#u=t?`${l}leave`:`${o}cancel`,this.#c=t?`${l}up`:`${o}end`,this.#$(this.#l,this.#_).#$(this.#c,this.#Y).#$(this.#u,this.#I)};#I=e=>{this.#Y(e,!0)};#_=e=>{let t=e.touches?e.touches[0]:e;this.#w=t.clientX,this.#F=t.clientY,this.#y=t.pageX,this.#b=t.pageY,this.#i.contains(document.elementFromPoint(this.#w,this.#F))?(this.#A=this.#w-this.#k,this.#E=this.#F-this.#x,this.#k=this.#w,this.#x=this.#F,this.#L(e)):this.#I(e)};#Y=(()=>{var e=this;return function(t){let n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];e.#T(),e.#A=e.#w-e.#f,e.#E=e.#F-e.#v;let a=!n&&Math.max(e.#S(e.#A),e.#S(e.#E))>e.#P?"swipe":"cancel";e.#L(t,a)}})();#j(e){let t,n;return this.#S(this.#A)>this.#S(this.#E)?(n=0==this.#A?"":"hor",t=this.#A<0?"left":0==this.#A?"":"right"):(n=0==this.#E?"":"vert",t=this.#E<0?"up":0==this.#E?"":"down"),""!=t&&{client:{x0:this.#f,y0:this.#v,x1:this.#w,y1:this.#F},delta:{x:this.#A,y:this.#E},direction:t,duration:Date.now()-this.#p,events:{start:this.#g,end:e},orientation:n,page:{x0:this.#h,y0:this.#m,x1:this.#y,y1:this.#b},pointerType:this.#o}}#X(e){let t=e.threshold;this.#P=Number.isInteger(t)&&t>0?t:this.#P}#D(){this.#d=!0,this.#$(c.#s,this.#q,!1)}constructor(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};e&&(this.#i=e,this.#X(t),!0===t.active&&this.#D())}on(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.#X(e),this.#d||this.#D()}off(){this.#C(c.#s,this.#q),this.#T()}get threshold(){return this.#P}get active(){return this.#d}}const u=window,d=document;r.class("amst__mouse");let p=!1;try{const e=Object.defineProperty({},"passive",{get:function(){p=!0}});u.addEventListener("testPassive",null,e),u.removeEventListener("testPassive",null,e)}catch(e){}console.log(`Pointer Events are ${u.PointerEvent?"":"not "}supported`),console.log(`Css touch-action property is ${u.CSS&&CSS.supports("touch-action","none")?"":"not "}supported`),console.log(`Passive listeners are ${p?"":"not "}supported`);n.languages.insertBefore("javascript","constant",{"my-vars":{pattern:new RegExp("\\b(?:"+["swipeObserver"].join("|")+")\\b(?=}?)(?!:)")}}),u.addEventListener("load",(function(){!function(){const e=window,t=document,n=t.querySelector("html");n.addEventListener("transitionend",(function e(){n.classList.remove("loading"),n.classList.remove("loaded"),n.removeEventListener("transitionend",e)})),n.classList.add("loaded"),e.addEventListener("scroll",(e=>{t.documentElement.scrollTop>400?t.querySelector(".up").classList.add("show"):t.querySelector(".up").classList.remove("show")})),t.querySelector(".up").addEventListener("click",(t=>{e.scrollTo(0,0)}))}(),function(){const e=window,t=document,n=t.body,a=t.querySelectorAll(".content h2[id]").length>1,r=t.querySelector("#menu-btn");let s,i,o=!1;function l(){s=e.visualViewport?e.visualViewport.width:e.innerWidth||t.documentElement.clientWidth||n.clientWidth,i=e.visualViewport?e.visualViewport.height:e.innerHeight||t.documentElement.clientHeight||n.clientHeight}if(e.addEventListener("resize",l),l(),r.checked=s<1200,r.addEventListener("change",(e=>{r.checked?n.classList.add("menu-is-closed"):n.classList.remove("menu-is-closed")})),r.dispatchEvent(new CustomEvent("change")),a){history.scrollRestoration&&(history.scrollRestoration="manual");const p=function(){return e.location.hash.substring(1)};let g=0,h=!1,m=!1,f=p();f||(f=t.querySelector(".content h2[id]").getAttribute("id"));let v='<ul class="sub-menu">';function c(){let e;"function"==typeof MouseEvent?e=new MouseEvent("click",{bubbles:!0}):(e=document.createEvent("Event"),e.initEvent("click",!0,!0)),t.querySelector(`.sub-menu li.${f} a`).dispatchEvent(e)}function u(){const n=t.querySelector(`.content h2[id=${f}]`).getBoundingClientRect().top;n>=-1&&n<=1?(h=!1,o||(t.querySelector("html").classList.add("smooth-scroll"),o=!0)):(o||n!=g||c(),e.requestAnimationFrame(u)),g=n}function d(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p();t.querySelector(".sub-menu .active")&&t.querySelector(".sub-menu .active").classList.remove("active"),t.querySelector(`.sub-menu .${e}`).classList.add("active");const n=t.querySelector(`.sub-menu .${e}`).getBoundingClientRect(),a=t.querySelector(".aside"),r=20,s=n.height+n.top+a.scrollTop+r-i;(n.top>i||n.top<60)&&(a.scrollTop=s)}Array.from(t.querySelectorAll(".content h2")).forEach((e=>{v+=`<li class="${e.getAttribute("id")}"><a href="#${e.getAttribute("id")}">${e.innerHTML}</a></li>`})),v+="</ul>",t.querySelector("aside .aside").insertAdjacentHTML("beforeend",v),Array.from(t.querySelectorAll(".sub-menu li")).forEach((e=>{e.addEventListener("click",(function(){this.classList.contains("active")||(h=!0,f=this.getAttribute("class"),d(f),u(),s<600&&(r.checked=!0))}))})),c(),e.addEventListener("scroll",(t=>{m||h||(m=!0,requestAnimationFrame((()=>{e.dispatchEvent(new CustomEvent("amst__scroll")),m=!1})))})),e.addEventListener("amst__scroll",(function(){if(!h){const n=Array.from(t.querySelectorAll(".content h2[id]")).filter((e=>e.getBoundingClientRect().top<=1)).slice(-1)[0];if(n&&p()!=n.getAttribute("id")){const t=e.location.toString().split("#")[0];history.replaceState(null,null,t+"#"+n.getAttribute("id")),d()}}}))}}(),function(){const e=window,t=document;Array.from(t.querySelectorAll("div.code.copy")).forEach((n=>{n.insertAdjacentHTML("afterbegin",'<div class="icon-copy"><div class="background"></div><div class="foreground"></div></div>'),n.querySelector(".icon-copy").addEventListener("click",(a=>{if(navigator.clipboard)navigator.clipboard.writeText(n.querySelector("code").innerText).then(r,s);else try{const a=t.createRange();a.selectNode(n.querySelector("code")),e.getSelection().removeAllRanges(),e.getSelection().addRange(a),t.execCommand("copy"),e.getSelection().removeAllRanges(),r()}catch(e){s()}function r(){n.querySelector(".icon-copy").classList.add("clicked"),setTimeout((e=>n.querySelector(".icon-copy").classList.remove("clicked")),2e3)}function s(){alert("Sorry but I'm unable to copy!!!")}}))}))}(),function(){const e=d.querySelector(".content .demo"),t=d.querySelector(".content .demo.demo2"),n=e.querySelector("p"),a=t.querySelector("p"),r=new c(t,{ps:!1});new c(e,{active:!0}),e.addEventListener("swiping",(function(e){console.log("SWIPING",e.detail),n.innerHTML="SWIPING "+e.detail.direction.toUpperCase()})),e.addEventListener("swipe",(function(e){console.log("SWIPE",e.detail),n.innerHTML="SWIPE "+e.detail.direction.toUpperCase()})),e.addEventListener("cancel",(function(e){console.log("SWIPE CANCELLED",e.detail),n.innerHTML="CANCEL"}));let s="";const i=d.createElement("div");i.style.touchAction="pan-up";const o="pan-up"===i.style.touchAction;o&&(t.style.touchAction="none");function l(){o&&(t.style.touchAction="none"),t.classList.remove("show_top"),t.classList.remove("show_bottom")}console.log(`Css touch-action property ${o?"supports":"does not support"} pan-up and pan-down values`),t.addEventListener("swiping",(e=>{if("mouse"!=e.detail.pointerType&&"vert"==e.detail.orientation&&s!=e.detail.direction){const t=e.detail.events.end;t.cancelable?(t.preventDefault(),console.log("Scroll has been blocked.")):console.log("Scroll can't be blocked.")}a.innerHTML="SWIPING "+e.detail.direction.toUpperCase()})),t.addEventListener("swipe",(e=>{if("mouse"!=e.detail.pointerType){const n=e.detail.direction;if("hor"==e.detail.orientation)l();else if(s!=n&&("down"==n?(t.classList.add("show_top"),t.classList.remove("show_bottom")):(t.classList.remove("show_top"),t.classList.add("show_bottom")),o)){const e="down"==n?"up":"down";t.style.touchAction="pan-"+e}s=n}a.innerHTML="SWIPE "+e.detail.direction.toUpperCase()})),t.addEventListener("cancel",(e=>{a.innerHTML="CANCEL",s="",l()})),r.on()}()}),!1);