/* Public-facing project facts, based on linked repository code/documentation.
   Private EvalForge details intentionally omit source URL and implementation secrets. */
window.PORTFOLIO_DATA = {
  name: 'Yatharth Goyal',
  email: 'yatharthgoyal657@gmail.com',
  github: 'https://github.com/YT-PRO12',
  linkedin: 'https://www.linkedin.com/in/yatharth-goyal-ab0b8326/',
  leetcode: 'https://leetcode.com/u/yatharth_goyal/',
  codeforces: 'https://codeforces.com/profile/yatharthgoyal657',
  education: {degree:'Bachelor of Technology (B.Tech) in Information Technology',institution:'JECRC',location:'Jaipur, Rajasthan, India',cgpa:'9.00/10.00',expectedGraduation:'2028'},
  certifications: [], // Empty until issuer-issued credential URLs or files are verified.
  projects: [
    {
      id:'aegised', index:'01', category:'Systems', label:'FULL-STACK · REACT / NODE / POSTGRESQL',
      title:'AegisED', subtitle:'End-to-end emergency operations with dependable state.',
      short:'A full-stack operations application connecting React interfaces, Express REST APIs, role-based access and transaction-safe PostgreSQL workflows.',
      stack:['React','Node.js','Express','PostgreSQL','Docker'],
      badges:['Public code','Demo documented'],
      repo:'https://github.com/YT-PRO12/AegisED', demo:'https://careflow-app.onrender.com',
      visual:'care', status:'DEMO DOCUMENTED', statusTone:'live',
      highlight:'Responsive operational interfaces, protected APIs, transactional allocations and audit history.',
      overview:'AegisED is a full-stack emergency-operations engineering demonstration. The React frontend supports registration, case intake, doctor and bed assignment, treatment and discharge. The Node.js/Express API handles authentication, validation, role permissions and workflow rules, while PostgreSQL stores durable state and transactionally protects shared resources.',
      problem:'When two operators assign the same doctor or bed, client-only state updates cannot guarantee consistency. The application must keep the UI and database aligned even when requests conflict or fail, while preserving access boundaries and auditability.',
      architecture:[['React frontend','Role-aware registration, dashboards, cases and workflow interfaces'],['Node.js / Express API','REST endpoints, validation, sessions, RBAC and audit events'],['PostgreSQL / Neon','Relational records, transactions and SELECT FOR UPDATE row locks'],['Build & delivery','Vite frontend, Docker configuration and GitHub Actions checks']],
      contribution:[
        'Built React workflows for emergency intake, resource management, treatment progression and discharge against backend APIs.',
        'Implemented Express routes and server-side controls for authentication, role permissions, request validation and audit records.',
        'Protected doctor and bed assignments using PostgreSQL transactions, row-level locking and rollback paths for conflicting requests.',
        'Connected frontend state to backend-owned business rules instead of relying on cosmetic client-side permissions.'
      ],
      evidence:[
        'Repository source documents the Express API, middleware, SQL workflows and public demonstration configuration.',
        'Dated release-readiness evidence records 16 passing API integration tests, frontend lint/build checks and native PostgreSQL CI coverage for its referenced commit.',
        'The Render demonstration is documented; its live availability and deployed revision require separate verification.'
      ],
      limits:'Engineering demonstration with synthetic patient data, not a production healthcare system. Current provider availability, security accreditation and clinical readiness are not claimed.',
      source:[
        ['Express API and security middleware','https://github.com/YT-PRO12/AegisED/blob/main/backend/src/app.js'],
        ['Release readiness and CI evidence','https://github.com/YT-PRO12/AegisED/blob/main/docs/RELEASE_READINESS.md'],
        ['Project architecture and documentation','https://github.com/YT-PRO12/AegisED/blob/main/README.md']
      ]
    },
    {
      id:'evalforge', index:'02', category:'Systems', label:'DISTRIBUTED SYSTEMS · ASSESSMENT',
      title:'EvalForge', subtitle:'Assessment intelligence with the instructor in control.',
      short:'A rubric-grounded assessment engine using durable jobs, async workers and criterion-linked evidence for human review.',
      stack:['React','Express','PostgreSQL','Redis / BullMQ','FastAPI'],
      badges:['Private repository','Local verification'],
      visual:'eval', status:'RELEASE PENDING', statusTone:'pending',
      highlight:'Evidence spans, idempotent job persistence and bounded worker recovery.',
      overview:'EvalForge accepts student submissions, evaluates rubric criteria, stores evidence, and supports instructor approval, overrides and appeals. PostgreSQL holds durable records, Redis/BullMQ schedules work, and a separate FastAPI evaluator performs written-answer scoring. Its repository is private and not linked publicly.',
      problem:'Automated assessment needs more than a score. Reviewers must be able to inspect supporting answer spans, override recommendations and recover safely if a worker crashes or a submission is retried.',
      architecture:[['React/Vite','Instructor and student workspaces'],['Express API','Sessions, ownership, versioned rubrics'],['PostgreSQL','Submissions, durable jobs and grading decisions'],['Redis / BullMQ','Dispatcher, retries and recovery'],['FastAPI evaluator','Criterion evidence and optional model verification']],
      contribution:[
        'Developed versioned rubrics, criterion-level evidence and instructor approval/appeal flows with scoped access checks.',
        'Separated API, dispatcher, workers and evaluation service; persisted submissions and jobs transactionally with idempotent processing.',
        'Validated positive scoring against exact answer spans, rejecting omitted criteria, invalid spans or unsupported scores.'
      ],
      evidence:[
        'Repository verification matrix reports 15/15 backend tests and 7/7 evaluator tests passing in local checks.',
        'Frontend lint/build and six server-rendered presentation checks passed; these are not browser E2E tests.',
        'CI is configured, while hosted CI and full real-service browser acceptance remain pending.'
      ],
      limits:'Private source; no public deployment or live demo. Hosted CI, Docker runtime and full end-to-end acceptance have not been established. Optional code runner remains disabled.',
      source:[]
    },
    {
      id:'grid-flex', index:'03', category:'Optimization', label:'OPTIMIZATION · ENERGY SYSTEMS',
      title:'Grid Flex', subtitle:'Turn energy trade-offs into inspectable decisions.',
      short:'A synthetic industrial energy planner using mixed-integer optimization, independent constraint checks and cost/carbon trade-off analysis.',
      stack:['Python','SciPy / HiGHS','MILP','JavaScript','AWS SAM'],
      badges:['Public code','Local prototype'],
      repo:'https://github.com/YT-PRO12/Grid-Flex',
      visual:'grid', status:'LOCAL PROTOTYPE', statusTone:'pending',
      highlight:'Three optimization objectives, independent mathematical audits and scenario stress tests.',
      overview:'Grid Flex models a synthetic factory with production deadlines, solar generation, battery storage and grid constraints. SciPy/HiGHS solves mixed-integer programs for cost, balanced and carbon-priority schedules, and an independent verifier inspects the serialized results.',
      problem:'Optimized schedules can appear convincing while violating physical or financial constraints. The decision surface also needs to expose trade-offs instead of presenting a single unexplained answer.',
      architecture:[['Python scenario layer','Synthetic factory, tariff and weather inputs'],['SciPy / HiGHS MILP','Machine starts and hourly battery/grid dispatch'],['Independent verifier','Power balance, SOC, deadlines and totals'],['Interactive web UI','Strategies, scenario comparison and decision briefs'],['AWS SAM (prepared)','Lambda, API Gateway and DynamoDB template only']],
      contribution:[
        'Formulated binary start-time decisions and continuous dispatch variables for production, solar use, storage and grid import.',
        'Implemented an independent audit for energy balance, battery constraints, job deadlines and reported totals.',
        'Added operator-facing cost/carbon comparisons, modeled outage cases, forecast stress tests and battery-throughput sensitivity.'
      ],
      evidence:[
        'Final verification document reports 52/52 Python regression tests passing.',
        'Desktop/mobile Chromium interaction tests and local API smoke tests are documented.',
        'AWS infrastructure is templated, but no live Lambda/API Gateway/DynamoDB deployment is verified.'
      ],
      limits:'Illustrative synthetic scenarios only; not factory savings, measured emissions or a physical control system. Cloud deployment remains unverified.',
      source:[
        ['Optimizer implementation','https://github.com/YT-PRO12/Grid-Flex/blob/main/engine/optimizer.py'],
        ['Post-solve verifier','https://github.com/YT-PRO12/Grid-Flex/blob/main/engine/verification.py'],
        ['Final verification','https://github.com/YT-PRO12/Grid-Flex/blob/main/docs/FINAL_VERIFICATION.md']
      ]
    },
    {
      id:'routeguard', index:'04', category:'Geospatial', label:'GEOSPATIAL · FULL-STACK NAVIGATION',
      title:'RouteGuard 2.0', subtitle:'Driver-facing navigation built around trustworthy inputs.',
      short:'An in-progress road-intelligence web application connecting React/Leaflet maps, Express APIs, PostGIS data and TomTom route comparisons.',
      stack:['React','Leaflet','Node.js / Express','PostgreSQL / PostGIS','TomTom'],
      badges:['In progress','Not safety validated'],
      visual:'route', status:'IN PROGRESS', statusTone:'research',
      highlight:'Destination search, GPS quality checks, geospatial data and route-comparison interfaces.',
      overview:'RouteGuard 2.0 is an ongoing full-stack road-intelligence and navigation project. The architecture combines driver-facing React/Leaflet interfaces, an Express backend, geospatial PostgreSQL/PostGIS records and TomTom routing. Hazard-detection research remains a separate experimental input and is not presented as a deployed safety service.',
      problem:'A usable navigation product must handle location permissions, imprecise or stale GPS readings, destination search and route previews before attempting any hazard-related decisions. Data reliability matters as much as a polished map.',
      architecture:[['React + Leaflet','Driver UI, location feedback and interactive route maps'],['Express endpoints','Authenticated place search, resolution and route requests'],['PostgreSQL / PostGIS','Geospatial hazard records and location-aware queries'],['TomTom integration','Traffic-aware routing and route-comparison inputs']],
      contribution:[
        'Developed or integrated driver-mode location handling, manual-origin fallback and route previews in the frontend workflow.',
        'Worked on authenticated destination search and place resolution against Express API contracts.',
        'Connected route comparison with geospatial road-condition data while documenting incomplete hazard-accuracy research.'
      ],
      evidence:[
        'Previous local development records describe frontend GPS accuracy/staleness checks and authenticated place-search integration.',
        'Hazard model research and dataset audits remain experimental; there is no certified real-world detection accuracy or safety outcome.',
        'A current public release and independent end-to-end production validation have not been established.'
      ],
      limits:'In progress. No route is guaranteed safer. The earlier 95%+ severe-hazard precision and recall research objective remains unachieved; model experiments are not production performance. Local source is not public in this portfolio.',
      source:[]
    }
  ]
};
