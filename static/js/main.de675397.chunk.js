(this.webpackJsonppathfinder=this.webpackJsonppathfinder||[]).push([[0],{13:function(e,t,n){},14:function(e,t,n){},17:function(e,t,n){},18:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(7),i=n.n(o),c=(n(13),n(5)),l=n(1),s=(n(14),function(e){for(var t={},n=0;n<e.length;n+=1)for(var a=0;a<e[n].length;a+=1)if(!e[n][a].isWall){var r=e[n][a].name,o={},i=0!==n?e[n-1][a]:null,c=n!==e.length-1?e[n+1][a]:null,l=0!==a?e[n][a-1]:null,s=a!==e[n].length-1?e[n][a+1]:null;l&&!l.isWall&&(o[l.name]=1),s&&!s.isWall&&(o[s.name]=1),i&&!i.isWall&&(o[i.name]=1),c&&!c.isWall&&(o[c.name]=1),t[r]=o}return t}),u=function(e,t){var n=null;return Object.keys(e).forEach((function(a){(null===n||e[a]<e[n])&&!t.includes(a)&&(n=a)})),n},f=function(e,t,n){if(void 0===e[t]||void 0===e[n])return[void 0,void 0];var a={};a[n]=1/0,a=Object.assign(a,e[t]);var r={target:null};Object.keys(e[t]).forEach((function(e){r[e]=t}));for(var o=[],i=u(a,o);i&&i!==n;){for(var c=a[i],l=e[i],s=Object.keys(l),f=0;f<s.length;f+=1)if(s[f]!==t){var d=c+l[s[f]];(!a[s[f]]||a[s[f]]>d)&&(a[s[f]]=d,r[s[f]]=i)}o.push(i),i=u(a,o)}for(var m=[n],v=r[n];v;)m.push(v),v=r[v];return m.reverse(),[m,o]};var d,m=function(e){var t=Object(a.useState)(2),n=Object(l.a)(t,2),o=n[0],i=n[1],c=Object(a.useState)(30),s=Object(l.a)(c,2),u=s[0],f=s[1],d=Object(a.useState)(2),m=Object(l.a)(d,2),v=m[0],h=m[1],b=Object(a.useState)(30),g=Object(l.a)(b,2),p=g[0],w=g[1],E=e.changeStart,M=e.changeTarget,j=e.isButtonDisabled,O=e.visualize,N=e.generateGrid,S=e.generateGridDisabled,y=e.resetGrid,x=function(e){var t=e.target,n=t.name,a=Number(t.value);"colStart"===n?(i(a),E(a,v)):"rowStart"===n?(h(a),E(o,a)):"colEnd"===n?(f(a),M(a,p)):(w(a),M(u,a))};return r.a.createElement("div",{className:"row my-3 justify-content-center input-group"},r.a.createElement("div",{className:"input-group-prepend"},r.a.createElement("span",{id:"startcol",className:"input-group-text"},"Start Col | End col | Start row | End row")),r.a.createElement("input",{type:"number",name:"colStart",max:31,min:"1",className:"form-control",onChange:x}),r.a.createElement("input",{type:"number",max:31,min:"1",name:"colEnd",className:"form-control",onChange:x}),r.a.createElement("input",{type:"number",max:31,min:"1",name:"rowStart",className:"form-control",onChange:x}),r.a.createElement("input",{type:"number",max:31,min:"1",name:"rowEnd",className:"form-control",onChange:x}),r.a.createElement("button",{onClick:function(e){O(v,o,p,u),e.preventDefault()},type:"submit",className:"btn btn-primary",disabled:j},"Press to graph"),r.a.createElement("button",{onClick:N,disabled:S,type:"submit",className:"btn btn-primary"},"Press for grid"),r.a.createElement("button",{onClick:function(){f(30),i(2),h(2),w(30),y()},type:"submit",className:"btn btn-primary"},"Reset"))},v=function(e,t){return Math.floor(Math.random()*(t-e+1)+e)},h=function e(t,n,a,r,o){if(t){if(a-n<2)return;var i=2*Math.floor(v(r,o)/2);!function(e,t,n){for(var a=2*Math.floor(v(e,t)/2)+1,r=e;r<t;r+=1)r!==a&&(d[n][r].isWall=!0)}(n,a,i),e(!1,n,a,r,i-1),e(!1,n,a,i+1,o)}else{if(o-r<2)return;var c=2*Math.floor(v(n,a)/2);!function(e,t,n){for(var a=2*Math.floor(v(e,t)/2)+1,r=e;r<t;r+=1)r!==a&&(d[r][n].isWall=!0)}(r,o,c),e(!0,n,c-1,r,o),e(!0,c+1,a,r,o)}},b=function(e){return d=e,function(){for(var e=d,t=0;t<d.length;t+=1)for(var n=0;n<d[t].length;n+=1)0!==t&&0!==n&&n!==d.length-1&&t!==d.length-1||(e[t][n].isWall=!0);d=e}(),h(!0,1,e.length-2,1,e.length-2),d},g=n(2),p=n.n(g);n(17);var w=function(e){var t=e.name,n=e.isPath,a=e.isWall,o=e.onMouseDown,i=e.onMouseUp,c=e.row,l=e.col,s=e.onMouseEnter,u=e.isVisited,f=e.isTarget,d=e.isStart,m=a?"wall":"",v=u?"visited":"";return f?r.a.createElement("div",{tabIndex:0,role:"button",id:t,className:"Node ".concat(n," ").concat(m," ").concat(v),onMouseDown:function(){return o(c,l)},onMouseUp:i,onMouseEnter:function(){return s(c,l)}},r.a.createElement("svg",{className:"bi bi-bullseye target align-baseline",width:"18px",height:"18px",viewBox:"0 0 16 16",fill:"#2A9D8F",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("path",{fillRule:"evenodd",d:"M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"}),r.a.createElement("path",{fillRule:"evenodd",d:"M8 13A5 5 0 1 0 8 3a5 5 0 0 0 0 10zm0 1A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"}),r.a.createElement("path",{fillRule:"evenodd",d:"M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"}),r.a.createElement("path",{d:"M9.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"}))):d?r.a.createElement("div",{tabIndex:0,role:"button",id:t,className:"Node ".concat(n," ").concat(m," ").concat(v),onMouseDown:function(){return o(c,l)},onMouseUp:i,onMouseEnter:function(){return s(c,l)}},r.a.createElement("svg",{className:"bi bi-house-fill align-baseline",width:"18px",height:"18px",viewBox:"0 0 16 16",fill:"#2A9D8F",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("path",{fillRule:"evenodd",d:"M8 3.293l6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"}),r.a.createElement("path",{fillRule:"evenodd",d:"M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"}))):r.a.createElement("div",{tabIndex:0,role:"button",id:t,className:"Node ".concat(n," ").concat(m," ").concat(v),onMouseDown:function(){return o(c,l)},onMouseUp:i,onMouseEnter:function(){return s(c,l)}})},E=(p.a.arrayOf(p.a.any).isRequired,p.a.func.isRequired,p.a.func.isRequired,p.a.func.isRequired,Object(a.forwardRef)((function(e,t){var n=e.nodes,a=e.onMouseDown,o=e.onMouseEnter,i=e.onMouseUp;return r.a.createElement("div",{role:"button",tabIndex:0,id:"grid-container",ref:t,className:"grid-container row justify-content-center"},n.map((function(e){return e.map((function(e){var t=e.isPath,n=e.name,c=e.row,l=e.col,s=e.isWall,u=e.isTarget,f=e.isStart,d=e.isVisited;return r.a.createElement(w,{isPath:t,name:n,row:c,col:l,isWall:s,isTarget:u,isStart:f,isVisited:d,onMouseDown:function(){return a(c,l)},onMouseUp:i,onMouseEnter:function(){return o(c,l)}})}))})))}))),M=function(e,t){return{isPath:!1,name:"col".concat(e+1,"row").concat(t+1),col:e+1,row:t+1,isWall:!1,isStart:!1,isTarget:!1,isVisited:!1}},j=function(){for(var e=[],t=0;t<31;t+=1){for(var n=[],a=0;a<31;a+=1)if(1===t&&1===a){var r=M(a,t);r.isStart=!0,n.push(r)}else if(29===t&&29===a){var o=M(a,t);o.isTarget=!0,n.push(o)}else n.push(M(a,t));e.push(n)}return e};var O=function(){var e=Object(a.useState)(j()),t=Object(l.a)(e,2),n=t[0],o=t[1],i=Object(a.useState)(!1),u=Object(l.a)(i,2),d=u[0],v=u[1],h=Object(a.useState)(!1),g=Object(l.a)(h,2),p=g[0],w=g[1],O=Object(a.useState)(!1),N=Object(l.a)(O,2),S=N[0],y=N[1],x=Object(a.useReducer)((function(e){return e+1}),0),W=Object(l.a)(x,2)[1],D=Object(a.useRef)(null);Object(a.useEffect)((function(){var e=j();o(e)}),[]);var T=function(e,t){var a=n;return a[e-1][t-1].isWall=!a[e-1][t-1].isWall,a};return r.a.createElement("div",{className:"App container"},r.a.createElement(m,{isButtonDisabled:p,visualize:function(e,t,a,r){o(function(){for(var e=n,t=0;t<31;t+=1)for(var a=0;a<31;a+=1)e[t][a].isPath=!1,e[t][a].isVisited=!1;return e}());var i=s(n),u=f(i,"col".concat(t,"row").concat(e),"col".concat(r,"row").concat(a)),d=Object(l.a)(u,2),m=d[0],v=d[1];if(void 0!==m&&void 0!==v){w(!0),function(e,t){if(void 0!==e)for(var n=function(n){if(n===e.length){for(var a=function(e){setTimeout((function(){if(D&&D.current){var n=Object(c.a)(D.current.children);n[n.findIndex((function(n){return n.id===t[e]}))].className="Node true"}}),15*n+30*e)},r=0;r<t.length;r+=1)a(r);return"break"}setTimeout((function(){if(D&&D.current){var t=Object(c.a)(D.current.children);t[t.findIndex((function(t){return t.id===e[n]}))].className="Node visited"}}),15*n)},a=0;a<=e.length;a+=1){if("break"===n(a))break}}(v,m);var h=15*v.length+30*m.length;!function(e){setTimeout((function(){w(!1)}),e)}(h),setTimeout((function(){o((function(){for(var e=n,t=0;t<n.length;t+=1)for(var a=0;a<n[t].length;a+=1)m.includes(n[t][a].name)?e[t][a].isPath=!0:v.includes(n[t][a].name)&&(e[t][a].isVisited=!0);return e}))}),h)}},changeStart:function(e,t){for(var a="col".concat(e,"row").concat(t),r=n,i=0;i<n.length;i+=1)for(var c=0;c<n[i].length;c+=1)if(n[i][c].name===a){var l=M(c,i);l.isStart=!0,r[i][c]=l}else!0===n[i][c].isStart&&(r[i][c].isStart=!1);o(r),W()},changeTarget:function(e,t){for(var a="col".concat(e,"row").concat(t),r=n,i=0;i<n.length;i+=1)for(var c=0;c<n[i].length;c+=1)if(n[i][c].name===a){var l=M(c,i);l.isTarget=!0,r[i][c]=l}else!0===n[i][c].isTarget&&(r[i][c].isTarget=!1);o(r),W()},generateGrid:function(){for(var e=b(n),t=0;t<31;t+=1)for(var a=0;a<31;a+=1)e[t][a].isPath&&(e[t][a].isPath=!1),e[t][a].isVisited&&(e[t][a].isVisited=!1);o(e),y(!0)},generateGridDisabled:S,resetGrid:function(){var e=j();if(o(e),y(!1),D&&D.current)for(var t=0;t<D.current.children.length;t+=1)D.current.children[t].className="Node false"}}),r.a.createElement(E,{onMouseEnter:function(e,t){if(d){var n=T(e,t);o(n),W()}},onMouseUp:function(){v(!1)},onMouseDown:function(e,t){var n=T(e,t);o(n),v(!0)},ref:D,nodes:n}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(O,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},8:function(e,t,n){e.exports=n(18)}},[[8,1,2]]]);
//# sourceMappingURL=main.de675397.chunk.js.map