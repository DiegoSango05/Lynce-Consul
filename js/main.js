const $=s=>document.querySelector(s);
$('#th').onclick=()=>{const r=document.documentElement;r.dataset.theme=getComputedStyle(r).colorScheme==='dark'?'light':'dark'};
$('#burger').onclick=()=>$('#menu').classList.toggle('open');
document.querySelectorAll('#menu a').forEach(a=>a.onclick=()=>$('#menu').classList.remove('open'));
$('#hl').onchange=e=>$('#org').classList.toggle('hl',e.target.checked);
/* EQUIPO: sustituye estos datos por los de los integrantes reales */
const T=[
{n:"Rubén Martínez Cabedo",r:"Director de proyecto",c:"#1B4060",f:"Grado en Ingeniería Informática, UJI",e:["Coordinación del proyecto y relación con el cliente","Planificación y control de entregables"],s:["Gestión de proyectos","Comunicación","Planificación"],cv:"cv/CV_RubenMC.pdf"},
{n:"Diego Sánchez Gómez",r:"Analista de procesos",c:"#3776A8",f:"Grado en Ingeniería Informática, UJI",e:["Modelado de procesos de negocio (BPMN)","Detección de problemas y mejoras"],s:["BPMN","Análisis","Entrevistas"],cv:"cv/CV_DiegoSánchez.pdf"},
{n:"Sandra Giménez Albiñana",r:"Consultora funcional ERP",c:"#3AB3B1",f:"Grado en Matemática Computacional, UJI",e:["Definición de requisitos funcionales","Comparativa y selección de ERP"],s:["Odoo","SAP","Requisitos"],cv:"cv/CV_SandraGimenez.pdf"},
{n:"Javier García Bermejo",r:"Responsable de datos y calidad",c:"#4F8FBF",f:"Grado en Matemática Computacional, UJI",e:["Migración y calidad de datos","Trazabilidad y KPIs"],s:["Datos","SQL","KPIs"],cv:"cv/CV_JavierGarcía.pdf"}];
const tm=$('#team');
T.forEach((m,i)=>{const b=document.createElement('button');b.className='card member';b.setAttribute('aria-pressed','false');
b.innerHTML=`<div class="av" style="background:${m.c}">${m.n.split(' ').map(x=>x[0]).join('').slice(0,2)}</div><h3>${m.n}</h3><p>${m.r}</p>`;
b.onclick=()=>{[...tm.children].forEach(c=>c.setAttribute('aria-pressed','false'));b.setAttribute('aria-pressed','true');
$('#cv').innerHTML=`<div><h3>${m.n} · ${m.r}</h3><p class="mut mt-8">${m.f}</p><div class="mt-12">${m.s.map(x=>`<span class="pill">${x}</span>`).join('')}</div></div><div><h4>Experiencia y funciones</h4><ul>${m.e.map(x=>`<li>${x}</li>`).join('')}</ul><p class="mt-12"><a href="${m.cv}" target="_blank" rel="noopener noreferrer">Ver CV completo</a></p></div>`};
tm.append(b)});tm.children[0].click();
/* PROCESO */
const P=[
["Recepción del pedido","Comercial","Comercial, cliente","Pedido (correo, teléfono, WhatsApp, presencial)","Correo, teléfono, WhatsApp","Datos del cliente y del producto","Pedidos perdidos o duplicados"],
["Validación y disponibilidad","Comercial, almacén","Comercial, responsable de almacén","Hoja de stock, oferta","Excel","Stock disponible, precio y plazo","Stock desactualizado y roturas"],
["Asignación de lote y control","Laboratorio, calidad","Técnico de laboratorio, calidad","Certificado de análisis, ficha de seguridad","Excel, correo","Lote, resultados analíticos","Trazabilidad lenta ante auditorías"],
["Preparación y expedición","Logística y almacén","Mozo de almacén, transportista","Albarán, etiquetado, documento de transporte","Excel, papel","Mercancía, lote, destino","Entregas incumplidas por falta de stock"],
["Facturación","Administración","Administrativo de facturación","Factura, albarán firmado","Contabilidad básica","Datos de pedido y albarán","Datos reintroducidos a mano"],
["Cobro y conciliación","Finanzas","Responsable financiero","Extracto bancario, recibos","Contabilidad, banca online","Pagos recibidos","Impagos detectados tarde"]];
const fl=$('#flow');
P.forEach((p,i)=>{const b=document.createElement('button');b.className='st';b.innerHTML=`<b>Paso ${i+1}</b>${p[0]}`;
b.onclick=()=>{[...fl.children].forEach(c=>c.classList.remove('on'));b.classList.add('on');
$('#sd').innerHTML=`<h3>${p[0]}</h3><dl class="mt-16"><dt>Departamentos</dt><dd>${p[1]}</dd><dt>Roles</dt><dd>${p[2]}</dd><dt>Documentos</dt><dd>${p[3]}</dd><dt>Herramientas</dt><dd>${p[4]}</dd><dt>Información</dt><dd>${p[5]}</dd><dt>Problema</dt><dd>${p[6]}</dd></dl><p class="mut mt-14">Normativa aplicable: REACH, CLP y ADR en etiquetado y transporte de productos químicos <span class="todo">(a confirmar)</span>.</p>`};
fl.append(b)});fl.children[0].click();/* DIAGRAMAS DE CARRILES (AS-IS / TO-BE) */
function lanes(el,L,N,E,kind){
const LW=112,CW=118,LH=96,BW=108,BH=62,cols=Math.max(...N.map(n=>n.c))+1,W=LW+cols*CW+8,H=L.length*LH,id=el.id;
const by={};N.forEach(n=>by[n.id]=n);
const X=n=>LW+n.c*CW+CW/2,Y=n=>L.indexOf(n.l)*LH+LH/2,hw=n=>n.t==='d'?44:BW/2,hh=n=>n.t==='d'?34:BH/2;
let s=`<svg class="lane-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${el.dataset.label}"><defs><marker id="ar-${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="ar" d="M0 0L10 5L0 10z"/></marker></defs>`;
L.forEach((l,i)=>{s+=`<rect class="${l==='ERP'?'lerp':i%2?'lz':'la'}" x="0" y="${i*LH}" width="${W}" height="${LH}"/><rect class="lb" x="0" y="${i*LH}" width="${LW-8}" height="${LH}"/><text class="lbt" x="${(LW-8)/2}" y="${i*LH+LH/2+4}">${l}</text>`;if(i)s+=`<line class="sep" x1="0" x2="${W}" y1="${i*LH}" y2="${i*LH}"/>`});
E.forEach(([f,t,lab])=>{const a=by[f],b=by[t];let d,lx,ly;
if(a.c===b.c){const up=Y(b)<Y(a),y1=Y(a)+(up?-hh(a):hh(a)),y2=Y(b)+(up?hh(b):-hh(b));d=`M${X(a)} ${y1}V${y2}`;lx=X(a)+6;ly=y1+(up?-8:16)}
else{const sx=X(a)+hw(a),ex=X(b)-hw(b),mx=(sx+ex)/2;d=Y(a)===Y(b)?`M${sx} ${Y(a)}H${ex}`:`M${sx} ${Y(a)}H${mx}V${Y(b)}H${ex}`;lx=sx+4;ly=Y(a)-7}
s+=`<path class="eg" d="${d}" marker-end="url(#ar-${id})"/>`;if(lab)s+=`<text class="el" x="${lx}" y="${ly}">${lab}</text>`});
N.forEach(n=>{const x=X(n),y=Y(n),ln=n.x.split('|');
s+=n.t==='d'?`<path class="nd dz" d="M${x} ${y-34}L${x+44} ${y}L${x} ${y+34}L${x-44} ${y}z"/>`:`<rect class="nd${n.t==='e'?' ev':n.t==='a'?' sys':n.t==='s'?' ds':''}" x="${x-BW/2}" y="${y-BH/2}" width="${BW}" height="${BH}" rx="${n.t==='e'?22:8}"/>`;
s+=`<text class="nt" x="${x}" y="${y-(ln.length-1)*7+4}">${ln.map((t,i)=>`<tspan x="${x}" dy="${i?14:0}">${t}</tspan>`).join('')}</text>`;
let mx=x+hw(n)-(n.t==='d'?10:2);(n.m||[]).slice().reverse().forEach(m=>{const w=kind==='p'?18:m.length*7+10;mx-=w/2;
s+=kind==='p'?`<circle class="mkp" cx="${mx}" cy="${y-hh(n)}" r="9"/>`:`<rect class="mkm" x="${mx-w/2}" y="${y-hh(n)-9}" width="${w}" height="18" rx="9"/>`;
s+=`<text class="mkt" x="${mx}" y="${y-hh(n)+3.5}">${m}</text>`;mx-=w/2+3})});
el.innerHTML=s+'</svg>'}
const fbAsis=()=>lanes($('#asis'),['Cliente','Administración','Almacén','Laboratorio','Contabilidad'],[
{id:'a',l:'Cliente',c:0,t:'e',x:'Solicita producto|(correo, tel.,|WhatsApp)',m:['1']},
{id:'b',l:'Administración',c:1,x:'Recibe y anota|el pedido',m:['1']},
{id:'c',l:'Administración',c:2,x:'Registra en|Excel o papel',m:['2']},
{id:'d',l:'Almacén',c:3,x:'Consulta stock|y lotes (Excel)',m:['3']},
{id:'e',l:'Almacén',c:4,t:'d',x:'¿Hay stock?',m:['3']},
{id:'f',l:'Administración',c:4,x:'Avisa al cliente|y replanifica'},
{id:'g',l:'Laboratorio',c:5,x:'Verifica lote|y calidad',m:['4']},
{id:'h',l:'Almacén',c:6,x:'Prepara y|expide con|albarán',m:['5']},
{id:'i',l:'Contabilidad',c:7,x:'Emite la|factura',m:['6']},
{id:'j',l:'Contabilidad',c:8,x:'Sigue el cobro|(manual)',m:['7']},
{id:'k',l:'Contabilidad',c:9,t:'e',x:'Cobra y concilia|el pago',m:['7']}],
[['a','b'],['b','c'],['c','d'],['d','e'],['e','f','No'],['e','g','Sí'],['g','h'],['h','i'],['i','j'],['j','k']],'p');
const fbTobe=()=>lanes($('#tobe-d'),['Cliente','Administración','ERP','Almacén','Laboratorio','Contabilidad','Dirección'],[
{id:'a',l:'Cliente',c:0,t:'e',x:'Envía pedido|por canal único',m:['M1']},
{id:'b',l:'ERP',c:1,t:'a',x:'Registra y valida|el pedido|(una sola vez)',m:['M2']},
{id:'c',l:'ERP',c:2,t:'a',x:'Consulta stock|y lotes en|tiempo real',m:['M3']},
{id:'d',l:'ERP',c:3,t:'d',x:'¿Lote|liberado?'},
{id:'e',l:'Administración',c:3,x:'Aviso automático|y replanifica',m:['M5']},
{id:'f',l:'Laboratorio',c:4,x:'Confirma lote|preasignado y|certificado',m:['M4','M8']},
{id:'g',l:'Almacén',c:5,x:'Prepara y|expide; albarán|digital',m:['M5']},
{id:'h',l:'ERP',c:6,t:'a',x:'Factura|automática|desde albarán',m:['M6']},
{id:'i',l:'ERP',c:7,t:'a',x:'Vencimientos y|recordatorios|automáticos',m:['M7']},
{id:'j',l:'Contabilidad',c:8,t:'e',x:'Conciliación|bancaria|automática',m:['M7']},
{id:'k',l:'Dirección',c:4,t:'s',x:'Cuadro de mando|en tiempo real',m:['M9']},
{id:'z',l:'Dirección',c:6,t:'s',x:'Circuito con|responsables|y plazos',m:['M10']}],
[['a','b'],['b','c'],['c','d'],['d','e','No'],['d','f','Sí'],['f','g'],['g','h'],['h','i'],['i','j']],'m');
/* BPMN (Camunda / bpmn-js): se cargan los .bpmn; si no es posible (file:// o sin conexión) se usa el diagrama SVG anterior */
const OV={asis:{T_Solicita:['1'],T_Anota:['1'],T_Registra:['2'],T_Stock:['3'],GW_Stock:['3'],T_Verifica:['4'],T_Expide:['5'],T_Factura:['6'],T_Seguimiento:['7'],T_Concilia:['7']},
'tobe-d':{T_Pedido:['M1'],T_Registra:['M2'],T_Stock:['M3'],T_Aviso:['M5'],T_Lote:['M4','M8'],T_Expide:['M5'],T_Factura:['M6'],T_Vencimientos:['M7'],T_Concilia:['M7']}};
async function bpmn(el,fb){
try{if(!window.BpmnJS)throw 0;const xml=await (await fetch(el.dataset.src)).text();
el.classList.add('bpmn');const v=new BpmnJS({container:el});await v.importXML(xml);v.get('canvas').zoom('fit-viewport');
const ov=v.get('overlays');Object.entries(OV[el.id]).forEach(([id,ms])=>ov.add(id,{position:{top:-10,right:ms.length*(ms[0][0]==='M'?30:14)},html:`<span>${ms.map(m=>`<i class="dot ${m[0]==='M'?'m':'p'}">${m}</i>`).join(' ')}</span>`}));
}catch(e){el.classList.remove('bpmn');el.innerHTML='';fb()}}
bpmn($('#asis'),fbAsis);bpmn($('#tobe-d'),fbTobe);
/* REQUISITOS */
const R=[
["RF01","Canal único de entrada de pedidos (portal o formulario estándar) con campos obligatorios.","Must","M1","P1"],
["RF02","Registro único del pedido en el ERP, con número y estado, sin reintroducir datos.","Must","M2","P2"],
["RF03","Detección y aviso de pedidos duplicados.","Should","M1","P1"],
["RF04","Inventario por lote en tiempo real, actualizado automáticamente con cada entrada y salida.","Must","M3","P3"],
["RF05","Consulta de disponibilidad y reserva automática del lote al confirmar el pedido.","Must","M3, M4","P3"],
["RF06","Gestión de estados de lote (cuarentena, liberado, bloqueado) con el certificado de calidad asociado.","Must","M4","P4"],
["RF07","Trazabilidad bidireccional cliente–pedido–lote con informe exportable para auditorías.","Must","M8","P4"],
["RF08","Albarán digital generado al expedir y notificaciones automáticas entre departamentos.","Must","M5","P5"],
["RF09","Avisos automáticos al cliente: confirmación, falta de stock con nueva fecha y expedición.","Should","M5","P1, P3"],
["RF10","Facturación automática a partir del albarán y el pedido.","Must","M6","P6"],
["RF11","Factura electrónica, incluida la remisión a FACe para clientes de la administración pública (normativa a confirmar).","Must","M6","P6"],
["RF12","Cuadro de vencimientos y recordatorios automáticos de impago.","Must","M7","P7"],
["RF13","Conciliación bancaria automática mediante importación de extractos (Norma 43).","Should","M7","P7"],
["RF14","Cuadro de mando para la dirección con pedidos, stock, facturación y cobros en tiempo real.","Should","M9","P1-P7"],
["RF15","Flujo de trabajo con responsable y plazo por paso y alertas de retraso.","Could","M10","P5"],
["RNF01","Integración: una única base de datos compartida por ventas, inventario, calidad y contabilidad.","Must","M2, M9","P5"],
["RNF02","Rendimiento: la consulta de disponibilidad de stock y lotes responde en menos de 2 segundos.","Should","M3","P3"],
["RNF03","Seguridad: roles y permisos por departamento y registro de auditoría de cambios.","Must","M8","P4"],
["RNF04","Normativa: gestión documental de fichas de seguridad y etiquetado (REACH, CLP, ADR) y conservación de los registros de lote.","Must","M8","P4"],
["RNF05","Escalabilidad: absorber más volumen de pedidos sin aumentar el personal administrativo.","Should","M9","P1-P7"],
["RNF06","Usabilidad: acceso web y móvil en almacén, con lectura de códigos de barras de lote.","Should","M3, M5","P3, P5"],
["RNF07","Disponibilidad: servicio en horario laboral y copias de seguridad diarias.","Must","M9","—"],
["RNF08","Migración: carga inicial de clientes, productos, stock y lotes desde los Excel actuales.","Must","M2, M3","P2, P3"]];
const rt=$('#rt'),bd=p=>`<span class="badge b-${p.toLowerCase()}">${p}</span>`;
const draw=f=>{rt.innerHTML='<tr><th class="id">ID</th><th>Tipo</th><th>Requisito</th><th>Prioridad</th><th>Mejora</th><th>Problema</th></tr>'+
R.filter(r=>!f||r[0].replace(/\d+/,'')===f).map(r=>`<tr><td class="id">${r[0]}</td><td>${r[0].startsWith('RNF')?'No funcional':'Funcional'}</td><td>${r[1]}</td><td>${bd(r[2])}</td><td>${r[3]}</td><td>${r[4]}</td></tr>`).join('')};
document.querySelectorAll('#rf button').forEach(b=>b.onclick=()=>{document.querySelectorAll('#rf button').forEach(x=>x.setAttribute('aria-pressed',x===b));draw(b.dataset.f)});draw('');
const MD=["Canal único de pedidos","Registro único del pedido","Inventario de lotes en tiempo real","Validación de calidad asociada al lote","Notificaciones y albarán digital","Facturación automática","Vencimientos, recordatorios y conciliación","Trazabilidad cliente–pedido–lote","Visibilidad en tiempo real","Circuito con responsables y plazos"];
$('#rm').innerHTML='<tr><th class="id">Mejora</th><th>Descripción</th><th>Requisitos</th></tr>'+MD.map((d,i)=>{const m='M'+(i+1);return`<tr><td class="id">${m}</td><td>${d}</td><td>${R.filter(r=>r[3].split(', ').includes(m)).map(r=>r[0]).join(', ')}</td></tr>`}).join('');
