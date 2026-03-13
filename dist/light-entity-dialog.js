function t(t,e,i,s){var r,o=arguments.length,n=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o<3?r(n):o>3?r(e,i,n):r(e,i))||n);return o>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),r=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:h,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,_=globalThis,g=_.trustedTypes,f=g?g.emptyScript:"",m=_.reactiveElementPolyfillSupport,b=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!h(t,e),y={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:$};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let A=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);r?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),r=e.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=s;const o=r.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const o=this.constructor;if(!1===s&&(r=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??$)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[b("elementProperties")]=new Map,A[b("finalized")]=new Map,m?.({ReactiveElement:A}),(_.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,x=t=>t,E=w.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,k="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+C,M=`<${P}>`,T=document,O=()=>T.createComment(""),H=t=>null===t||"object"!=typeof t&&"function"!=typeof t,R=Array.isArray,U="[ \t\n\f\r]",D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,j=/>/g,L=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),z=/'/g,I=/"/g,B=/^(?:script|style|textarea|title)$/i,F=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),q=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),W=new WeakMap,X=T.createTreeWalker(T,129);function Y(t,e){if(!R(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,s=[];let r,o=2===e?"<svg>":3===e?"<math>":"",n=D;for(let e=0;e<i;e++){const i=t[e];let a,h,l=-1,c=0;for(;c<i.length&&(n.lastIndex=c,h=n.exec(i),null!==h);)c=n.lastIndex,n===D?"!--"===h[1]?n=N:void 0!==h[1]?n=j:void 0!==h[2]?(B.test(h[2])&&(r=RegExp("</"+h[2],"g")),n=L):void 0!==h[3]&&(n=L):n===L?">"===h[0]?(n=r??D,l=-1):void 0===h[1]?l=-2:(l=n.lastIndex-h[2].length,a=h[1],n=void 0===h[3]?L:'"'===h[3]?I:z):n===I||n===z?n=L:n===N||n===j?n=D:(n=L,r=void 0);const d=n===L&&t[e+1].startsWith("/>")?" ":"";o+=n===D?i+M:l>=0?(s.push(a),i.slice(0,l)+k+i.slice(l)+C+d):i+C+(-2===l?e:d)}return[Y(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Z{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,o=0;const n=t.length-1,a=this.parts,[h,l]=K(t,e);if(this.el=Z.createElement(h,i),X.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=X.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(k)){const e=l[o++],i=s.getAttribute(t).split(C),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:n[2],strings:i,ctor:"."===n[1]?et:"?"===n[1]?it:"@"===n[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:r}),s.removeAttribute(t));if(B.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],O()),X.nextNode(),a.push({type:2,index:++r});s.append(t[e],O())}}}else if(8===s.nodeType)if(s.data===P)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)a.push({type:7,index:r}),t+=C.length-1}r++}}static createElement(t,e){const i=T.createElement("template");return i.innerHTML=t,i}}function J(t,e,i=t,s){if(e===q)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const o=H(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=J(t,r._$AS(t,e.values),r,s)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??T).importNode(e,!0);X.currentNode=s;let r=X.nextNode(),o=0,n=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new Q(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new rt(r,this,t)),this._$AV.push(e),a=i[++n]}o!==a?.index&&(r=X.nextNode(),o++)}return X.currentNode=T,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),H(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>R(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&H(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new G(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new Z(t)),e}k(t){R(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new Q(this.O(O()),this.O(O()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,s){const r=this.strings;let o=!1;if(void 0===r)t=J(this,t,e,0),o=!H(t)||t!==this._$AH&&t!==q,o&&(this._$AH=t);else{const s=t;let n,a;for(t=r[0],n=0;n<r.length-1;n++)a=J(this,s[i+n],e,n),a===q&&(a=this._$AH[n]),o||=!H(a)||a!==this._$AH[n],a===V?t=V:t!==V&&(t+=(a??"")+r[n+1]),this._$AH[n]=a}o&&!s&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class st extends tt{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??V)===q)return;const i=this._$AH,s=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==V&&(i===V||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const ot=w.litHtmlPolyfillSupport;ot?.(Z,Q),(w.litHtmlVersions??=[]).push("3.3.2");const nt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class at extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new Q(e.insertBefore(O(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}at._$litElement$=!0,at.finalized=!0,nt.litElementHydrateSupport?.({LitElement:at});const ht=nt.litElementPolyfillSupport;ht?.({LitElement:at}),(nt.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const lt={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:$},ct=(t=lt,e,i)=>{const{kind:s,metadata:r}=i;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,r,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];e.call(this,i),this.requestUpdate(s,r,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function dt(t){return(e,i)=>"object"==typeof i?ct(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pt(t){return dt({...t,state:!0,attribute:!1})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let ut=class extends at{constructor(){super(),this._brightnessPct=null,this._colorTemp=null,this._currentHue=0,this._markerX=0,this._markerY=0,this._colorDebounceTimer=null,this._draggingColor=!1,this._lastColorChange=0,this._boundOnDrag=this._onDragColor.bind(this),this._boundOnDragEnd=this._onDragEnd.bind(this)}setConfig(t){if(!t||!t.entity)throw new Error("Entity must be specified");this._config=t}set hass(t){this._hassInternal=t,this._updateFromEntity()}get hass(){return this._hassInternal}get _entity(){if(this.hass&&this._config)return this.hass.states[this._config.entity]}_updateFromEntity(){const t=this._entity;if(!t)return;const e=t.attributes;if(null!=e.brightness?this._brightnessPct=Math.round(e.brightness/255*100):this._brightnessPct=null,"number"==typeof e.color_temp_kelvin?this._colorTemp=e.color_temp_kelvin:"number"==typeof e.color_temp?this._colorTemp=Math.round(1e6/e.color_temp):this._colorTemp=null,!this._draggingColor&&Date.now()-this._lastColorChange>3e3){const t=this._getRgbFromAttributes(e);t&&this._setPickerFromRgb(t.r,t.g,t.b)}}_getRgbFromAttributes(t){if(Array.isArray(t.rgb_color)&&t.rgb_color.length>=3){const[e,i,s]=t.rgb_color;return{r:e,g:i,b:s}}if(Array.isArray(t.hs_color)&&t.hs_color.length>=2){const[e,i]=t.hs_color;return this._hsToRgb(e,i)}return null}_hsToRgb(t,e){const i=1*(e/100),s=t/60,r=i*(1-Math.abs(s%2-1));let o=0,n=0,a=0;s>=0&&s<1?(o=i,n=r):s>=1&&s<2?(o=r,n=i):s>=2&&s<3?(n=i,a=r):s>=3&&s<4?(n=r,a=i):s>=4&&s<5?(o=r,a=i):s>=5&&s<6&&(o=i,a=r);const h=1-i;return{r:Math.round(255*(o+h)),g:Math.round(255*(n+h)),b:Math.round(255*(a+h))}}_rgbToHex({r:t,g:e,b:i}){const s=t=>t.toString(16).padStart(2,"0");return`#${s(t)}${s(e)}${s(i)}`}_hexToRgb(t){const e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?{r:parseInt(e[1],16),g:parseInt(e[2],16),b:parseInt(e[3],16)}:null}_rgbToHsv(t,e,i){t/=255,e/=255,i/=255;const s=Math.max(t,e,i),r=Math.min(t,e,i),o=s-r;let n=0;const a=0===s?0:o/s,h=s;if(s!==r){switch(s){case t:n=(e-i)/o+(e<i?6:0);break;case e:n=(i-t)/o+2;break;case i:n=(t-e)/o+4}n/=6}return{h:360*n,s:100*a,v:100*h}}_setPickerFromRgb(t,e,i){const s=this._rgbToHsv(t,e,i);this._currentHue=s.h,this._markerX=s.s,this._markerY=100-s.v}_kelvinToRgb(t){const e=Math.max(1e3,Math.min(4e4,t))/100;let i,s,r;e<=66?(i=255,s=99.4708025861*Math.log(e)-161.1195681661,r=e<=19?0:138.5177312231*Math.log(e-10)-305.0447927307):(i=329.698727446*Math.pow(e-60,-.1332047592),s=288.1221695283*Math.pow(e-60,-.0755148492),r=255);const o=t=>Math.max(0,Math.min(255,Math.round(t)));return{r:o(i),g:o(s),b:o(r)}}_kelvinToHex(t){return this._rgbToHex(this._kelvinToRgb(t))}_callService(t){this._entity&&this.hass.callService("light","turn_on",{entity_id:this._entity.entity_id,...t})}_debouncedColorServiceCall(t,e,i){this._colorDebounceTimer&&window.clearTimeout(this._colorDebounceTimer),this._colorDebounceTimer=window.setTimeout(()=>{this._callService({rgb_color:[t,e,i],transition:.2})},150)}_onBrightnessChange(t){const e=t.detail&&"number"==typeof t.detail.value?t.detail.value:Number(t.target.value);this._brightnessPct=e,0===e?this._entity&&this.hass.callService("light","turn_off",{entity_id:this._entity.entity_id}):this._callService({brightness_pct:e,transition:.2})}_onColorTempChange(t){const e=t.detail&&"number"==typeof t.detail.value?t.detail.value:Number(t.target.value);this._colorTemp=e,this._callService({color_temp_kelvin:e,transition:.2})}_hsvToRgb(t,e,i){let s=0,r=0,o=0;const n=Math.floor(6*t),a=6*t-n,h=i*(1-e),l=i*(1-a*e),c=i*(1-(1-a)*e);switch(n%6){case 0:s=i,r=c,o=h;break;case 1:s=l,r=i,o=h;break;case 2:s=h,r=i,o=c;break;case 3:s=h,r=l,o=i;break;case 4:s=c,r=h,o=i;break;case 5:s=i,r=h,o=l}return{r:Math.round(255*s),g:Math.round(255*r),b:Math.round(255*o)}}_updateColorFromPicker(){this._lastColorChange=Date.now();const t=this._markerX/100,e=(100-this._markerY)/100,{r:i,g:s,b:r}=this._hsvToRgb(this._currentHue/360,t,e);this._debouncedColorServiceCall(i,s,r)}_startDragColor(t){this._draggingColor=!0,document.addEventListener("mousemove",this._boundOnDrag),document.addEventListener("touchmove",this._boundOnDrag,{passive:!1}),document.addEventListener("mouseup",this._boundOnDragEnd),document.addEventListener("touchend",this._boundOnDragEnd),this._onDragColor(t)}_onDragColor(t){if(!this._gradientArea)return;t.cancelable&&t.preventDefault();const e=this._gradientArea.getBoundingClientRect();let i,s;"touches"in t?(i=t.touches[0].clientX,s=t.touches[0].clientY):(i=t.clientX,s=t.clientY);let r=Math.max(0,Math.min(1,(i-e.left)/e.width)),o=Math.max(0,Math.min(1,(s-e.top)/e.height));this._markerX=100*r,this._markerY=100*o,this._updateColorFromPicker()}_onDragEnd(){this._draggingColor=!1,document.removeEventListener("mousemove",this._boundOnDrag),document.removeEventListener("touchmove",this._boundOnDrag),document.removeEventListener("mouseup",this._boundOnDragEnd),document.removeEventListener("touchend",this._boundOnDragEnd)}_onHueInput(t){const e=Number(t.target.value);this._currentHue=e,this._updateColorFromPicker()}_pickSwatch(t){this._lastColorChange=Date.now();const e=this._hexToRgb(t);e&&(this._setPickerFromRgb(e.r,e.g,e.b),this._callService({rgb_color:[e.r,e.g,e.b],transition:.2}))}_togglePower(){this._entity&&this.hass.callService("light","toggle",{entity_id:this._entity.entity_id})}render(){const t=this._entity;if(!this._config)return F`<div class="wrapper">Missing config</div>`;if(!t)return F`<div class="wrapper">
        <div class="header">
          <div class="title">${this._config.entity}</div>
        </div>
        <div class="message">Entity not found</div>
      </div>`;const e=t.attributes;e.friendly_name||t.entity_id;const i="on"===t.state,s=e.supported_color_modes,r="number"==typeof e.color_temp_kelvin||"number"==typeof e.color_temp||Array.isArray(s)&&s.includes("color_temp"),o=e.rgb_color||e.hs_color||Array.isArray(s)&&s.some(t=>["hs","rgb","rgbw","rgbww","xy"].includes(t)),n=!1!==this._config.show_color_temp&&r,a=!1!==this._config.show_color&&o,h=e.min_color_temp_kelvin||(e.max_mireds?Math.round(1e6/e.max_mireds):2700),l=e.max_color_temp_kelvin||(e.min_mireds?Math.round(1e6/e.min_mireds):6500),c=this._colorTemp??(h+l)/2,d=this._kelvinToHex(c);return F`<div class="wrapper">


      <div class="sliders-row">
        ${n?F`<div class="column color-temp-column">

              <div class="slider-wrapper">
                <ha-control-slider
                  .value=${c}
                  .min=${h}
                  .max=${l}
                  step="50"
                  mode="start"
                  vertical
                  show-handle
                  unit="K"
                  style=${`--control-slider-color: ${d};`}
                  @value-changed=${this._onColorTempChange}
                >
                  <div slot="background" class="ct-background" 
                       style=${`background: linear-gradient(to top, ${this._kelvinToHex(h)}, ${this._kelvinToHex(l)});`}>
                  </div>
                </ha-control-slider>
              </div>
            </div>`:V}

        <div class="column brightness-column">

          <div class="slider-wrapper">
            <ha-control-slider
              .value=${i?this._brightnessPct??100:0}
              min="0" max="100" step="1"
              mode="start" vertical ?show-handle=${i} unit="%"
              style=${i?"":"--control-slider-color: transparent;"}
              @value-changed=${this._onBrightnessChange}
            ></ha-control-slider>
          </div>
        </div>

        <div class="column power-column">
          <button class="power-btn" @click=${this._togglePower} title="Zapnout / Vypnout">
            <svg viewBox="0 0 100 100" class="power-icon">
              <!-- Background matched roughly to dark theme -->
              <circle cx="50" cy="50" r="50" fill=${i?"#525252ff":"#272727"} />
              <!-- Power symbol paths -->
              <g transform="translate(0, -6)">
                <path d="M50 26 V52 M32 38 A 28 28 0 1 0 68 38" stroke=${i?"#ffffff":"#b0b0b0"} stroke-width="8" stroke-linecap="round" fill="none" />
              </g>
            </svg>
          </button>
        </div>
      </div>

      ${a?F`<div class="color-section">

            
            <div class="native-coloris-picker">
              <div class="color-gradient" 
                   style=${`background-color: hsl(${this._currentHue}, 100%, 50%)`}
                   @mousedown=${this._startDragColor}
                   @touchstart=${this._startDragColor}>
                <div class="gradient-white"></div>
                <div class="gradient-black"></div>
                <div class="color-marker" style=${`left: ${this._markerX}%; top: ${this._markerY}%`}></div>
              </div>
              
              <div class="hue-slider-wrap">
                 <input type="range" class="hue-slider" min="0" max="360" 
                        .value=${this._currentHue} 
                        @input=${this._onHueInput} />
              </div>
            
              <div class="swatches">
                 ${["#ff0000","#ff8000","#ffff00","#80ff00","#00ff00","#00ff80","#00ffff","#0080ff","#0000ff","#8000ff","#ff00ff","#ff0080","#ffffff"].map(t=>F`<button style="background: ${t}" @click=${()=>this._pickSwatch(t)}></button>`)}
              </div>
            </div>

          </div>`:V}
    </div>`}static get styles(){return n`
      :host {
        display: block;
        box-sizing: border-box;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        color: var(--primary-text-color, #ffffff);
      }

      .wrapper {
        background: var(--dialog-background-color, #202124);
        color: var(--primary-text-color, #ffffff);
        border-radius: 16px;
        padding: 16px;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
      }



      .sliders-row {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        justify-items: center;
        align-items: center;
        width: 100%;
        margin-bottom: 24px;
        padding: 0 16px; /* give some outer margin */
        box-sizing: border-box;
      }

      .color-temp-column {
        grid-column: 1 / 2;
        justify-self: start;
      }

      .brightness-column {
        grid-column: 2 / 3;
      }

      .power-column {
        grid-column: 3 / 4;
        justify-self: end;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .power-btn {
        background: transparent;
        border: none;
        padding: 0;
        cursor: pointer;
        outline: none;
        border-radius: 50%;
        width: 80px; 
        height: 80px; 
        transition: transform 0.15s ease, filter 0.15s ease;
      }

      .power-btn:hover {
        transform: scale(1.05);
        filter: brightness(1.2);
      }

      .power-icon {
        width: 100%;
        height: 100%;
        display: block;
      }

      .brightness-column ha-control-slider {
        --control-slider-thickness: 80px;
        --control-slider-border-radius: 24px;
      }

      .column {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }

      .label { font-size: 0.9rem; opacity: 0.9; }
      .value { font-size: 0.8rem; opacity: 0.7; }

      .slider-wrapper {
        height: 220px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .ct-background {
        border-radius: var(--control-slider-border-radius);
        opacity: 0.35;
      }

      .color-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        width: 100%;
      }

      /* Native Color Picker imitating Coloris */
      .native-coloris-picker {
        width: 100%;
        background: transparent;
        display: flex;
        flex-direction: column;
      }

      .color-gradient {
        width: 100%;
        height: 140px;
        position: relative;
        border-radius: 8px 8px 0 0;
        cursor: crosshair;
        overflow: hidden;
        touch-action: none;
      }
      
      .gradient-white {
        position: absolute; inset: 0; 
        background: linear-gradient(to right, #fff, rgba(255,255,255,0));
        pointer-events: none;
      }
      
      .gradient-black {
        position: absolute; inset: 0; 
        background: linear-gradient(to top, #000, rgba(0,0,0,0));
        pointer-events: none;
      }
      
      .color-marker {
        position: absolute;
        width: 12px; height: 12px;
        border-radius: 50%;
        border: 2px solid #fff;
        transform: translate(-50%, -50%);
        pointer-events: none;
        box-shadow: 0 0 2px rgba(0,0,0,0.5);
        z-index: 2;
      }

      .hue-slider-wrap {
        margin: 14px 10px;
      }
      
      .hue-slider {
        width: 100%;
        height: 12px;
        -webkit-appearance: none;
        appearance: none;
        background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
        border-radius: 6px;
        outline: none;
        margin: 0;
      }
      
      .hue-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 18px; height: 18px;
        border-radius: 50%;
        background: #fff;
        border: 1px solid #ccc;
        box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        cursor: grab;
      }
      .hue-slider::-moz-range-thumb {
        width: 18px; height: 18px;
        border-radius: 50%;
        background: #fff;
        border: 1px solid #ccc;
        box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        cursor: grab;
      }

      .swatches { 
        display: flex; 
        flex-wrap: wrap; 
        gap: 8px; 
        margin: 0 6px 12px 6px; 
      }
      
      .swatches button { 
        width: 22px; 
        height: 22px; 
        border-radius: 4px; 
        border: none; 
        cursor: pointer; 
        padding: 0;
        box-shadow: 0 0 0 1px rgba(255,255,255,0.1); 
      }
      
      .swatches button:hover {
        transform: scale(1.1);
      }

      @media (max-width: 600px) {
        .sliders-row { gap: 16px; }
        .slider-wrapper { height: 150px; }
      }
    `}};t([pt()],ut.prototype,"_config",void 0),t([pt()],ut.prototype,"_brightnessPct",void 0),t([pt()],ut.prototype,"_colorTemp",void 0),t([pt()],ut.prototype,"_currentHue",void 0),t([pt()],ut.prototype,"_markerX",void 0),t([pt()],ut.prototype,"_markerY",void 0),t([
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function(t){return(e,i,s)=>((t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i))(e,i,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}(".color-gradient")],ut.prototype,"_gradientArea",void 0),t([dt({attribute:!1})],ut.prototype,"hass",null),ut=t([(t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})("light-entity-dialog")],ut),window.customCards=window.customCards||[],window.customCards.push({type:"light-entity-dialog",name:"Light Entity Dialog",description:"Custom dialog for HA lights with native inline color picker."});export{ut as LightEntityDialog};
//# sourceMappingURL=light-entity-dialog.js.map
