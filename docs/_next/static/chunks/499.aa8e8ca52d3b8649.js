"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[499],{6499:function(t,e,o){o.r(e),o.d(e,{Blob:function(){return f},Dog:function(){return x},Duck:function(){return j},Logo:function(){return p}});var r=o(7437),n=o(6613),s=o(7837),i=o(6375),u=o(2265),l=o(5867),c=o(5900),h=o(1026),a=o(4033);let f=t=>{let{route:e="/",...o}=t,n=(0,a.useRouter)(),[s,i]=(0,u.useState)(!1);return(0,l.j)(s),(0,r.jsxs)("mesh",{onClick:()=>n.push(e),onPointerOver:()=>i(!0),onPointerOut:()=>i(!1),...o,children:[(0,r.jsx)("sphereGeometry",{args:[1,64,64]}),(0,r.jsx)(c.Y,{roughness:.5,color:s?"hotpink":"#1fb2f5"})]})},p=t=>{let{route:e="/blob",...o}=t,n=(0,u.useRef)(null),c=(0,a.useRouter)(),[f,p]=(0,u.useState)(!1),j=(0,u.useMemo)(()=>new i.EllipseCurve(0,0,3,1.15,0,2*Math.PI,!1,0).getPoints(100),[]);return(0,l.j)(f),(0,s.C)((t,e)=>{let o=t.clock.getElapsedTime();n.current.rotation.y=Math.PI/8*Math.sin(o),n.current.rotation.x=Math.PI/8*Math.cos(o),n.current.rotation.z-=e/4}),(0,r.jsxs)("group",{ref:n,...o,children:[(0,r.jsx)(h.x,{worldUnits:!0,points:j,color:"#1fb2f5",lineWidth:.15}),(0,r.jsx)(h.x,{worldUnits:!0,points:j,color:"#1fb2f5",lineWidth:.15,rotation:[0,0,1]}),(0,r.jsx)(h.x,{worldUnits:!0,points:j,color:"#1fb2f5",lineWidth:.15,rotation:[0,0,-1]}),(0,r.jsxs)("mesh",{onClick:()=>c.push(e),onPointerOver:()=>p(!0),onPointerOut:()=>p(!1),children:[(0,r.jsx)("sphereGeometry",{args:[.55,64,64]}),(0,r.jsx)("meshPhysicalMaterial",{roughness:.5,color:f?"hotpink":"#1fb2f5"})]})]})};function j(t){let{scene:e}=(0,n.L)("/duck.glb");return(0,s.C)((t,o)=>e.rotation.y+=o),(0,r.jsx)("primitive",{object:e,...t})}function x(t){let{scene:e}=(0,n.L)("/dog.glb");return(0,r.jsx)("primitive",{object:e,...t})}}}]);