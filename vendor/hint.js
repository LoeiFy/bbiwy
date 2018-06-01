// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE
!function(t){"object"==typeof exports&&"object"==typeof module?t(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],t):t(CodeMirror)}(function(A){"use strict";var S="CodeMirror-hint-active";function o(t,i){this.cm=t,this.options=i,this.widget=null,this.debounce=0,this.tick=0,this.startPos=this.cm.getCursor("start"),this.startLen=this.cm.getLine(this.startPos.line).length-this.cm.getSelection().length;var e=this;t.on("cursorActivity",this.activityFunc=function(){e.cursorActivity()})}A.showHint=function(t,i,e){if(!i)return t.showHint(e);e&&e.async&&(i.async=!0);var n={hint:i};if(e)for(var o in e)n[o]=e[o];return t.showHint(n)},A.defineExtension("showHint",function(t){t=function(t,i,e){var n=t.options.hintOptions,o={};for(var s in h)o[s]=h[s];if(n)for(var s in n)void 0!==n[s]&&(o[s]=n[s]);if(e)for(var s in e)void 0!==e[s]&&(o[s]=e[s]);o.hint.resolve&&(o.hint=o.hint.resolve(t,i));return o}(this,this.getCursor("start"),t);var i=this.listSelections();if(!(1<i.length)){if(this.somethingSelected()){if(!t.hint.supportsSelection)return;for(var e=0;e<i.length;e++)if(i[e].head.line!=i[e].anchor.line)return}this.state.completionActive&&this.state.completionActive.close();var n=this.state.completionActive=new o(this,t);n.options.hint&&(A.signal(this,"startCompletion",this),n.update(!0))}});var n=window.requestAnimationFrame||function(t){return setTimeout(t,1e3/60)},s=window.cancelAnimationFrame||clearTimeout;function T(t){return"string"==typeof t?t:t.text}function M(t,i){for(;i&&i!=t;){if("LI"===i.nodeName.toUpperCase()&&i.parentNode==t)return i;i=i.parentNode}}function c(o,t){this.completion=o,this.data=t,this.picked=!1;var e=this,s=o.cm,c=this.hints=document.createElement("ul");c.className="CodeMirror-hints",this.selectedHint=t.selectedHint||0;for(var i=t.list,n=0;n<i.length;++n){var r=c.appendChild(document.createElement("li")),h=i[n],l="CodeMirror-hint"+(n!=this.selectedHint?"":" "+S);null!=h.className&&(l=h.className+" "+l),r.className=l,h.render?h.render(r,t,h):r.appendChild(document.createTextNode(h.displayText||T(h))),r.hintId=n}var a=s.cursorCoords(o.options.alignWithWord?t.from:null),u=a.left,f=a.bottom,d=!0;c.style.left=u+"px",c.style.top=f+"px";var p=window.innerWidth||Math.max(document.body.offsetWidth,document.documentElement.offsetWidth),m=window.innerHeight||Math.max(document.body.offsetHeight,document.documentElement.offsetHeight);(o.options.container||document.body).appendChild(c);var g=c.getBoundingClientRect(),v=g.bottom-m,y=c.scrollHeight>c.clientHeight+1,w=s.getScrollInfo();if(0<v){var H=g.bottom-g.top;if(0<a.top-(a.bottom-g.top)-H)c.style.top=(f=a.top-H)+"px",d=!1;else if(m<H){c.style.height=m-5+"px",c.style.top=(f=a.bottom-g.top)+"px";var k=s.getCursor();t.from.ch!=k.ch&&(a=s.cursorCoords(k),c.style.left=(u=a.left)+"px",g=c.getBoundingClientRect())}}var C,b=g.right-p;if(0<b&&(g.right-g.left>p&&(c.style.width=p-5+"px",b-=g.right-g.left-p),c.style.left=(u=a.left-b)+"px"),y)for(var x=c.firstChild;x;x=x.nextSibling)x.style.paddingRight=s.display.nativeBarWidth+"px";(s.addKeyMap(this.keyMap=function(t,n){var o={Up:function(){n.moveFocus(-1)},Down:function(){n.moveFocus(1)},PageUp:function(){n.moveFocus(1-n.menuSize(),!0)},PageDown:function(){n.moveFocus(n.menuSize()-1,!0)},Home:function(){n.setFocus(0)},End:function(){n.setFocus(n.length-1)},Enter:n.pick,Tab:n.pick,Esc:n.close},i=t.options.customKeys,s=i?{}:o;function e(t,i){var e;e="string"!=typeof i?function(t){return i(t,n)}:o.hasOwnProperty(i)?o[i]:i,s[t]=e}if(i)for(var c in i)i.hasOwnProperty(c)&&e(c,i[c]);var r=t.options.extraKeys;if(r)for(var c in r)r.hasOwnProperty(c)&&e(c,r[c]);return s}(o,{moveFocus:function(t,i){e.changeActive(e.selectedHint+t,i)},setFocus:function(t){e.changeActive(t)},menuSize:function(){return e.screenAmount()},length:i.length,close:function(){o.close()},pick:function(){e.pick()},data:t})),o.options.closeOnUnfocus)&&(s.on("blur",this.onBlur=function(){C=setTimeout(function(){o.close()},100)}),s.on("focus",this.onFocus=function(){clearTimeout(C)}));return s.on("scroll",this.onScroll=function(){var t=s.getScrollInfo(),i=s.getWrapperElement().getBoundingClientRect(),e=f+w.top-t.top,n=e-(window.pageYOffset||(document.documentElement||document.body).scrollTop);if(d||(n+=c.offsetHeight),n<=i.top||n>=i.bottom)return o.close();c.style.top=e+"px",c.style.left=u+w.left-t.left+"px"}),A.on(c,"dblclick",function(t){var i=M(c,t.target||t.srcElement);i&&null!=i.hintId&&(e.changeActive(i.hintId),e.pick())}),A.on(c,"click",function(t){var i=M(c,t.target||t.srcElement);i&&null!=i.hintId&&(e.changeActive(i.hintId),o.options.completeOnSingleClick&&e.pick())}),A.on(c,"mousedown",function(){setTimeout(function(){s.focus()},20)}),A.signal(t,"select",i[this.selectedHint],c.childNodes[this.selectedHint]),!0}function r(t,i,e,n){if(t.async)t(i,n,e);else{var o=t(i,e);o&&o.then?o.then(n):n(o)}}o.prototype={close:function(){this.active()&&(this.cm.state.completionActive=null,this.tick=null,this.cm.off("cursorActivity",this.activityFunc),this.widget&&this.data&&A.signal(this.data,"close"),this.widget&&this.widget.close(),A.signal(this.cm,"endCompletion",this.cm))},active:function(){return this.cm.state.completionActive==this},pick:function(t,i){var e=t.list[i];e.hint?e.hint(this.cm,t,e):this.cm.replaceRange(T(e),e.from||t.from,e.to||t.to,"complete"),A.signal(t,"pick",e),this.close()},cursorActivity:function(){this.debounce&&(s(this.debounce),this.debounce=0);var t=this.cm.getCursor(),i=this.cm.getLine(t.line);if(t.line!=this.startPos.line||i.length-t.ch!=this.startLen-this.startPos.ch||t.ch<this.startPos.ch||this.cm.somethingSelected()||t.ch&&this.options.closeCharacters.test(i.charAt(t.ch-1)))this.close();else{var e=this;this.debounce=n(function(){e.update()}),this.widget&&this.widget.disable()}},update:function(i){if(null!=this.tick){var e=this,n=++this.tick;r(this.options.hint,this.cm,this.options,function(t){e.tick==n&&e.finishUpdate(t,i)})}},finishUpdate:function(t,i){this.data&&A.signal(this.data,"update");var e=this.widget&&this.widget.picked||i&&this.options.completeSingle;this.widget&&this.widget.close(),(this.data=t)&&t.list.length&&(e&&1==t.list.length?this.pick(t,0):(this.widget=new c(this,t),A.signal(t,"shown")))}},c.prototype={close:function(){if(this.completion.widget==this){this.completion.widget=null,this.hints.parentNode.removeChild(this.hints),this.completion.cm.removeKeyMap(this.keyMap);var t=this.completion.cm;this.completion.options.closeOnUnfocus&&(t.off("blur",this.onBlur),t.off("focus",this.onFocus)),t.off("scroll",this.onScroll)}},disable:function(){this.completion.cm.removeKeyMap(this.keyMap);var t=this;this.keyMap={Enter:function(){t.picked=!0}},this.completion.cm.addKeyMap(this.keyMap)},pick:function(){this.completion.pick(this.data,this.selectedHint)},changeActive:function(t,i){if(t>=this.data.list.length?t=i?this.data.list.length-1:0:t<0&&(t=i?0:this.data.list.length-1),this.selectedHint!=t){var e=this.hints.childNodes[this.selectedHint];e&&(e.className=e.className.replace(" "+S,"")),(e=this.hints.childNodes[this.selectedHint=t]).className+=" "+S,e.offsetTop<this.hints.scrollTop?this.hints.scrollTop=e.offsetTop-3:e.offsetTop+e.offsetHeight>this.hints.scrollTop+this.hints.clientHeight&&(this.hints.scrollTop=e.offsetTop+e.offsetHeight-this.hints.clientHeight+3),A.signal(this.data,"select",this.data.list[this.selectedHint],e)}},screenAmount:function(){return Math.floor(this.hints.clientHeight/this.hints.firstChild.offsetHeight)||1}},A.registerHelper("hint","auto",{resolve:function(t,i){var e,c=t.getHelpers(i,"hint");if(c.length){var n=function(t,n,o){var s=function(t,i){if(!t.somethingSelected())return i;for(var e=[],n=0;n<i.length;n++)i[n].supportsSelection&&e.push(i[n]);return e}(t,c);!function i(e){if(e==s.length)return n(null);r(s[e],t,o,function(t){t&&0<t.list.length?n(t):i(e+1)})}(0)};return n.async=!0,n.supportsSelection=!0,n}return(e=t.getHelper(t.getCursor(),"hintWords"))?function(t){return A.hint.fromList(t,{words:e})}:A.hint.anyword?function(t,i){return A.hint.anyword(t,i)}:function(){}}}),A.registerHelper("hint","fromList",function(t,i){var e,n=t.getCursor(),o=t.getTokenAt(n),s=A.Pos(n.line,o.start),c=n;o.start<n.ch&&/\w/.test(o.string.charAt(n.ch-o.start-1))?e=o.string.substr(0,n.ch-o.start):(e="",s=n);for(var r=[],h=0;h<i.words.length;h++){var l=i.words[h];l.slice(0,e.length)==e&&r.push(l)}if(r.length)return{list:r,from:s,to:c}}),A.commands.autocomplete=A.showHint;var h={hint:A.hint.auto,completeSingle:!0,alignWithWord:!0,closeCharacters:/[\s()\[\]{};:>,]/,closeOnUnfocus:!0,completeOnSingleClick:!0,container:null,customKeys:null,extraKeys:null};A.defineOption("hintOptions",null)});

!function(t){"object"==typeof exports&&"object"==typeof module?t(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],t):t(CodeMirror)}(function(C){"use strict";var j=C.Pos;C.registerHelper("hint","xml",function(t,e){var r=e&&e.schemaInfo,s=e&&e.quoteChar||'"';if(r){var n=t.getCursor(),a=t.getTokenAt(n);a.end>n.ch&&(a.end=n.ch,a.string=a.string.slice(0,n.ch-a.start));var i=C.innerMode(t.getMode(),a.state);if("xml"==i.mode.name){var o,l,f=[],g=!1,c=/\btag\b/.test(a.type)&&!/>$/.test(a.string),h=c&&/^\w/.test(a.string);if(h){var p=t.getLine(n.line).slice(Math.max(0,a.start-2),a.start),u=/<\/$/.test(p)?"close":/<$/.test(p)?"open":null;u&&(l=a.start-("close"==u?2:1))}else c&&"<"==a.string?u="open":c&&"</"==a.string&&(u="close");if(!c&&!i.state.tagName||u){h&&(o=a.string),g=u;var d=i.state.context,m=d&&r[d.tagName],v=d?m&&m.children:r["!top"];if(v&&"close"!=u)for(var y=0;y<v.length;++y)o&&0!=v[y].lastIndexOf(o,0)||f.push("<"+v[y]);else if("close"!=u)for(var x in r)!r.hasOwnProperty(x)||"!top"==x||"!attrs"==x||o&&0!=x.lastIndexOf(o,0)||f.push("<"+x);d&&(!o||"close"==u&&0==d.tagName.lastIndexOf(o,0))&&f.push("</"+d.tagName+">")}else{var O=(m=r[i.state.tagName])&&m.attrs,b=r["!attrs"];if(!O&&!b)return;if(O){if(b){var w={};for(var I in b)b.hasOwnProperty(I)&&(w[I]=b[I]);for(var I in O)O.hasOwnProperty(I)&&(w[I]=O[I]);O=w}}else O=b;if("string"==a.type||"="==a.string){var P,A=(p=t.getRange(j(n.line,Math.max(0,n.ch-60)),j(n.line,"string"==a.type?a.start:a.end))).match(/([^\s\u00a0=<>\"\']+)=$/);if(!A||!O.hasOwnProperty(A[1])||!(P=O[A[1]]))return;if("function"==typeof P&&(P=P.call(this,t)),"string"==a.type){o=a.string;var M=0;/['"]/.test(a.string.charAt(0))&&(s=a.string.charAt(0),o=a.string.slice(1),M++);var N=a.string.length;/['"]/.test(a.string.charAt(N-1))&&(s=a.string.charAt(N-1),o=a.string.substr(M,N-2)),g=!0}for(y=0;y<P.length;++y)o&&0!=P[y].lastIndexOf(o,0)||f.push(s+P[y]+s)}else for(var $ in"attribute"==a.type&&(o=a.string,g=!0),O)!O.hasOwnProperty($)||o&&0!=$.lastIndexOf(o,0)||f.push($)}return{list:f,from:g?j(n.line,null==l?a.start:l):n,to:g?j(n.line,a.end):n}}}})});

!function(l){"object"==typeof exports&&"object"==typeof module?l(require("../../lib/codemirror"),require("./xml-hint")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","./xml-hint"],l):l(CodeMirror)}(function(n){"use strict";var l="ab aa af ak sq am ar an hy as av ae ay az bm ba eu be bn bh bi bs br bg my ca ch ce ny zh cv kw co cr hr cs da dv nl dz en eo et ee fo fj fi fr ff gl ka de el gn gu ht ha he hz hi ho hu ia id ie ga ig ik io is it iu ja jv kl kn kr ks kk km ki rw ky kv kg ko ku kj la lb lg li ln lo lt lu lv gv mk mg ms ml mt mi mr mh mn na nv nb nd ne ng nn no ii nr oc oj cu om or os pa pi fa pl ps pt qu rm rn ro ru sa sc sd se sm sg sr gd sn si sk sl so st es su sw ss sv ta te tg th ti bo tk tl tn to tr ts tt tw ty ug uk ur uz ve vi vo wa cy wo fy xh yi yo za zu".split(" "),t=["_blank","_self","_top","_parent"],e=["ascii","utf-8","utf-16","latin1","latin1"],a=["get","post","put","delete"],r=["application/x-www-form-urlencoded","multipart/form-data","text/plain"],o=["all","screen","print","embossed","braille","handheld","print","projection","screen","tty","tv","speech","3d-glasses","resolution [>][<][=] [X]","device-aspect-ratio: X/Y","orientation:portrait","orientation:landscape","device-height: [X]","device-width: [X]"],s={attrs:{}},u={a:{attrs:{href:null,ping:null,type:null,media:o,target:t,hreflang:l}},abbr:s,acronym:s,address:s,applet:s,area:{attrs:{alt:null,coords:null,href:null,target:null,ping:null,media:o,hreflang:l,type:null,shape:["default","rect","circle","poly"]}},article:s,aside:s,audio:{attrs:{src:null,mediagroup:null,crossorigin:["anonymous","use-credentials"],preload:["none","metadata","auto"],autoplay:["","autoplay"],loop:["","loop"],controls:["","controls"]}},b:s,base:{attrs:{href:null,target:t}},basefont:s,bdi:s,bdo:s,big:s,blockquote:{attrs:{cite:null}},body:s,br:s,button:{attrs:{form:null,formaction:null,name:null,value:null,autofocus:["","autofocus"],disabled:["","autofocus"],formenctype:r,formmethod:a,formnovalidate:["","novalidate"],formtarget:t,type:["submit","reset","button"]}},canvas:{attrs:{width:null,height:null}},caption:s,center:s,cite:s,code:s,col:{attrs:{span:null}},colgroup:{attrs:{span:null}},command:{attrs:{type:["command","checkbox","radio"],label:null,icon:null,radiogroup:null,command:null,title:null,disabled:["","disabled"],checked:["","checked"]}},data:{attrs:{value:null}},datagrid:{attrs:{disabled:["","disabled"],multiple:["","multiple"]}},datalist:{attrs:{data:null}},dd:s,del:{attrs:{cite:null,datetime:null}},details:{attrs:{open:["","open"]}},dfn:s,dir:s,div:s,dl:s,dt:s,em:s,embed:{attrs:{src:null,type:null,width:null,height:null}},eventsource:{attrs:{src:null}},fieldset:{attrs:{disabled:["","disabled"],form:null,name:null}},figcaption:s,figure:s,font:s,footer:s,form:{attrs:{action:null,name:null,"accept-charset":e,autocomplete:["on","off"],enctype:r,method:a,novalidate:["","novalidate"],target:t}},frame:s,frameset:s,h1:s,h2:s,h3:s,h4:s,h5:s,h6:s,head:{attrs:{},children:["title","base","link","style","meta","script","noscript","command"]},header:s,hgroup:s,hr:s,html:{attrs:{manifest:null},children:["head","body"]},i:s,iframe:{attrs:{src:null,srcdoc:null,name:null,width:null,height:null,sandbox:["allow-top-navigation","allow-same-origin","allow-forms","allow-scripts"],seamless:["","seamless"]}},img:{attrs:{alt:null,src:null,ismap:null,usemap:null,width:null,height:null,crossorigin:["anonymous","use-credentials"]}},input:{attrs:{alt:null,dirname:null,form:null,formaction:null,height:null,list:null,max:null,maxlength:null,min:null,name:null,pattern:null,placeholder:null,size:null,src:null,step:null,value:null,width:null,accept:["audio/*","video/*","image/*"],autocomplete:["on","off"],autofocus:["","autofocus"],checked:["","checked"],disabled:["","disabled"],formenctype:r,formmethod:a,formnovalidate:["","novalidate"],formtarget:t,multiple:["","multiple"],readonly:["","readonly"],required:["","required"],type:["hidden","text","search","tel","url","email","password","datetime","date","month","week","time","datetime-local","number","range","color","checkbox","radio","file","submit","image","reset","button"]}},ins:{attrs:{cite:null,datetime:null}},kbd:s,keygen:{attrs:{challenge:null,form:null,name:null,autofocus:["","autofocus"],disabled:["","disabled"],keytype:["RSA"]}},label:{attrs:{for:null,form:null}},legend:s,li:{attrs:{value:null}},link:{attrs:{href:null,type:null,hreflang:l,media:o,sizes:["all","16x16","16x16 32x32","16x16 32x32 64x64"]}},map:{attrs:{name:null}},mark:s,menu:{attrs:{label:null,type:["list","context","toolbar"]}},meta:{attrs:{content:null,charset:e,name:["viewport","application-name","author","description","generator","keywords"],"http-equiv":["content-language","content-type","default-style","refresh"]}},meter:{attrs:{value:null,min:null,low:null,high:null,max:null,optimum:null}},nav:s,noframes:s,noscript:s,object:{attrs:{data:null,type:null,name:null,usemap:null,form:null,width:null,height:null,typemustmatch:["","typemustmatch"]}},ol:{attrs:{reversed:["","reversed"],start:null,type:["1","a","A","i","I"]}},optgroup:{attrs:{disabled:["","disabled"],label:null}},option:{attrs:{disabled:["","disabled"],label:null,selected:["","selected"],value:null}},output:{attrs:{for:null,form:null,name:null}},p:s,param:{attrs:{name:null,value:null}},pre:s,progress:{attrs:{value:null,max:null}},q:{attrs:{cite:null}},rp:s,rt:s,ruby:s,s:s,samp:s,script:{attrs:{type:["text/javascript"],src:null,async:["","async"],defer:["","defer"],charset:e}},section:s,select:{attrs:{form:null,name:null,size:null,autofocus:["","autofocus"],disabled:["","disabled"],multiple:["","multiple"]}},small:s,source:{attrs:{src:null,type:null,media:null}},span:s,strike:s,strong:s,style:{attrs:{type:["text/css"],media:o,scoped:null}},sub:s,summary:s,sup:s,table:s,tbody:s,td:{attrs:{colspan:null,rowspan:null,headers:null}},textarea:{attrs:{dirname:null,form:null,maxlength:null,name:null,placeholder:null,rows:null,cols:null,autofocus:["","autofocus"],disabled:["","disabled"],readonly:["","readonly"],required:["","required"],wrap:["soft","hard"]}},tfoot:s,th:{attrs:{colspan:null,rowspan:null,headers:null,scope:["row","col","rowgroup","colgroup"]}},thead:s,time:{attrs:{datetime:null}},title:s,tr:s,track:{attrs:{src:null,label:null,default:null,kind:["subtitles","captions","descriptions","chapters","metadata"],srclang:l}},tt:s,u:s,ul:s,var:s,video:{attrs:{src:null,poster:null,width:null,height:null,crossorigin:["anonymous","use-credentials"],preload:["auto","metadata","none"],autoplay:["","autoplay"],mediagroup:["movie"],muted:["","muted"],controls:["","controls"]}},wbr:s},i={accesskey:["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9"],class:null,contenteditable:["true","false"],contextmenu:null,dir:["ltr","rtl","auto"],draggable:["true","false","auto"],dropzone:["copy","move","link","string:","file:"],hidden:["hidden"],id:null,inert:["inert"],itemid:null,itemprop:null,itemref:null,itemscope:["itemscope"],itemtype:null,lang:["en","es"],spellcheck:["true","false"],style:null,tabindex:["1","2","3","4","5","6","7","8","9"],title:null,translate:["yes","no"],onclick:null,rel:["stylesheet","alternate","author","bookmark","help","license","next","nofollow","noreferrer","prefetch","prev","search","tag"]};function d(l){for(var t in i)i.hasOwnProperty(t)&&(l.attrs[t]=i[t])}for(var c in d(s),u)u.hasOwnProperty(c)&&u[c]!=s&&d(u[c]);n.htmlSchema=u,n.registerHelper("hint","html",function(l,t){var e={schemaInfo:u};if(t)for(var a in t)e[a]=t[a];return n.hint.xml(l,e)})});

!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror"),require("../../mode/css/css")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../../mode/css/css"],e):e(CodeMirror)}(function(l){"use strict";var p={link:1,visited:1,active:1,hover:1,focus:1,"first-letter":1,"first-line":1,"first-child":1,before:1,after:1,lang:1};l.registerHelper("hint","css",function(e){var r=e.getCursor(),t=e.getTokenAt(r),o=l.innerMode(e.getMode(),t.state);if("css"==o.mode.name){if("keyword"==t.type&&0=="!important".indexOf(t.string))return{list:["!important"],from:l.Pos(r.line,t.start),to:l.Pos(r.line,t.end)};var s=t.start,i=r.ch,n=t.string.slice(0,i-s);/[^\w$_-]/.test(n)&&(n="",s=i=r.ch);var a=l.resolveMode("text/css"),d=[],c=o.state.state;return"pseudo"==c||"variable-3"==t.type?f(p):"block"==c||"maybeprop"==c?f(a.propertyKeywords):"prop"==c||"parens"==c||"at"==c||"params"==c?(f(a.valueKeywords),f(a.colorKeywords)):"media"!=c&&"media_parens"!=c||(f(a.mediaTypes),f(a.mediaFeatures)),d.length?{list:d,from:l.Pos(r.line,s),to:l.Pos(r.line,i)}:void 0}function f(e){for(var r in e)n&&0!=r.lastIndexOf(n,0)||d.push(r)}})});

!function(t){"object"==typeof exports&&"object"==typeof module?t(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],t):t(CodeMirror)}(function(f){var c=f.Pos;function u(t,e){for(var r=0,n=t.length;r<n;++r)e(t[r])}function r(t,e,r,n){var i=t.getCursor(),o=r(t,i);if(!/\b(?:string|comment)\b/.test(o.type)){var s=f.innerMode(t.getMode(),o.state);if("json"!==s.mode.helperType){o.state=s.state,/^[\w$_]*$/.test(o.string)?o.end>i.ch&&(o.end=i.ch,o.string=o.string.slice(0,i.ch-o.start)):o={start:i.ch,end:i.ch,string:"",state:o.state,type:"."==o.string?"property":null};for(var a=o;"property"==a.type;){if("."!=(a=r(t,c(i.line,a.start))).string)return;if(a=r(t,c(i.line,a.start)),!l)var l=[];l.push(a)}return{list:function(t,e,r,n){var i=[],o=t.string,s=n&&n.globalScope||window;function a(t){0!=t.lastIndexOf(o,0)||function(t,e){if(!Array.prototype.indexOf){for(var r=t.length;r--;)if(t[r]===e)return!0;return!1}return-1!=t.indexOf(e)}(i,t)||i.push(t)}function l(t){"string"==typeof t?u(d,a):t instanceof Array?u(g,a):t instanceof Function&&u(y,a),function(t,e){if(Object.getOwnPropertyNames&&Object.getPrototypeOf)for(var r=t;r;r=Object.getPrototypeOf(r))Object.getOwnPropertyNames(r).forEach(e);else for(var n in t)e(n)}(t,a)}if(e&&e.length){var f,c=e.pop();for(c.type&&0===c.type.indexOf("variable")?(n&&n.additionalContext&&(f=n.additionalContext[c.string]),n&&!1===n.useGlobalScope||(f=f||s[c.string])):"string"==c.type?f="":"atom"==c.type?f=1:"function"==c.type&&(null==s.jQuery||"$"!=c.string&&"jQuery"!=c.string||"function"!=typeof s.jQuery?null!=s._&&"_"==c.string&&"function"==typeof s._&&(f=s._()):f=s.jQuery());null!=f&&e.length;)f=f[e.pop().string];null!=f&&l(f)}else{for(var p=t.state.localVars;p;p=p.next)a(p.name);for(var p=t.state.globalVars;p;p=p.next)a(p.name);n&&!1===n.useGlobalScope||l(s),u(r,a)}return i}(o,l,e,n),from:c(i.line,o.start),to:c(i.line,o.end)}}}}function n(t,e){var r=t.getTokenAt(e);return e.ch==r.start+1&&"."==r.string.charAt(0)?(r.end=r.start,r.string=".",r.type="property"):/^\.[\w$_]*$/.test(r.string)&&(r.type="property",r.start++,r.string=r.string.replace(/\./,"")),r}f.registerHelper("hint","javascript",function(t,e){return r(t,i,function(t,e){return t.getTokenAt(e)},e)}),f.registerHelper("hint","coffeescript",function(t,e){return r(t,o,n,e)});var d="charAt charCodeAt indexOf lastIndexOf substring substr slice trim trimLeft trimRight toUpperCase toLowerCase split concat match replace search".split(" "),g="length concat join splice push pop shift unshift slice reverse sort indexOf lastIndexOf every some filter forEach map reduce reduceRight ".split(" "),y="prototype apply call bind".split(" "),i="break case catch class const continue debugger default delete do else export extends false finally for function if in import instanceof new null return super switch this throw true try typeof var void while with yield".split(" "),o="and break catch class continue delete do else extends false finally for if in instanceof isnt new no not null of off on or return switch then throw true try typeof until void while with yes".split(" ")});
