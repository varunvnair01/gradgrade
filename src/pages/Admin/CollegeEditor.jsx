import { useState, useEffect, useRef } from 'react';

const API = 'http://localhost:4000/api';
const authHeaders = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('adminToken')}` });
const emptyCollege = { slug:'',name:'',location:'',rating:4.0,rank:'',tags:[],image:'',fees:'',founded:'',totalCourses:'0',totalStreams:0,overview:'',courses:[],features:[],resources:[],contact:{phone:'',email:'',website:''},photos:[] };

export default function CollegeEditor({ toast }) {
  const [colleges, setColleges] = useState([]);
  const [activeSlug, setActiveSlug] = useState(null);
  const [form, setForm] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [search, setSearch] = useState('');
  const [delConfirm, setDelConfirm] = useState(false);
  const [section, setSection] = useState('basic');
  const [uploading, setUploading] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const coverRef = useRef(null);
  const galleryRef = useRef(null);

  useEffect(() => { fetchColleges(); }, []);
  const fetchColleges = async () => { try { const r = await fetch(`${API}/colleges`); const d = await r.json(); if(d.success) setColleges(d.data); } catch{} };

  const handleSelect = (c) => { setActiveSlug(c.slug); setForm(JSON.parse(JSON.stringify(c))); setIsNew(false); setSection('basic'); setDelConfirm(false); };
  const handleNew = () => { setForm(JSON.parse(JSON.stringify(emptyCollege))); setActiveSlug(null); setIsNew(true); setSection('basic'); };
  const genSlug = (n) => n.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');

  const chg = (e) => { const {name,value}=e.target; if(name.startsWith('contact.')){const k=name.split('.')[1]; setForm(p=>({...p,contact:{...p.contact,[k]:value}}))} else if(name==='rating') setForm(p=>({...p,rating:parseFloat(value)||0})); else if(name==='totalStreams') setForm(p=>({...p,totalStreams:parseInt(value)||0})); else setForm(p=>({...p,[name]:value})); };

  const addTag = () => { if(!newTag.trim()) return; setForm(p=>({...p,tags:[...(p.tags||[]),newTag.trim()]})); setNewTag(''); };
  const rmTag = i => setForm(p=>({...p,tags:p.tags.filter((_,j)=>j!==i)}));
  const addCourse = () => setForm(p=>({...p,courses:[...(p.courses||[]),{name:'',fee:'',duration:'',level:'UG'}]}));
  const updCourse = (i,f,v) => setForm(p=>{const c=[...p.courses];c[i]={...c[i],[f]:v};return{...p,courses:c}});
  const rmCourse = i => setForm(p=>({...p,courses:p.courses.filter((_,j)=>j!==i)}));
  const addFeature = () => setForm(p=>({...p,features:[...(p.features||[]),{title:'',description:''}]}));
  const updFeature = (i,f,v) => setForm(p=>{const a=[...p.features];a[i]={...a[i],[f]:v};return{...p,features:a}});
  const rmFeature = i => setForm(p=>({...p,features:p.features.filter((_,j)=>j!==i)}));
  const addResource = () => setForm(p=>({...p,resources:[...(p.resources||[]),{name:'',type:'PDF',url:'#'}]}));
  const updResource = (i,f,v) => setForm(p=>{const a=[...p.resources];a[i]={...a[i],[f]:v};return{...p,resources:a}});
  const rmResource = i => setForm(p=>({...p,resources:p.resources.filter((_,j)=>j!==i)}));
  const rmPhoto = i => setForm(p=>({...p,photos:p.photos.filter((_,j)=>j!==i)}));

  const uploadImg = async (file, target) => {
    setUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const r = await fetch(`${API}/upload`,{method:'POST',headers:authHeaders(),body:JSON.stringify({image:reader.result,filename:file.name.split('.')[0]})});
        const d = await r.json();
        if(d.success){ if(target==='cover') setForm(p=>({...p,image:d.url})); else setForm(p=>({...p,photos:[...(p.photos||[]),d.url]})); toast('Image uploaded!'); }
      } catch{ toast('Upload failed','error'); }
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };
  const handleDrop = (e,t) => { e.preventDefault(); setDragOver(false); const f=e.dataTransfer.files[0]; if(f&&f.type.startsWith('image/')) uploadImg(f,t); };

  const handleSave = async (e) => {
    e.preventDefault();
    if(!form.name){ toast('Name required','error'); return; }
    const slug = form.slug || genSlug(form.name);
    const payload = {...form,slug};
    try {
      const url = isNew ? `${API}/colleges` : `${API}/colleges/${activeSlug}`;
      const r = await fetch(url,{method:isNew?'POST':'PUT',headers:authHeaders(),body:JSON.stringify(payload)});
      const d = await r.json();
      if(d.success){ toast(isNew?'College created!':'Saved!'); fetchColleges(); if(isNew){setIsNew(false);setActiveSlug(slug);} } else toast(d.message,'error');
    } catch{ toast('Save failed','error'); }
  };

  const handleDelete = async () => {
    try { const r = await fetch(`${API}/colleges/${activeSlug}`,{method:'DELETE',headers:authHeaders()}); const d = await r.json(); if(d.success){toast('Deleted'); setForm(null); setActiveSlug(null); setDelConfirm(false); fetchColleges();} } catch{ toast('Delete failed','error'); }
  };

  const filtered = colleges.filter(c=>c.name.toLowerCase().includes(search.toLowerCase()));
  const sections = [{id:'basic',label:'Basic Info',icon:'📋'},{id:'overview',label:'Overview',icon:'📝'},{id:'tags',label:'Tags',icon:'🏷️'},{id:'courses',label:'Courses',icon:'🎓'},{id:'features',label:'Features',icon:'🏆'},{id:'resources',label:'Resources',icon:'📥'},{id:'contact',label:'Contact',icon:'📞'},{id:'images',label:'Images',icon:'📸'}];

  return (
    <div className="adm__layout">
      <aside className="adm__sidebar">
        <button className="adm__add-btn" onClick={handleNew}>+ Add New College</button>
        <input className="adm__search" placeholder="Search colleges..." value={search} onChange={e=>setSearch(e.target.value)} />
        <ul className="adm__list">
          {filtered.map(c=>(<li key={c.slug} className={`adm__list-item ${activeSlug===c.slug?'adm__list-item--active':''}`} onClick={()=>handleSelect(c)}>
            <div className="adm__list-item-avatar">{c.name.charAt(0)}</div>
            <div className="adm__list-item-info"><span className="adm__list-item-name">{c.name}</span><span className="adm__list-item-loc">{c.location}</span></div>
          </li>))}
        </ul>
      </aside>
      <main className="adm__main">
        {form ? (
          <form onSubmit={handleSave}>
            <div className="adm__editor-header">
              <h2>{isNew?'✨ Create New College':`Edit: ${form.name}`}</h2>
              <div className="adm__editor-actions">
                {!isNew && (delConfirm ? (<div className="adm__delete-confirm"><span>Sure?</span><button type="button" className="adm__btn adm__btn--danger" onClick={handleDelete}>Yes</button><button type="button" className="adm__btn adm__btn--ghost" onClick={()=>setDelConfirm(false)}>No</button></div>) : (<button type="button" className="adm__btn adm__btn--danger-outline" onClick={()=>setDelConfirm(true)}>🗑️ Delete</button>))}
                <button type="submit" className="adm__btn adm__btn--primary">💾 {isNew?'Create':'Save'}</button>
              </div>
            </div>
            <div className="adm__section-tabs">{sections.map(s=>(<button key={s.id} type="button" className={`adm__section-tab ${section===s.id?'adm__section-tab--active':''}`} onClick={()=>setSection(s.id)}><span>{s.icon}</span> {s.label}</button>))}</div>
            <div className="adm__form-body">
              {section==='basic' && (<div className="adm__section">
                <div className="adm__field-row"><div className="adm__field"><label>College Name *</label><input name="name" value={form.name} onChange={e=>{chg(e);if(isNew)setForm(p=>({...p,slug:genSlug(e.target.value)}))}} required/></div><div className="adm__field"><label>Slug</label><input name="slug" value={form.slug} onChange={chg}/></div></div>
                <div className="adm__field-row"><div className="adm__field"><label>Location</label><input name="location" value={form.location} onChange={chg}/></div><div className="adm__field"><label>Rank</label><input name="rank" value={form.rank} onChange={chg}/></div></div>
                <div className="adm__field-row"><div className="adm__field"><label>Rating (0-5)</label><input type="number" step="0.1" min="0" max="5" name="rating" value={form.rating} onChange={chg}/></div><div className="adm__field"><label>Fees</label><input name="fees" value={form.fees} onChange={chg}/></div></div>
                <div className="adm__field-row"><div className="adm__field"><label>Founded</label><input name="founded" value={form.founded} onChange={chg}/></div><div className="adm__field"><label>Total Courses</label><input name="totalCourses" value={form.totalCourses} onChange={chg}/></div><div className="adm__field"><label>Total Streams</label><input type="number" name="totalStreams" value={form.totalStreams} onChange={chg}/></div></div>
              </div>)}
              {section==='overview' && (<div className="adm__section"><div className="adm__field"><label>Overview / Description</label><textarea name="overview" value={form.overview} onChange={chg} rows="12"/></div></div>)}
              {section==='tags' && (<div className="adm__section">
                <div className="adm__chips">{(form.tags||[]).map((t,i)=>(<span key={i} className="adm__chip">{t}<button type="button" onClick={()=>rmTag(i)}>×</button></span>))}</div>
                <div className="adm__inline-add"><input value={newTag} onChange={e=>setNewTag(e.target.value)} placeholder="Add tag..." onKeyDown={e=>e.key==='Enter'&&(e.preventDefault(),addTag())}/><button type="button" className="adm__btn adm__btn--sm" onClick={addTag}>Add</button></div>
              </div>)}
              {section==='courses' && (<div className="adm__section">
                {(form.courses||[]).map((c,i)=>(<div key={i} className="adm__dynamic-card"><div className="adm__dynamic-card-header"><span>Course #{i+1}</span><button type="button" className="adm__remove-btn" onClick={()=>rmCourse(i)}>✕</button></div>
                  <div className="adm__field-row"><div className="adm__field"><label>Name</label><input value={c.name} onChange={e=>updCourse(i,'name',e.target.value)}/></div><div className="adm__field"><label>Fee</label><input value={c.fee} onChange={e=>updCourse(i,'fee',e.target.value)}/></div></div>
                  <div className="adm__field-row"><div className="adm__field"><label>Duration</label><input value={c.duration} onChange={e=>updCourse(i,'duration',e.target.value)}/></div><div className="adm__field"><label>Level</label><select value={c.level} onChange={e=>updCourse(i,'level',e.target.value)}><option value="UG">UG</option><option value="PG">PG</option><option value="Doctoral">Doctoral</option></select></div></div>
                </div>))}
                <button type="button" className="adm__add-item-btn" onClick={addCourse}>+ Add Course</button>
              </div>)}
              {section==='features' && (<div className="adm__section">
                {(form.features||[]).map((f,i)=>(<div key={i} className="adm__dynamic-card"><div className="adm__dynamic-card-header"><span>Feature #{i+1}</span><button type="button" className="adm__remove-btn" onClick={()=>rmFeature(i)}>✕</button></div>
                  <div className="adm__field"><label>Title</label><input value={f.title} onChange={e=>updFeature(i,'title',e.target.value)}/></div>
                  <div className="adm__field"><label>Description</label><textarea value={f.description} onChange={e=>updFeature(i,'description',e.target.value)} rows="3"/></div>
                </div>))}
                <button type="button" className="adm__add-item-btn" onClick={addFeature}>+ Add Feature</button>
              </div>)}
              {section==='resources' && (<div className="adm__section">
                {(form.resources||[]).map((r,i)=>(<div key={i} className="adm__dynamic-card"><div className="adm__dynamic-card-header"><span>Resource #{i+1}</span><button type="button" className="adm__remove-btn" onClick={()=>rmResource(i)}>✕</button></div>
                  <div className="adm__field-row"><div className="adm__field"><label>Name</label><input value={r.name} onChange={e=>updResource(i,'name',e.target.value)}/></div><div className="adm__field"><label>Type</label><input value={r.type} onChange={e=>updResource(i,'type',e.target.value)}/></div><div className="adm__field"><label>URL</label><input value={r.url} onChange={e=>updResource(i,'url',e.target.value)}/></div></div>
                </div>))}
                <button type="button" className="adm__add-item-btn" onClick={addResource}>+ Add Resource</button>
              </div>)}
              {section==='contact' && (<div className="adm__section">
                <div className="adm__field"><label>Phone</label><input name="contact.phone" value={form.contact?.phone||''} onChange={chg}/></div>
                <div className="adm__field"><label>Email</label><input name="contact.email" value={form.contact?.email||''} onChange={chg}/></div>
                <div className="adm__field"><label>Website</label><input name="contact.website" value={form.contact?.website||''} onChange={chg}/></div>
              </div>)}
              {section==='images' && (<div className="adm__section">
                <h3 className="adm__sub-heading">Cover Image</h3>
                <div className={`adm__dropzone ${dragOver?'adm__dropzone--active':''}`} onDragOver={e=>{e.preventDefault();setDragOver(true)}} onDragLeave={()=>setDragOver(false)} onDrop={e=>handleDrop(e,'cover')} onClick={()=>coverRef.current?.click()}>
                  {form.image ? <img src={form.image} alt="Cover" className="adm__dropzone-preview"/> : <div className="adm__dropzone-placeholder"><span className="adm__dropzone-icon">📤</span><p>Drag & drop or click to upload</p></div>}
                  <input ref={coverRef} type="file" accept="image/*" hidden onChange={e=>e.target.files[0]&&uploadImg(e.target.files[0],'cover')}/>
                </div>
                <div className="adm__field" style={{marginTop:'0.75rem'}}><label>Or paste URL</label><input name="image" value={form.image} onChange={chg} placeholder="https://..."/></div>
                {uploading && <p className="adm__uploading">⏳ Uploading...</p>}
                <h3 className="adm__sub-heading" style={{marginTop:'2rem'}}>Photo Gallery</h3>
                <div className="adm__gallery-grid">
                  {(form.photos||[]).map((u,i)=>(<div key={i} className="adm__gallery-item"><img src={u} alt={`Gallery ${i+1}`}/><button type="button" className="adm__gallery-remove" onClick={()=>rmPhoto(i)}>✕</button></div>))}
                  <div className="adm__gallery-add" onClick={()=>galleryRef.current?.click()} onDragOver={e=>{e.preventDefault();setDragOver(true)}} onDragLeave={()=>setDragOver(false)} onDrop={e=>handleDrop(e,'gallery')}><span>+</span><p>Add</p><input ref={galleryRef} type="file" accept="image/*" hidden onChange={e=>e.target.files[0]&&uploadImg(e.target.files[0],'gallery')}/></div>
                </div>
              </div>)}
            </div>
          </form>
        ) : (
          <div className="adm__empty"><div className="adm__empty-icon">🏫</div><h3>Select a college to edit</h3><p>Choose from the sidebar or create a new one</p><button className="adm__btn adm__btn--primary" onClick={handleNew}>+ Create New College</button></div>
        )}
      </main>
    </div>
  );
}
