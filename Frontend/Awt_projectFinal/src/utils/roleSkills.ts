import type { JobRole, SuggestionItem, RoadmapStep } from '../types'

// ── Role skill database ────────────────────────────────────────
export const ROLE_SKILLS: Record<string, string[]> = {
  'DevOps Engineer':        ['Docker','Kubernetes','CI/CD','Linux','AWS','Terraform','Ansible','Jenkins','Git','Monitoring'],
  'Frontend Developer':     ['React','TypeScript','CSS','HTML','JavaScript','Redux','Webpack','REST API','Git','Figma'],
  'Backend Developer':      ['Node.js','Express','SQL','MongoDB','REST API','JWT','Docker','Git','Python','Redis'],
  'Data Scientist':         ['Python','Pandas','NumPy','Scikit-learn','SQL','Matplotlib','Statistics','Machine Learning','Jupyter','TensorFlow'],
  'ML Engineer':            ['TensorFlow','PyTorch','Python','ML Pipelines','Docker','REST API','NumPy','Statistics','Git','Cloud'],
  'Cloud Architect':        ['AWS','Azure','GCP','Terraform','Kubernetes','Networking','Security','CI/CD','Docker','Cost Optimisation'],
  'Full Stack Developer':   ['React','Node.js','Express','SQL','MongoDB','TypeScript','Docker','Git','REST API','GraphQL'],
  'Android Developer':      ['Kotlin','Java','Android Studio','Firebase','REST API','MVVM','Jetpack Compose','Git','SQL','Testing'],
  'Cybersecurity Engineer': ['Pentesting','Linux','Networking','Firewalls','SIEM','OWASP','Python','SOC','Incident Response','Cryptography'],
  'UI/UX Designer':         ['Figma','Prototyping','Wireframing','User Research','Design Systems','CSS','HTML','Accessibility','Sketch','Usability Testing'],
}

// ── Job role card data ─────────────────────────────────────────
export const JOB_ROLES: JobRole[] = [
  { role:'DevOps Engineer',        icon:'⚙️', desc:'CI/CD, containerisation, cloud infrastructure and automation',          skills:ROLE_SKILLS['DevOps Engineer'],        tags:['Docker','Kubernetes','AWS','+7 more'] },
  { role:'Frontend Developer',     icon:'🖥️', desc:'React, TypeScript, UI/UX, responsive design and performance',           skills:ROLE_SKILLS['Frontend Developer'],     tags:['React','TypeScript','CSS','+7 more'] },
  { role:'Backend Developer',      icon:'🔧', desc:'Node.js, APIs, databases, authentication and server logic',             skills:ROLE_SKILLS['Backend Developer'],      tags:['Node.js','SQL','REST API','+7 more'] },
  { role:'Data Scientist',         icon:'📊', desc:'Python, ML models, data analysis, statistics and visualisation',       skills:ROLE_SKILLS['Data Scientist'],         tags:['Python','Pandas','ML','+7 more'] },
  { role:'ML Engineer',            icon:'🤖', desc:'TensorFlow, model deployment, MLOps pipelines and cloud AI',           skills:ROLE_SKILLS['ML Engineer'],            tags:['TensorFlow','PyTorch','MLOps','+7 more'] },
  { role:'Cloud Architect',        icon:'☁️', desc:'AWS, Azure, GCP, infrastructure design and cloud security',            skills:ROLE_SKILLS['Cloud Architect'],        tags:['AWS','Azure','GCP','+7 more'] },
  { role:'Full Stack Developer',   icon:'⚡', desc:'React, Node.js, databases, REST APIs and deployment',                 skills:ROLE_SKILLS['Full Stack Developer'],   tags:['React','Node.js','MongoDB','+7 more'] },
  { role:'Android Developer',      icon:'📱', desc:'Kotlin, Android Studio, Jetpack Compose and mobile architecture',      skills:ROLE_SKILLS['Android Developer'],      tags:['Kotlin','Jetpack','Firebase','+7 more'] },
  { role:'Cybersecurity Engineer', icon:'🔐', desc:'Pentesting, SIEM, incident response, networking and OWASP',            skills:ROLE_SKILLS['Cybersecurity Engineer'], tags:['Pentesting','SIEM','Linux','+7 more'] },
  { role:'UI/UX Designer',         icon:'🎨', desc:'Figma, prototyping, user research, design systems and usability',      skills:ROLE_SKILLS['UI/UX Designer'],         tags:['Figma','Prototyping','Research','+7 more'] },
]

// ── Category breakdown per role ────────────────────────────────
export const CATEGORY_MAP: Record<string, { name: string; skills: string[] }[]> = {
  'DevOps Engineer': [
    { name:'Infrastructure & Cloud', skills:['AWS','Terraform','Linux','Monitoring'] },
    { name:'Containerisation',       skills:['Docker','Kubernetes'] },
    { name:'CI/CD & Automation',     skills:['CI/CD','Jenkins','Ansible'] },
    { name:'Version Control',        skills:['Git'] },
  ],
  'Frontend Developer': [
    { name:'Frameworks & State',     skills:['React','Redux'] },
    { name:'Core Languages',         skills:['JavaScript','TypeScript','HTML','CSS'] },
    { name:'Tooling & Build',        skills:['Webpack','Git'] },
    { name:'Design & APIs',          skills:['Figma','REST API'] },
  ],
  'Backend Developer': [
    { name:'Server & Frameworks',    skills:['Node.js','Express'] },
    { name:'Databases',              skills:['SQL','MongoDB','Redis'] },
    { name:'Security & Auth',        skills:['JWT','Docker'] },
    { name:'Languages & Tools',      skills:['Python','Git','REST API'] },
  ],
  'Data Scientist': [
    { name:'Core Libraries',         skills:['Python','Pandas','NumPy'] },
    { name:'ML & Modelling',         skills:['Scikit-learn','TensorFlow','Machine Learning'] },
    { name:'Visualisation',          skills:['Matplotlib','Jupyter'] },
    { name:'Data & Stats',           skills:['SQL','Statistics'] },
  ],
}

// ── Suggestions per role ───────────────────────────────────────
export const SUGGESTIONS: Record<string, SuggestionItem[]> = {
  'DevOps Engineer': [
    { icon:'📚', iconClass:'db-sug-purple', title:'Learn Terraform for IaC',       desc:'Required in 85% of DevOps listings. Complete HashiCorp cert in ~2 weeks.',        priority:'high' },
    { icon:'⚙️', iconClass:'db-sug-amber',  title:'Add CI/CD project to GitHub',   desc:'A Jenkins or GitHub Actions pipeline project significantly boosts credibility.',  priority:'medium' },
    { icon:'📝', iconClass:'db-sug-green',  title:'Quantify your achievements',    desc:'"Reduced deployment time by 40%" scores 3× higher with ATS systems.',             priority:'low' },
  ],
  'Frontend Developer': [
    { icon:'⚛️', iconClass:'db-sug-purple', title:'Build a React portfolio project', desc:'A public GitHub repo with a live deployed React+TypeScript app proves your skills.', priority:'high' },
    { icon:'📦', iconClass:'db-sug-amber',  title:'Add Webpack config experience',   desc:'Demonstrating custom build configuration separates you from junior candidates.', priority:'medium' },
    { icon:'🎨', iconClass:'db-sug-green',  title:'Include Figma design links',      desc:'Show design-to-code workflow. Recruiters value full-cycle frontend capability.',  priority:'low' },
  ],
}

const DEFAULT_SUGGESTIONS: SuggestionItem[] = [
  { icon:'📚', iconClass:'db-sug-purple', title:'Build role-specific projects',   desc:'Add a public GitHub project that directly demonstrates the missing skills.',      priority:'high' },
  { icon:'📝', iconClass:'db-sug-amber',  title:'Restructure your skills section',desc:'A clearly labelled skills section helps ATS extract your qualifications.',         priority:'medium' },
  { icon:'✦',  iconClass:'db-sug-green',  title:'Quantify your achievements',     desc:'Use numbers and percentages to describe impact in your experience section.',       priority:'low' },
]

export const getSuggestions = (role: string): SuggestionItem[] =>
  SUGGESTIONS[role] ?? DEFAULT_SUGGESTIONS

// ── Roadmaps per role ──────────────────────────────────────────
export const ROADMAPS: Record<string, RoadmapStep[]> = {
  'DevOps Engineer': [
    { title:'Learn Terraform',            desc:'Complete HashiCorp\'s official cert. ~2 weeks part-time.',                               time:'2 weeks' },
    { title:'Master Ansible',             desc:'Work through 3 automation playbooks covering server setup and deployment.',              time:'1 week'  },
    { title:'Set up Jenkins pipeline',    desc:'Create a CI/CD pipeline on GitHub for a real project.',                                  time:'1 week'  },
    { title:'Get AWS Solutions Architect',desc:'Associate cert validates your cloud skills and adds salary leverage.',                   time:'4–6 weeks'},
    { title:'Re-analyse your resume',     desc:'Upload your updated resume to CareerLens and track your new score.',                     time:'1 day'   },
  ],
  'Frontend Developer': [
    { title:'Build a React + TypeScript project', desc:'Create a public portfolio app and deploy it on Netlify.',              time:'1 week' },
    { title:'Add Redux state management',         desc:'Integrate Redux Toolkit to show state management knowledge.',           time:'3 days' },
    { title:'Learn Webpack configuration',        desc:'Set up a custom Webpack config from scratch.',                         time:'2 days' },
    { title:'Get a Figma design done',            desc:'Design a UI in Figma and implement it to show design-to-code.',        time:'1 week' },
    { title:'Re-analyse your resume',             desc:'Upload your updated resume and track your improved score.',             time:'1 day'  },
  ],
}

const DEFAULT_ROADMAP: RoadmapStep[] = [
  { title:'Identify your top 3 missing skills', desc:'Focus on the highest-priority gaps from your skill analysis.',     time:'1 day'    },
  { title:'Build a project using those skills', desc:'A hands-on project proves competence better than a certificate.', time:'1–2 weeks' },
  { title:'Update your resume',                 desc:'Add the new skills, projects and any certifications completed.',   time:'1 day'    },
  { title:'Re-run your CareerLens analysis',    desc:'Upload the updated resume and track your new score.',              time:'1 day'    },
]

export const getRoadmap = (role: string): RoadmapStep[] =>
  ROADMAPS[role] ?? DEFAULT_ROADMAP