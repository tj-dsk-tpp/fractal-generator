(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerpolicy&&(i.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?i.credentials="include":r.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const u={f:()=>{},renderer:null},C=()=>{const e=document.createElementNS("http://www.w3.org/2000/svg","polyline");return e.setAttribute("stroke-width",2),e.setAttribute("stroke","#000"),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),e.setAttribute("fill","transparent"),e},P=()=>{const e=document.createElementNS("http://www.w3.org/2000/svg","polygon");return e.setAttribute("stroke-width",0),e.setAttribute("stroke-linecap","round"),e.setAttribute("stroke-linejoin","round"),e.setAttribute("fill","#000"),e},w=()=>({origin:{x:0,y:0},move:{x:5,y:0},points:[{x:0,y:0}],bounds:{mx:0,my:0,Mx:0,My:0}}),A=()=>({centers:[{x:0,y:0}],bounds:{mx:0,my:0,Mx:0,My:0},ratio:0,angle:0,sides:0,rad:0}),l=(e,t)=>{const n=e.x*Math.cos(t)-e.y*Math.sin(t),o=e.x*Math.sin(t)+e.y*Math.cos(t);e.x=n,e.y=o},a=e=>{e.points.push({x:e.origin.x+e.move.x,y:e.origin.y+e.move.y}),e.origin.x+=e.move.x,e.origin.y+=e.move.y,e.bounds.mx=Math.min(e.bounds.mx,e.origin.x),e.bounds.my=Math.min(e.bounds.my,e.origin.y),e.bounds.Mx=Math.max(e.bounds.Mx,e.origin.x),e.bounds.My=Math.max(e.bounds.My,e.origin.y)},I=(e,t)=>{const n=[];e.centers.forEach(o=>{const r={x:0,y:-e.rad*(1-e.ratio)*Math.pow(e.ratio,t)};for(let i=0;i<e.sides;i++)n.push({x:o.x+r.x,y:o.y+r.y}),l(r,e.angle)}),e.centers=n},E=(e,t)=>{const n=[],o=[];e.centers.forEach(r=>{o.push(r);const i={x:0,y:-e.rad*(1-e.ratio)*Math.pow(e.ratio,t)};for(let s=0;s<e.sides;s++)n.push({x:r.x+i.x,y:r.y+i.y}),l(i,e.angle)}),e.invCenters.forEach(r=>{n.push(r);const i={x:0,y:e.rad*(1-e.ratio)*Math.pow(e.ratio,t)};for(let s=0;s<e.sides;s++)o.push({x:r.x+i.x,y:r.y+i.y}),l(i,e.angle)}),e.centers=n,e.invCenters=o},B={linear:["Dragon Curve","Levy Curve","Gosper Curve","Koch Snowflake","Square Wave","Hilbert Curve"],fill:["Sierpinski Triangle","Sierpinski Pentagon","Sierpinski Hexagon","Pentaflake","Hexaflake"]},k={dragonCurve:(e,t)=>({transform:{I:"f",f:"fph",h:"fnh"},rules:{f:n=>n?e.f(n-1,"f"):a(t),h:n=>n?e.f(n-1,"h"):a(t),p:n=>l(t.move,-Math.PI/2),n:n=>l(t.move,Math.PI/2)}}),levyCurve:(e,t)=>({transform:{I:"f",f:"pfnnfp"},rules:{f:n=>n?e.f(n-1,"f"):a(t),p:n=>l(t.move,-Math.PI/4),n:n=>l(t.move,Math.PI/4)}}),gosperCurve:(e,t)=>({transform:{I:"f",f:"fnhnnhpfppffphn",h:"pfnhhnnhnfppfph"},rules:{f:n=>n?e.f(n-1,"f"):a(t),h:n=>n?e.f(n-1,"h"):a(t),p:n=>l(t.move,-Math.PI/3),n:n=>l(t.move,+Math.PI/3)}}),kochSnowflake:(e,t)=>({transform:{I:"fnnfnnfnn",f:"fpfnnfpf"},rules:{f:n=>n?e.f(n-1,"f"):a(t),p:n=>l(t.move,-Math.PI/3),n:n=>l(t.move,Math.PI/3)}}),squareWave:(e,t)=>({transform:{I:"fnfnfnfn",f:"fpfnfnffpfpfnf"},rules:{f:n=>n?e.f(n-1,"f"):a(t),p:n=>l(t.move,-Math.PI/2),n:n=>l(t.move,Math.PI/2)}}),hilbertCurve:(e,t)=>({transform:{I:"f",f:"phmnfmfnmhp",h:"nfmphmhpmfn"},rules:{f:n=>n?e.f(n-1,"f"):null,h:n=>n?e.f(n-1,"h"):null,m:n=>a(t),p:n=>l(t.move,-Math.PI/2),n:n=>l(t.move,Math.PI/2)}}),sierpinskiTriangle:(e,t)=>(t.ratio=1/2,t.angle=Math.PI/1.5,t.sides=3,t.rad=920,{transform:{I:"I"},rules:{I:(n,o)=>o<n?(I(t,o),e.f(n,o+1,"I")):null}}),sierpinskiPentagon:(e,t)=>(t.ratio=(1+2*Math.cos(Math.PI/5))/(2*(1+3*Math.cos(Math.PI/5))),t.angle=Math.PI/2.5,t.sides=5,t.rad=840,{transform:{I:"I"},rules:{I:(n,o)=>o<n?(I(t,o),e.f(n,o+1,"I")):null}}),sierpinskiHexagon:(e,t)=>(t.ratio=1/3,t.angle=Math.PI/3,t.sides=6,t.rad=800,{transform:{I:"I"},rules:{I:(n,o)=>o<n?(I(t,o),e.f(n,o+1,"I")):null}}),pentaflake:(e,t)=>(t.ratio=(1+2*Math.cos(Math.PI/5))/(2*(1+3*Math.cos(Math.PI/5))),t.angle=Math.PI/2.5,t.sides=5,t.rad=840,t.invCenters=[],{transform:{I:"I"},rules:{I:(n,o)=>o<n?(E(t,o),e.f(n,o+1,"I")):null}}),hexaflake:(e,t)=>(t.ratio=1/3,t.angle=Math.PI/3,t.sides=6,t.rad=800,t.invCenters=[],{transform:{I:"I"},rules:{I:(n,o)=>o<n?(E(t,o),e.f(n,o+1,"I")):null}})},L=(e,t,n)=>{const o=C(),r={x:800-(e.bounds.mx+e.bounds.Mx)/2,y:800-(e.bounds.my+e.bounds.My)/2};if(t.appendChild(o),n){o.setAttribute("points","");let i=0;const s=e.points.length;u.renderer=setInterval(()=>{i===s?clearInterval(u.renderer):(o.setAttribute("points",`${o.getAttribute("points")} ${e.points[i].x+r.x},${e.points[i].y+r.y}`),i++)},5)}else o.setAttribute("points",e.points.map(i=>`${i.x+r.x},${i.y+r.y}`).join(" "))},T=(e,t,n,o)=>{var y;const r=Math.pow(e.ratio,t);let i={x:0,y:-e.rad*r};const s=[];e.centers.forEach(f=>{const c=[];for(let d=0;d<e.sides;d++){const m=f.x+i.x,p=f.y+i.y;e.bounds.mx=Math.min(e.bounds.mx,m),e.bounds.my=Math.min(e.bounds.my,p),e.bounds.Mx=Math.max(e.bounds.Mx,m),e.bounds.My=Math.max(e.bounds.My,p),c.push({x:m,y:p}),l(i,e.angle)}s.push(c)}),i={x:0,y:e.rad*r},(y=e.invCenters)==null||y.forEach(f=>{const c=[];for(let d=0;d<e.sides;d++){const m=f.x+i.x,p=f.y+i.y;e.bounds.mx=Math.min(e.bounds.mx,m),e.bounds.my=Math.min(e.bounds.my,p),e.bounds.Mx=Math.max(e.bounds.Mx,m),e.bounds.My=Math.max(e.bounds.My,p),c.push({x:m,y:p}),l(i,e.angle)}s.push(c)});const h={x:800-(e.bounds.mx+e.bounds.Mx)/2,y:800-(e.bounds.my+e.bounds.My)/2};if(o){let f=0;const c=s.length;u.renderer=setInterval(()=>{if(f===c)clearInterval(u.renderer);else{const d=P();d.setAttribute("points",s[f].map(m=>`${m.x+h.x},${m.y+h.y}`).join(" ")),n.appendChild(d),f++}},5)}else s.forEach(f=>{const c=P();c.setAttribute("points",f.map(d=>`${d.x+h.x},${d.y+h.y}`).join(" ")),n.appendChild(c)})},M=document.getElementById("fractalName"),g=document.getElementById("fractalDepth"),$=document.getElementById("animate"),x=document.getElementById("alert-box"),S=document.getElementById("reset"),j=document.getElementById("render"),b=document.getElementById("svg-box"),H=document.getElementById("version");for(const[e,t]of Object.entries(B))for(const n of t){const o=n.split(" ");o[0]=o[0].toLowerCase();const r=document.createElement("option");r.setAttribute("value",`${e}-${o.join("")}`),r.innerText=n,M.appendChild(r)}const N={linear:(e,t,n,o)=>{const r=w(),{transform:i,rules:s}=k[n](u,r);u.f=(h,y)=>[...i[y]].forEach(f=>s[f](h)),u.f(e,"I"),L(r,t,o)},fill:(e,t,n,o)=>{const r=A(),{transform:i,rules:s}=k[n](u,r);u.f=(h,y,f)=>[...i[f]].forEach(c=>s[c](h,y)),u.f(e,0,"I"),T(r,e,t,o)}};M.addEventListener("change",()=>{x.innerText=""});g.addEventListener("change",()=>{x.innerText=""});S.addEventListener("click",()=>{b.innerHTML="",M.value=0,g.value=0,x.innerText="",u.renderer&&clearInterval(u.renderer)});j.addEventListener("click",e=>{b.innerHTML="",u.renderer&&clearInterval(u.renderer);const t=M.value,n=parseInt(g.value);if(t===""){x.innerText="Select a valid fractal Type.";return}if(n<0){x.innerText="Enter valid depth";return}const o=t.split("-");N[o[0]](n,b,o[1],$.checked)});H.innerText="0.1.3";