/* Public-facing project facts, based on linked repository code/documentation.
   Private EvalForge details intentionally omit source URL and implementation secrets. */
window.PORTFOLIO_DATA = {
  name: 'Yatharth Goyal',
  email: 'yatharthgoyal657@gmail.com',
  github: 'https://github.com/YT-PRO12',
  linkedin: 'https://www.linkedin.com/in/yatharth-goyal-ab0b8326/',
  leetcode: 'https://leetcode.com/u/yatharth_goyal/',
  codeforces: 'https://codeforces.com/profile/yatharthgoyal657',
  projects: [
    {
      id:'aegised', index:'01', category:'Systems', label:'FULL-STACK · SYSTEMS ENGINEERING',
      title:'AegisED', subtitle:'Emergency operations, without compromising data integrity.',
      short:'An emergency-operations platform connecting transactional resource allocation, role-aware workflows and human-reviewed ML decision support.',
      stack:['React','Express','PostgreSQL','FastAPI','scikit-learn'],
      badges:['Public code','Demo documented'],
      repo:'https://github.com/YT-PRO12/AegisED', demo:'https://careflow-app.onrender.com',
      visual:'care', status:'DEMO DOCUMENTED', statusTone:'live',
      highlight:'Row-level locking, auditable transitions and a human-in-the-loop ML service.',
      overview:'AegisED explores the reliability problems behind coordinated emergency operations. It uses a React frontend, an Express gateway, PostgreSQL-backed workflows and a separate FastAPI service for non-clinical decision support. The application is an educational engineering demonstration, not a clinical product.',
      problem:'When multiple operators allocate the same constrained resources, naïve CRUD APIs can produce inconsistent state. Emergency workflows also require clear authorization, traceability and careful boundaries around machine-learning recommendations.',
      architecture:[['React client','Patient, operator and administrative workflows'],['Express gateway','Authentication, authorization, validation and auditing'],['PostgreSQL','Transactions, row locks, durable emergency state'],['FastAPI service','Human-reviewed synthetic-data ML recommendations']],
      contribution:[
        'Built backend workflow transitions for patient intake, resource assignment, treatment and discharge using PostgreSQL transactions and row locking.',
        'Kept authorization and audit events at the API layer, rather than relying on hidden frontend controls.',
        'Integrated a separate FastAPI/scikit-learn service with human review and recorded override flows.'
      ],
      evidence:[
        'Repository documents an accessible Render demonstration and a Neon-backed data path; availability can vary on free hosting.',
        'The model README reports 0.7893 macro-F1 on 900 held-out synthetic cases. This is not clinical validation.',
        'A dated release-readiness report records 16 passing local API integration tests and 9 passing Python tests.'
      ],
      limits:'Uses synthetic data; not clinically validated. Deployment checks are dated, and a current production acceptance run was not performed for this portfolio.',
      source:[
        ['App API and security middleware','https://github.com/YT-PRO12/AegisED/blob/main/backend/src/app.js'],
        ['Release-readiness report','https://github.com/YT-PRO12/AegisED/blob/main/docs/RELEASE_READINESS.md'],
        ['Public project README','https://github.com/YT-PRO12/AegisED/blob/main/README.md']
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
      id:'routeguard', index:'04', category:'Applied AI', label:'COMPUTER VISION · GEOSPATIAL',
      title:'RouteGuard 2.0', subtitle:'Road intelligence that earns its confidence.',
      short:'An India-first road-hazard and navigation research project pairing YOLO detection with geospatial route comparison.',
      stack:['Python','YOLO','React / Leaflet','PostGIS','TomTom'],
      badges:['In progress','Target not achieved'],
      visual:'route', status:'IN PROGRESS', statusTone:'research',
      highlight:'Active dataset and label audits toward an ambitious, not-yet-met severe-hazard detection target.',
      overview:'RouteGuard 2.0 is an ongoing road-hazard intelligence and navigation project. Its engineering work includes React/Leaflet driver workflows, an Express API, PostGIS-backed hazard data and TomTom routing, alongside experiments using YOLO models on road-damage imagery.',
      problem:'Hazard-informed routing depends on uncertain observations. A model trained on noisy road-damage labels cannot responsibly be described as accurate or safety-guaranteeing without careful data audits and independent evaluation.',
      architecture:[['Image and label audit','Road-damage data integrity and human review'],['YOLO RoadVision research','Four-class damage detection baseline/experiments'],['Express + PostGIS','Geospatial hazard storage and route signals'],['React + Leaflet + TomTom','Driver-facing place search and route comparison']],
      contribution:[
        'Worked on road-damage detection evaluation and data-integrity checks, including suspicious empty-label review and split leakage checks.',
        'Built or integrated routing and map workflows that combine driver location, place resolution and hazard-informed route comparisons.',
        'Maintained an explicit research target of at least 95% precision AND recall per severe-hazard class on an independent test set; not yet achieved.'
      ],
      evidence:[
        'Historical RDD2022-derived four-class baseline recorded 61.51% precision, 56.38% recall and 60.26% mAP50 on a validation set.',
        'More recent candidate training underperformed the baseline; these experiments must not be represented as production performance.',
        'Some severe target classes (open manholes, flooding, road collapse) are not represented by the four-class baseline.'
      ],
      limits:'In progress. The 95%+ precision/recall objective has not been reached or independently validated. Local source is not included in this portfolio package, and no verified public repository URL is supplied.',
      source:[]
    }
  ]
};
