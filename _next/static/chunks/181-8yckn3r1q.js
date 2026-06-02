(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,95057,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0});var o={formatUrl:function(){return s},formatWithValidation:function(){return c},urlObjectKeys:function(){return l}};for(var r in o)Object.defineProperty(a,r,{enumerable:!0,get:o[r]});let n=e.r(90809)._(e.r(98183)),i=/https?|ftp|gopher|file/;function s(e){let{auth:t,hostname:a}=e,o=e.protocol||"",r=e.pathname||"",s=e.hash||"",l=e.query||"",c=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?c=t+e.host:a&&(c=t+(~a.indexOf(":")?`[${a}]`:a),e.port&&(c+=":"+e.port)),l&&"object"==typeof l&&(l=String(n.urlQueryToSearchParams(l)));let d=e.search||l&&`?${l}`||"";return o&&!o.endsWith(":")&&(o+=":"),e.slashes||(!o||i.test(o))&&!1!==c?(c="//"+(c||""),r&&"/"!==r[0]&&(r="/"+r)):c||(c=""),s&&"#"!==s[0]&&(s="#"+s),d&&"?"!==d[0]&&(d="?"+d),r=r.replace(/[?#]/g,encodeURIComponent),d=d.replace("#","%23"),`${o}${c}${r}${d}${s}`}let l=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function c(e){return s(e)}},18581,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"useMergedRef",{enumerable:!0,get:function(){return r}});let o=e.r(71645);function r(e,t){let a=(0,o.useRef)(null),r=(0,o.useRef)(null);return(0,o.useCallback)(o=>{if(null===o){let e=a.current;e&&(a.current=null,e());let t=r.current;t&&(r.current=null,t())}else e&&(a.current=n(e,o)),t&&(r.current=n(t,o))},[e,t])}function n(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let a=e(t);return"function"==typeof a?a:()=>e(null)}}("function"==typeof a.default||"object"==typeof a.default&&null!==a.default)&&void 0===a.default.__esModule&&(Object.defineProperty(a.default,"__esModule",{value:!0}),Object.assign(a.default,a),t.exports=a.default)},73668,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"isLocalURL",{enumerable:!0,get:function(){return n}});let o=e.r(18967),r=e.r(52817);function n(e){if(!(0,o.isAbsoluteUrl)(e))return!0;try{let t=(0,o.getLocationOrigin)(),a=new URL(e,t);return a.origin===t&&(0,r.hasBasePath)(a.pathname)}catch(e){return!1}}},84508,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"errorOnce",{enumerable:!0,get:function(){return o}});let o=e=>{}},22016,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0});var o={default:function(){return y},useLinkStatus:function(){return x}};for(var r in o)Object.defineProperty(a,r,{enumerable:!0,get:o[r]});let n=e.r(90809),i=e.r(43476),s=n._(e.r(71645)),l=e.r(95057),c=e.r(8372),d=e.r(18581),u=e.r(18967),p=e.r(5550);e.r(33525);let h=e.r(88540),m=e.r(91949),f=e.r(73668),g=e.r(9396);function y(t){var a,o;let r,n,y,[x,v]=(0,s.useOptimistic)(m.IDLE_LINK_STATUS),w=(0,s.useRef)(null),{href:j,as:k,children:S,prefetch:C=null,passHref:T,replace:R,shallow:_,scroll:B,onClick:P,onMouseEnter:I,onTouchStart:M,legacyBehavior:A=!1,onNavigate:G,transitionTypes:O,ref:N,unstable_dynamicOnHover:E,...F}=t;r=S,A&&("string"==typeof r||"number"==typeof r)&&(r=(0,i.jsx)("a",{children:r}));let D=s.default.useContext(c.AppRouterContext),W=!1!==C,z=!1!==C?null===(o=C)||"auto"===o?g.FetchStrategy.PPR:g.FetchStrategy.Full:g.FetchStrategy.PPR,L="string"==typeof(a=k||j)?a:(0,l.formatUrl)(a);if(A){if(r?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",{value:"E863",enumerable:!1,configurable:!0});n=s.default.Children.only(r)}let q=A?n&&"object"==typeof n&&n.ref:N,J=s.default.useCallback(e=>(null!==D&&(w.current=(0,m.mountLinkInstance)(e,L,D,z,W,v)),()=>{w.current&&((0,m.unmountLinkForCurrentNavigation)(w.current),w.current=null),(0,m.unmountPrefetchableInstance)(e)}),[W,L,D,z,v]),H={ref:(0,d.useMergedRef)(J,q),onClick(t){A||"function"!=typeof P||P(t),A&&n.props&&"function"==typeof n.props.onClick&&n.props.onClick(t),!D||t.defaultPrevented||function(t,a,o,r,n,i,l){if("u">typeof window){let c,{nodeName:d}=t.currentTarget;if("A"===d.toUpperCase()&&((c=t.currentTarget.getAttribute("target"))&&"_self"!==c||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,f.isLocalURL)(a)){r&&(t.preventDefault(),location.replace(a));return}if(t.preventDefault(),i){let e=!1;if(i({preventDefault:()=>{e=!0}}),e)return}let{dispatchNavigateAction:u}=e.r(99781);s.default.startTransition(()=>{u(a,r?"replace":"push",!1===n?h.ScrollBehavior.NoScroll:h.ScrollBehavior.Default,o.current,l)})}}(t,L,w,R,B,G,O)},onMouseEnter(e){A||"function"!=typeof I||I(e),A&&n.props&&"function"==typeof n.props.onMouseEnter&&n.props.onMouseEnter(e),D&&W&&(0,m.onNavigationIntent)(e.currentTarget,!0===E)},onTouchStart:function(e){A||"function"!=typeof M||M(e),A&&n.props&&"function"==typeof n.props.onTouchStart&&n.props.onTouchStart(e),D&&W&&(0,m.onNavigationIntent)(e.currentTarget,!0===E)}};return(0,u.isAbsoluteUrl)(L)?H.href=L:A&&!T&&("a"!==n.type||"href"in n.props)||(H.href=(0,p.addBasePath)(L)),y=A?s.default.cloneElement(n,H):(0,i.jsx)("a",{...F,...H,children:r}),(0,i.jsx)(b.Provider,{value:x,children:y})}e.r(84508);let b=(0,s.createContext)(m.IDLE_LINK_STATUS),x=()=>(0,s.useContext)(b);("function"==typeof a.default||"object"==typeof a.default&&null!==a.default)&&void 0===a.default.__esModule&&(Object.defineProperty(a.default,"__esModule",{value:!0}),Object.assign(a.default,a),t.exports=a.default)},42724,e=>{"use strict";var t=e.i(43476),a=e.i(22016),o=e.i(18566),r=e.i(71645),n=e.i(74080);let i=[{href:"/",label:"Home"},{href:"/builds",label:"Builds"},{href:"/pulse",label:"Daily Pulse"},{href:"/blog",label:"Blog"},{href:"/how-to",label:"How-To"},{href:"/case-studies",label:"Case Studies"},{href:"/glossary",label:"Glossary"},{href:"/compare",label:"Compare"},{href:"/log",label:"Log"},{href:"/about",label:"About"},{href:"/#contact",label:"Contact"}];function s(){let[e,s]=(0,r.useState)(!1),[l,c]=(0,r.useState)(!1),d=(0,o.usePathname)();(0,r.useEffect)(()=>{c(!0)},[]),(0,r.useEffect)(()=>{s(!1)},[d]);let u=e=>"/#contact"!==e&&("/"===e?"/"===d:d.startsWith(e)),p=(0,t.jsxs)("div",{style:{position:"fixed",inset:0,top:56,background:"var(--overlay-bg)",zIndex:9999,overflowY:"auto"},children:[(0,t.jsx)("nav",{style:{padding:"8px 0"},children:i.map(e=>(0,t.jsxs)(a.default,{href:e.href,onClick:()=>s(!1),style:{display:"flex",alignItems:"center",justifyContent:"space-between",fontFamily:"'Space Grotesk',sans-serif",fontSize:17,fontWeight:600,color:u(e.href)?"var(--gold)":"var(--text)",textDecoration:"none",padding:"16px 24px",borderBottom:"1px solid var(--border)",background:u(e.href)?"var(--gold-bg)":"transparent"},children:[e.label,u(e.href)&&(0,t.jsx)("span",{style:{fontSize:8,color:"var(--gold)"},children:"●"})]},e.href))}),(0,t.jsx)("div",{style:{padding:"20px 24px"},children:(0,t.jsx)("a",{href:"mailto:rishirajpaul3@gmail.com",style:{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:"var(--text-muted)",textDecoration:"none"},children:"rishirajpaul3@gmail.com"})})]});return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("button",{onClick:()=>s(e=>!e),className:"mobile-menu-btn","aria-label":e?"Close menu":"Open menu",style:{display:"none",background:e?"var(--gold-bg)":"var(--surface-2)",border:`1px solid ${e?"var(--gold-border)":"var(--border)"}`,borderRadius:8,padding:"8px 12px",color:e?"var(--gold)":"var(--text-muted)",cursor:"pointer",fontFamily:"'JetBrains Mono',monospace",fontSize:15,lineHeight:1,transition:"all 0.15s"},children:e?"✕":"☰"}),l&&e&&(0,n.createPortal)(p,document.body),(0,t.jsx)("style",{children:"@media(max-width:900px){ .mobile-menu-btn { display:block !important; } }"})]})}function l(){let[e,a]=(0,r.useState)("dark");(0,r.useEffect)(()=>{let e=localStorage.getItem("theme");e&&(a(e),document.documentElement.setAttribute("data-theme",e))},[]);let o="dark"===e;return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("button",{onClick:function(){let t="dark"===e?"light":"dark";a(t),localStorage.setItem("theme",t),"light"===t?document.documentElement.setAttribute("data-theme","light"):document.documentElement.removeAttribute("data-theme")},title:o?"Switch to light mode":"Switch to dark mode",style:{display:"flex",alignItems:"center",gap:7,background:o?"var(--surface-2)":"var(--gold)",border:`1px solid ${o?"var(--gold-border)":"var(--gold)"}`,borderRadius:8,padding:"6px 13px",cursor:"pointer",fontFamily:"'JetBrains Mono', monospace",fontSize:11,fontWeight:600,letterSpacing:"0.04em",color:o?"var(--gold)":"var(--bg)",lineHeight:1,transition:"all 0.15s",flexShrink:0,whiteSpace:"nowrap"},children:[(0,t.jsx)("span",{style:{fontSize:14},children:o?"☀":"◗"}),(0,t.jsx)("span",{className:"theme-label",children:o?"light":"dark"})]}),(0,t.jsx)("style",{children:"@media(max-width:900px){ .theme-label { display:none; } }"})]})}let c=[{href:"/",label:"home"},{href:"/builds",label:"builds"},{href:"/how-to",label:"how-to"},{href:"/glossary",label:"glossary"},{href:"/compare",label:"compare"},{href:"/case-studies",label:"case studies"},{href:"/pulse",label:"daily pulse"},{href:"/log",label:"log"},{href:"/blog",label:"blog"},{href:"/about",label:"about"},{href:"/#contact",label:"contact"}];e.s(["default",0,function(){let e=(0,o.usePathname)(),[n,i]=(0,r.useState)(!1),d=t=>!t.includes("#")&&("/"===t?"/"===e:e.startsWith(t));return(0,t.jsxs)(t.Fragment,{children:[!n&&(0,t.jsxs)("div",{className:"announce",children:[(0,t.jsxs)("span",{children:["// open to GTM engineering roles & freelance in the UK — ",(0,t.jsx)("a",{href:"/#contact",children:"reach out →"})]}),(0,t.jsx)("button",{onClick:()=>i(!0),style:{background:"none",border:"none",cursor:"pointer",color:"var(--text-dim)",fontSize:18,lineHeight:1},children:"×"})]}),(0,t.jsxs)("nav",{style:{position:"sticky",top:0,zIndex:100,height:56,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 40px",background:"var(--nav-bg)",backdropFilter:"blur(14px)",borderBottom:"1px solid var(--border)"},children:[(0,t.jsx)(a.default,{href:"/",style:{fontFamily:"'Space Grotesk',sans-serif",fontSize:15,fontWeight:700,color:"var(--text)",textDecoration:"none",letterSpacing:"-0.01em"},children:"rishiraj.paul"}),(0,t.jsx)("ul",{style:{display:"flex",gap:4,listStyle:"none"},children:c.map(e=>(0,t.jsx)("li",{children:(0,t.jsx)(a.default,{href:e.href,style:{fontFamily:"'JetBrains Mono',monospace",fontSize:12,color:d(e.href)?"var(--bg)":"var(--text-muted)",textDecoration:"none",padding:"6px 13px",borderRadius:8,background:d(e.href)?"var(--gold)":"transparent",border:"1px solid",borderColor:d(e.href)?"var(--gold)":"transparent",transition:"all 0.15s",letterSpacing:"0.01em",whiteSpace:"nowrap"},children:e.label})},e.href))}),(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:8},children:[(0,t.jsx)(l,{}),(0,t.jsx)(a.default,{href:"/#contact",className:"nav-cta",style:{fontFamily:"'JetBrains Mono',monospace",fontSize:12,padding:"7px 18px",background:"var(--gold)",color:"var(--bg)",textDecoration:"none",borderRadius:8,fontWeight:600,letterSpacing:"0.02em",whiteSpace:"nowrap"},children:"let's talk →"}),(0,t.jsx)(s,{})]})]}),(0,t.jsx)("style",{children:`
        .announce { background:var(--surface); border-bottom:1px solid var(--border); padding:9px 40px; display:flex; align-items:center; justify-content:space-between; font-family:'JetBrains Mono',monospace; font-size:11px; color:var(--text-muted); }
        .announce a { color:var(--gold); text-decoration:none; }
        @media(max-width:900px){ nav ul { display:none !important; } .announce{padding:9px 16px} nav{padding:0 16px !important;} .nav-cta { display:none !important; } }
      `})]})}],42724)},56691,e=>{"use strict";var t=e.i(43476),a=e.i(22016);e.s(["default",0,function(){return(0,t.jsx)("footer",{style:{borderTop:"1px solid var(--border)",marginTop:0},children:(0,t.jsxs)("div",{style:{maxWidth:1100,margin:"0 auto",padding:"24px 40px",display:"flex",justifyContent:"space-between",alignItems:"center",fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:"var(--text-dim)"},children:[(0,t.jsx)("span",{children:"© 2026 Rishiraj Paul · GTM Engineer · UK"}),(0,t.jsx)("div",{style:{display:"flex",gap:20},children:[{href:"/blog",label:"Blog"},{href:"https://www.linkedin.com/in/rishiraj-paul-gtm/",label:"LinkedIn",external:!0},{href:"https://x.com/RishirajPa40653",label:"X",external:!0},{href:"https://github.com/rishirajpaul3",label:"GitHub",external:!0},{href:"mailto:rishirajpaul3@gmail.com",label:"Email"}].map(e=>(0,t.jsx)(a.default,{href:e.href,target:e.external?"_blank":void 0,rel:e.external?"noopener noreferrer":void 0,style:{color:"var(--text-dim)",textDecoration:"none",transition:"color 0.15s"},onMouseEnter:e=>e.currentTarget.style.color="var(--gold)",onMouseLeave:e=>e.currentTarget.style.color="var(--text-dim)",children:e.label},e.label))})]})})}])},92622,e=>{"use strict";var t=e.i(43476),a=e.i(22016);let o=[{href:"https://linkedin.com/in/rishiraj-paul",label:"in",title:"LinkedIn"},{href:"https://github.com/rishirajpaul3",label:"gh",title:"GitHub"},{href:"/blog",label:"✍",title:"Blog"},{href:"mailto:rishirajpaul3@gmail.com",label:"@",title:"Email"}];e.s(["default",0,function(){return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("div",{className:"right-rail",children:o.map(e=>(0,t.jsx)(a.default,{href:e.href,title:e.title,target:e.href.startsWith("http")?"_blank":void 0,rel:e.href.startsWith("http")?"noopener noreferrer":void 0,className:"rail-btn",children:e.label},e.label))}),(0,t.jsx)("style",{children:`
        .right-rail {
          position: fixed;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 50;
          display: flex;
          flex-direction: column;
          gap: 6px;
          background: var(--rail-bg);
          border: 1px solid var(--border);
          border-radius: 9999px;
          padding: 10px 8px;
          backdrop-filter: blur(8px);
        }
        .rail-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          color: var(--text-muted);
          text-decoration: none;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.04em;
          transition: background 0.15s, color 0.15s;
        }
        .rail-btn:hover {
          background: var(--gold-bg);
          color: var(--gold);
        }
        @media(max-width:1100px){ .right-rail { display: none } }
      `})]})}])},80037,e=>{"use strict";var t=e.i(43476),a=e.i(71645),o=e.i(42724),r=e.i(56691),n=e.i(92622),i=e.i(46932),s=e.i(22016);let l=[{id:"icp-fit-scorer",name:"ICP Fit Scorer",category:"Prospecting",model:"GPT-4o / Claude",desc:"Paste in company data and get a structured ICP fit score with reasoning. I use this in Clay to triage lists before they hit any sequence.",prompt:`You are a B2B sales analyst. Given the following company data, score this company's fit against my ICP and explain your reasoning.

ICP criteria:
- Industry: SaaS, FinTech, or professional services
- Headcount: 20–500 employees
- Region: UK, US, or DACH
- Signals: Recently hired SDRs or RevOps, or raised a Series A/B in the last 18 months

Company data:
{{company_name}}, {{industry}}, {{headcount}}, {{location}}, {{recent_funding}}, {{recent_hires}}

Return a JSON object with:
- fit_score: number from 0 to 100
- tier: "Hot", "Warm", or "Cold"
- reasons: array of 2–4 bullet points explaining the score
- recommended_action: "Prioritise", "Monitor", or "Skip"`},{id:"cold-email-opener",name:"Cold Email First Line Generator",category:"Cold Email",model:"GPT-4o / Claude",desc:"Generates a personalised opening line from a LinkedIn profile or company page. Runs as an AI column in Clay — one line per row, no manual writing.",prompt:`You are writing a cold email first line for a B2B outreach campaign. Your goal is one highly specific, non-generic sentence that shows you actually looked at this person.

Prospect info:
- Name: {{first_name}}
- Role: {{job_title}} at {{company_name}}
- Recent activity or signal: {{signal}} (e.g. just hired 3 SDRs, launched in a new market, posted about pipeline problems)

Rules:
- Max 20 words
- No flattery ("I loved your post about...")
- Reference something real and specific
- Do not mention their company name more than once
- End with a natural transition into value, not a question

Output only the first line. No subject line. No explanation.`},{id:"bant-extractor",name:"BANT Extractor from Call Transcript",category:"BANT & Qualification",model:"GPT-4o",desc:"Feed in a raw call transcript and get structured BANT fields back. This is the core prompt behind my HubSpot AI notetaker — runs after every Deepgram transcription.",prompt:`You are a sales analyst extracting qualification data from a B2B discovery call transcript. Extract the following BANT fields.

Transcript:
{{transcript}}

Return a JSON object with these fields:
- budget: string — what budget was mentioned or implied. If unclear, write "Not discussed".
- authority: string — who is the decision maker? What level of influence does the prospect have?
- need: string — what specific pain or problem did they describe? Quote directly where possible.
- timeline: string — when are they looking to solve this? Any urgency signals?
- primary_pain: string — the single most important problem they need solved, in one sentence.
- next_step: string — what was agreed as the next step?
- qualification_score: number from 0 to 10 — how qualified is this opportunity?
- summary: string — 3–5 sentence summary of the call for the CRM.

If a field cannot be determined from the transcript, set it to null. Do not invent information.`},{id:"reply-classifier",name:"Email Reply Intent Classifier",category:"Reply Classification",model:"GPT-4o / Claude",desc:"Classifies inbound cold email replies so each one gets routed correctly. I run this in n8n — interested replies fire a Slack alert, OOOs get auto-bumped, not-interested are logged and suppressed.",prompt:`You are classifying a cold email reply for a B2B sales team. Determine the intent of the reply and return a structured classification.

Reply:
{{email_reply}}

Classify into exactly one of these categories:
- "Interested" — they want to learn more, book a call, or asked a positive question
- "Not Interested" — clear rejection, asked to be removed, or no interest expressed
- "Price Question" — they are asking about cost or pricing before committing
- "Out of Office" — auto-reply or they are away temporarily
- "Referral" — they have forwarded you to another person
- "Objection" — they have a specific concern (timing, wrong person, already have a solution)
- "Unclear" — the intent cannot be determined

Return JSON:
- category: one of the above
- confidence: "High", "Medium", or "Low"
- summary: one sentence describing the reply
- suggested_action: what the rep should do next`},{id:"account-research",name:"Account Research Brief",category:"Account Research",model:"Claude / GPT-4o",desc:"Deep research brief on a target account before a call or outreach. I use this before any strategic outreach — it takes 30 seconds and replaces 20 minutes of manual Googling.",prompt:`You are a senior GTM researcher preparing a pre-call brief on a target account. Research the company below and return a structured brief.

Company: {{company_name}}
Website: {{company_url}}
Contact: {{contact_name}}, {{contact_title}}

Return a brief covering:
1. Business model — how do they make money? What do they sell and to whom?
2. Current GTM motion — inbound, outbound, PLG, or enterprise sales?
3. Stack signals — any tools mentioned on their site, job posts, or tech stack data
4. Pain signals — what problems are they likely experiencing based on their stage, headcount, and recent news?
5. Talking points — 2–3 specific angles for outreach based on their situation
6. Risks — any red flags (no budget signals, wrong stage, recent layoffs, etc.)
7. Opening angle — one specific, non-generic sentence to open with

Keep each section to 2–3 sentences. Do not pad. If you cannot find information on a section, say so.`},{id:"pain-from-jd",name:"Pain Point Extractor from Job Descriptions",category:"Prospecting",model:"GPT-4o / Claude",desc:"Paste a job description and extract what's broken in their GTM stack. Job ads are the most honest thing companies publish — they list exactly what's not working.",prompt:`You are a GTM analyst reading between the lines of a job description to understand what problems this company is trying to solve.

Job description:
{{job_description}}

Extract:
1. What process or function are they clearly struggling with right now?
2. What tools or skills are they looking for — and what does that reveal about their current stack gaps?
3. What buying signals does this JD contain for a B2B SaaS or services vendor?
4. What is the single most actionable outreach angle based on this JD?

Keep it practical. No fluff. This output goes directly into a cold email.`},{id:"linkedin-connection",name:"LinkedIn Connection Request",category:"Cold Email",model:"GPT-4o / Claude",desc:"Short, non-salesy LinkedIn connection requests that actually get accepted. I keep these under 200 characters — anything longer gets ignored.",prompt:`Write a LinkedIn connection request from Rishiraj Paul, a GTM engineer who builds AI-powered sales infrastructure.

Prospect:
- Name: {{first_name}}
- Role: {{job_title}} at {{company_name}}
- Reason to connect: {{signal}} (e.g. we share a connection, their post about outbound, their company is hiring SDRs)

Rules:
- Under 200 characters
- No pitch, no ask, no "I'd love to pick your brain"
- Sound like a human, not a template
- Reference something real about them or a shared interest
- No emojis

Output only the message. Nothing else.`},{id:"discovery-script",name:"Discovery Call Script",category:"BANT & Qualification",model:"Claude / GPT-4o",desc:"Generates a tailored discovery script before a first call. I run this with company context from Clay — so every call prep takes 2 minutes instead of 20.",prompt:`You are preparing a discovery call script for a B2B sales rep. The goal is to qualify the opportunity and uncover the real pain — not to pitch.

Company context:
- Company: {{company_name}}
- Industry: {{industry}}
- Headcount: {{headcount}}
- Contact: {{contact_name}}, {{contact_title}}
- Known signals: {{signals}}
- Our solution: AI-powered GTM infrastructure (outbound automation, CRM enrichment, AI transcription, lead pipelines)

Generate a 30-minute discovery script including:
1. Opening (2 min) — warm and specific, reference why this call is relevant
2. Agenda set (1 min) — clear structure, ask for their time limit
3. Situation questions (10 min) — 5 questions to understand their current GTM motion
4. Pain questions (10 min) — 5 questions to expose friction, inefficiency, or missed revenue
5. Implication questions (5 min) — 3 questions to quantify the cost of inaction
6. Next step close (2 min) — propose a specific next step with a date

Format as a script with stage labels, estimated timing, and space for notes.`},{id:"objection-handler",name:"Objection Handler",category:"BANT & Qualification",model:"GPT-4o / Claude",desc:"Given an objection, generates 3 ways to handle it — a direct response, a reframe, and a question to redirect. I use this for coaching reps and prepping for hard conversations.",prompt:`You are a B2B sales coach specialising in GTM and outbound. A prospect has raised the following objection. Generate three distinct handling approaches.

Context:
- What we sell: {{product_or_service}}
- Stage: {{call_stage}} (e.g. cold outreach, discovery, proposal)
- Objection: {{objection}}

Return three approaches:
1. Direct — address the objection head-on with evidence or specifics
2. Reframe — shift the way they are thinking about the problem without dismissing their concern
3. Question — a question that redirects the conversation back to their pain

For each approach: write the exact words the rep should say (2–4 sentences max). Make it sound human, not scripted.`},{id:"follow-up-email",name:"Follow-Up Email After No Reply",category:"Cold Email",model:"GPT-4o / Claude",desc:"Writes a follow-up that adds value instead of just bumping the thread. The goal is to give them a reason to reply, not just remind them you exist.",prompt:`Write a follow-up email for a B2B cold outreach sequence. The prospect did not reply to the first email. This is touch {{touch_number}} (e.g. 2, 3, 4).

Context:
- Prospect: {{first_name}}, {{job_title}} at {{company_name}}
- First email topic: {{first_email_summary}}
- New angle or value to add: {{new_angle}} (e.g. a relevant case study, a stat, a recent news item about their company, a short loom video)

Rules:
- Do not say "just following up" or "circling back"
- Add something new — a resource, a stat, a question, or a short insight
- Keep it under 80 words
- One clear CTA at the end — a question or a soft ask
- Match the tone of the first email

Output only the email body. No subject line.`},{id:"funding-outreach",name:"Funding Round Outreach Email",category:"Prospecting",model:"GPT-4o / Claude",desc:"A company just raised. Here's how I write the outreach — specifically for the 30-day window after a funding announcement when they are actively spending on growth infrastructure.",prompt:`Write a cold email to a company that recently raised a funding round. The email should be relevant to the funding news without being generic.

Context:
- Company: {{company_name}}
- Funding round: {{round}} (e.g. Series A, $8M)
- Contact: {{first_name}}, {{job_title}}
- What we help with: {{value_prop}} (e.g. building outbound infrastructure to support a new SDR team)

Rules:
- Reference the funding round naturally — do not lead with it
- Tie the funding to a specific growth challenge they are likely facing right now
- Show you understand what comes after raising (hiring pressure, pipeline targets, board metrics)
- Under 100 words
- One question at the end, not a calendar link

Output only the email body. No subject line.`},{id:"buyer-persona",name:"Buyer Persona Builder",category:"Account Research",model:"Claude / GPT-4o",desc:"Give it a job title and I get a full buyer persona back — what they care about, how they measure success, what keeps them up at night. I use this before building any outreach sequence.",prompt:`You are a B2B GTM strategist. Build a detailed buyer persona for the following role at a mid-market B2B SaaS company.

Role: {{job_title}}
Company stage: {{company_stage}} (e.g. Series B, 150 employees)
Industry: {{industry}}

Cover:
1. Day-to-day responsibilities — what does this person actually do all day?
2. Goals and success metrics — what are they measured on? What does a good quarter look like?
3. Pain points — what slows them down, causes stress, or creates friction?
4. Buying behaviour — are they the decision maker, influencer, or blocker? How do they typically buy?
5. Information sources — where do they learn? LinkedIn, newsletters, communities, podcasts?
6. What they respond to in outreach — specific triggers, angles, and formats that land with this persona
7. What they ignore — the outreach patterns that immediately get deleted

Keep each section practical. This goes directly into a sequence brief for a GTM team.`},{id:"subject-line-gen",name:"Cold Email Subject Line Generator",category:"Cold Email",model:"GPT-4o / Claude",desc:"Generates 10 subject line variants across different angles — curiosity, specificity, social proof, pain. I A/B test the top 2 before scaling any sequence.",prompt:`Generate 10 cold email subject lines for a B2B outreach campaign. Each should use a different psychological angle.

Context:
- Sender: {{sender_name}}, {{sender_role}}
- Product or service: {{value_prop}}
- Target: {{target_title}} at {{target_company_type}}
- Main pain point being addressed: {{pain_point}}

Generate one subject line for each angle:
1. Specificity — a real number or outcome
2. Curiosity — makes them wonder without being clickbait
3. Pain — names the problem directly
4. Social proof — references a customer or result
5. Timing — references a signal or moment
6. Question — a short, direct question
7. Personalisation — uses their company or role
8. Contrarian — challenges a common assumption
9. Short — 3 words or fewer
10. Lowercased casual — like a message from a colleague

Output as a numbered list. No explanations.`},{id:"call-summary",name:"Call Summary + CRM Update",category:"BANT & Qualification",model:"GPT-4o",desc:"Turns raw call notes or a transcript into a clean CRM entry. I run this as part of my HubSpot AI pipeline — every call gets a structured note pushed to the deal record automatically.",prompt:`You are a sales operations assistant. Convert the following call notes or transcript into a clean CRM update.

Raw notes or transcript:
{{call_notes}}

Return a structured CRM note with:
- Date: {{call_date}}
- Participants: {{participants}}
- Summary: 3–5 sentences covering what was discussed, what was learned, and what was agreed
- Key pain points identified: bullet list
- BANT status: Budget / Authority / Need / Timeline — what is confirmed, what is unknown
- Red flags: anything that could derail the deal
- Next steps: specific actions with owners and dates if mentioned
- Deal stage recommendation: should this move forward, hold, or be disqualified?

Write in past tense. Keep it factual — no editorialising. This goes directly into HubSpot.`},{id:"waterfall-enrichment",name:"Waterfall Enrichment Prompt",category:"Account Research",model:"GPT-4o / Claude",desc:"When automated enrichment fails, I use this to manually research a contact from a company domain. It tells the AI exactly what to look for and in what order — mirrors how I set up Clay waterfalls.",prompt:`You are a B2B data researcher. Find contact and company information for the following target using only publicly available sources.

Target:
- Company domain: {{domain}}
- Role to find: {{target_role}} (e.g. Head of Sales, VP RevOps, CTO)

Research in this order:
1. Company website — find team page, about page, leadership mentions
2. LinkedIn — find the target role at this company
3. Twitter/X — check if the company or team members are active
4. Crunchbase or PitchBook — funding stage, investors, founding date
5. Job boards — current open roles reveal stack and growth stage

Return:
- contact_name: best guess or "Not found"
- contact_linkedin: URL or "Not found"
- contact_email_pattern: e.g. first.last@domain.com based on any found emails
- company_size_estimate: headcount range
- tech_stack_signals: any tools mentioned publicly
- recent_news: anything notable in the last 6 months
- confidence: "High", "Medium", or "Low"

Only use what you can verify. Do not fabricate.`}],c=["All","Prospecting","Cold Email","BANT & Qualification","Reply Classification","Account Research"],d={Prospecting:{color:"#c9963b",bg:"rgba(201,150,59,0.1)",border:"rgba(201,150,59,0.25)"},"Cold Email":{color:"#5b9bd5",bg:"rgba(91,155,213,0.1)",border:"rgba(91,155,213,0.25)"},"BANT & Qualification":{color:"#9b8afb",bg:"rgba(155,138,251,0.1)",border:"rgba(155,138,251,0.25)"},"Reply Classification":{color:"#4ade80",bg:"rgba(74,222,128,0.1)",border:"rgba(74,222,128,0.25)"},"Account Research":{color:"#f87171",bg:"rgba(248,113,113,0.1)",border:"rgba(248,113,113,0.25)"}},u=({children:e})=>(0,t.jsx)("span",{style:{color:"var(--gold)"},children:e});function p({text:e}){let[o,r]=(0,a.useState)(!1),n=async()=>{await navigator.clipboard.writeText(e),r(!0),setTimeout(()=>r(!1),2e3)};return(0,t.jsx)("button",{onClick:n,style:{fontFamily:"'JetBrains Mono',monospace",fontSize:11,padding:"7px 16px",background:o?"var(--surface)":"var(--gold)",color:o?"var(--text-muted)":"var(--bg)",border:`1px solid ${o?"var(--border)":"var(--gold)"}`,borderRadius:8,cursor:"pointer",transition:"all 0.15s",fontWeight:600,whiteSpace:"nowrap",flexShrink:0},children:o?"✓ copied":"copy prompt"})}e.s(["default",0,function(){let[e,h]=(0,a.useState)("All"),[m,f]=(0,a.useState)(null),g=(0,a.useMemo)(()=>"All"===e?l:l.filter(t=>t.category===e),[e]),y={All:l.length};return c.slice(1).forEach(e=>{y[e]=l.filter(t=>t.category===e).length}),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(o.default,{}),(0,t.jsx)(n.default,{}),(0,t.jsxs)("main",{style:{maxWidth:1100,margin:"0 auto",padding:"0 40px"},children:[(0,t.jsx)("div",{style:{paddingTop:48},children:(0,t.jsx)(s.default,{href:"/builds",style:{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:"var(--text-dim)",textDecoration:"none",letterSpacing:"0.04em"},children:"← back to builds"})}),(0,t.jsxs)("section",{style:{padding:"40px 0 48px"},children:[(0,t.jsx)("div",{className:"section-label",children:"ai prompt library"}),(0,t.jsxs)("h1",{style:{fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(36px,5vw,60px)",fontWeight:700,letterSpacing:"-0.035em",lineHeight:1.06,marginBottom:16,color:"var(--text)"},children:[l.length," GTM prompts. ",(0,t.jsx)(u,{children:"Copy and run."})]}),(0,t.jsx)("p",{style:{fontFamily:"Inter, 'DM Sans', system-ui, sans-serif",fontSize:15,color:"var(--text-muted)",maxWidth:580,lineHeight:1.8,marginBottom:24},children:"Every prompt I use across my GTM stack — cold email, BANT extraction, account research, reply classification. Tested in production. Drop them into Claude, GPT-4o, or your Clay AI columns."}),(0,t.jsxs)("div",{style:{display:"inline-flex",alignItems:"center",gap:8,fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:"var(--gold)",background:"var(--gold-bg)",border:"1px solid var(--gold-border)",padding:"8px 16px",borderRadius:9999},children:[(0,t.jsx)("span",{style:{width:6,height:6,borderRadius:"50%",background:"var(--gold)",display:"inline-block"}}),"All prompts include {{variables}} — replace with your actual data"]})]}),(0,t.jsx)("div",{style:{position:"sticky",top:56,zIndex:50,background:"var(--bg)",paddingBottom:16,paddingTop:10,borderBottom:"1px solid var(--border)",marginBottom:32,display:"flex",gap:6,flexWrap:"wrap"},children:c.map(a=>(0,t.jsxs)("button",{onClick:()=>h(a),style:{fontFamily:"'JetBrains Mono',monospace",fontSize:11,padding:"6px 14px",borderRadius:9999,border:`1px solid ${e===a?"var(--gold)":"var(--border)"}`,background:e===a?"var(--gold)":"transparent",color:e===a?"var(--bg)":"var(--text-muted)",cursor:"pointer",transition:"all 0.15s",letterSpacing:"0.02em"},children:[a," ",(0,t.jsxs)("span",{style:{opacity:.6,fontSize:10},children:["· ",y[a]]})]},a))}),(0,t.jsx)("section",{style:{paddingBottom:80},children:(0,t.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:2},children:g.map((e,a)=>{let o=d[e.category],r=m===e.id;return(0,t.jsxs)(i.motion.div,{initial:{opacity:0,y:12},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.3,delay:.03*a},style:{background:"var(--surface-2)",border:`1px solid ${r?"var(--border-2)":"var(--border)"}`,borderRadius:14,overflow:"hidden",transition:"border-color 0.15s"},children:[(0,t.jsxs)("div",{onClick:()=>f(r?null:e.id),style:{padding:"24px 26px",cursor:"pointer",display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:20},children:[(0,t.jsxs)("div",{style:{flex:1},children:[(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:10,flexWrap:"wrap"},children:[(0,t.jsx)("span",{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:9,letterSpacing:"0.08em",textTransform:"uppercase",padding:"3px 9px",borderRadius:9999,border:`1px solid ${o.border}`,background:o.bg,color:o.color},children:e.category}),(0,t.jsx)("span",{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:9,color:"var(--text-dim)",background:"var(--surface)",border:"1px solid var(--border)",padding:"3px 9px",borderRadius:9999},children:e.model})]}),(0,t.jsx)("div",{style:{fontFamily:"'Space Grotesk',sans-serif",fontSize:17,fontWeight:700,color:"var(--text)",letterSpacing:"-0.01em",marginBottom:8},children:e.name}),(0,t.jsx)("p",{style:{fontFamily:"Inter, 'DM Sans', system-ui, sans-serif",fontSize:13,color:"var(--text-muted)",lineHeight:1.75,margin:0,maxWidth:680},children:e.desc})]}),(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:10,flexShrink:0,paddingTop:4},children:[(0,t.jsx)(p,{text:e.prompt}),(0,t.jsx)("span",{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:16,color:"var(--text-dim)",transition:"transform 0.2s",display:"inline-block",transform:r?"rotate(180deg)":"rotate(0deg)"},children:"↓"})]})]}),r&&(0,t.jsxs)("div",{style:{borderTop:"1px solid var(--border)",padding:"20px 26px 24px"},children:[(0,t.jsx)("div",{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:10,color:"var(--text-dim)",letterSpacing:"0.08em",marginBottom:10},children:"// PROMPT"}),(0,t.jsx)("pre",{style:{fontFamily:"'JetBrains Mono',monospace",fontSize:12,color:"var(--text-muted)",lineHeight:1.8,whiteSpace:"pre-wrap",wordBreak:"break-word",margin:0,background:"var(--surface)",border:"1px solid var(--border)",borderRadius:8,padding:"16px 18px"},children:e.prompt})]})]},e.id)})})})]}),(0,t.jsx)(r.default,{})]})}])}]);