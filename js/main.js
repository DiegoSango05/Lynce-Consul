const $=s=>document.querySelector(s);
$('#th').onclick=()=>{const r=document.documentElement;r.dataset.theme=getComputedStyle(r).colorScheme==='dark'?'light':'dark'};
$('#burger').onclick=()=>$('#menu').classList.toggle('open');
document.querySelectorAll('#menu a').forEach(a=>a.onclick=()=>$('#menu').classList.remove('open'));
$('#hl').onchange=e=>$('#org').classList.toggle('hl',e.target.checked);
/* EQUIPO: sustituye estos datos por los de los integrantes reales */
const T=[
{n:"Rubén Martínez Cabedo",r:"Director de proyecto",c:"#1B4060",f:"Grado en Ingeniería Informática, UJI",e:["Coordinación del proyecto y relación con el cliente","Planificación y control de entregables"],s:["Gestión de proyectos","Comunicación","Planificación"]},
{n:"Diego Sánchez Gómez",r:"Analista de procesos",c:"#3776A8",f:"Grado en Ingeniería Informática, UJI",e:["Modelado de procesos de negocio (BPMN)","Detección de problemas y mejoras"],s:["BPMN","Análisis","Entrevistas"]},
{n:"Sandra Giménez Albiñana",r:"Consultora funcional ERP",c:"#3AB3B1",f:"Grado en Matemática Computacional, UJI",e:["Definición de requisitos funcionales","Comparativa y selección de ERP"],s:["Odoo","SAP","Requisitos"]},
{n:"Javier García Bermejo",r:"Responsable de datos y calidad",c:"#4F8FBF",f:"Grado en Matemática Computacional, UJI",e:["Migración y calidad de datos","Trazabilidad y KPIs"],s:["Datos","SQL","KPIs"]}];
const tm=$('#team');
T.forEach((m,i)=>{const b=document.createElement('button');b.className='card member';b.setAttribute('aria-pressed','false');
b.innerHTML=`<div class="av" style="background:${m.c}">${m.n.split(' ').map(x=>x[0]).join('').slice(0,2)}</div><h3>${m.n}</h3><p>${m.r}</p>`;
b.onclick=()=>{[...tm.children].forEach(c=>c.setAttribute('aria-pressed','false'));b.setAttribute('aria-pressed','true');
$('#cv').innerHTML=`<div><h3>${m.n} · ${m.r}</h3><p class="mut mt-8">${m.f}</p><div class="mt-12">${m.s.map(x=>`<span class="pill">${x}</span>`).join('')}</div></div><div><h4>Experiencia y funciones</h4><ul>${m.e.map(x=>`<li>${x}</li>`).join('')}</ul><p class="mt-12"><a href="#" onclick="return false">Ver CV completo</a> <span class="todo">(enlazar CV)</span></p></div>`};
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
fl.append(b)});fl.children[0].click();
