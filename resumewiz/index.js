/* ══════════════════════════════════════════════════════════════════════════════
   STATE MANAGEMENT
   ══════════════════════════════════════════════════════════════════════════════ */
const state = {
  editMode: false,
  currentTemplate: 'modern',
  photo: null,
  
  // Visibility flags for sections
  sectionVisibility: {
    education: true,
    expertise: true,
    languages: true,
    experience: true,
    references: true,
    certifications: true,
    declaration: true
  },
  
  // Modern template data
  firstname: 'Mariana',
  lastname: 'Anderson',
  role: 'Marketing Manager',
  summary: 'Experienced marketing manager with a passion for building brands and driving growth through creative strategies and data-driven decisions. Skilled at leading teams and delivering results.',
  phone: '123-456-7890',
  email: 'hello@reallygreatsite.com',
  address: '123 Anywhere St., Any City',
  
  // Declaration
  declarationText: 'I hereby declare that all the information provided above is true and correct to the best of my knowledge.',
  declarationPlace: 'New York',
  declarationName: 'Mariana Anderson',
  
  edu: [
    { year: '2008', degree: 'Bachelor of Business Administration', school: 'University of Marketing Arts' },
    { year: '2006', degree: 'Diploma in Communications', school: 'City College' }
  ],
  
  expertise: [
    'Brand Strategy', 
    'Content Marketing', 
    'Social Media', 
    'Data Analytics', 
    'Team Leadership', 
    'Campaign Management'
  ],
  
  langs: ['English', 'Spanish'],
  
  exp: [
    { 
      period: '2019 – 2022', 
      company: 'Company Name | 123 Anywhere St., Any City', 
      title: 'Senior Marketing Manager', 
      desc: 'Led a cross-functional team of 12 to deliver integrated marketing campaigns across digital and traditional channels. Drove a 35% increase in lead generation and grew brand awareness by 48% YoY.' 
    },
    { 
      period: '2017 – 2019', 
      company: 'Company Name | 123 Anywhere St., Any City', 
      title: 'Marketing Manager', 
      desc: 'Developed and executed multi-channel marketing strategies, managed a $2M budget, and launched 3 major product campaigns resulting in record quarterly sales figures.' 
    },
    { 
      period: '2015 – 2017', 
      company: 'Company Name | 123 Anywhere St., Any City', 
      title: 'Marketing Coordinator', 
      desc: 'Coordinated marketing activities including event planning, email campaigns, and social media management. Supported the senior team in delivering projects on time and within scope.' 
    }
  ],
  
  refs: [
    { name: 'Name Surname', role: 'Job Position, Company Name', phone: '123-456-7890', email: 'hello@reallygreatsite.com' },
    { name: 'Name Surname', role: 'Job Position, Company Name', phone: '123-456-7890', email: 'hello@reallygreatsite.com' }
  ],

  certifications: [
    'Google Analytics Individual Qualification (GAIQ)',
    'Facebook Blueprint Certification',
    'HubSpot Inbound Marketing Certification',
    'Google Ads Certification'
  ],

  customBlocks: [],

  // ATS template data
  ats: {
    exp: [
      {
        title: "Senior Marketing Manager",
        company: "XYZ Corporation, Sydney, NSW",
        period: "January 2022 – Present",
        bullets: [
          "Lead a team of 5 in executing comprehensive digital marketing strategies across multiple channels",
          "Achieved a 35% increase in website traffic and 28% boost in conversion rates within first year",
          "Managed annual marketing budget of $200,000, optimizing ROI by 42%",
          "Developed and launched successful social media campaigns reaching over 500K impressions monthly"
        ]
      },
      {
        title: "Marketing Coordinator",
        company: "ABC Digital Agency, Sydney, NSW",
        period: "March 2019 – December 2021",
        bullets: [
          "Coordinated marketing campaigns for 15+ clients across various industries",
          "Implemented SEO strategies that improved client rankings by an average of 40%",
          "Created compelling content for blogs, social media, and email campaigns",
          "Collaborated with design team to produce engaging visual assets"
        ]
      }
    ]
  }
};

/* ══════════════════════════════════════════════════════════════════════════════
   SECTION VISIBILITY TOGGLE
   ══════════════════════════════════════════════════════════════════════════════ */
function toggleSection(sectionName) {
  state.sectionVisibility[sectionName] = !state.sectionVisibility[sectionName];
  
  // Update modern template
  const modernSection = document.getElementById(`section_${sectionName}`);
  if (modernSection) {
    modernSection.classList.toggle('hidden', !state.sectionVisibility[sectionName]);
  }
  
  // Update ATS template
  const atsSection = document.getElementById(`ats_section_${sectionName}`);
  if (atsSection) {
    atsSection.classList.toggle('hidden', !state.sectionVisibility[sectionName]);
  }
  
  // Update button icon
  updateSectionButtons();
}

function updateSectionButtons() {
  Object.keys(state.sectionVisibility).forEach(section => {
    const panel = document.getElementById(`panel_${section}`);
    if (panel) {
      const btn = panel.querySelector('.btn-delete-section');
      if (btn) {
        btn.textContent = state.sectionVisibility[section] ? '👁️' : '🚫';
        btn.title = state.sectionVisibility[section] ? 'Hide Section' : 'Show Section';
      }
    }
  });
}

/* ══════════════════════════════════════════════════════════════════════════════
   TEMPLATE SWITCHING
   ══════════════════════════════════════════════════════════════════════════════ */
function switchTemplate() {
  const modern = document.getElementById('resume');
  const ats = document.getElementById('resumeATS');
  const btnText = document.getElementById('templateBtnText');

  if (state.currentTemplate === 'modern') {
    modern.style.display = 'none';
    ats.style.display = 'block';
    state.currentTemplate = 'ats';
    btnText.textContent = 'Switch to Modern';
    
    // Hide Modern-only panels
    document.getElementById('panel_photo').classList.add('hidden');
    document.getElementById('panel_colors').classList.add('hidden');
    
    // Show ATS-only panels
    document.getElementById('panel_certifications').classList.remove('hidden');
  } else {
    modern.style.display = 'grid';
    ats.style.display = 'none';
    state.currentTemplate = 'modern';
    btnText.textContent = 'Switch to ATS';
    
    // Show Modern-only panels
    document.getElementById('panel_photo').classList.remove('hidden');
    document.getElementById('panel_colors').classList.remove('hidden');
    
    // Hide ATS-only panels
    document.getElementById('panel_certifications').classList.add('hidden');
  }
  
  // Reapply edit mode to newly visible template
  applyEditMode();
}

/* ══════════════════════════════════════════════════════════════════════════════
   EDIT MODE
   ══════════════════════════════════════════════════════════════════════════════ */
function toggleEditMode() {
  state.editMode = !state.editMode;
  
  const notice = document.getElementById('editNotice');
  const btnText = document.getElementById('editBtnText');

  notice.classList.toggle('visible', state.editMode);
  btnText.textContent = state.editMode ? 'Disable Editing' : 'Enable Editing';
  
  applyEditMode();
}

function applyEditMode() {
  const allResumes = document.querySelectorAll('.resume');
  
  allResumes.forEach(resume => {
    resume.classList.toggle('edit-mode', state.editMode);
    
    resume.querySelectorAll('[contenteditable]').forEach(el => {
      el.setAttribute('contenteditable', state.editMode ? 'true' : 'false');
    });
  });
}

/* ══════════════════════════════════════════════════════════════════════════════
   FIELD UPDATES
   ══════════════════════════════════════════════════════════════════════════════ */
function updateField(field, value) {
  state[field] = value;
  renderModern();
  renderATS();
}

// Handle direct resume edits (when user clicks on resume text)
document.addEventListener('input', (e) => {
  if (!state.editMode) return;

  const fieldMap = {
    'r_firstname': 'firstname',
    'r_lastname': 'lastname',
    'r_role': 'role',
    'r_summary': 'summary',
    'r_phone': 'phone',
    'r_email': 'email',
    'r_address': 'address',
    'r_declaration_text': 'declarationText',
    'r_declaration_place': 'declarationPlace',
    'r_declaration_name': 'declarationName',
    'ats_name': 'ats_name',
    'ats_role': 'ats_role',
    'ats_contact': 'ats_contact',
    'ats_summary': 'ats_summary',
    'ats_declaration_text': 'declarationText',
    'ats_declaration_place': 'declarationPlace',
    'ats_declaration_name': 'declarationName'
  };

  const field = fieldMap[e.target.id];
  if (!field) return;

  if (field.startsWith('ats_')) {
    state.ats[field.replace('ats_', '')] = e.target.textContent;
  } else {
    state[field] = e.target.textContent;
    syncSidebarFields();
  }
});

// Prevent formatted paste
document.addEventListener('paste', e => {
  if (state.editMode && e.target.contentEditable === 'true') {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  }
});

function syncSidebarFields() {
  const fields = ['firstname', 'lastname', 'role', 'summary', 'phone', 'email', 'address', 'declarationText', 'declarationPlace', 'declarationName'];
  fields.forEach(field => {
    const input = document.getElementById(`f_${field}`);
    if (input && state[field] !== undefined) {
      input.value = state[field];
    }
  });
}

/* ══════════════════════════════════════════════════════════════════════════════
   PHOTO HANDLING
   ══════════════════════════════════════════════════════════════════════════════ */
function handlePhoto(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = ev => {
    const url = ev.target.result;
    state.photo = url;
    
    // Update sidebar preview
    const sidebarImg = document.getElementById('sidebarPhotoPreview');
    sidebarImg.src = url;
    sidebarImg.style.display = 'block';
    document.getElementById('uploadIcon').style.display = 'none';
    
    // Update resume photo
    const resumePhoto = document.getElementById('r_photo');
    resumePhoto.src = url;
    resumePhoto.style.display = 'block';
    document.getElementById('r_photo_placeholder').style.display = 'none';
  };
  reader.readAsDataURL(file);
}

/* ══════════════════════════════════════════════════════════════════════════════
   COLOR ACCENT
   ══════════════════════════════════════════════════════════════════════════════ */
function setAccent(accent, el) {
  document.getElementById('resume').setAttribute('data-accent', accent);
  document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
  el.classList.add('active');
}

/* ══════════════════════════════════════════════════════════════════════════════
   EDUCATION
   ══════════════════════════════════════════════════════════════════════════════ */
function renderEdu() {
  // Sidebar editor
  const list = document.getElementById('eduList');
  list.innerHTML = state.edu.map((e, i) => `
    <div class="exp-card">
      <div class="exp-card-header">
        <span class="exp-card-title">${e.degree || 'Degree'}</span>
        <button class="btn-icon" onclick="removeEdu(${i})">✕</button>
      </div>
      <div class="exp-card-body">
        <input class="field-input" placeholder="Year" value="${e.year}" 
          oninput="state.edu[${i}].year=this.value; renderEduResume()">
        <input class="field-input" placeholder="Degree" value="${e.degree}" 
          oninput="state.edu[${i}].degree=this.value; renderEduResume(); this.closest('.exp-card').querySelector('.exp-card-title').textContent=this.value">
        <input class="field-input" placeholder="School" value="${e.school}" 
          oninput="state.edu[${i}].school=this.value; renderEduResume()">
      </div>
    </div>
  `).join('');
  
  renderEduResume();
}

function renderEduResume() {
  // Modern template
  document.getElementById('r_edu').innerHTML = state.edu.map(e => `
    <div class="edu-item">
      <div class="edu-year">${e.year}</div>
      <div class="edu-degree">${e.degree}</div>
      <div class="edu-school">${e.school}</div>
    </div>
  `).join('');
  
  // ATS template
  document.getElementById('ats_edu').innerHTML = state.edu.map(e => `
    <div class="ats-edu-item">
      <div class="ats-edu-degree">${e.degree}</div>
      <div class="ats-edu-meta">${e.school} | ${e.year}</div>
    </div>
  `).join('');
}

function addEdu() {
  state.edu.push({ year: '2020', degree: 'Enter Your Degree', school: 'University/College' });
  renderEdu();
}

function removeEdu(i) {
  state.edu.splice(i, 1);
  renderEdu();
}

/* ══════════════════════════════════════════════════════════════════════════════
   EXPERTISE / SKILLS
   ══════════════════════════════════════════════════════════════════════════════ */
function renderExpertise() {
  const list = document.getElementById('expertiseList');
  list.innerHTML = state.expertise.map((s, i) => `
    <div class="list-item-row">
      <input value="${s}" oninput="state.expertise[${i}]=this.value; renderExpertiseResume()">
      <button class="btn-icon" onclick="removeExpertise(${i})">✕</button>
    </div>
  `).join('');
  
  renderExpertiseResume();
}

function renderExpertiseResume() {
  // Modern template
  document.getElementById('r_expertise').innerHTML = 
    state.expertise.map(s => `<li>${s}</li>`).join('');
  
  // ATS template
  document.getElementById('ats_skills').innerHTML = 
    state.expertise.map(s => `<div class="ats-skill-item">${s}</div>`).join('');
}

function addExpertise() {
  state.expertise.push('New Skill');
  renderExpertise();
}

function removeExpertise(i) {
  state.expertise.splice(i, 1);
  renderExpertise();
}

/* ══════════════════════════════════════════════════════════════════════════════
   LANGUAGES
   ══════════════════════════════════════════════════════════════════════════════ */
function renderLang() {
  const list = document.getElementById('langList');
  list.innerHTML = state.langs.map((l, i) => `
    <div class="list-item-row">
      <input value="${l}" oninput="state.langs[${i}]=this.value; renderLangResume()">
      <button class="btn-icon" onclick="removeLang(${i})">✕</button>
    </div>
  `).join('');
  
  renderLangResume();
}

function renderLangResume() {
  document.getElementById('r_lang').innerHTML = 
    state.langs.map(l => `<div class="lang-item">${l}</div>`).join('');
}

function addLang() {
  state.langs.push('Language');
  renderLang();
}

function removeLang(i) {
  state.langs.splice(i, 1);
  renderLang();
}

/* ══════════════════════════════════════════════════════════════════════════════
   CERTIFICATIONS
   ══════════════════════════════════════════════════════════════════════════════ */
function renderCert() {
  const list = document.getElementById('certList');
  list.innerHTML = state.certifications.map((c, i) => `
    <div class="list-item-row">
      <input value="${c}" oninput="state.certifications[${i}]=this.value; renderCertResume()">
      <button class="btn-icon" onclick="removeCert(${i})">✕</button>
    </div>
  `).join('');
  
  renderCertResume();
}

function renderCertResume() {
  document.getElementById('ats_certs').innerHTML = 
    state.certifications.map(c => `<div class="ats-cert-item">${c}</div>`).join('');
}

function addCert() {
  state.certifications.push('New Certification');
  renderCert();
}

function removeCert(i) {
  state.certifications.splice(i, 1);
  renderCert();
}

/* ══════════════════════════════════════════════════════════════════════════════
   EXPERIENCE
   ══════════════════════════════════════════════════════════════════════════════ */
function renderExp() {
  const list = document.getElementById('expList');
  list.innerHTML = state.exp.map((e, i) => `
    <div class="exp-card">
      <div class="exp-card-header">
        <span class="exp-card-title">${e.title || 'Experience'}</span>
        <button class="btn-icon" onclick="removeExp(${i})">✕</button>
      </div>
      <div class="exp-card-body">
        <input class="field-input" placeholder="Period (e.g. 2019 – 2022)" value="${e.period}" 
          oninput="state.exp[${i}].period=this.value; renderExpResume()">
        <input class="field-input" placeholder="Company & Location" value="${e.company}" 
          oninput="state.exp[${i}].company=this.value; renderExpResume()">
        <input class="field-input" placeholder="Job Title" value="${e.title}" 
          oninput="state.exp[${i}].title=this.value; renderExpResume(); this.closest('.exp-card').querySelector('.exp-card-title').textContent=this.value">
        <textarea class="field-input field-textarea" placeholder="Description" 
          oninput="state.exp[${i}].desc=this.value; renderExpResume()">${e.desc}</textarea>
      </div>
    </div>
  `).join('');
  
  renderExpResume();
}

function renderExpResume() {
  // Modern template
  document.getElementById('r_exp').innerHTML = state.exp.map((e, i) => `
    <div class="exp-item">
      <div class="exp-dot-col">
        <div class="exp-dot"></div>
        ${i < state.exp.length - 1 ? '<div class="exp-line"></div>' : ''}
      </div>
      <div>
        <div class="exp-period">${e.period}</div>
        <div class="exp-company">${e.company}</div>
        <div class="exp-title">${e.title}</div>
        <div class="exp-desc">${e.desc}</div>
      </div>
    </div>
  `).join('');
  
  // ATS template
  document.getElementById('ats_exp').innerHTML = state.exp.map(e => `
    <div class="ats-exp-item">
      <div class="ats-exp-title">${e.title}</div>
      <div class="ats-exp-meta">${e.company} | ${e.period}</div>
      <div style="font-size:12px; color:#555; margin-top:4px;">${e.desc}</div>
    </div>
  `).join('');
}

function addExp() {
  state.exp.push({ 
    period: '2023 – Present', 
    company: 'Company Name | City', 
    title: 'Job Position Here', 
    desc: 'Describe your role and key achievements here.' 
  });
  renderExp();
}

function removeExp(i) {
  state.exp.splice(i, 1);
  renderExp();
}

/* ══════════════════════════════════════════════════════════════════════════════
   REFERENCES
   ══════════════════════════════════════════════════════════════════════════════ */
function renderRef() {
  const list = document.getElementById('refList');
  list.innerHTML = state.refs.map((r, i) => `
    <div class="exp-card">
      <div class="exp-card-header">
        <span class="exp-card-title">${r.name}</span>
        <button class="btn-icon" onclick="removeRef(${i})">✕</button>
      </div>
      <div class="exp-card-body">
        <input class="field-input" placeholder="Name" value="${r.name}" 
          oninput="state.refs[${i}].name=this.value; renderRefResume(); this.closest('.exp-card').querySelector('.exp-card-title').textContent=this.value">
        <input class="field-input" placeholder="Role, Company" value="${r.role}" 
          oninput="state.refs[${i}].role=this.value; renderRefResume()">
        <input class="field-input" placeholder="Phone" value="${r.phone}" 
          oninput="state.refs[${i}].phone=this.value; renderRefResume()">
        <input class="field-input" placeholder="Email" value="${r.email}" 
          oninput="state.refs[${i}].email=this.value; renderRefResume()">
      </div>
    </div>
  `).join('');
  
  renderRefResume();
}

function renderRefResume() {
  document.getElementById('r_ref').innerHTML = state.refs.map(r => `
    <div>
      <div class="ref-name">${r.name}</div>
      <div class="ref-role">${r.role}</div>
      <div class="ref-detail"><span>Phone: </span>${r.phone}</div>
      <div class="ref-detail"><span>Email: </span>${r.email}</div>
    </div>
  `).join('');
}

function addRef() {
  state.refs.push({ 
    name: 'Name Surname', 
    role: 'Job Position, Company Name', 
    phone: '000-000-0000', 
    email: 'email@example.com' 
  });
  renderRef();
}

function removeRef(i) {
  state.refs.splice(i, 1);
  renderRef();
}

/* ══════════════════════════════════════════════════════════════════════════════
   CUSTOM BLOCKS
   ══════════════════════════════════════════════════════════════════════════════ */
function renderCustomBlocks() {
  // Sidebar
  const list = document.getElementById('customBlocksList');
  list.innerHTML = state.customBlocks.map((block, i) => `
    <div class="custom-block-item">
      <div class="custom-block-header">
        <span class="custom-block-name">${block.title}</span>
        <button class="btn-icon" onclick="removeCustomBlock(${i})">✕</button>
      </div>
      <input class="field-input" placeholder="Block Title" value="${block.title}" 
        oninput="state.customBlocks[${i}].title=this.value; renderCustomBlocksResume(); this.closest('.custom-block-item').querySelector('.custom-block-name').textContent=this.value">
      <textarea class="field-input field-textarea" placeholder="Content" 
        oninput="state.customBlocks[${i}].content=this.value; renderCustomBlocksResume()">${block.content}</textarea>
    </div>
  `).join('');
  
  renderCustomBlocksResume();
}

function renderCustomBlocksResume() {
  // Modern template
  document.getElementById('r_custom_blocks').innerHTML = state.customBlocks.map(block => `
    <div class="resume-section">
      <div class="right-section-title">${block.title}</div>
      <div style="font-size:12px; color:#555; line-height:1.7; white-space:pre-wrap;">${block.content}</div>
    </div>
  `).join('');
  
  // ATS template
  document.getElementById('ats_custom_blocks').innerHTML = state.customBlocks.map(block => `
    <div class="ats-section ats-custom-block">
      <div class="ats-section-title">${block.title.toUpperCase()}</div>
      <div class="ats-custom-content">${block.content}</div>
    </div>
  `).join('');
}

function addCustomBlock() {
  state.customBlocks.push({
    title: 'Custom Section',
    content: 'Add your custom content here...'
  });
  renderCustomBlocks();
}

function removeCustomBlock(i) {
  state.customBlocks.splice(i, 1);
  renderCustomBlocks();
}

/* ══════════════════════════════════════════════════════════════════════════════
   RENDER TEMPLATES
   ══════════════════════════════════════════════════════════════════════════════ */
function renderModern() {
  document.getElementById('r_firstname').textContent = state.firstname;
  document.getElementById('r_lastname').textContent = state.lastname;
  document.getElementById('r_role').textContent = state.role;
  document.getElementById('r_summary').textContent = state.summary;
  document.getElementById('r_phone').textContent = state.phone;
  document.getElementById('r_email').textContent = state.email;
  document.getElementById('r_address').textContent = state.address;
  
  // Declaration
  document.getElementById('r_declaration_text').textContent = state.declarationText;
  document.getElementById('r_declaration_place').textContent = state.declarationPlace;
  document.getElementById('r_declaration_name').textContent = state.declarationName;
}

function renderATS() {
  // Update header
  document.getElementById('ats_name').textContent = 
    (state.firstname + " " + state.lastname).toUpperCase();
  document.getElementById('ats_role').textContent = state.role;
  document.getElementById('ats_contact').textContent = 
    `${state.address} | ${state.email} | ${state.phone}`;
  document.getElementById('ats_summary').textContent = state.summary;

  // Declaration
  document.getElementById('ats_declaration_text').textContent = state.declarationText;
  document.getElementById('ats_declaration_place').textContent = state.declarationPlace;
  document.getElementById('ats_declaration_name').textContent = state.declarationName;
}

/* ══════════════════════════════════════════════════════════════════════════════
   PRINT / SAVE PDF
   ══════════════════════════════════════════════════════════════════════════════ */
function printResume() {
  // Disable edit mode before printing
  if (state.editMode) toggleEditMode();

  // Small delay to ensure edit mode is fully disabled
  setTimeout(() => {
    window.print();
  }, 100);
}

/* ══════════════════════════════════════════════════════════════════════════════
   INITIALIZATION
   ══════════════════════════════════════════════════════════════════════════════ */
function init() {
  renderModern();
  renderATS();
  renderEdu();
  renderExpertise();
  renderLang();
  renderExp();
  renderRef();
  renderCert();
  renderCustomBlocks();
  updateSectionButtons();
  
  // Update declaration name when firstname/lastname changes
  const firstnameInput = document.getElementById('f_firstname');
  const lastnameInput = document.getElementById('f_lastname');
  
  firstnameInput.addEventListener('input', () => {
    state.declarationName = `${state.firstname} ${state.lastname}`;
    document.getElementById('f_declaration_name').value = state.declarationName;
    renderModern();
    renderATS();
  });
  
  lastnameInput.addEventListener('input', () => {
    state.declarationName = `${state.firstname} ${state.lastname}`;
    document.getElementById('f_declaration_name').value = state.declarationName;
    renderModern();
    renderATS();
  });
}

// Initialize on page load
init();
