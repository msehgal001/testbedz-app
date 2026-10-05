'use strict';
const STORAGE = 'testbedz-portfolio-demo-v1';
const seed = () => [
  {id:'TB-001',name:'CubeSat structural qualification',hardware:'3U engineering model',date:'2026-11-09',status:'Planning',objective:'Verify structural integrity under the representative launch vibration environment before environmental qualification.',tests:[{type:'Vibration',method:'Random vibration · three axes',state:'Planned'},{type:'Shock',method:'Separation shock assessment',state:'Pending review'}]},
  {id:'TB-002',name:'Payload thermal verification',hardware:'Optical payload demonstrator',date:'2026-11-16',status:'Awaiting Facility Response',objective:'Demonstrate payload operation across the proposed thermal envelope and review the measurement plan.',tests:[{type:'Thermal vacuum',method:'Hot/cold operational cycles',state:'Pending review'}]},
  {id:'TB-003',name:'Avionics electromagnetic compatibility',hardware:'Flight computer test article',date:'2026-10-26',status:'Testing',objective:'Measure conducted and radiated emissions, capture discrepancies, and document the verification evidence.',tests:[{type:'Electromagnetic compatibility',method:'Emissions and susceptibility',state:'In progress'},{type:'Functional checkout',method:'Before/after baseline',state:'Planned'}]}
];
let campaigns;
try {const saved=JSON.parse(localStorage.getItem(STORAGE)); campaigns=Array.isArray(saved)&&saved.length? saved:seed();} catch {campaigns=seed();}
let selected=campaigns[0].id, mode='client';
const $=s=>document.querySelector(s);
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function save(message){try{localStorage.setItem(STORAGE,JSON.stringify(campaigns));}catch{}render();$('#announcement').textContent=message;}
function render(){
  $('#active-count').textContent=campaigns.filter(c=>c.status!=='Complete').length;
  $('#test-count').textContent=campaigns.reduce((sum,c)=>sum+c.tests.length,0);
  $('#review-count').textContent=campaigns.filter(c=>c.status==='Awaiting Facility Response').length;
  $('#client-tab').setAttribute('aria-pressed',mode==='client');$('#admin-tab').setAttribute('aria-pressed',mode==='admin');
  $('#mode-label').textContent=mode==='admin'?'Review and schedule sample requests':'Your test programs';
  $('#campaign-list').innerHTML=campaigns.map(c=>`<button class="campaign" data-id="${escape(c.id)}" aria-pressed="${c.id===selected}"><strong>${escape(c.name)}</strong><span class="badge" data-status="${escape(c.status)}">${escape(c.status)}</span><span class="meta">${escape(c.id)} · ${escape(c.hardware)}</span></button>`).join('');
  const c=campaigns.find(c=>c.id===selected)||campaigns[0];selected=c.id;
  $('#campaign-detail').innerHTML=`<span class="subtle">CAMPAIGN ${escape(c.id)}</span><h3>${escape(c.name)}</h3><span class="badge" data-status="${escape(c.status)}">${escape(c.status)}</span><p class="objective">${escape(c.objective)}</p><div class="facts"><div><span>Hardware</span><strong>${escape(c.hardware)}</strong></div><div><span>Target date</span><strong>${escape(c.date)}</strong></div><div><span>Facility</span><strong>Sample environmental test laboratory</strong></div><div><span>Program contact</span><strong>Demo engineering team</strong></div></div><div class="test-header"><h4>Test plan</h4><button class="quiet" id="add-test">+ Add test</button></div><table class="tests"><thead><tr><th>Test</th><th>Scope</th><th>Status</th></tr></thead><tbody>${c.tests.map(t=>`<tr><td>${escape(t.type)}</td><td>${escape(t.method)}</td><td>${escape(t.state)}</td></tr>`).join('')}</tbody></table>${mode==='admin'?`<div class="review-controls"><label for="campaign-status">Facility review: update campaign status</label><select id="campaign-status">${['Awaiting Facility Response','Facility Matching','Contract Pending','Planning','Testing','Complete'].map(s=>`<option ${c.status===s?'selected':''}>${s}</option>`).join('')}</select><button class="primary" id="save-status">Save status</button></div>`:'<p class="subtle">Switch to Facility review to explore campaign status updates.</p>'}`;
  document.querySelectorAll('.campaign').forEach(b=>b.addEventListener('click',()=>{selected=b.dataset.id;render();}));
  $('#add-test').addEventListener('click',()=>{c.tests.push({type:'Functional checkout',method:'Demo pre/post-test verification',state:'Planned'});save('A sample functional checkout was added to the selected campaign.');});
  if(mode==='admin')$('#save-status').addEventListener('click',()=>{c.status=$('#campaign-status').value;save('Campaign status updated in this browser.');});
}
$('#client-tab').addEventListener('click',()=>{mode='client';render();});$('#admin-tab').addEventListener('click',()=>{mode='admin';render();});
$('#new-campaign').addEventListener('click',()=>{$('#campaign-form').reset();$('#campaign-dialog').showModal();});$('#close-dialog').addEventListener('click',()=>$('#campaign-dialog').close());
$('#campaign-form').addEventListener('submit',event=>{event.preventDefault();const f=new FormData(event.currentTarget);const c={id:'TB-'+crypto.randomUUID().slice(0,6).toUpperCase(),name:f.get('name').trim(),hardware:f.get('hardware').trim(),date:f.get('date'),objective:f.get('objective').trim(),status:'Awaiting Facility Response',tests:[{type:f.get('test'),method:'Scope awaiting facility review',state:'Pending review'}]};campaigns.unshift(c);selected=c.id;$('#campaign-dialog').close();save('Demo campaign created. No request was sent to a facility.');});
$('#reset-demo').addEventListener('click',()=>{campaigns=seed();selected=campaigns[0].id;save('Sample campaigns restored.');});
render();
