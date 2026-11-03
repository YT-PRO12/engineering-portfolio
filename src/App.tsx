import React, { useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import "../styles.css";
import DashboardPreview from "./DashboardPreview";
const D = (window as any).PORTFOLIO_DATA;
const projects = D.projects;
const path = (id: string) => `/projects/${id}.html`;
const resume = "/resume/Yatharth_Goyal_Resume";
const arrow = <span aria-hidden="true">↗</span>;
function External({ href, children, ...props }: any) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      {arrow}
    </a>
  );
}
const decisions: any = {
  aegised: {
    title: "Design the interface. Protect the data.",
    focus: "Full-stack APIs & database integrity",
    proof: "Transaction-safe workflows",
    scope: "React UI · Express REST API · PostgreSQL",
    reason:
      "Patient intake, doctor assignment and bed allocation must agree across the browser, API and database. Express owns authorization and validation, while PostgreSQL transactions and row locks guard simultaneous updates.",
    tradeoff:
      "The React interface presents operational state; the Node.js API enforces business rules. Role checks, data integrity and audit records stay on the server rather than trusting client-side controls.",
    nodes: ["React UI", "Express API", "Row lock", "Commit"],
    invariant: "Clear interfaces. Consistent server state.",
  },
  evalforge: {
    title: "Persist the work before dispatching it.",
    focus: "Durability & human review",
    proof: "15 + 7 local checks",
    scope: "Backend + evaluator · reported in project documentation",
    reason:
      "A retry or worker failure should not lose a submission or silently duplicate a grading decision. PostgreSQL keeps durable jobs while BullMQ coordinates asynchronous execution.",
    tradeoff:
      "Separating persistence from dispatch adds recovery paths to manage. Criterion-linked answer spans and instructor overrides keep evaluation inspectable.",
    nodes: ["Submission", "Durable job", "Worker", "Review"],
    invariant: "Evidence travels with every assessment.",
  },
  "grid-flex": {
    title: "A solver result still needs an independent audit.",
    focus: "Optimization & verification",
    proof: "52 / 52 local tests",
    scope: "Documented regression suite · synthetic scenarios",
    reason:
      "An attractive cost or carbon objective is insufficient if a schedule violates physical or production constraints. An independent verifier checks the solution after optimization.",
    tradeoff:
      "Cost, balanced and carbon objectives expose different choices. Power balance, state-of-charge and deadline checks constrain those choices before scenario stress analysis.",
    nodes: ["Scenario", "MILP solve", "Audit", "Compare"],
    invariant: "Feasibility before an objective value.",
  },
  edupredict: {
    title: "Turn student records into actionable workflows.",
    focus: "Full-stack education platform",
    proof: "React UI + FastAPI services",
    scope: "Assessment history · Risk dashboards · Intervention plans",
    reason:
      "Academic support teams need one dependable workflow from student assessment to reviewable risk indicators and intervention follow-up. The React application connects dashboard, assessment, analytics and student pages to documented FastAPI endpoints.",
    tradeoff:
      "The server owns persistent assessment IDs and database writes. A prediction is decision-support evidence, not an automatic academic judgment; the interface keeps student interventions reviewable.",
    nodes: ["React dashboard", "FastAPI", "Assessment store", "Support plan"],
    invariant: "Student context before decisions.",
  },
};
function Nav() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const links = [
    ["work", "Work"],
    ["skills", "Expertise"],
    ["dsa", "Java DSA"],
    ["contact", "Contact"],
  ];
  return (
    <header
      id="top"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setOpen(false);
          button.current?.focus();
        }
      }}
    >
      <div className="wrap nav">
        <a
          className="brand"
          href="/index.html"
          aria-label="Yatharth Goyal home"
        >
          yg<span>.</span>
          <small>
            YATHARTH GOYAL
            <br />
            SOFTWARE ENGINEER
          </small>
        </a>
        <nav aria-label="Main navigation" className="desktop-nav">
          {links.map(([id, label]) => (
            <a key={id} href={"/index.html#" + id}>
              {label}
            </a>
          ))}
        </nav>
        <a className="nav-resume" href="/index.html#resumes">
          Resume ↓
        </a>
        <button
          ref={button}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}{" "}
          <span aria-hidden="true">{open ? "−" : "+"}</span>
        </button>
      </div>
      <nav
        id="mobile-nav"
        aria-label="Mobile navigation"
        hidden={!open}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setOpen(false);
            button.current?.focus();
          }
        }}
      >
        {[...links, ["resumes", "Resume"], ["education", "Education"]].map(
          ([id, label]) => (
            <a
              key={id}
              href={"/index.html#" + id}
              onClick={() => setOpen(false)}
            >
              {label} {arrow}
            </a>
          ),
        )}
      </nav>
    </header>
  );
}
function Diagram({ p }: any) {
  const x = decisions[p.id];
  return (
    <figure className={"diagram diagram-" + p.id}>
      <figcaption>
        CONCEPTUAL ARCHITECTURE <span>/{p.index}</span>
      </figcaption>
      <div className="diagram-nodes">
        {x.nodes.map((n: string, i: number) => (
          <div className="diagram-node" key={n}>
            <small>0{i + 1}</small>
            <strong>{n}</strong>
            {i < 3 && (
              <span className="connector" aria-hidden="true">
                →
              </span>
            )}
          </div>
        ))}
      </div>
      <p>{x.invariant}</p>
    </figure>
  );
}
function Footer() {
  return (
    <footer>
      <div className="wrap footer-inner">
        <a href="/index.html" className="wordmark">
          Yatharth Goyal<span>.</span>
        </a>
        <span>Jaipur, India · 2026</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
function ResumeLinks() {
  return (
    <section id="resumes" className="resume-section">
      <div className="wrap resume-layout">
        <div>
          <p className="eyebrow">SOFTWARE ENGINEERING / ONE-PAGE PROFILE</p>
          <h2>The work, on one page.</h2>
          <p>A focused resume covering Java, frontend and backend engineering, database integrity and delivery.</p>
        </div>
        <div className="resume-options">
          <div className="resume-option">
            <p className="eyebrow">SDE / FULL STACK / BACKEND</p>
            <h3>Software Engineer Resume</h3>
            <p>Java · React · Node.js / Express · PostgreSQL</p>
            <div>
              <a href={resume + ".pdf"} download aria-label="Download Software Engineer resume PDF">Download PDF ↓</a>
              <a href={resume + ".docx"} download aria-label="Download editable Software Engineer resume Word document">Editable Word ↓</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
function Home() {
  const [filter, setFilter] = useState("All");
  const [copied, setCopied] = useState("");
  const filtered = projects.filter(
    (p: any) => filter === "All" || filter === p.category,
  );
  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1}>
        <section className="hero">
          <div className="wrap">
            <div className="hero-meta">
              <span>
                <i /> SOFTWARE ENGINEER · FULL STACK
              </span>
              <span>JAIPUR, INDIA / 2026</span>
            </div>
            <div className="hero-layout">
              <div>
                <p className="intro-name">Software Engineer · Java · React · Node.js</p>
                <h1>
                  Software that works.
                  <br />
                  <em>From UI to API.</em>
                </h1>
                <p className="hero-lead">
                  I build full-stack web products with React, Node.js,
                  Express and PostgreSQL—connecting thoughtful interfaces
                  to dependable APIs and secure, testable workflows.
                </p>
                <div className="actions">
                  <a className="button primary" href="#work">
                    Explore the work <span>↘</span>
                  </a>
                  <a className="button secondary" href="#resumes">
                    Get my resume ↓
                  </a>
                </div>
              </div>
              <aside className="hero-index" aria-label="Project index">
                <div className="index-head">
                  FOUR ENGINEERING STUDIES <span>01—04</span>
                </div>
                {projects.map((p: any) => (
                  <a href={path(p.id)} key={p.id}>
                    <span className="index-number">{p.index}</span>
                    <div>
                      <strong>{p.title}</strong>
                      <small>{decisions[p.id].focus}</small>
                    </div>
                    {arrow}
                  </a>
                ))}
                <p>Independent projects · documented decisions</p>
              </aside>
            </div>
            <div className="hero-baseline">
              <span>BACKEND SYSTEMS</span>
              <span>REACT & NODE.JS</span>
              <span>JAVA & ALGORITHMS</span>
              <a href="#contact">Open to internship conversations ↗</a>
            </div>
          </div>
        </section>
        <section id="skills" className="expertise">
          <div className="wrap expertise-grid">
            <div>
              <p className="eyebrow">01 / ENGINEERING TOOLKIT</p>
              <h2>
                Built on
                <br />
                strong fundamentals.
              </h2>
            </div>
            {[
              [
                "Backend",
                "Java · Node.js · Express",
                "PostgreSQL · Redis / BullMQ",
                "Transactions, role protection and durable jobs.",
              ],
              [
                "Frontend",
                "React · JavaScript · Vite",
                "Responsive CSS · Accessible UI",
                "Clear forms, workflows and role-aware interface states.",
              ],
              [
                "Testing & Delivery",
                "Git · Docker · GitHub Actions",
                "Playwright · CI · pytest",
                "Repeatable builds, test coverage and documented limits.",
              ],
            ].map(([title, a, b, c]) => (
              <div className="expertise-item" key={title}>
                <h3>{title}</h3>
                <p>
                  {a}
                  <br />
                  {b}
                </p>
                <small>{c}</small>
              </div>
            ))}
          </div>
        </section>
        <section id="work" className="work">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <p className="eyebrow">02 / SELECTED WORK</p>
                <h2>Engineering, in context.</h2>
              </div>
              <p>
                Four domains. Four different constraints.
                <br />
                Explore the decisions behind each build.
              </p>
            </div>
            <div className="filters" role="group" aria-label="Filter projects">
              {["All", "Systems", "Optimization", "Education"].map((f) => (
                <button
                  key={f}
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                >
                  {f === "All" ? "All work" : f}
                </button>
              ))}
              <span aria-live="polite">{filtered.length} projects</span>
            </div>
            <div className="projects">
              {filtered.map((p: any) => (
                <article key={p.id} className="project">
                  <div className="project-copy">
                    <div className="project-meta">
                      <span>
                        {p.index} / {p.category}
                      </span>
                      <span className="status">{p.status}</span>
                    </div>
                    <h3>
                      <a href={path(p.id)}>
                        {p.title} {arrow}
                      </a>
                    </h3>
                    <p className="project-subtitle">{decisions[p.id].title}</p>
                    <p className="project-description">{p.short}</p>
                    <div className="tags">
                      {p.stack.slice(0, 4).map((s: string) => (
                        <span key={s}>{s}</span>
                      ))}
                    </div>
                    <a className="text-link" href={path(p.id)}>
                      Read the case study {arrow}
                    </a>
                  </div>
                  <div className="project-evidence">
                    {(p.id === "evalforge" || p.id === "grid-flex" || p.id === "edupredict") ? (
                      <DashboardPreview kind={p.id} compact />
                    ) : (
                      <Diagram p={p} />
                    )}
                    <div className="evidence-strip">
                      <strong>{decisions[p.id].proof}</strong>
                      <span>{decisions[p.id].scope}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p className="scope-note">
              Results shown here come from project documentation. Their scope
              and limitations accompany each case study.
            </p>
          </div>
        </section>
        <section id="dsa" className="dsa">
          <div className="wrap dsa-grid">
            <div>
              <p className="eyebrow">03 / PROBLEM SOLVING</p>
              <h2>
                Java is where
                <br />I sharpen the logic.
              </h2>
              <p>
                A 16-topic interview roadmap: arrays, hashing, sliding windows,
                linked lists, heaps, trees and backtracking. Implementation
                coverage is documented in the repository.
              </p>
              <External
                className="text-link"
                href="https://github.com/YT-PRO12/DSA-Java-Interview-Prep"
              >
                Explore the Java repository{" "}
              </External>
            </div>
            <div className="dsa-notes">
              <p>
                <span>01</span> Recognize the pattern.
              </p>
              <p>
                <span>02</span> Reason about edge cases.
              </p>
              <p>
                <span>03</span> Explain the complexity.
              </p>
              <div>
                <External href={D.leetcode}>LeetCode </External>
                <External href={D.codeforces}>Codeforces </External>
              </div>
              <small>
                Profile links and repository coverage are not verified
                submission counts or contest rankings.
              </small>
            </div>
          </div>
        </section>
        <ResumeLinks />
        <section id="education" className="education">
          <div className="wrap education-grid">
            <div>
              <p className="eyebrow">04 / EDUCATION & CERTIFICATIONS</p>
              <h2>
                Learning. Building.
                <br />
                Repeating.
              </h2>
            </div>
            <div>
              <h3>JECRC</h3>
              <p>B.Tech Information Technology</p>
              <dl>
                <div>
                  <dt>Expected graduation</dt>
                  <dd>2028</dd>
                </div>
                <div>
                  <dt>CGPA</dt>
                  <dd>9.00/10.00</dd>
                </div>
                <div>
                  <dt>Location</dt>
                  <dd>Jaipur, Rajasthan, India</dd>
                </div>
              </dl>
              {D.certifications.length > 0 && (
                <ul>
                  {D.certifications.map((c: any) => (
                    <li key={c.title}>
                      <External href={c.url}>
                        {c.title} · {c.issuer}
                      </External>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
        <section id="contact" className="contact">
          <div className="wrap contact-grid">
            <div>
              <p className="eyebrow">LET'S BUILD SOMETHING USEFUL</p>
              <h2>
                Have a hard problem?
                <br />
                <em>Let's talk.</em>
              </h2>
              <p>
                Interested in software engineering internships,
                <br />
                frontend and backend systems.
              </p>
            </div>
            <div className="contact-links">
              <a href={"mailto:" + D.email}>
                {D.email} {arrow}
              </a>
              <div>
                <External href={D.github}>GitHub </External>
                <External href={D.linkedin}>LinkedIn </External>
                <button
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(D.email);
                      setCopied("Email copied.");
                    } catch {
                      setCopied("Please copy the email address above.");
                    }
                  }}
                >
                  Copy email
                </button>
              </div>
              <p role="status">{copied}</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
function ProjectPage({ p }: any) {
  const x = decisions[p.id];
  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1}>
        <section className="case-hero">
          <div className="wrap">
            <a className="back" href="/index.html#work">
              ← Selected work
            </a>
            <div className="case-meta">
              <span>ENGINEERING STUDY / {p.index}</span>
              <span className="status">{p.status}</span>
            </div>
            <h1>
              {p.title}
              <em>.</em>
            </h1>
            <p className="case-headline">{x.title}</p>
            <p className="case-description">{p.short}</p>
            <div className="actions">
              {p.repo && (
                <External className="button primary" href={p.repo}>
                  Source repository{" "}
                </External>
              )}
              {p.demo && (
                <External className="button secondary" href={p.demo}>
                  Documented demo{" "}
                </External>
              )}
              {!p.repo && (
                <span>
                  {p.id === "evalforge"
                    ? "Private repository · no public deployment"
                    : "In-progress project · local source"}
                </span>
              )}
            </div>
            <div className="tags">
              {p.stack.map((s: string) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
        </section>
        <div className="wrap case-layout">
          <aside className="case-nav">
            <p className="eyebrow">IN THIS STUDY</p>
            <a href="#context">01 / Context</a>
            <a href="#decision">02 / Key decision</a>
            <a href="#implementation">03 / Contributions</a>
            <a href="#validation">04 / Validation</a>
            <a href="#limits">05 / Limitations</a>
          </aside>
          <div className="case-body">
            <div className="case-summary">
              <strong>{x.proof}</strong>
              <p>{x.scope}</p>
            </div>
            <section id="context">
              <p className="eyebrow">01 / CONTEXT</p>
              <h2>The problem behind the interface.</h2>
              <p>{p.overview}</p>
              <p>{p.problem}</p>
            </section>
            {(p.id === "evalforge" || p.id === "grid-flex" || p.id === "edupredict") && (
              <DashboardPreview kind={p.id} />
            )}
            <Diagram p={p} />
            {p.id === "aegised" && (
              <figure className="product-capture">
                <a
                  href="/assets/aegised-dashboard.webp"
                  aria-label="Open full AegisED dashboard screenshot"
                >
                  <img
                    src="/assets/aegised-dashboard.webp"
                    width="1440"
                    height="1592"
                    loading="lazy"
                    alt="AegisED repository screenshot showing the CareFlow emergency operations dashboard with synthetic demo records"
                  />
                </a>
                <figcaption>
                  Actual repository screenshot · CareFlow / AegisED · synthetic
                  demonstration data.{" "}
                  <External href="https://github.com/YT-PRO12/AegisED/blob/main/docs/screenshots/dashboard-desktop.png">
                    View original source{" "}
                  </External>
                </figcaption>
              </figure>
            )}
            <section id="decision">
              <p className="eyebrow">02 / KEY DECISION</p>
              <h2>{x.title}</h2>
              <p>{x.reason}</p>
              <div className="decision-note">
                <h3>Why this approach</h3>
                <p>{x.tradeoff}</p>
              </div>
              <dl className="architecture">
                {p.architecture.map(([title, desc]: string[]) => (
                  <div key={title}>
                    <dt>{title}</dt>
                    <dd>{desc}</dd>
                  </div>
                ))}
              </dl>
            </section>
            <section id="implementation">
              <p className="eyebrow">03 / ENGINEERING CONTRIBUTIONS</p>
              <h2>Where I focused the work.</h2>
              <ol className="contributions">
                {p.contribution.map((s: string) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </section>
            <section id="validation">
              <p className="eyebrow">04 / VALIDATION</p>
              <h2>What the evidence supports.</h2>
              <ul className="evidence-list">
                {p.evidence.map((s: string) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              {p.source.length > 0 ? (
                <div className="source-links">
                  {p.source.map(([title, url]: string[]) => (
                    <External key={url} href={url}>
                      {title}{" "}
                    </External>
                  ))}
                </div>
              ) : (
                <p className="scope-note">
                  {p.id === "evalforge"
                    ? "Reported local results from supplied project documentation; private implementation is not published here."
                    : "Historical results from supplied project context; no public source or final independent validation is supplied."}
                </p>
              )}
            </section>
            <section id="limits" className="limitations">
              <p className="eyebrow">05 / CURRENT LIMITATIONS</p>
              <h2>
                The boundary of this work.
              </h2>
              <p>{p.limits}</p>
            </section>
          </div>
        </div>
        <section className="next-project">
          <div className="wrap">
            <p className="eyebrow">KEEP EXPLORING</p>
            {projects
              .filter((v: any) => v.id !== p.id)
              .map((v: any) => (
                <a key={v.id} href={path(v.id)}>
                  <span>{v.index}</span>
                  <strong>{v.title}</strong>
                  {arrow}
                </a>
              ))}
          </div>
        </section>
        <ResumeLinks />
      </main>
      <Footer />
    </>
  );
}
const slug = location.pathname.split("/").pop()?.replace(".html", "");
const project = projects.find((p: any) => p.id === slug);
const home = location.pathname === "/" || slug === "index";
createRoot(document.getElementById("root")!).render(
  project ? (
    <ProjectPage p={project} />
  ) : home ? (
    <Home />
  ) : (
    <>
      <Nav />
      <main id="main" className="notfound">
        <p className="eyebrow">404</p>
        <h1>This page isn't here.</h1>
        <a className="button primary" href="/index.html">
          Return to the portfolio →
        </a>
      </main>
      <Footer />
    </>
  ),
);
