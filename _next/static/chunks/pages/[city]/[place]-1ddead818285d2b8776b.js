(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[57],{2318:function(e,t,n){"use strict";var r=n(2122),a=n(1253),o=n(7294),i=(n(5697),n(6010)),l=n(8786),c=n(3871),s={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",subtitle1:"h6",subtitle2:"h6",body1:"p",body2:"p"},u=o.forwardRef((function(e,t){var n=e.align,l=void 0===n?"inherit":n,u=e.classes,d=e.className,p=e.color,f=void 0===p?"initial":p,h=e.component,m=e.display,v=void 0===m?"initial":m,y=e.gutterBottom,g=void 0!==y&&y,x=e.noWrap,b=void 0!==x&&x,Z=e.paragraph,E=void 0!==Z&&Z,C=e.variant,j=void 0===C?"body1":C,w=e.variantMapping,k=void 0===w?s:w,M=(0,a.Z)(e,["align","classes","className","color","component","display","gutterBottom","noWrap","paragraph","variant","variantMapping"]),N=h||(E?"p":k[j]||s[j])||"span";return o.createElement(N,(0,r.Z)({className:(0,i.Z)(u.root,d,"inherit"!==j&&u[j],"initial"!==f&&u["color".concat((0,c.Z)(f))],b&&u.noWrap,g&&u.gutterBottom,E&&u.paragraph,"inherit"!==l&&u["align".concat((0,c.Z)(l))],"initial"!==v&&u["display".concat((0,c.Z)(v))]),ref:t},M))}));t.Z=(0,l.Z)((function(e){return{root:{margin:0},body2:e.typography.body2,body1:e.typography.body1,caption:e.typography.caption,button:e.typography.button,h1:e.typography.h1,h2:e.typography.h2,h3:e.typography.h3,h4:e.typography.h4,h5:e.typography.h5,h6:e.typography.h6,subtitle1:e.typography.subtitle1,subtitle2:e.typography.subtitle2,overline:e.typography.overline,srOnly:{position:"absolute",height:1,width:1,overflow:"hidden"},alignLeft:{textAlign:"left"},alignCenter:{textAlign:"center"},alignRight:{textAlign:"right"},alignJustify:{textAlign:"justify"},noWrap:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},gutterBottom:{marginBottom:"0.35em"},paragraph:{marginBottom:16},colorInherit:{color:"inherit"},colorPrimary:{color:e.palette.primary.main},colorSecondary:{color:e.palette.secondary.main},colorTextPrimary:{color:e.palette.text.primary},colorTextSecondary:{color:e.palette.text.secondary},colorError:{color:e.palette.error.main},displayInline:{display:"inline"},displayBlock:{display:"block"}}}),{name:"MuiTypography"})(u)},8538:function(e,t,n){"use strict";var r=n(5318),a=n(862);t.Z=void 0;var o=a(n(7294)),i=(0,r(n(2108)).default)(o.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"}),"MonetizationOnOutlined");t.Z=i},2167:function(e,t,n){"use strict";var r=n(3848),a=n(9448);t.default=void 0;var o=a(n(7294)),i=n(9414),l=n(4651),c=n(7426),s={};function u(e,t,n,r){if(e&&(0,i.isLocalURL)(t)){e.prefetch(t,n,r).catch((function(e){0}));var a=r&&"undefined"!==typeof r.locale?r.locale:e&&e.locale;s[t+"%"+n+(a?"%"+a:"")]=!0}}var d=function(e){var t,n=!1!==e.prefetch,a=(0,l.useRouter)(),d=o.default.useMemo((function(){var t=(0,i.resolveHref)(a,e.href,!0),n=r(t,2),o=n[0],l=n[1];return{href:o,as:e.as?(0,i.resolveHref)(a,e.as):l||o}}),[a,e.href,e.as]),p=d.href,f=d.as,h=e.children,m=e.replace,v=e.shallow,y=e.scroll,g=e.locale;"string"===typeof h&&(h=o.default.createElement("a",null,h));var x=(t=o.Children.only(h))&&"object"===typeof t&&t.ref,b=(0,c.useIntersection)({rootMargin:"200px"}),Z=r(b,2),E=Z[0],C=Z[1],j=o.default.useCallback((function(e){E(e),x&&("function"===typeof x?x(e):"object"===typeof x&&(x.current=e))}),[x,E]);(0,o.useEffect)((function(){var e=C&&n&&(0,i.isLocalURL)(p),t="undefined"!==typeof g?g:a&&a.locale,r=s[p+"%"+f+(t?"%"+t:"")];e&&!r&&u(a,p,f,{locale:t})}),[f,p,C,g,n,a]);var w={ref:j,onClick:function(e){t.props&&"function"===typeof t.props.onClick&&t.props.onClick(e),e.defaultPrevented||function(e,t,n,r,a,o,l,c){("A"!==e.currentTarget.nodeName||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&(0,i.isLocalURL)(n))&&(e.preventDefault(),null==l&&r.indexOf("#")>=0&&(l=!1),t[a?"replace":"push"](n,r,{shallow:o,locale:c,scroll:l}))}(e,a,p,f,m,v,y,g)},onMouseEnter:function(e){(0,i.isLocalURL)(p)&&(t.props&&"function"===typeof t.props.onMouseEnter&&t.props.onMouseEnter(e),u(a,p,f,{priority:!0}))}};if(e.passHref||"a"===t.type&&!("href"in t.props)){var k="undefined"!==typeof g?g:a&&a.locale,M=a&&a.isLocaleDomain&&(0,i.getDomainLocale)(f,k,a&&a.locales,a&&a.domainLocales);w.href=M||(0,i.addBasePath)((0,i.addLocale)(f,k,a&&a.defaultLocale))}return o.default.cloneElement(t,w)};t.default=d},7426:function(e,t,n){"use strict";var r=n(3848);t.__esModule=!0,t.useIntersection=function(e){var t=e.rootMargin,n=e.disabled||!i,c=(0,a.useRef)(),s=(0,a.useState)(!1),u=r(s,2),d=u[0],p=u[1],f=(0,a.useCallback)((function(e){c.current&&(c.current(),c.current=void 0),n||d||e&&e.tagName&&(c.current=function(e,t,n){var r=function(e){var t=e.rootMargin||"",n=l.get(t);if(n)return n;var r=new Map,a=new IntersectionObserver((function(e){e.forEach((function(e){var t=r.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)}))}),e);return l.set(t,n={id:t,observer:a,elements:r}),n}(n),a=r.id,o=r.observer,i=r.elements;return i.set(e,t),o.observe(e),function(){i.delete(e),o.unobserve(e),0===i.size&&(o.disconnect(),l.delete(a))}}(e,(function(e){return e&&p(e)}),{rootMargin:t}))}),[n,t,d]);return(0,a.useEffect)((function(){if(!i&&!d){var e=(0,o.requestIdleCallback)((function(){return p(!0)}));return function(){return(0,o.cancelIdleCallback)(e)}}}),[d]),[f,d]};var a=n(7294),o=n(3447),i="undefined"!==typeof IntersectionObserver;var l=new Map},1795:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return $}});var r=n(5893),a=n(7294),o=n(3832),i=n(46),l=n(2822),c=n(2318),s=n(998),u=n(2122),d=n(7329),p=n(1253),f=(n(9864),n(5697),n(6010)),h=n(8786),m=n(9693),v=n(5209),y=(0,v.Z)(a.createElement("path",{d:"M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}),"MoreHoriz"),g=n(4720);var x=(0,h.Z)((function(e){return{root:{display:"flex",marginLeft:e.spacing(.5),marginRight:e.spacing(.5),backgroundColor:e.palette.grey[100],color:e.palette.grey[700],borderRadius:2,cursor:"pointer","&:hover, &:focus":{backgroundColor:e.palette.grey[200]},"&:active":{boxShadow:e.shadows[0],backgroundColor:(0,m._4)(e.palette.grey[200],.12)}},icon:{width:24,height:16}}}),{name:"PrivateBreadcrumbCollapsed"})((function(e){var t=e.classes,n=(0,p.Z)(e,["classes"]);return a.createElement(g.Z,(0,u.Z)({component:"li",className:t.root,focusRipple:!0},n),a.createElement(y,{className:t.icon}))}));var b=a.forwardRef((function(e,t){var n=e.children,r=e.classes,o=e.className,i=e.component,l=void 0===i?"nav":i,s=e.expandText,h=void 0===s?"Show path":s,m=e.itemsAfterCollapse,v=void 0===m?1:m,y=e.itemsBeforeCollapse,g=void 0===y?1:y,b=e.maxItems,Z=void 0===b?8:b,E=e.separator,C=void 0===E?"/":E,j=(0,p.Z)(e,["children","classes","className","component","expandText","itemsAfterCollapse","itemsBeforeCollapse","maxItems","separator"]),w=a.useState(!1),k=w[0],M=w[1],N=a.Children.toArray(n).filter((function(e){return a.isValidElement(e)})).map((function(e,t){return a.createElement("li",{className:r.li,key:"child-".concat(t)},e)}));return a.createElement(c.Z,(0,u.Z)({ref:t,component:l,color:"textSecondary",className:(0,f.Z)(r.root,o)},j),a.createElement("ol",{className:r.ol},function(e,t,n){return e.reduce((function(r,o,i){return i<e.length-1?r=r.concat(o,a.createElement("li",{"aria-hidden":!0,key:"separator-".concat(i),className:t},n)):r.push(o),r}),[])}(k||Z&&N.length<=Z?N:function(e){return g+v>=e.length?e:[].concat((0,d.Z)(e.slice(0,g)),[a.createElement(x,{"aria-label":h,key:"ellipsis",onClick:function(e){M(!0);var t=e.currentTarget.parentNode.querySelector("a[href],button,[tabindex]");t&&t.focus()}})],(0,d.Z)(e.slice(e.length-v,e.length)))}(N),r.separator,C)))})),Z=(0,h.Z)({root:{},ol:{display:"flex",flexWrap:"wrap",alignItems:"center",padding:0,margin:0,listStyle:"none"},li:{},separator:{display:"flex",userSelect:"none",marginLeft:8,marginRight:8}},{name:"MuiBreadcrumbs"})(b),E=n(8538),C=n(1163),j=n(4699),w=n(8920),k=n(5001),M=n(7161),N=n(4896),L=n(3834),S=n(3871),R=(0,v.Z)(a.createElement("path",{d:"M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"}),"Star");function A(e,t){if(null==e)return e;var n=Math.round(e/t)*t;return Number(n.toFixed(function(e){var t=e.toString().split(".")[1];return t?t.length:0}(t)))}function z(e){e.value;var t=(0,p.Z)(e,["value"]);return a.createElement("span",t)}var T=a.createElement(R,{fontSize:"inherit"});function I(e){return"".concat(e," Star").concat(1!==e?"s":"")}var B=a.forwardRef((function(e,t){var n=e.classes,r=e.className,o=e.defaultValue,i=void 0===o?null:o,l=e.disabled,c=void 0!==l&&l,s=e.emptyIcon,d=e.emptyLabelText,h=void 0===d?"Empty":d,m=e.getLabelText,v=void 0===m?I:m,y=e.icon,g=void 0===y?T:y,x=e.IconContainerComponent,b=void 0===x?z:x,Z=e.max,E=void 0===Z?5:Z,C=e.name,R=e.onChange,B=e.onChangeActive,F=e.onMouseLeave,_=e.onMouseMove,O=e.precision,H=void 0===O?1:O,V=e.readOnly,W=void 0!==V&&V,$=e.size,q=void 0===$?"medium":$,P=e.value,D=(0,p.Z)(e,["classes","className","defaultValue","disabled","emptyIcon","emptyLabelText","getLabelText","icon","IconContainerComponent","max","name","onChange","onChangeActive","onMouseLeave","onMouseMove","precision","readOnly","size","value"]),X=(0,k.Z)(C),K=(0,M.Z)({controlled:P,default:i,name:"Rating"}),U=(0,j.Z)(K,2),J=U[0],Q=U[1],Y=A(J,H),G=(0,w.Z)(),ee=a.useState({hover:-1,focus:-1}),te=ee[0],ne=te.hover,re=te.focus,ae=ee[1],oe=Y;-1!==ne&&(oe=ne),-1!==re&&(oe=re);var ie=(0,N.Z)(),le=ie.isFocusVisible,ce=ie.onBlurVisible,se=ie.ref,ue=a.useState(!1),de=ue[0],pe=ue[1],fe=a.useRef(),he=(0,L.Z)(se,fe),me=(0,L.Z)(he,t),ve=function(e){var t=parseFloat(e.target.value);Q(t),R&&R(e,t)},ye=function(e){0===e.clientX&&0===e.clientY||(ae({hover:-1,focus:-1}),Q(null),R&&parseFloat(e.target.value)===Y&&R(e,null))},ge=function(e){le(e)&&pe(!0);var t=parseFloat(e.target.value);ae((function(e){return{hover:e.hover,focus:t}})),B&&re!==t&&B(e,t)},xe=function(e){if(-1===ne){!1!==de&&(pe(!1),ce());ae((function(e){return{hover:e.hover,focus:-1}})),B&&-1!==re&&B(e,-1)}},be=function(e,t){var r="".concat(X,"-").concat(String(e.value).replace(".","-")),o=a.createElement(b,{value:e.value,className:(0,f.Z)(n.icon,e.filled?n.iconFilled:n.iconEmpty,e.hover&&n.iconHover,e.focus&&n.iconFocus,e.active&&n.iconActive)},s&&!e.filled?s:g);return W?a.createElement("span",(0,u.Z)({key:e.value},t),o):a.createElement(a.Fragment,{key:e.value},a.createElement("label",(0,u.Z)({className:n.label,htmlFor:r},t),o,a.createElement("span",{className:n.visuallyhidden},v(e.value))),a.createElement("input",{onFocus:ge,onBlur:xe,onChange:ve,onClick:ye,disabled:c,value:e.value,id:r,type:"radio",name:X,checked:e.checked,className:n.visuallyhidden}))};return a.createElement("span",(0,u.Z)({ref:me,onMouseMove:function(e){_&&_(e);var t,n=fe.current,r=n.getBoundingClientRect(),a=r.right,o=r.left,i=n.firstChild.getBoundingClientRect().width;t="rtl"===G.direction?(a-e.clientX)/(i*E):(e.clientX-o)/(i*E);var l=A(E*t+H/2,H);l=function(e,t,n){return e<t?t:e>n?n:e}(l,H,E),ae((function(e){return e.hover===l&&e.focus===l?e:{hover:l,focus:l}})),pe(!1),B&&ne!==l&&B(e,l)},onMouseLeave:function(e){F&&F(e);ae({hover:-1,focus:-1}),B&&-1!==ne&&B(e,-1)},className:(0,f.Z)(n.root,r,"medium"!==q&&n["size".concat((0,S.Z)(q))],c&&n.disabled,de&&n.focusVisible,W&&n.readOnly),role:W?"img":null,"aria-label":W?v(oe):null},D),Array.from(new Array(E)).map((function(e,t){var r=t+1;if(H<1){var o=Array.from(new Array(1/H));return a.createElement("span",{key:r,className:(0,f.Z)(n.decimal,r===Math.ceil(oe)&&(-1!==ne||-1!==re)&&n.iconActive)},o.map((function(e,t){var n=A(r-1+(t+1)*H,H);return be({value:n,filled:n<=oe,hover:n<=ne,focus:n<=re,checked:n===Y},{style:o.length-1===t?{}:{width:n===oe?"".concat((t+1)*H*100,"%"):"0%",overflow:"hidden",zIndex:1,position:"absolute"}})})))}return be({value:r,active:r===oe&&(-1!==ne||-1!==re),filled:r<=oe,hover:r<=ne,focus:r<=re,checked:r===Y})})),!W&&!c&&null==Y&&a.createElement(a.Fragment,null,a.createElement("input",{value:"",id:"".concat(X,"-empty"),type:"radio",name:X,defaultChecked:!0,className:n.visuallyhidden}),a.createElement("label",{className:n.pristine,htmlFor:"".concat(X,"-empty")},a.createElement("span",{className:n.visuallyhidden},h))))})),F=(0,h.Z)((function(e){return{root:{display:"inline-flex",position:"relative",fontSize:e.typography.pxToRem(24),color:"#ffb400",cursor:"pointer",textAlign:"left",WebkitTapHighlightColor:"transparent","&$disabled":{opacity:.5,pointerEvents:"none"},"&$focusVisible $iconActive":{outline:"1px solid #999"}},sizeSmall:{fontSize:e.typography.pxToRem(18)},sizeLarge:{fontSize:e.typography.pxToRem(30)},readOnly:{pointerEvents:"none"},disabled:{},focusVisible:{},visuallyhidden:{border:0,clip:"rect(0 0 0 0)",height:1,margin:-1,color:"#000",overflow:"hidden",padding:0,position:"absolute",top:20,width:1},pristine:{"input:focus + &":{top:0,bottom:0,position:"absolute",outline:"1px solid #999",width:"100%"}},label:{cursor:"inherit"},icon:{display:"flex",transition:e.transitions.create("transform",{duration:e.transitions.duration.shortest}),pointerEvents:"none"},iconEmpty:{color:e.palette.action.disabled},iconFilled:{},iconHover:{},iconFocus:{},iconActive:{transform:"scale(1.2)"},decimal:{position:"relative"}}}),{name:"MuiRating"})(B);function _(){return(0,r.jsx)(F,{name:"read-only",value:1,readOnly:!0,precision:.5})}var O=n(1664);function H(){var e=(0,C.useRouter)();return(0,r.jsxs)(i.Z,{maxWidth:"60%",style:{flexDirection:"column"},children:[(0,r.jsxs)(Z,{separator:"\u203a\u203a","aria-label":"breadcrumb",children:[(0,r.jsx)(O.default,{as:"/",href:"/",children:(0,r.jsx)("a",{children:"Home"})}),(0,r.jsx)(O.default,{as:"/".concat(e.query.city),href:"/[city]",children:(0,r.jsx)("a",{children:e.query.city})}),(0,r.jsx)(O.default,{as:"/".concat(e.query.city,"/").concat(e.query.place),href:"/[city]/[place]",children:(0,r.jsx)("a",{children:e.query.place})})]}),(0,r.jsxs)(c.Z,{children:["Shop/Cua Hang/Quan An -"," ",(0,r.jsx)(O.default,{as:"/",href:"/",children:(0,r.jsx)("a",{children:"Chi nhanh"})})]}),(0,r.jsx)(c.Z,{variant:"h4",children:e.query.place}),(0,r.jsx)(c.Z,{variant:"body2",children:"Dia Chi"}),(0,r.jsx)(_,{}),(0,r.jsx)(c.Z,{variant:"body1",children:"Closed"}),(0,r.jsxs)(c.Z,{children:[(0,r.jsx)(E.Z,{}),"100.000\u0111"]})]})}var V=n(6328),W=n(7446);function $(){var e=Array.from(new Set(q.map((function(e){return e.category}))));return(0,r.jsxs)(o.Z,{maxWidth:"lg",children:[(0,r.jsxs)(i.Z,{display:"flex",mt:1,style:{gap:"1%"},children:[(0,r.jsx)(W.Z,{component:"img",image:"".concat(V.O,"/chicken.jpg"),title:"img",height:300,style:{maxWidth:"50vw"}}),(0,r.jsx)(H,{})]}),(0,r.jsxs)(i.Z,{display:"flex",mt:2,style:{gap:"1%"},children:[(0,r.jsxs)(l.Z,{component:"nav",children:[(0,r.jsx)(c.Z,{variant:"h4",children:"Menu"}),e.map((function(e){return(0,r.jsx)(s.Z,{button:!0,children:e},"menu".concat(e))}))]}),(0,r.jsxs)(i.Z,{flex:"1",children:[(0,r.jsx)(c.Z,{children:"promotions"}),(0,r.jsx)(l.Z,{children:e.map((function(e){return(0,r.jsxs)(a.Fragment,{children:[(0,r.jsx)(c.Z,{children:e}),q.map((function(t){return t.category===e?(0,r.jsx)(s.Z,{button:!0,children:t.name},t.name):(0,r.jsx)(r.Fragment,{})}))]},"list".concat(e))}))})]})]})]})}var q=[{category:"meatttttttttttttttttttttttttttttttttttttttttt",name:"beef",price:"7$"},{category:"meat",name:"steak",price:"8$"},{category:"meat",name:"goat",price:"9$"},{category:"fruit",name:"apple",price:"10$"},{category:"fruit",name:"weed",price:"11$"},{category:"cake",name:"pipe",price:"12$"}]},9209:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/[city]/[place]",function(){return n(1795)}])},1664:function(e,t,n){e.exports=n(2167)}},function(e){e.O(0,[774,888,179],(function(){return t=9209,e(e.s=t);var t}));var t=e.O();_N_E=t}]);