"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[373,32],{9032:function(e,r,t){t.r(r),t.d(r,{ProfileUser:function(){return i},default:function(){return o}});var n=t(9439),a=t(2791),l=t(184),i=(0,a.createContext)();function o(e){var r=e.children,t=(0,a.useState)({fullName:"",entity:"",supplierName:""}),o=(0,n.Z)(t,2),c=o[0],s=o[1];return(0,l.jsx)(i.Provider,{value:{profileUser:c,setProfileUser:s},children:r})}},9964:function(e,r,t){t.r(r),t.d(r,{default:function(){return S}});var n=t(4165),a=t(5861),l=t(9439),i=t(2791),o=t(3306),c=t(4947),s=t(7689),u=t(1044),d=t(1413),f=t(9032),m=t(5863),h=t(824),p=t(7717),g=t(5777),v=t(9194),x=t(184),Z=function(){u.ZP.defaults.withCredentials=!0;var e=(0,s.s0)(),r=(0,i.useContext)(o.EmailUser),t=r.emailLog,c=r.setEmailLog,Z=(0,i.useContext)(f.ProfileUser),y=Z.profileUser,b=Z.setProfileUser,j=(0,i.useState)(""),S=(0,l.Z)(j,2),E=(S[0],S[1]),N=(0,i.useState)(!1),k=(0,l.Z)(N,2),C=k[0],w=k[1],P=(0,i.useState)(!0),I=(0,l.Z)(P,2),_=I[0],z=I[1],O=function(){var r=(0,a.Z)((0,n.Z)().mark((function r(a){return(0,n.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return a.preventDefault(),r.next=3,u.ZP.post("https://empty-test-project.herokuapp.com/createprofile",{Email:t,FullName:y.fullName,Entity:y.entity,SupplierName:y.supplierName}).then((function(){w(!0),setTimeout((function(){return e("/home",{replace:!0})}),1e3)}));case 3:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}();return(0,i.useEffect)((function(){u.ZP.get("https://empty-test-project.herokuapp.com/login").then((function(r){!0===r.data.loggedIn?(c(r.data.email),E(r.data.role)):e("/",{replace:!0})}),{withCredentials:!0})}),[]),(0,x.jsx)("form",{className:"formPayg",method:"POST",encType:"multipart/form-data",onSubmit:O,children:(0,x.jsxs)(m.NI,{isRequired:!0,margin:1,children:[(0,x.jsx)(m.lX,{children:"Email"}),(0,x.jsx)(h.II,{type:"text",value:t,onChange:function(e){b(e.target.value)}}),(0,x.jsx)(m.lX,{children:"Full Name"}),(0,x.jsx)(h.II,{type:"text",value:y.fullName,onChange:function(e){b((0,d.Z)((0,d.Z)({},y),{},{fullName:e.target.value}))}}),(0,x.jsx)(m.lX,{children:"Entity"}),(0,x.jsxs)(p.Ph,{placeholder:"Select Your Occupation",onChange:function(e){b((0,d.Z)((0,d.Z)({},y),{},{entity:e.target.value})),"Supplier"===e.target.value?z(!1):z(!0)},children:[(0,x.jsx)("option",{value:"BSI",children:"BSI"}),(0,x.jsx)("option",{value:"Supplier",children:"Supplier"})]}),!0===_?null:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(m.lX,{children:"Supplier Name"}),(0,x.jsx)(h.II,{type:"text",value:y.supplierName,onChange:function(e){b((0,d.Z)((0,d.Z)({},y),{},{supplierName:e.target.value}))}})]}),!1===C?(0,x.jsx)("div",{className:"btnSubmitPayg",children:(0,x.jsx)(g.zx,{type:"submit",children:"Submit"})}):(0,x.jsx)("div",{className:"btnSubmitPayg",children:(0,x.jsx)(v.$,{size:"lg"})})]})})},y=t(9712),b=t(4828),j=t.p+"static/media/BusinessMain3D.f98b3dd7821a8b45a105.png";function S(){u.ZP.defaults.withCredentials=!0;var e=(0,s.s0)(),r=(0,i.useContext)(o.EmailUser),t=(r.emailLog,r.setEmailLog),d=(0,i.useContext)(c.RoleUser),f=(d.roleUser,d.setRoleUser),m=(0,i.useState)(!0),h=(0,l.Z)(m,2),p=h[0],v=h[1],S=(0,i.useState)([]),E=(0,l.Z)(S,2),N=E[0],k=E[1],C=(0,i.useRef)(null),w=function(){var e=(0,a.Z)((0,n.Z)().mark((function e(){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u.ZP.get("https://empty-test-project.herokuapp.com/getprofile").then((function(e){k(e.data)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,i.useEffect)((function(){u.ZP.get("https://empty-test-project.herokuapp.com/login").then((function(r){!0===r.data.loggedIn?(t(r.data.email),f(r.data.role)):e("/",{replace:!0})}),{withCredentials:!0}),w()}),[]),(0,x.jsx)(y.W2,{maxW:"5xl",children:(0,x.jsxs)(y.Kq,{textAlign:"center",align:"center",spacing:{base:8,md:10},py:{base:20,md:28},children:[(0,x.jsxs)(y.X6,{fontWeight:600,fontSize:{base:"3xl",sm:"4xl",md:"6xl"},lineHeight:"110%",children:["Welcome to"," ",(0,x.jsx)(y.xv,{as:"span",color:"orange.400",children:"BSI Portal Supplier"})]}),(0,x.jsxs)(y.xv,{color:"gray.500",maxW:"3xl",children:["Never miss a meeting. Never be late for one too. Keep track of your meetings and receive smart reminders in appropriate times. Read your smart \u201cDaily Agenda\u201d every morning. ",(0,x.jsx)("br",{}),"Before you go to BSI Supplier Portal, please create your profil first so we know who you are."]}),(0,x.jsxs)(y.Kq,{spacing:6,direction:"row",children:[""===N.CompanyName||N.length<=0?(0,x.jsx)(g.zx,{width:150,rounded:"full",px:6,colorScheme:"orange",bg:"orange.400",_hover:{bg:"orange.500"},onClick:function(){return v(!1),void setTimeout((function(){var e;return null===(e=C.current)||void 0===e?void 0:e.scrollIntoView({behavior:"smooth"},500)}))},children:"Create Profile"}):null,""===N.CompanyName||N.length<=0?null:(0,x.jsx)("a",{href:"/home",children:(0,x.jsx)(g.zx,{width:150,rounded:"full",px:6,colorScheme:"orange",bg:"orange.400",_hover:{bg:"orange.500"},children:"Home"})})]}),(0,x.jsx)(y.kC,{w:"full",justifyContent:"center",children:(0,x.jsx)(b.Ee,{src:j,fill:"none",alt:"",height:{sm:"24rem",lg:"28rem"},mt:{base:12,sm:16}})}),!1===p?(0,x.jsx)(y.Kq,{ref:C,children:(0,x.jsx)(Z,{})}):null]})})}},4828:function(e,r,t){t.d(r,{Ee:function(){return m}});var n=t(1413),a=t(5987),l=t(9439),i=t(7762),o=t(2791),c=t(1367),s=t(8104),u=["htmlWidth","htmlHeight","alt"],d=["fallbackSrc","fallback","src","srcSet","align","fit","loading","ignoreFallback","crossOrigin","fallbackStrategy","referrerPolicy"];var f=(0,c.Gp)((function(e,r){var t=e.htmlWidth,l=e.htmlHeight,i=e.alt,c=(0,a.Z)(e,u);return o.createElement("img",(0,n.Z)({width:t,height:l,ref:r,alt:i},c))}));f.displayName="NativeImage";var m=(0,c.Gp)((function(e,r){var t=e.fallbackSrc,u=e.fallback,m=e.src,h=e.srcSet,p=e.align,g=e.fit,v=e.loading,x=e.ignoreFallback,Z=e.crossOrigin,y=e.fallbackStrategy,b=void 0===y?"beforeLoadOrError":y,j=e.referrerPolicy,S=(0,a.Z)(e,d),E=null!=v||x||!(void 0!==t||void 0!==u),N=function(e){var r=e.loading,t=e.src,n=e.srcSet,a=e.onLoad,i=e.onError,c=e.crossOrigin,u=e.sizes,d=e.ignoreFallback,f=(0,o.useState)("pending"),m=(0,l.Z)(f,2),h=m[0],p=m[1];(0,o.useEffect)((function(){p(t?"loading":"pending")}),[t]);var g=(0,o.useRef)(),v=(0,o.useCallback)((function(){if(t){x();var e=new Image;e.src=t,c&&(e.crossOrigin=c),n&&(e.srcset=n),u&&(e.sizes=u),r&&(e.loading=r),e.onload=function(e){x(),p("loaded"),null==a||a(e)},e.onerror=function(e){x(),p("failed"),null==i||i(e)},g.current=e}}),[t,c,n,u,a,i,r]),x=function(){g.current&&(g.current.onload=null,g.current.onerror=null,g.current=null)};return(0,s.G)((function(){if(!d)return"loading"===h&&v(),function(){x()}}),[h,v,d]),d?"loaded":h}((0,n.Z)((0,n.Z)({},e),{},{ignoreFallback:E})),k=function(e,r){return"loaded"!==e&&"beforeLoadOrError"===r||"failed"===e&&"onError"===r}(N,b),C=(0,n.Z)({ref:r,objectFit:g,objectPosition:p},E?S:function(e){var r,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=Object.assign({},e),a=(0,i.Z)(t);try{for(a.s();!(r=a.n()).done;){var l=r.value;l in n&&delete n[l]}}catch(o){a.e(o)}finally{a.f()}return n}(S,["onError","onLoad"]));return k?u||o.createElement(c.m$.img,(0,n.Z)({as:f,className:"chakra-image__placeholder",src:t},C)):o.createElement(c.m$.img,(0,n.Z)({as:f,src:m,srcSet:h,crossOrigin:Z,loading:v,referrerPolicy:j,className:"chakra-image"},C))}));m.displayName="Image";(0,c.Gp)((function(e,r){return o.createElement(c.m$.img,(0,n.Z)({ref:r,as:f,className:"chakra-image"},e))}))},7717:function(e,r,t){t.d(r,{Ph:function(){return p}});var n=t(1413),a=t(5987),l=t(9439),i=t(2791),o=t(5863),c=t(1367),s=t(2965),u=["children","placeholder","className"],d=["rootProps","placeholder","icon","color","height","h","minH","minHeight","iconColor","iconSize"],f=["children"],m=function(){for(var e=arguments.length,r=new Array(e),t=0;t<e;t++)r[t]=arguments[t];return r.filter(Boolean).join(" ")};var h=(0,c.Gp)((function(e,r){var t=e.children,l=e.placeholder,o=e.className,s=(0,a.Z)(e,u);return i.createElement(c.m$.select,(0,n.Z)((0,n.Z)({},s),{},{ref:r,className:m("chakra-select",o)}),l&&i.createElement("option",{value:""},l),t)}));h.displayName="SelectField";var p=(0,c.Gp)((function(e,r){var t,u,f=(0,c.jC)("Select",e),m=(0,s.Lr)(e),p=m.rootProps,g=m.placeholder,v=m.icon,Z=m.color,y=m.height,b=m.h,j=m.minH,S=m.minHeight,E=m.iconColor,N=m.iconSize,k=function(e,r){for(var t={},n={},a=0,i=Object.entries(e);a<i.length;a++){var o=(0,l.Z)(i[a],2),c=o[0],s=o[1];r.includes(c)?t[c]=s:n[c]=s}return[t,n]}((0,a.Z)(m,d),s.oE),C=(0,l.Z)(k,2),w=C[0],P=C[1],I=(0,o.Yp)(P),_={width:"100%",height:"fit-content",position:"relative",color:Z},z=(0,n.Z)((0,n.Z)({paddingEnd:"2rem"},f.field),{},{_focus:(0,n.Z)({zIndex:"unset"},null==(t=f.field)?void 0:t._focus)});return i.createElement(c.m$.div,(0,n.Z)((0,n.Z)({className:"chakra-select__wrapper",__css:_},w),p),i.createElement(h,(0,n.Z)((0,n.Z)({ref:r,height:null!==b&&void 0!==b?b:y,minH:null!==j&&void 0!==j?j:S,placeholder:g},I),{},{__css:z}),e.children),i.createElement(x,(0,n.Z)((0,n.Z)({"data-disabled":(u=I.disabled,u?"":void 0)},(E||Z)&&{color:E||Z}),{},{__css:f.icon},N&&{fontSize:N}),v))}));p.displayName="Select";var g=function(e){return i.createElement("svg",(0,n.Z)({viewBox:"0 0 24 24"},e),i.createElement("path",{fill:"currentColor",d:"M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"}))},v=(0,c.m$)("div",{baseStyle:{position:"absolute",display:"inline-flex",alignItems:"center",justifyContent:"center",pointerEvents:"none",top:"50%",transform:"translateY(-50%)"}}),x=function(e){var r=e.children,t=void 0===r?i.createElement(g,null):r,l=(0,a.Z)(e,f),o=(0,i.cloneElement)(t,{role:"presentation",className:"chakra-select__icon",focusable:!1,"aria-hidden":!0,style:{width:"1em",height:"1em",color:"currentColor"}});return i.createElement(v,(0,n.Z)((0,n.Z)({},l),{},{className:"chakra-select__icon-wrapper"}),(0,i.isValidElement)(t)?o:null)};x.displayName="SelectIcon"}}]);
//# sourceMappingURL=373.afb560bf.chunk.js.map