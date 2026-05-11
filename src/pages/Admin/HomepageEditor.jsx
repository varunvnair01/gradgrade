import { useState, useEffect } from 'react';

const API = 'http://localhost:4000/api';
const authHeaders = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('adminToken')}` });

export default function HomepageEditor({ toast }) {
  const [hp, setHp] = useState(null);
  const [activeTab, setActiveTab] = useState('hero');
  const [saving, setSaving] = useState('');

  useEffect(() => { fetch(`${API}/homepage`).then(r=>r.json()).then(d=>{if(d.success)setHp(d.data)}).catch(()=>{}); }, []);

  const saveSection = async (key, data) => {
    setSaving(key);
    try { const r = await fetch(`${API}/homepage/${key}`,{method:'PUT',headers:authHeaders(),body:JSON.stringify({data})}); const d=await r.json(); d.success?toast(`${key} saved!`):toast(d.message,'error'); } catch{toast('Save failed','error');}
    setSaving('');
  };
  const update = (key,val) => setHp(p=>({...p,[key]:val}));
  const tabs = [{id:'hero',label:'Hero',icon:'🖼️'},{id:'stats',label:'Stats',icon:'📊'},{id:'services',label:'Services',icon:'🧭'},{id:'testimonials',label:'Reviews',icon:'💬'},{id:'streams',label:'Streams',icon:'📚'},{id:'cta',label:'CTA',icon:'📢'}];

  if(!hp) return <p style={{color:'#94a3b8',padding:'4rem',textAlign:'center'}}>Loading...</p>;

  return (<div className="adm__main" style={{borderRadius:'1rem'}}>
    <div className="adm__section-tabs">{tabs.map(t=>(<button key={t.id} type="button" className={`adm__section-tab ${activeTab===t.id?'adm__section-tab--active':''}`} onClick={()=>setActiveTab(t.id)}><span>{t.icon}</span> {t.label}</button>))}</div>
    <div className="adm__form-body">
      {activeTab==='hero' && (<div className="adm__section">
        <h2 className="adm__sub-heading">Hero Slides</h2>
        {(hp.hero_slides||[]).map((s,i)=>(<div key={i} className="adm__dynamic-card"><div className="adm__dynamic-card-header"><span>Slide #{i+1}</span><button type="button" className="adm__remove-btn" onClick={()=>update('hero_slides',hp.hero_slides.filter((_,j)=>j!==i))}>✕</button></div>
          <div className="adm__field-row"><div className="adm__field"><label>Title</label><input value={s.title} onChange={e=>{const a=[...hp.hero_slides];a[i]={...a[i],title:e.target.value};update('hero_slides',a)}}/></div><div className="adm__field"><label>Subtitle</label><input value={s.subtitle} onChange={e=>{const a=[...hp.hero_slides];a[i]={...a[i],subtitle:e.target.value};update('hero_slides',a)}}/></div></div>
          <div className="adm__field"><label>Image URL</label><input value={s.image} onChange={e=>{const a=[...hp.hero_slides];a[i]={...a[i],image:e.target.value};update('hero_slides',a)}}/></div>
        </div>))}
        <button type="button" className="adm__add-item-btn" onClick={()=>update('hero_slides',[...(hp.hero_slides||[]),{image:'',title:'',subtitle:''}])}>+ Add Slide</button>
        <h2 className="adm__sub-heading" style={{marginTop:'2rem'}}>Hero Stats Bar</h2>
        {(hp.hero_stats||[]).map((s,i)=>(<div key={i} className="adm__dynamic-card"><div className="adm__dynamic-card-header"><span>Stat #{i+1}</span><button type="button" className="adm__remove-btn" onClick={()=>update('hero_stats',hp.hero_stats.filter((_,j)=>j!==i))}>✕</button></div>
          <div className="adm__field-row"><div className="adm__field"><label>Icon</label><input value={s.icon} onChange={e=>{const a=[...hp.hero_stats];a[i]={...a[i],icon:e.target.value};update('hero_stats',a)}}/></div><div className="adm__field"><label>Value</label><input value={s.value} onChange={e=>{const a=[...hp.hero_stats];a[i]={...a[i],value:e.target.value};update('hero_stats',a)}}/></div><div className="adm__field"><label>Label</label><input value={s.label} onChange={e=>{const a=[...hp.hero_stats];a[i]={...a[i],label:e.target.value};update('hero_stats',a)}}/></div></div>
        </div>))}
        <button type="button" className="adm__add-item-btn" onClick={()=>update('hero_stats',[...(hp.hero_stats||[]),{icon:'📌',value:'0',label:'New'}])}>+ Add Stat</button>
        <button className="adm__btn adm__btn--primary" style={{marginTop:'1.5rem',width:'100%'}} onClick={()=>{saveSection('hero_slides',hp.hero_slides);saveSection('hero_stats',hp.hero_stats)}} disabled={saving}>{saving?'⏳ Saving...':'💾 Save Hero'}</button>
      </div>)}

      {activeTab==='stats' && (<div className="adm__section">
        <h2 className="adm__sub-heading">Impact Statistics</h2>
        {(hp.impact_stats||[]).map((s,i)=>(<div key={i} className="adm__dynamic-card"><div className="adm__dynamic-card-header"><span>Stat #{i+1}</span><button type="button" className="adm__remove-btn" onClick={()=>update('impact_stats',hp.impact_stats.filter((_,j)=>j!==i))}>✕</button></div>
          <div className="adm__field-row"><div className="adm__field"><label>Icon</label><input value={s.icon} onChange={e=>{const a=[...hp.impact_stats];a[i]={...a[i],icon:e.target.value};update('impact_stats',a)}}/></div><div className="adm__field"><label>Value</label><input type="number" value={s.value} onChange={e=>{const a=[...hp.impact_stats];a[i]={...a[i],value:parseInt(e.target.value)||0};update('impact_stats',a)}}/></div><div className="adm__field"><label>Suffix</label><input value={s.suffix} onChange={e=>{const a=[...hp.impact_stats];a[i]={...a[i],suffix:e.target.value};update('impact_stats',a)}}/></div></div>
          <div className="adm__field-row"><div className="adm__field"><label>Label</label><input value={s.label} onChange={e=>{const a=[...hp.impact_stats];a[i]={...a[i],label:e.target.value};update('impact_stats',a)}}/></div><div className="adm__field"><label>Color</label><input type="color" value={s.color} onChange={e=>{const a=[...hp.impact_stats];a[i]={...a[i],color:e.target.value};update('impact_stats',a)}} style={{height:'42px'}}/></div></div>
        </div>))}
        <button type="button" className="adm__add-item-btn" onClick={()=>update('impact_stats',[...(hp.impact_stats||[]),{icon:'📌',value:0,suffix:'+',label:'New',color:'#6366f1'}])}>+ Add Stat</button>
        <button className="adm__btn adm__btn--primary" style={{marginTop:'1.5rem',width:'100%'}} onClick={()=>saveSection('impact_stats',hp.impact_stats)} disabled={saving}>{saving?'⏳ Saving...':'💾 Save Stats'}</button>
      </div>)}

      {activeTab==='services' && (<div className="adm__section">
        <h2 className="adm__sub-heading">Services</h2>
        {(hp.services||[]).map((s,i)=>(<div key={i} className="adm__dynamic-card"><div className="adm__dynamic-card-header"><span>Service #{i+1}</span><button type="button" className="adm__remove-btn" onClick={()=>update('services',hp.services.filter((_,j)=>j!==i))}>✕</button></div>
          <div className="adm__field-row"><div className="adm__field"><label>Icon</label><input value={s.icon} onChange={e=>{const a=[...hp.services];a[i]={...a[i],icon:e.target.value};update('services',a)}}/></div><div className="adm__field"><label>Title</label><input value={s.title} onChange={e=>{const a=[...hp.services];a[i]={...a[i],title:e.target.value};update('services',a)}}/></div></div>
          <div className="adm__field"><label>Description</label><textarea value={s.description} onChange={e=>{const a=[...hp.services];a[i]={...a[i],description:e.target.value};update('services',a)}} rows="2"/></div>
        </div>))}
        <button type="button" className="adm__add-item-btn" onClick={()=>update('services',[...(hp.services||[]),{icon:'📌',title:'',description:''}])}>+ Add Service</button>
        <button className="adm__btn adm__btn--primary" style={{marginTop:'1.5rem',width:'100%'}} onClick={()=>saveSection('services',hp.services)} disabled={saving}>{saving?'⏳ Saving...':'💾 Save Services'}</button>
      </div>)}

      {activeTab==='testimonials' && (<div className="adm__section">
        <h2 className="adm__sub-heading">Student Reviews</h2>
        {(hp.testimonials||[]).map((t,i)=>(<div key={i} className="adm__dynamic-card"><div className="adm__dynamic-card-header"><span>Review #{i+1}</span><button type="button" className="adm__remove-btn" onClick={()=>update('testimonials',hp.testimonials.filter((_,j)=>j!==i))}>✕</button></div>
          <div className="adm__field-row"><div className="adm__field"><label>Name</label><input value={t.name} onChange={e=>{const a=[...hp.testimonials];a[i]={...a[i],name:e.target.value};update('testimonials',a)}}/></div><div className="adm__field"><label>Avatar</label><input value={t.avatar} onChange={e=>{const a=[...hp.testimonials];a[i]={...a[i],avatar:e.target.value};update('testimonials',a)}}/></div></div>
          <div className="adm__field-row"><div className="adm__field"><label>Course</label><input value={t.course} onChange={e=>{const a=[...hp.testimonials];a[i]={...a[i],course:e.target.value};update('testimonials',a)}}/></div><div className="adm__field"><label>College</label><input value={t.college} onChange={e=>{const a=[...hp.testimonials];a[i]={...a[i],college:e.target.value};update('testimonials',a)}}/></div></div>
          <div className="adm__field"><label>Review</label><textarea value={t.quote} onChange={e=>{const a=[...hp.testimonials];a[i]={...a[i],quote:e.target.value};update('testimonials',a)}} rows="3"/></div>
        </div>))}
        <button type="button" className="adm__add-item-btn" onClick={()=>update('testimonials',[...(hp.testimonials||[]),{name:'',course:'',college:'',quote:'',avatar:'👨‍🎓'}])}>+ Add Review</button>
        <button className="adm__btn adm__btn--primary" style={{marginTop:'1.5rem',width:'100%'}} onClick={()=>saveSection('testimonials',hp.testimonials)} disabled={saving}>{saving?'⏳ Saving...':'💾 Save Reviews'}</button>
      </div>)}

      {activeTab==='streams' && (<div className="adm__section">
        <h2 className="adm__sub-heading">Popular Streams</h2>
        {(hp.streams||[]).map((s,i)=>(<div key={i} className="adm__dynamic-card"><div className="adm__dynamic-card-header"><span>Stream #{i+1}</span><button type="button" className="adm__remove-btn" onClick={()=>update('streams',hp.streams.filter((_,j)=>j!==i))}>✕</button></div>
          <div className="adm__field-row"><div className="adm__field"><label>Icon</label><input value={s.icon} onChange={e=>{const a=[...hp.streams];a[i]={...a[i],icon:e.target.value};update('streams',a)}}/></div><div className="adm__field"><label>Title</label><input value={s.title} onChange={e=>{const a=[...hp.streams];a[i]={...a[i],title:e.target.value};update('streams',a)}}/></div></div>
          <div className="adm__field"><label>Description</label><input value={s.description} onChange={e=>{const a=[...hp.streams];a[i]={...a[i],description:e.target.value};update('streams',a)}}/></div>
          <div className="adm__field-row"><div className="adm__field"><label>Color</label><input type="color" value={s.color} onChange={e=>{const a=[...hp.streams];a[i]={...a[i],color:e.target.value};update('streams',a)}} style={{height:'42px'}}/></div><div className="adm__field"><label>Bg</label><input type="color" value={s.bg} onChange={e=>{const a=[...hp.streams];a[i]={...a[i],bg:e.target.value};update('streams',a)}} style={{height:'42px'}}/></div></div>
        </div>))}
        <button type="button" className="adm__add-item-btn" onClick={()=>update('streams',[...(hp.streams||[]),{icon:'📌',title:'',description:'',color:'#6366f1',bg:'#eef2ff'}])}>+ Add Stream</button>
        <button className="adm__btn adm__btn--primary" style={{marginTop:'1.5rem',width:'100%'}} onClick={()=>saveSection('streams',hp.streams)} disabled={saving}>{saving?'⏳ Saving...':'💾 Save Streams'}</button>
      </div>)}

      {activeTab==='cta' && (<div className="adm__section">
        <h2 className="adm__sub-heading">Call to Action</h2>
        <div className="adm__field"><label>Tagline</label><input value={hp.cta?.tagline||''} onChange={e=>update('cta',{...hp.cta,tagline:e.target.value})}/></div>
        <div className="adm__field"><label>Title (HTML)</label><textarea value={hp.cta?.title||''} onChange={e=>update('cta',{...hp.cta,title:e.target.value})} rows="3"/></div>
        <div className="adm__field"><label>Subtitle</label><textarea value={hp.cta?.subtitle||''} onChange={e=>update('cta',{...hp.cta,subtitle:e.target.value})} rows="2"/></div>
        <div className="adm__field-row"><div className="adm__field"><label>Button Text</label><input value={hp.cta?.buttonText||''} onChange={e=>update('cta',{...hp.cta,buttonText:e.target.value})}/></div><div className="adm__field"><label>Button Link</label><input value={hp.cta?.buttonLink||''} onChange={e=>update('cta',{...hp.cta,buttonLink:e.target.value})}/></div></div>
        <button className="adm__btn adm__btn--primary" style={{marginTop:'1.5rem',width:'100%'}} onClick={()=>saveSection('cta',hp.cta)} disabled={saving}>{saving?'⏳ Saving...':'💾 Save CTA'}</button>
      </div>)}
    </div>
  </div>);
}
