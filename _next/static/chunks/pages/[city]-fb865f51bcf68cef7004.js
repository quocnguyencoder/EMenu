(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[161],{2167:function(e,t,n){"use strict";var r=n(3848),o=n(9448);t.default=void 0;var a=o(n(7294)),c=n(9414),i=n(4651),u=n(7426),l={};function f(e,t,n,r){if(e&&(0,c.isLocalURL)(t)){e.prefetch(t,n,r).catch((function(e){0}));var o=r&&"undefined"!==typeof r.locale?r.locale:e&&e.locale;l[t+"%"+n+(o?"%"+o:"")]=!0}}var s=function(e){var t,n=!1!==e.prefetch,o=(0,i.useRouter)(),s=a.default.useMemo((function(){var t=(0,c.resolveHref)(o,e.href,!0),n=r(t,2),a=n[0],i=n[1];return{href:a,as:e.as?(0,c.resolveHref)(o,e.as):i||a}}),[o,e.href,e.as]),p=s.href,d=s.as,v=e.children,y=e.replace,h=e.shallow,m=e.scroll,g=e.locale;"string"===typeof v&&(v=a.default.createElement("a",null,v));var b=(t=a.Children.only(v))&&"object"===typeof t&&t.ref,E=(0,u.useIntersection)({rootMargin:"200px"}),_=r(E,2),k=_[0],w=_[1],L=a.default.useCallback((function(e){k(e),b&&("function"===typeof b?b(e):"object"===typeof b&&(b.current=e))}),[b,k]);(0,a.useEffect)((function(){var e=w&&n&&(0,c.isLocalURL)(p),t="undefined"!==typeof g?g:o&&o.locale,r=l[p+"%"+d+(t?"%"+t:"")];e&&!r&&f(o,p,d,{locale:t})}),[d,p,w,g,n,o]);var M={ref:L,onClick:function(e){t.props&&"function"===typeof t.props.onClick&&t.props.onClick(e),e.defaultPrevented||function(e,t,n,r,o,a,i,u){("A"!==e.currentTarget.nodeName||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&(0,c.isLocalURL)(n))&&(e.preventDefault(),null==i&&r.indexOf("#")>=0&&(i=!1),t[o?"replace":"push"](n,r,{shallow:a,locale:u,scroll:i}))}(e,o,p,d,y,h,m,g)},onMouseEnter:function(e){(0,c.isLocalURL)(p)&&(t.props&&"function"===typeof t.props.onMouseEnter&&t.props.onMouseEnter(e),f(o,p,d,{priority:!0}))}};if(e.passHref||"a"===t.type&&!("href"in t.props)){var C="undefined"!==typeof g?g:o&&o.locale,x=o&&o.isLocaleDomain&&(0,c.getDomainLocale)(d,C,o&&o.locales,o&&o.domainLocales);M.href=x||(0,c.addBasePath)((0,c.addLocale)(d,C,o&&o.defaultLocale))}return a.default.cloneElement(t,M)};t.default=s},7426:function(e,t,n){"use strict";var r=n(3848);t.__esModule=!0,t.useIntersection=function(e){var t=e.rootMargin,n=e.disabled||!c,u=(0,o.useRef)(),l=(0,o.useState)(!1),f=r(l,2),s=f[0],p=f[1],d=(0,o.useCallback)((function(e){u.current&&(u.current(),u.current=void 0),n||s||e&&e.tagName&&(u.current=function(e,t,n){var r=function(e){var t=e.rootMargin||"",n=i.get(t);if(n)return n;var r=new Map,o=new IntersectionObserver((function(e){e.forEach((function(e){var t=r.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)}))}),e);return i.set(t,n={id:t,observer:o,elements:r}),n}(n),o=r.id,a=r.observer,c=r.elements;return c.set(e,t),a.observe(e),function(){c.delete(e),a.unobserve(e),0===c.size&&(a.disconnect(),i.delete(o))}}(e,(function(e){return e&&p(e)}),{rootMargin:t}))}),[n,t,s]);return(0,o.useEffect)((function(){if(!c&&!s){var e=(0,a.requestIdleCallback)((function(){return p(!0)}));return function(){return(0,a.cancelIdleCallback)(e)}}}),[s]),[d,s]};var o=n(7294),a=n(3447),c="undefined"!==typeof IntersectionObserver;var i=new Map},575:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return i}});var r=n(5893),o=n(1163),a=n(1664),c=n(46);function i(){var e=(0,o.useRouter)();return console.log(e.query),(0,r.jsx)(c.Z,{display:"flex",flexDirection:"column",children:u.map((function(t){return(0,r.jsx)(a.default,{as:"/".concat(e.query.city,"/").concat(t.name),href:"/[city]/[place]",children:(0,r.jsx)("a",{children:t.name})},t.name)}))})}var u=[{category:"meatttttttttttttttttttttttttttttttttttttttttt",name:"beef",price:"7$"},{category:"meat",name:"steak",price:"8$"},{category:"meat",name:"goat",price:"9$"},{category:"fruit",name:"apple",price:"10$"},{category:"fruit",name:"weed",price:"11$"},{category:"cake",name:"pipe",price:"12$"}]},4039:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/[city]",function(){return n(575)}])},1664:function(e,t,n){e.exports=n(2167)}},function(e){e.O(0,[774,888,179],(function(){return t=4039,e(e.s=t);var t}));var t=e.O();_N_E=t}]);