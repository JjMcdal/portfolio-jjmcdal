/* ==========================================================
   EDIT YOUR CONTENT HERE: everything on the page comes from
   the objects below.
   ========================================================== */

const EMAIL = 'jjmcdalnabong2001@gmail.com';

const LINKS = [
    { label: 'jjmcdalnabong2001@gmail.com', href: 'mailto:' + EMAIL, icon: 'mail' },
    { label: 'github.com/JjMcdal', href: 'https://github.com/JjMcdal', icon: 'github' },
    // Add your LinkedIn when ready:
    // { label: 'linkedin.com/in/your-handle', href: 'https://www.linkedin.com/in/your-handle', icon: 'linkedin' },
];

const BUILT_FOR = [
    'Bureau of Animal Industry',
    'Schools Division Office of Caloocan City',
    'University of Caloocan City',
];

const CERTS = [
    'ISTQB Foundation Level',
    'Certified ScrumMaster (CSM)',
    'Postman API Fundamentals',
    'Simplilearn: Generative AI',
    'Simplilearn: Cybersecurity',
    'Simplilearn: SQL',
    'Sololearn: HTML, CSS, JavaScript',
];

// slug = icon name on simpleicons.org
const STACK = [
    { name: 'React', slug: 'react', cat: 'Frontend' },
    { name: 'Next.js', slug: 'nextdotjs', cat: 'Frontend' },
    { name: 'TypeScript', slug: 'typescript', cat: 'Frontend' },
    { name: 'JavaScript', slug: 'javascript', cat: 'Frontend' },
    { name: 'Tailwind CSS', slug: 'tailwindcss', cat: 'Frontend' },
    { name: 'Node.js', slug: 'nodedotjs', cat: 'Backend' },
    { name: 'GraphQL', slug: 'graphql', cat: 'Backend' },
    { name: 'Java', slug: 'openjdk', cat: 'Backend' },
    { name: 'Bash', slug: 'gnubash', cat: 'Backend' },
    { name: 'Flutter', slug: 'flutter', cat: 'Mobile' },
    { name: 'PostgreSQL', slug: 'postgresql', cat: 'Database & Cloud' },
    { name: 'MySQL', slug: 'mysql', cat: 'Database & Cloud' },
    { name: 'Redis', slug: 'redis', cat: 'Database & Cloud' },
    { name: 'Supabase', slug: 'supabase', cat: 'Database & Cloud' },
    { name: 'Firebase', slug: 'firebase', cat: 'Database & Cloud' },
    { name: 'Vercel', slug: 'vercel', cat: 'Database & Cloud' },
    { name: 'Ethereum', slug: 'ethereum', cat: 'Web3' },
    { name: 'Git', slug: 'git', cat: 'Tools' },
    { name: 'GitHub', slug: 'github', cat: 'Tools' },
    { name: 'GitHub Actions', slug: 'githubactions', cat: 'Tools' },
    { name: 'Postman', slug: 'postman', cat: 'Tools' },
    { name: 'Jira', slug: 'jira', cat: 'Tools' },
];
const STACK_CATS = ['All', 'Frontend', 'Backend', 'Mobile', 'Database & Cloud', 'Web3', 'Tools'];

const PROJECTS = [
    {
        id: 'rcv',
        title: 'RCV System',
        subtitle: 'Regulatory Compliance Verification',
        short: 'Web3-enabled compliance platform for the Bureau of Animal Industry, with Ethereum blockchain integration and PostgreSQL.',
        period: 'Aug 2025 – Mar 2026',
        role: 'Research Developer (thesis)',
        tags: ['Web App', 'Web3', 'React', 'TypeScript', 'Node.js', 'PostgreSQL'],
        tech: ['React', 'Vite', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Redis', 'ethers.js', 'Firebase Auth'],
        highlights: [
            'Verifies regulatory compliance records and anchors them on the Ethereum Sepolia testnet.',
            'Handed over to the Bureau of Animal Industry at the end of the thesis.',
            'Reported a 70% improvement in processing efficiency.',
            'CI/CD through GitHub Actions to Vercel, Railway, Heroku, and Firebase.',
            'Won Thesis of the Year, Best Technical Documentation, and Best Research Developer.',
        ],
        links: [{ label: 'Live frontend', href: 'https://rcv-steel.vercel.app' }],
        note: 'The deployed site is a frontend demo. The backend is currently offline, so login will not work.',
    },
    {
        id: 'sdo-inventory',
        title: 'SDO Caloocan Inventory System',
        subtitle: 'OJT project, Schools Division Office',
        short: 'Inventory management for 1,000+ digital assets across 80+ public schools, with automated reports and audit logs.',
        period: 'May – Jul 2025',
        role: 'OJT Developer',
        tags: ['Web App', 'React', 'Node.js', 'PostgreSQL', 'Dashboard'],
        tech: ['React', 'Node.js', 'PostgreSQL'],
        highlights: [
            'Tracks 1,000+ digital assets across 80+ public schools.',
            'PostgreSQL optimization made data retrieval 40% faster.',
            'Automated reporting and audit logs for accountability.',
        ],
        links: [],
        note: 'Internal government system, so there is no public demo.',
    },
    {
        id: 'circuit-cube',
        title: 'Circuit Cube',
        subtitle: '3D breadboarding learning platform',
        short: 'A learning management system for logic circuits, with a 3D breadboard and logic gate simulation.',
        period: 'Jul 2024 – Apr 2025',
        role: 'Developer',
        tags: ['Web App', 'React', 'JavaScript', 'UI/UX'],
        tech: ['React', 'Vite', 'JavaScript'],
        highlights: [
            'Students build and test logic circuits on a 3D breadboard in the browser.',
            'Simulates logic gate behavior in real time.',
        ],
        links: [{ label: 'Live site', href: 'https://circuitcube.netlify.app' }],
        note: '',
    },
    {
        id: 'pandayo-coffee',
        title: 'Pandayo Coffee',
        subtitle: 'POS and inventory system',
        short: 'Point-of-sale and inventory system for a coffee shop, with role-based access for owner, cashier, and staff.',
        period: 'In progress',
        role: 'Solo developer',
        tags: ['Web App', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Dashboard'],
        tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
        highlights: [
            'Role-based access control for owner, cashier, and staff.',
            'Flow: login, point of sale, inventory, admin dashboard.',
            'Supabase handles authentication and the Postgres database.',
        ],
        links: [{ label: 'GitHub repo', href: 'https://github.com/JjMcdal/pandayo-coffee' }],
        note: 'Still being built. Progress is pushed to GitHub regularly.',
    },
];

/* ==========================================================
   CODE (you usually don't need to edit below this line)
   ========================================================== */

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const root = document.documentElement;
const isDark = () => root.getAttribute('data-theme') === 'dark';
const iconColor = () => (isDark() ? 'ffffff' : '0a0a0a');

const ICONS = {
    mail: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    arrow: '<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg>',
};
const brandIcon = (slug, size = 34, cls = 'icon') =>
    `<img class="${cls}" src="https://cdn.simpleicons.org/${slug}/${iconColor()}" alt="" width="${size}" height="${size}" onerror="this.style.visibility='hidden'">`;
const iconFor = (name) => ICONS[name] || brandIcon(name);

/* ---------- Theme ---------- */
function applyThemeLabel() {
    $('#theme-label').textContent = isDark() ? 'Light Mode' : 'Dark Mode';
}
function setTheme(t) {
    root.setAttribute('data-theme', t);
    try { localStorage.setItem('theme', t); } catch (e) { /* storage unavailable */ }
    applyThemeLabel();
    renderStack();
    renderContact();
    renderFooter();
}
$('#theme-btn').addEventListener('click', () => setTheme(isDark() ? 'light' : 'dark'));

/* ---------- Static lists ---------- */
function renderMarquee() {
    const items = [...BUILT_FOR, ...BUILT_FOR, ...BUILT_FOR, ...BUILT_FOR]
        .map((n) => `<span class="marquee-item">${n}</span>`).join('');
    $('#marquee').innerHTML = items + items;
}
function renderCerts() {
    $('#certs').innerHTML = CERTS.map((c) => `<li class="chip">${c}</li>`).join('');
}

/* ---------- Stack ---------- */
let stackCat = 'All';
function renderStackFilters() {
    $('#stack-filters').innerHTML = STACK_CATS.map(
        (c) => `<button class="filter ${c === stackCat ? 'on' : ''}" data-cat="${c}">${c}</button>`
    ).join('');
    $$('#stack-filters .filter').forEach((b) =>
        b.addEventListener('click', () => { stackCat = b.dataset.cat; renderStackFilters(); renderStack(); })
    );
}
function renderStack() {
    const list = STACK.filter((t) => stackCat === 'All' || t.cat === stackCat);
    $('#stack-grid').innerHTML = list
        .map((t) => `<span class="tool">${brandIcon(t.slug, 22, '')}${t.name}</span>`).join('');
}

/* ---------- Projects ---------- */
let projTag = 'All';
function renderProjFilters() {
    const tags = ['All', ...new Set(PROJECTS.flatMap((p) => p.tags))];
    $('#proj-filters').innerHTML = tags.map(
        (t) => `<button class="filter ${t === projTag ? 'on' : ''}" data-tag="${t}">${t}</button>`
    ).join('');
    $$('#proj-filters .filter').forEach((b) =>
        b.addEventListener('click', () => { projTag = b.dataset.tag; renderProjFilters(); renderProjects(); })
    );
}
function renderProjects() {
    const list = PROJECTS.filter((p) => projTag === 'All' || p.tags.includes(projTag));
    $('#proj-grid').innerHTML = list.length
        ? list.map((p) => `
            <button class="card" data-id="${p.id}" aria-label="Open ${p.title}">
                <div class="thumb-box">${p.title}</div>
                <div class="card-body">
                    <h3>${p.title}</h3>
                    <p>${p.short}</p>
                    <div class="chips">${p.tech.slice(0, 4).map((t) => `<span class="chip">${t}</span>`).join('')}</div>
                </div>
            </button>`).join('')
        : '<p class="empty">No projects with that tag yet.</p>';
    $$('#proj-grid .card').forEach((c) =>
        c.addEventListener('click', () => { location.hash = '#/project/' + c.dataset.id; })
    );
}

/* ---------- Project detail (hash route) ---------- */
function renderDetail(id) {
    const p = PROJECTS.find((x) => x.id === id);
    if (!p) { location.hash = '#projects'; return; }
    document.title = p.title + ' | Jj Mcdal Nabong';
    $('#detail-content').innerHTML = `
        <button class="back" id="back-btn">&larr; Back to projects</button>
        <p class="eyebrow">${p.subtitle}</p>
        <h1>${p.title}</h1>
        <p class="lead">${p.short}</p>
        <div class="thumb-box detail-hero">${p.title}</div>
        <div class="detail-grid">
            <div>
                <h2>Highlights</h2>
                <ul>${p.highlights.map((h) => `<li>${h}</li>`).join('')}</ul>
                ${p.note ? `<p class="note">${p.note}</p>` : ''}
            </div>
            <dl class="side-box">
                <div><dt>Role</dt><dd>${p.role}</dd></div>
                <div><dt>Period</dt><dd>${p.period}</dd></div>
                <div><dt>Built with</dt><dd class="chips" style="font-weight:400">${p.tech.map((t) => `<span class="chip">${t}</span>`).join('')}</dd></div>
                ${p.links.map((l) => `<a class="btn solid" href="${l.href}" target="_blank" rel="noopener">${l.label}</a>`).join('')}
            </dl>
        </div>`;
    $('#back-btn').addEventListener('click', () => { location.hash = '#projects'; });
}

function route() {
    const h = location.hash;
    if (h.startsWith('#/project/')) {
        document.body.classList.add('detail-open');
        renderDetail(h.replace('#/project/', ''));
        window.scrollTo(0, 0);
    } else {
        const wasDetail = document.body.classList.contains('detail-open');
        document.body.classList.remove('detail-open');
        document.title = 'Jj Mcdal Nabong | Full-Stack Developer';
        if (wasDetail) {
            const target = h && h.length > 1 ? $(h) : null;
            if (target) target.scrollIntoView();
        }
    }
}
window.addEventListener('hashchange', route);

/* ---------- Contact + footer ---------- */
function renderContact() {
    $('#contact-list').innerHTML = LINKS.map((l) => `
        <a class="contact-row" href="${l.href}" ${l.href.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}>
            ${iconFor(l.icon)}<span class="val">${l.label}</span>${ICONS.arrow}
        </a>`).join('');
}
function renderFooter() {
    $('#foot-icons').innerHTML = LINKS.map((l) =>
        `<a href="${l.href}" aria-label="${l.label}" ${l.href.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}>${iconFor(l.icon)}</a>`
    ).join('');
}

/* ---------- Scroll spy ---------- */
function spy() {
    const ids = ['about', 'experience', 'stack', 'projects', 'contact'];
    let current = '';
    ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) current = id;
    });
    $$('.nav-links a').forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
}
window.addEventListener('scroll', spy, { passive: true });

/* ---------- Command palette (Ctrl/Cmd + K) ---------- */
const bg = $('#palette-bg');
const input = $('#palette-input');
const listEl = $('#palette-list');
let sel = 0;

function commands() {
    const go = (hash) => () => { location.hash = hash; };
    return [
        { name: 'Go to About', hint: 'section', run: go('#about') },
        { name: 'Go to Experience', hint: 'section', run: go('#experience') },
        { name: 'Go to Stack', hint: 'section', run: go('#stack') },
        { name: 'Go to Projects', hint: 'section', run: go('#projects') },
        { name: 'Go to Contact', hint: 'section', run: go('#contact') },
        ...PROJECTS.map((p) => ({ name: 'Open ' + p.title, hint: 'project', run: go('#/project/' + p.id) })),
        { name: isDark() ? 'Switch to light mode' : 'Switch to dark mode', hint: 'action', run: () => setTheme(isDark() ? 'light' : 'dark') },
        { name: 'Send an email', hint: 'action', run: () => { location.href = 'mailto:' + EMAIL; } },
        { name: 'Open GitHub', hint: 'link', run: () => window.open('https://github.com/JjMcdal', '_blank', 'noopener') },
    ];
}
function renderPalette() {
    const q = input.value.trim().toLowerCase();
    const items = commands().filter((c) => c.name.toLowerCase().includes(q));
    sel = Math.min(sel, Math.max(items.length - 1, 0));
    listEl.innerHTML = items.length
        ? items.map((c, i) => `<li><button class="${i === sel ? 'sel' : ''}" data-i="${i}">${c.name}<small>${c.hint}</small></button></li>`).join('')
        : '<li><p class="empty" style="padding:1rem">No matches.</p></li>';
    $$('button', listEl).forEach((b) => b.addEventListener('click', () => { closePalette(); items[+b.dataset.i].run(); }));
    listEl._items = items;
}
function openPalette() { bg.classList.add('open'); input.value = ''; sel = 0; renderPalette(); input.focus(); }
function closePalette() { bg.classList.remove('open'); }
$('#palette-btn').addEventListener('click', openPalette);
bg.addEventListener('click', (e) => { if (e.target === bg) closePalette(); });
input.addEventListener('input', () => { sel = 0; renderPalette(); });
input.addEventListener('keydown', (e) => {
    const n = (listEl._items || []).length;
    if (e.key === 'ArrowDown') { e.preventDefault(); sel = (sel + 1) % n; renderPalette(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); sel = (sel - 1 + n) % n; renderPalette(); }
    if (e.key === 'Enter' && n) { e.preventDefault(); const it = listEl._items[sel]; closePalette(); it.run(); }
});
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); bg.classList.contains('open') ? closePalette() : openPalette(); }
    if (e.key === 'Escape') closePalette();
});

/* ---------- Init ---------- */
applyThemeLabel();
renderMarquee();
renderCerts();
renderStackFilters();
renderStack();
renderProjFilters();
renderProjects();
renderContact();
renderFooter();
route();
spy();
