parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"OmAK":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.createElement=exports.h=r,exports.cloneElement=s,exports.createRef=j,exports.Component=R,exports.render=H,exports.rerender=d,exports.options=exports.default=void 0;var e=function(){},t={};exports.options=t;var n=[],o=[];function r(r,i){var l,a,s,p,c=o;for(p=arguments.length;p-- >2;)n.push(arguments[p]);for(i&&null!=i.children&&(n.length||n.push(i.children),delete i.children);n.length;)if((a=n.pop())&&void 0!==a.pop)for(p=a.length;p--;)n.push(a[p]);else"boolean"==typeof a&&(a=null),(s="function"!=typeof r)&&(null==a?a="":"number"==typeof a?a=String(a):"string"!=typeof a&&(s=!1)),s&&l?c[c.length-1]+=a:c===o?c=[a]:c.push(a),l=s;var u=new e;return u.nodeName=r,u.children=c,u.attributes=null==i?void 0:i,u.key=null==i?void 0:i.key,void 0!==t.vnode&&t.vnode(u),u}function i(e,t){for(var n in t)e[n]=t[n];return e}function l(e,t){null!=e&&("function"==typeof e?e(t):e.current=t)}var a="function"==typeof Promise?Promise.resolve().then.bind(Promise.resolve()):setTimeout;function s(e,t){return r(e.nodeName,i(i({},e.attributes),t),arguments.length>2?[].slice.call(arguments,2):e.children)}var p=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,c=[];function u(e){!e._dirty&&(e._dirty=!0)&&1==c.push(e)&&(t.debounceRendering||a)(d)}function d(){for(var e;e=c.pop();)e._dirty&&D(e)}function f(e,t,n){return"string"==typeof t||"number"==typeof t?void 0!==e.splitText:"string"==typeof t.nodeName?!e._componentConstructor&&v(e,t.nodeName):n||e._componentConstructor===t.nodeName}function v(e,t){return e.normalizedNodeName===t||e.nodeName.toLowerCase()===t.toLowerCase()}function m(e){var t=i({},e.attributes);t.children=e.children;var n=e.nodeName.defaultProps;if(void 0!==n)for(var o in n)void 0===t[o]&&(t[o]=n[o]);return t}function _(e,t){var n=t?document.createElementNS("http://www.w3.org/2000/svg",e):document.createElement(e);return n.normalizedNodeName=e,n}function h(e){var t=e.parentNode;t&&t.removeChild(e)}function y(e,t,n,o,r){if("className"===t&&(t="class"),"key"===t);else if("ref"===t)l(n,null),l(o,e);else if("class"!==t||r)if("style"===t){if(o&&"string"!=typeof o&&"string"!=typeof n||(e.style.cssText=o||""),o&&"object"==typeof o){if("string"!=typeof n)for(var i in n)i in o||(e.style[i]="");for(var i in o)e.style[i]="number"==typeof o[i]&&!1===p.test(i)?o[i]+"px":o[i]}}else if("dangerouslySetInnerHTML"===t)o&&(e.innerHTML=o.__html||"");else if("o"==t[0]&&"n"==t[1]){var a=t!==(t=t.replace(/Capture$/,""));t=t.toLowerCase().substring(2),o?n||e.addEventListener(t,b,a):e.removeEventListener(t,b,a),(e._listeners||(e._listeners={}))[t]=o}else if("list"!==t&&"type"!==t&&!r&&t in e){try{e[t]=null==o?"":o}catch(c){}null!=o&&!1!==o||"spellcheck"==t||e.removeAttribute(t)}else{var s=r&&t!==(t=t.replace(/^xlink:?/,""));null==o||!1===o?s?e.removeAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase()):e.removeAttribute(t):"function"!=typeof o&&(s?e.setAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase(),o):e.setAttribute(t,o))}else e.className=o||""}function b(e){return this._listeners[e.type](t.event&&t.event(e)||e)}var x=[],g=0,C=!1,N=!1;function w(){for(var e;e=x.shift();)t.afterMount&&t.afterMount(e),e.componentDidMount&&e.componentDidMount()}function k(e,t,n,o,r,i){g++||(C=null!=r&&void 0!==r.ownerSVGElement,N=null!=e&&!("__preactattr_"in e));var l=S(e,t,n,o,i);return r&&l.parentNode!==r&&r.appendChild(l),--g||(N=!1,i||w()),l}function S(e,t,n,o,r){var i=e,l=C;if(null!=t&&"boolean"!=typeof t||(t=""),"string"==typeof t||"number"==typeof t)return e&&void 0!==e.splitText&&e.parentNode&&(!e._component||r)?e.nodeValue!=t&&(e.nodeValue=t):(i=document.createTextNode(t),e&&(e.parentNode&&e.parentNode.replaceChild(i,e),P(e,!0))),i.__preactattr_=!0,i;var a=t.nodeName;if("function"==typeof a)return V(e,t,n,o);if(C="svg"===a||"foreignObject"!==a&&C,a=String(a),(!e||!v(e,a))&&(i=_(a,C),e)){for(;e.firstChild;)i.appendChild(e.firstChild);e.parentNode&&e.parentNode.replaceChild(i,e),P(e,!0)}var s=i.firstChild,p=i.__preactattr_,c=t.children;if(null==p){p=i.__preactattr_={};for(var u=i.attributes,d=u.length;d--;)p[u[d].name]=u[d].value}return!N&&c&&1===c.length&&"string"==typeof c[0]&&null!=s&&void 0!==s.splitText&&null==s.nextSibling?s.nodeValue!=c[0]&&(s.nodeValue=c[0]):(c&&c.length||null!=s)&&U(i,c,n,o,N||null!=p.dangerouslySetInnerHTML),L(i,t.attributes,p),C=l,i}function U(e,t,n,o,r){var i,l,a,s,p,c=e.childNodes,u=[],d={},v=0,m=0,_=c.length,y=0,b=t?t.length:0;if(0!==_)for(var x=0;x<_;x++){var g=c[x],C=g.__preactattr_;null!=(N=b&&C?g._component?g._component.__key:C.key:null)?(v++,d[N]=g):(C||(void 0!==g.splitText?!r||g.nodeValue.trim():r))&&(u[y++]=g)}if(0!==b)for(x=0;x<b;x++){var N;if(p=null,null!=(N=(s=t[x]).key))v&&void 0!==d[N]&&(p=d[N],d[N]=void 0,v--);else if(m<y)for(i=m;i<y;i++)if(void 0!==u[i]&&f(l=u[i],s,r)){p=l,u[i]=void 0,i===y-1&&y--,i===m&&m++;break}p=S(p,s,n,o),a=c[x],p&&p!==e&&p!==a&&(null==a?e.appendChild(p):p===a.nextSibling?h(a):e.insertBefore(p,a))}if(v)for(var x in d)void 0!==d[x]&&P(d[x],!1);for(;m<=y;)void 0!==(p=u[y--])&&P(p,!1)}function P(e,t){var n=e._component;n?A(n):(null!=e.__preactattr_&&l(e.__preactattr_.ref,null),!1!==t&&null!=e.__preactattr_||h(e),B(e))}function B(e){for(e=e.lastChild;e;){var t=e.previousSibling;P(e,!0),e=t}}function L(e,t,n){var o;for(o in n)t&&null!=t[o]||null==n[o]||y(e,o,n[o],n[o]=void 0,C);for(o in t)"children"===o||"innerHTML"===o||o in n&&t[o]===("value"===o||"checked"===o?e[o]:n[o])||y(e,o,n[o],n[o]=t[o],C)}var M=[];function T(e,t,n){var o,r=M.length;for(e.prototype&&e.prototype.render?(o=new e(t,n),R.call(o,t,n)):((o=new R(t,n)).constructor=e,o.render=E);r--;)if(M[r].constructor===e)return o.nextBase=M[r].nextBase,M.splice(r,1),o;return o}function E(e,t,n){return this.constructor(e,n)}function W(e,n,o,r,i){e._disable||(e._disable=!0,e.__ref=n.ref,e.__key=n.key,delete n.ref,delete n.key,void 0===e.constructor.getDerivedStateFromProps&&(!e.base||i?e.componentWillMount&&e.componentWillMount():e.componentWillReceiveProps&&e.componentWillReceiveProps(n,r)),r&&r!==e.context&&(e.prevContext||(e.prevContext=e.context),e.context=r),e.prevProps||(e.prevProps=e.props),e.props=n,e._disable=!1,0!==o&&(1!==o&&!1===t.syncComponentUpdates&&e.base?u(e):D(e,1,i)),l(e.__ref,e))}function D(e,n,o,r){if(!e._disable){var l,a,s,p=e.props,c=e.state,u=e.context,d=e.prevProps||p,f=e.prevState||c,v=e.prevContext||u,_=e.base,h=e.nextBase,y=_||h,b=e._component,C=!1,N=v;if(e.constructor.getDerivedStateFromProps&&(c=i(i({},c),e.constructor.getDerivedStateFromProps(p,c)),e.state=c),_&&(e.props=d,e.state=f,e.context=v,2!==n&&e.shouldComponentUpdate&&!1===e.shouldComponentUpdate(p,c,u)?C=!0:e.componentWillUpdate&&e.componentWillUpdate(p,c,u),e.props=p,e.state=c,e.context=u),e.prevProps=e.prevState=e.prevContext=e.nextBase=null,e._dirty=!1,!C){l=e.render(p,c,u),e.getChildContext&&(u=i(i({},u),e.getChildContext())),_&&e.getSnapshotBeforeUpdate&&(N=e.getSnapshotBeforeUpdate(d,f));var S,U,B=l&&l.nodeName;if("function"==typeof B){var L=m(l);(a=b)&&a.constructor===B&&L.key==a.__key?W(a,L,1,u,!1):(S=a,e._component=a=T(B,L,u),a.nextBase=a.nextBase||h,a._parentComponent=e,W(a,L,0,u,!1),D(a,1,o,!0)),U=a.base}else s=y,(S=b)&&(s=e._component=null),(y||1===n)&&(s&&(s._component=null),U=k(s,l,u,o||!_,y&&y.parentNode,!0));if(y&&U!==y&&a!==b){var M=y.parentNode;M&&U!==M&&(M.replaceChild(U,y),S||(y._component=null,P(y,!1)))}if(S&&A(S),e.base=U,U&&!r){for(var E=e,V=e;V=V._parentComponent;)(E=V).base=U;U._component=E,U._componentConstructor=E.constructor}}for(!_||o?x.push(e):C||(e.componentDidUpdate&&e.componentDidUpdate(d,f,N),t.afterUpdate&&t.afterUpdate(e));e._renderCallbacks.length;)e._renderCallbacks.pop().call(e);g||r||w()}}function V(e,t,n,o){for(var r=e&&e._component,i=r,l=e,a=r&&e._componentConstructor===t.nodeName,s=a,p=m(t);r&&!s&&(r=r._parentComponent);)s=r.constructor===t.nodeName;return r&&s&&(!o||r._component)?(W(r,p,3,n,o),e=r.base):(i&&!a&&(A(i),e=l=null),r=T(t.nodeName,p,n),e&&!r.nextBase&&(r.nextBase=e,l=null),W(r,p,1,n,o),e=r.base,l&&e!==l&&(l._component=null,P(l,!1))),e}function A(e){t.beforeUnmount&&t.beforeUnmount(e);var n=e.base;e._disable=!0,e.componentWillUnmount&&e.componentWillUnmount(),e.base=null;var o=e._component;o?A(o):n&&(null!=n.__preactattr_&&l(n.__preactattr_.ref,null),e.nextBase=n,h(n),M.push(e),B(n)),l(e.__ref,null)}function R(e,t){this._dirty=!0,this.context=t,this.props=e,this.state=this.state||{},this._renderCallbacks=[]}function H(e,t,n){return k(n,e,{},!1,t,!1)}function j(){return{}}i(R.prototype,{setState:function(e,t){this.prevState||(this.prevState=this.state),this.state=i(i({},this.state),"function"==typeof e?e(this.state,this.props):e),t&&this._renderCallbacks.push(t),u(this)},forceUpdate:function(e){e&&this._renderCallbacks.push(e),D(this,2)},render:function(){}});var z={h:r,createElement:r,cloneElement:s,createRef:j,Component:R,render:H,rerender:d,options:t},F=z;exports.default=F;
},{}],"vKFU":[function(require,module,exports) {

},{}],"OA8u":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("preact"),n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var r in n)n.hasOwnProperty(r)&&(t[r]=n[r])};function r(t,r){function o(){this.constructor=t}n(t,r),t.prototype=null===r?Object.create(r):(o.prototype=r.prototype,new o)}var o=Object.assign||function(t){for(var n,r=1,o=arguments.length;r<o;r++)for(var e in n=arguments[r])Object.prototype.hasOwnProperty.call(n,e)&&(t[e]=n[e]);return t};function e(t,n){for(var r in t)if(t[r]!==n[r])return!1;for(var r in n)if(!(r in t))return!1;return!0}function i(t,n){if(null!=n){if(n.then)return n.then(t.setState);t.setState(n)}}function p(t,n,r){t="function"==typeof t?t(n,r):t;var o={},e=function(r){o[r]=function(){for(var o=[],e=0;e<arguments.length;e++)o[e]=arguments[e];var p=t[r];return"function"==typeof n.middleware?n.middleware(n,p,o):i(n,p.apply(void 0,[n.getState()].concat(o)))}};for(var p in t)e(p);return o}var s=function(t){function n(){var n=null!==t&&t.apply(this,arguments)||this;return n.state=n.getProps(),n.actions=n.getActions(),n.update=function(){var t=n.getProps();e(t,n.state)||n.setState(t)},n}return r(n,t),n.prototype.componentWillMount=function(){this.unsubscribe=this.context.store.subscribe(this.update)},n.prototype.componentWillUnmount=function(){this.unsubscribe(this.update)},n.prototype.getProps=function(){var t=this.props.mapToProps,n=this.context.store&&this.context.store.getState()||{};return t?t(n,this.props):n},n.prototype.getActions=function(){return p(this.props.actions,this.context.store,this.props)},n.prototype.render=function(t,n,r){var e=t.children,i=r.store;return e[0](o({store:i},n,this.actions))},n}(t.Component),u=s;function c(n,e){return void 0===e&&(e={}),function(i){return function(p){function s(){return null!==p&&p.apply(this,arguments)||this}return r(s,p),s.prototype.render=function(){var r=this.props;return t.h(u,o({},r,{mapToProps:n,actions:e}),function(n){return t.h(i,o({},n,r))})},s}(t.Component)}}var a=function(t){function n(){return null!==t&&t.apply(this,arguments)||this}return r(n,t),n.prototype.getChildContext=function(){return{store:this.props.store}},n.prototype.render=function(){return this.props.children[0]},n}(t.Component);exports.connect=c,exports.Provider=a,exports.Connect=s;
},{"preact":"OmAK"}],"9loJ":[function(require,module,exports) {
"use strict";var r=this&&this.__assign||function(){return(r=Object.assign||function(r){for(var t,e=1,n=arguments.length;e<n;e++)for(var o in t=arguments[e])Object.prototype.hasOwnProperty.call(t,o)&&(r[o]=t[o]);return r}).apply(this,arguments)};Object.defineProperty(exports,"__esModule",{value:!0});var t=require("preact"),e=require("redux-zero/preact");function n(n){return void 0===n&&(n={}),function(o){return function(u){return t.h(e.Connect,{mapToProps:function(t){return r({},t)},actions:n},function(e){return t.h(o,r({},e,u))})}}}exports.default=n;
},{"preact":"OmAK","redux-zero/preact":"OA8u"}],"e3IY":[function(require,module,exports) {
"use strict";var e=this&&this.__assign||function(){return(e=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var i in t=arguments[r])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)};Object.defineProperty(exports,"__esModule",{value:!0}),exports.newSearch=function(e,t){return{searching:t}},exports.setSearching=function(e,t){return{isSearching:t}},exports.addSite=function(e,t){return{sites:e.sites.concat([t])}},exports.removeSite=function(e,t){var r=e.sites;return{sites:r=r.filter(function(e){return e!==t})}},exports.emit=function(t,r){return{events:e({},t.events,r)}},exports.addFav=function(t,r){var n;return{favs:e({},t.favs,(n={},n[r.title.url]=r,n))}},exports.removeFav=function(t,r){var n=t.favs;return delete n[r.title.url],{favs:e({},n)}},exports.filterBySite=function(e,t){var r=e.filterBy,n=[t.prefix,t.site,t.suffix].join(""),i=r.indexOf(n);return-1!==i?r.splice(i,1):r.push(n),{filterBy:r.slice()}};
},{}],"xfg7":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e={base:"https://stackoverflow.com",site:"https://stackoverflow.com/jobs",search:"q=",include:"tl=",exclude:"td=",location:"l=",jobType:"j=",expMin:"ms=",expMax:"mxs=",sort:"sort=",page:"pg={num}"};exports.stitcher=e;var t={container:"-job-summary",title:"-title",postedOn:"-posted-date",company:"-details",location:"",salary:"-salary",visa:"-visa",relocation:"-relocation"};exports.filter=t;
},{}],"4BfA":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e={base:"https://{prefix}indeed{suffix}",site:"https://{prefix}indeed{suffix}/jobs",search:"q=",location:"l=",jobType:"jt=",expMin:"jt=",sort:"sort=",page:"start={dec}"};exports.stitcher=e;var t={container:"sponTapItem",title:"jobtitle",postedOn:"date",location:"companyLocation",company:"companyName"};exports.filter=t;
},{}],"xUxN":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t={base:"https://www.monster.com/",site:"https://www.monster.com/jobs/search/",search:"q=",location:"l=",jobType:"jt=",expMin:"jt=",sort:"sort=",page:"start={dec}"};exports.stitcher=t;var e={container:"card-content",title:"title",postedOn:"meta",location:"location",company:"company"};exports.filter=e;
},{}],"uyE6":[function(require,module,exports) {
"use strict";var e=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(exports,"__esModule",{value:!0});var t=e(require("../utils/stackoverflow")),r=e(require("../utils/indeed")),n=e(require("../utils/monster")),i="https://evening-depths-43509.herokuapp.com/",a={stackoverflow:t.stitcher,indeed:r.stitcher,monster:n.stitcher},s={stackoverflow:t.filter,indeed:r.filter,monster:n.filter},o=function(e,t){if(e.navigator.userAgent!=t){var r={get:function(){return t}};try{Object.defineProperty(e.navigator,"userAgent",r)}catch(n){e.navigator=Object.create(navigator,{userAgent:r})}}},l=function(e){var t=e.suffix?""+e.suffix:".com",r=e.prefix?""+e.prefix:"www.",n=a[e.site],i=n.site.replace("{prefix}",r);i=i.replace("{suffix}",t)+"?";var s=e.keyword?""+n.search+e.keyword:"",o=e.include?"&"+n.include+e.include:"",l=e.exclude?"&"+n.exclude+e.exclude:"",u=e.location?"&"+n.location+e.location:"",c=e.expMin?"&"+n.expMin+e.expMin:"",f=e.expMax?"&"+n.expMax+e.expMax:"",p=e.page?"&"+n.page.replace("{num}",e.page).replace("{dec}",20*e.page):"";return encodeURI(i+s+o+l+u+c+f+p)};exports.stitchUrl=l;var u=function(e){return fetch(i+e,{method:"GET"})};exports.request=u;var c=function(){return function(){this.suffix=".com",this.prefix="www."}}();exports.StripConfig=c;var f=function(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return Object.assign.apply(Object,[e].concat(t.map(function(e){return Object.entries(e).filter(function(e){e[0];return void 0!==e[1]}).reduce(function(e,t){var r=t[0],n=t[1];return e[r]=n,e},{})})))},p=function(e){var t=(e=f(new c,e)).site,r=e.prefix,n=e.suffix,i=e.xml,o=e.noSiteAppend,l=a[t].base.replace("{prefix}",r);l=l.replace("{suffix}",n);var u=new DOMParser;i=i.match(/<body[^>]*>((.|[\n\r])*)<\/body>/g)[0];var p=u.parseFromString(i,"text/html").getElementsByClassName(s[t].container),m=[];for(var x in p){var g=p[x];try{var d=g.getElementsByClassName(s[t].title)[0],v=g.getElementsByClassName(s[t].postedOn)[0],h=g.getElementsByClassName(s[t].company)[0],y=g.getElementsByClassName(s[t].location)[0],b=g.getElementsByClassName(s[t].salary)[0],w=g.getAttribute("href")?"/viewjob?jk="+g.getAttribute("href").substring(2):null,C=(h.getElementsByTagName("a")[0]||h).getAttribute("href");m.push({title:{name:(d.firstElementChild||d).getAttribute("title")||d.textContent.trim(),url:(o?"":l)+(w||(d.getElementsByTagName("a")[0]||d).getAttribute("href"))},postedOn:v.textContent,company:{name:(h.firstElementChild||h).getAttribute("title")||h.textContent.trim(),url:C?(o?"":l)+C:null},location:y?y.textContent:"",site:t+n,salary:b?b.textContent:null})}catch(O){console.error(O)}}return m};exports.stripDOM=p;
},{"../utils/stackoverflow":"xfg7","../utils/indeed":"4BfA","../utils/monster":"xUxN"}],"q8r4":[function(require,module,exports) {
"use strict";function e(t){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(t)}var t=this&&this.__extends||function(){var e=function(t,r){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(t,r)};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),r=this&&this.__assign||function(){return(r=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var s in t=arguments[r])Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s]);return e}).apply(this,arguments)},n=this&&this.__decorate||function(t,r,n,s){var o,a=arguments.length,i=a<3?r:null===s?s=Object.getOwnPropertyDescriptor(r,n):s;if("object"===("undefined"==typeof Reflect?"undefined":e(Reflect))&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,r,n,s);else for(var c=t.length-1;c>=0;c--)(o=t[c])&&(i=(a<3?o(i):a>3?o(r,n,i):o(r,n))||i);return a>3&&i&&Object.defineProperty(r,n,i),i},s=this&&this.__metadata||function(t,r){if("object"===("undefined"==typeof Reflect?"undefined":e(Reflect))&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,r)},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}},a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(exports,"__esModule",{value:!0});var i=require("preact"),c=o(require("../store/connect")),l=require("../store/actions"),f=a(require("../models/providersURLs")),u=function(e){var t=e.data,r=t.title,n=t.postedOn,s=t.company,o=t.location,a=t.site,c=t.salary,l=e.favs[r.url]?"starred":"";return i.h("div",{class:"card"},i.h("div",{class:"card-content"},i.h("div",{class:"media"},i.h("div",{class:"media-content"},i.h("div",{class:"wrapper"},i.h("p",null,i.h("a",{target:"_blank",class:"title is-4",href:r.url,title:r.name},r.name),i.h("div",{onClick:function(t){return e.onClick(t,e.data)},title:"Add to Favorites",class:"star-icon icon "+l},i.h("i",{class:"fas fa-star"}))),i.h("p",{class:"subtitle is-6"},s.url?i.h("a",{target:"_blank",href:s.url,title:s.name},s.name):s.name,"  ",o)),i.h("p",null,c),i.h("p",null,n," ",a)))))},p=function(e){function o(){var t=e.call(this)||this;return t.loadedFavs=!1,t.resBackup={},t.state={res:{}},t.handleScroll=function(e){var n=t.props,s=n.sites,o=n.searching,a=n.isSearching;window.innerHeight+window.scrollY>=document.body.offsetHeight&&!t.props.events.toggleFavs&&!a&&(t.props.setSearching(!0),s.forEach(function(e){t.getRequest(r({},e,o,{page:t.page}))}),t.page++)},t.handleFavClick=function(e,r){t.props.favs[r.title.url]?t.props.removeFav(r):t.props.addFav(r)},t.handleShowOnlyFavs=function(e){var r=t.props.favs;e?(t.resBackup=t.state.res,t.state.res={},t.setState({res:{favs:Object.values(r)}})):t.setState({res:t.resBackup})},document.onscroll=t.handleScroll,t}return t(o,e),o.prototype.componentWillReceiveProps=function(e,t){var n=this;if(this.props.events.toggleFavs===e.events.toggleFavs){if(this.props.searching!==e.searching){var s=e.searching;this.state.res={},this.page=1,e.sites.forEach(function(e){n.getRequest(r({},e,s))})}}else this.handleShowOnlyFavs(e.events.toggleFavs)},o.prototype.getRequest=function(e){var t=this,n=e.site,s=e.keyword,o=e.location,a=e.prefix,i=e.suffix,c=e.noSiteAppend,l=e.page,u=f.stitchUrl({site:n,keyword:s,location:o,suffix:i,prefix:a,page:l});f.request(u).then(function(e){return e.text()}).then(function(e){t.props.setSearching(!1);var s=[a,n,i].join("");t.state.res[s]=(t.state.res[s]||[]).concat(f.stripDOM({xml:e,site:n,suffix:i,prefix:a,noSiteAppend:c})),t.setState({res:r({},t.state.res)})})},o.prototype.render=function(){var e=this,t=this.state.res,r=this.props,n=r.isSearching,s=r.favs,o=r.filterBy,a=o.length>0;return i.h("div",{class:"has-text-grey has-text-centered",style:"padding-bottom: 25rem;"},Object.keys(t).map(function(r){var n=t[r];if(t.favs||!a||-1!==o.indexOf(r))return n.map(function(t){return i.h("div",null,i.h(u,{onClick:e.handleFavClick,data:t,favs:s}))})}),i.h("div",{class:"control is-large "+(n?"is-loading":""),style:"width: 50%; top: 1rem"}))},o=n([c.default({setSearching:l.setSearching,removeFav:l.removeFav,addFav:l.addFav}),s("design:paramtypes",[])],o)}(i.Component);exports.Content=p;
},{"preact":"OmAK","../store/connect":"9loJ","../store/actions":"e3IY","../models/providersURLs":"uyE6"}],"3BPz":[function(require,module,exports) {
"use strict";var n=this&&this.__extends||function(){var n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var e in t)t.hasOwnProperty(e)&&(n[e]=t[e])})(t,e)};return function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}}(),t=this&&this.__assign||function(){return(t=Object.assign||function(n){for(var t,e=1,o=arguments.length;e<o;e++)for(var r in t=arguments[e])Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n}).apply(this,arguments)};Object.defineProperty(exports,"__esModule",{value:!0});var e=require("preact"),o=function(o){function i(){var n=null!==o&&o.apply(this,arguments)||this;return n.toggleDrop=function(){var t=n.state.dropped;n.setState({dropped:!t})},n.hide=function(){n.setState({dropped:!1})},n}return n(i,o),i.prototype.render=function(){var n=this,o=this.state.dropped,i=this.props.children.filter(function(n){return n.nodeName===r})[0];return e.h("div",{class:"dropdown is-active",ref:function(t){return n.node=t}},e.h("div",{class:"dropdown-trigger",onClick:this.toggleDrop},e.h("button",{class:"button","aria-haspopup":"true","aria-controls":"dropdown-menu"},e.h("span",null,"Select Sites"),e.h("span",{class:"icon is-small"},e.h("i",{class:"fas fa-angle-down","aria-hidden":"true"})))),i&&o&&e.h(i.nodeName,t({node:this.node,hide:this.hide},i.attributes)))},i}(e.Component),r=function(t){function o(){var n=null!==t&&t.apply(this,arguments)||this;return n.handleClick=function(t){var e=n.props,o=e.node,r=e.hide;o.contains(t.target)||r()},n.handleMenuClick=function(t,e){var o=n.props,r=o.onSelect,i=o.hide;r(e),i()},n}return n(o,t),o.prototype.componentWillMount=function(){document.addEventListener("mousedown",this.handleClick,!1)},o.prototype.componentWillUnmount=function(){document.removeEventListener("mousedown",this.handleClick,!1)},o.prototype.render=function(){var n=this,t=this.props.content;return e.h("div",{class:"dropdown-menu",id:"dropdown-menu",role:"menu"},e.h("div",{class:"dropdown-content"},t&&t.map(function(t){return e.h("a",{class:"dropdown-item",onClick:function(e){return n.handleMenuClick(e,t)}},t.prefix,t.site,t.suffix)})))},o}(e.Component),i=function(t){function i(){return null!==t&&t.apply(this,arguments)||this}return n(i,t),i.prototype.render=function(){return e.h(o,null,e.h(r,null))},i.Trigger=o,i.Menu=r,i}(e.Component);exports.Dropdown=i;
},{"preact":"OmAK"}],"YGgk":[function(require,module,exports) {
"use strict";function e(t){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(t)}var t=this&&this.__extends||function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};return function(t,n){function i(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(i.prototype=n.prototype,new i)}}(),n=this&&this.__decorate||function(t,n,i,o){var r,s=arguments.length,a=s<3?n:null===o?o=Object.getOwnPropertyDescriptor(n,i):o;if("object"===("undefined"==typeof Reflect?"undefined":e(Reflect))&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,n,i,o);else for(var l=t.length-1;l>=0;l--)(r=t[l])&&(a=(s<3?r(a):s>3?r(n,i,a):r(n,i))||a);return s>3&&a&&Object.defineProperty(n,i,a),a},i=this&&this.__metadata||function(t,n){if("object"===("undefined"==typeof Reflect?"undefined":e(Reflect))&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,n)},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var r=require("preact"),s=o(require("../store/connect")),a=require("../store/actions"),l=require("./dropdown"),c=[{site:"stackoverflow"},{site:"indeed",suffix:".lu"},{site:"indeed",suffix:".es"},{site:"indeed",prefix:"de."},{site:"indeed",prefix:"be."},{site:"monster",noSiteAppend:!0}],u=function(e){var t=e.sites,n=e.onClose,i=e.onClick,o=e.filterBy;return r.h("div",null,t.map(function(e){var t=[e.prefix,e.site,e.suffix].join(""),s=-1!==o.indexOf(t)?"is-dark":"";return r.h("span",{class:"tag is-medium "+s,onClick:function(t){return i(e)}},t,r.h("button",{class:"delete is-small",onClick:function(t){return function(e,t,o){o&&i(t),n(t),e.stopPropagation()}(t,e,s)}}))}))},f="Python, Javascript, etc",d="Berlin, Budapest, NY, etc",p=function(e){function o(){var t=e.call(this)||this;return t.toggledFavs=!1,t.state={keyword:"",location:"",loading:!1,drop:!1},t.handleSubmit=function(e){var n=t.state,i=n.location,o=n.keyword;e.preventDefault(),t.props.newSearch({keyword:o,location:i}),t.props.setSearching(!0)},t.handleInput=function(e){var n,i=e.target.name;t.setState(((n={})[i]=e.target.value,n))},t.toggleFavs=function(e){var n=t.props.emit;t.toggledFavs=!t.toggledFavs,n({toggleFavs:t.toggledFavs})},t}return t(o,e),o.prototype.componentWillReceiveProps=function(e,t){},o.prototype.filter=function(e,t){return e.filter(function(e){var n=JSON.stringify(e);return!t.find(function(e){var t=JSON.stringify(e);return n===t})})},o.prototype.render=function(){var e,t=this.props,n=(t.isSearching,t.addSite),i=t.removeSite,o=t.sites,s=t.filterBySite,a=t.filterBy;return e=0===o.length?c:this.filter(c,o),r.h("div",null,r.h("h2",{class:"title has-text-grey has-text-centered"},"Universal Job Search"),r.h("a",{class:"button is-light -fav-toggler",onClick:this.toggleFavs},"Show Favorites Only"),r.h(l.Dropdown.Trigger,null,r.h(l.Dropdown.Menu,{content:e,onSelect:n})),r.h("div",{class:"field"},r.h("div",{class:"control is-medium"},r.h("form",{class:"search-form",onSubmit:this.handleSubmit},r.h("input",{type:"text",style:"width: 150rem;",class:"input search-field",name:"keyword",onInput:this.handleInput,placeholder:"Search...",title:f}),r.h("input",{type:"text",style:"width: 50rem;",class:"input search-field",name:"location",onInput:this.handleInput,placeholder:"Location...",title:d}),r.h("a",{class:"button"},r.h("span",{class:"icon is-small",onClick:this.handleSubmit,title:"Submit Query"},r.h("i",{class:"fas fa-search"}))),r.h("button",{style:"display: none;"})))),r.h(u,{onClose:i,onClick:s,sites:o,filterBy:a}))},o=n([s.default({newSearch:a.newSearch,setSearching:a.setSearching,emit:a.emit,addSite:a.addSite,removeSite:a.removeSite,filterBySite:a.filterBySite}),i("design:paramtypes",[])],o)}(r.Component);exports.Header=p;
},{"preact":"OmAK","../store/connect":"9loJ","../store/actions":"e3IY","./dropdown":"3BPz"}],"L0+G":[function(require,module,exports) {
"use strict";var t=Object.assign||function(t){for(var n,e=1,r=arguments.length;e<r;e++)for(var o in n=arguments[e])Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o]);return t};function n(n,e){void 0===n&&(n={}),void 0===e&&(e=null);var r=n||{},o=[];function u(){o.forEach(function(t){return t(r)})}return{middleware:e,setState:function(n){r=t({},r,"function"==typeof n?n(r):n),u()},subscribe:function(t){return o.push(t),function(){o.splice(o.indexOf(t),1)}},getState:function(){return r},reset:function(){r=n,u()}}}module.exports=n;
},{}],"MsZm":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var t=e(require("redux-zero")),r="redux-store",s=function(){return function(){this.orders=[],this.isSearching=!1,this.favs={},this.searching="",this.sites=[],this.filterBy=[],this.events={toggleFavs:!1}}}(),i=JSON.parse(localStorage.getItem(r)),n=i&&Object.keys(i).length>0?i:new s,o=t.default(n);window.onbeforeunload=function(){var e=o.getState();e.searching="",e.isSearching=!1,localStorage.setItem(r,JSON.stringify(e))},exports.default=o;
},{"redux-zero":"L0+G"}],"nwYt":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var r=require("preact"),t=require("../components/content"),o=require("../components/header"),u=require("redux-zero/preact"),n=e(require("../store/store"));exports.default=function(e){return r.h(u.Provider,{store:n.default},r.h("div",{class:"hero-body",style:"padding-top: 1.3em"},r.h(o.Header,null),r.h(t.Content,null)))};
},{"preact":"OmAK","../components/content":"q8r4","../components/header":"YGgk","redux-zero/preact":"OA8u","../store/store":"MsZm"}],"zo2T":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var t=require("preact");require("./index.css");var r=e(require("./pages/app")),u=document.getElementById("root");t.render(t.h(r.default,null),u,u.lastChild),module.hot&&module.hot.accept();
},{"preact":"OmAK","./index.css":"vKFU","./pages/app":"nwYt"}]},{},["zo2T"], null)
//# sourceMappingURL=src.d15181a7.map