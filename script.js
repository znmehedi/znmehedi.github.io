const CONFIG = {
  roles: [".NET Full Stack Developer", "ASP.NET Core · Angular · Azure", "Microservices & Cloud Architecture", "Computer Vision (C++ / OpenCV)"],
  contactApi: "",
  email: "zn.mehedi@gmail.com"
};

const SKILLS = {
  "Languages": ["C#", "C++", "JavaScript", "TypeScript", "Java"],
  "Backend": ["ASP.NET Core", "Web API", "EF Core", "Angular", "Qt"],
  "Architecture": ["Clean Architecture", "Microservices", "CQRS", "SOLID", "Multi-Tenancy", "Plugin Architecture"],
  "Cloud & DevOps": ["Azure Container Apps", "Docker", "Kubernetes", "GitHub Actions", "Blue-Green Deploy"],
  "Data & Messaging": ["SQL Server", "MySQL", "MongoDB", "Redis", "RabbitMQ", "SignalR"],
  "Observability": ["Grafana", "ELK Stack"]
};

const PROJECTS = [
  { title: "Multi-Tenant ASP.NET Core Platform", cat: "Backend",
    desc: "Microservice-oriented, tenant-aware Web API serving many clients from one codebase, with blue-green deploys on Azure Container Apps.",
    tags: ["ASP.NET Core", "Azure", "CI/CD", "xUnit"],
    image: "https://placehold.co/800x500/161a24/7c5cff?text=Multi-Tenant+Platform", live: "#", code: "#" },
  { title: "Enterprise nopCommerce Plugin Suite", cat: "Backend",
    desc: "Host/domain-mapped plugin ecosystem enabling white-labeled deployments for 10+ clients, plus isolated payment Worker Services over SignalR.",
    tags: ["nopCommerce", "SignalR", "Worker Services"],
    image: "https://placehold.co/800x500/161a24/22d3ee?text=Plugin+Suite", live: "#", code: "#" },
  { title: "OMR Engine: Mapper & Scanner", cat: "Computer Vision",
    desc: "Template-independent OMR engine in C++ and OpenCV that maps arbitrary sheet layouts and detects filled bubbles. Ported to Android and iOS.",
    tags: ["C++", "OpenCV", "CMake"],
    image: "https://placehold.co/800x500/161a24/7c5cff?text=OMR+Engine", live: "#", code: "#" },
  { title: "School & College Management ERP", cat: "Full Stack",
    desc: "Exam system, result publication and online admission, running in production at 3 colleges and 7+ schools.",
    tags: ["ASP.NET", "SQL Server", "Caching"],
    image: "https://placehold.co/800x500/161a24/22d3ee?text=School+ERP", live: "#", code: "#" },
  { title: "Live Document Scanner", cat: "Computer Vision",
    desc: "Browser-based scanner that detects, de-warps and captures documents from a webcam in real time.",
    tags: ["ASP.NET Core", "JavaScript", "Webcam"],
    image: "https://placehold.co/800x500/161a24/7c5cff?text=Document+Scanner", live: "#", code: "#" },
  { title: "Cloud Drive (Personal Project)", cat: "Full Stack",
    desc: "Google-Drive-style file sharing: R2 storage, PostgreSQL metadata, ASP.NET Core auth and main servers, Angular UI and share controls.",
    tags: ["ASP.NET Core", "Angular", "Cloudflare R2", "PostgreSQL"],
    image: "https://placehold.co/800x500/161a24/22d3ee?text=Cloud+Drive", live: "#", code: "#" }
];
/* ==================================== */
document.getElementById('year').textContent = new Date().getFullYear();

const startDate = new Date('2022-09-18');
const today = new Date();

let experience = today.getFullYear() - startDate.getFullYear();

const hasHadAnniversary = 
  today.getMonth() > startDate.getMonth() || 
  (today.getMonth() === startDate.getMonth() && today.getDate() >= startDate.getDate());

if (!hasHadAnniversary) {
  experience--;
}

document.getElementById('exp-yr').textContent = experience + '+';

const expStatBlock = document.querySelector('.stat b[data-suffix="+"]');
if (expStatBlock && expStatBlock.nextElementSibling.textContent.includes('Years of experience')) {
    expStatBlock.setAttribute('data-count', experience);
}
/* work experience */

// theme
const root = document.documentElement, tbtn = document.getElementById('theme');
try{ const s = localStorage.getItem('theme'); if(s) root.dataset.theme = s; }catch(e){}
const syncIcon = () => tbtn.textContent = root.dataset.theme === 'light' ? '☀' : '☾';
syncIcon();
tbtn.onclick = () => {
  root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
  try{ localStorage.setItem('theme', root.dataset.theme); }catch(e){}
  syncIcon();
};

// typing effect
(function(){
  const el = document.getElementById('typed'); let r=0,c=0,del=false;
  (function tick(){
    const word = CONFIG.roles[r];
    el.textContent = word.slice(0,c);
    if(!del && c===word.length){ del=true; return setTimeout(tick,1500); }
    if(del && c===0){ del=false; r=(r+1)%CONFIG.roles.length; }
    c += del ? -1 : 1;
    setTimeout(tick, del ? 35 : 70);
  })();
})();

// skills
document.getElementById('skills').innerHTML = Object.entries(SKILLS).map(([g,list]) =>
  `<div class="skillgroup"><h4>${g}</h4><div class="chips">${list.map(s=>`<span class="chip">${s}</span>`).join('')}</div></div>`
).join('');

// projects + filter
const grid = document.getElementById('projectGrid'), filters = document.getElementById('filters');
grid.innerHTML = PROJECTS.map(p => `
  <article class="card rv" data-cat="${p.cat}">
    <img src="${p.image}" alt="${p.title}" loading="lazy">
    <div class="body">
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="tags">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div>
      <div class="row"><a href="${p.live}" target="_blank" rel="noopener">Live demo ↗</a><a href="${p.code}" target="_blank" rel="noopener">Source ↗</a></div>
    </div>
  </article>`).join('');
const cats = ['All', ...new Set(PROJECTS.map(p=>p.cat))];
filters.innerHTML = cats.map((c,i)=>`<button class="${i?'':'on'}" data-c="${c}">${c}</button>`).join('');
filters.onclick = e => {
  const b = e.target.closest('button'); if(!b) return;
  filters.querySelectorAll('button').forEach(x=>x.classList.toggle('on', x===b));
  grid.querySelectorAll('.card').forEach(card => card.classList.toggle('hide', b.dataset.c!=='All' && card.dataset.cat!==b.dataset.c));
};

// 3D tilt on cards
grid.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left)/r.width - .5, y = (e.clientY - r.top)/r.height - .5;
    card.style.transform = `perspective(800px) rotateY(${x*8}deg) rotateX(${-y*8}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => card.style.transform = '');
});

// scroll reveal
const io = new IntersectionObserver(es => es.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }), {threshold:.12});
document.querySelectorAll('.rv').forEach(el => io.observe(el));

// count-up
const cio = new IntersectionObserver(es => es.forEach(e => {
  if(!e.isIntersecting) return; cio.unobserve(e.target);
  const n = +e.target.dataset.count, suf = e.target.dataset.suffix||''; let v=0;
  const step = () => { v += Math.max(1, n/30); if(v>=n){ e.target.textContent = n+suf; } else { e.target.textContent = Math.floor(v)+suf; requestAnimationFrame(step); } };
  step();
}), {threshold:.6});
document.querySelectorAll('[data-count]').forEach(el => cio.observe(el));

// scroll progress + active link
const bar = document.getElementById('progress');
const secs = [...document.querySelectorAll('section[id]')], navLinks = [...document.querySelectorAll('.links a[href^="#"]')];
addEventListener('scroll', () => {
  const h = document.documentElement;
  bar.style.width = (h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';
  let cur = secs[0].id;
  secs.forEach(s => { if(scrollY >= s.offsetTop-140) cur = s.id; });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href')==='#'+cur));
}, {passive:true});

// cursor glow
const glow = document.getElementById('glow');
addEventListener('mousemove', e => { glow.style.left = e.clientX+'px'; glow.style.top = e.clientY+'px'; });
if(matchMedia('(pointer:coarse)').matches) glow.style.display='none';

// contact form
document.getElementById('contactForm').addEventListener('submit', async e => {
  e.preventDefault();
  const f = e.target, msg = document.getElementById('formMsg');
  const data = Object.fromEntries(new FormData(f));
  if(CONFIG.contactApi){
    try{
      const res = await fetch(CONFIG.contactApi, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)});
      if(!res.ok) throw new Error();
      msg.textContent = 'Thanks! I\'ll get back to you soon.'; f.reset();
    }catch{ msg.textContent = 'Could not send. Please email me directly.'; }
  } else {
    location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent('Portfolio message from '+data.name)}&body=${encodeURIComponent(data.message+'\n\n'+data.email)}`;
    msg.textContent = 'Opening your email app…';
  }
});