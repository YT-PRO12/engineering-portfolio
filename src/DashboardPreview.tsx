import React from "react";
import "./DashboardPreview.css";

type DashboardKind = "evalforge" | "grid-flex" | "edupredict";

type Props = {
  kind: DashboardKind;
  compact?: boolean;
};

const examples = [
  { code: "EX-101", title: "Algorithms · Short answer", status: "Review requested", tone: "amber" },
  { code: "EX-102", title: "Systems · Assessment", status: "Queued", tone: "blue" },
  { code: "EX-103", title: "Programming · Quiz", status: "Instructor review", tone: "green" },
];

const hourlyExample: Array<[number, number]> = [
  [36, 4], [48, 9], [54, 22], [67, 38], [72, 50], [76, 55],
  [69, 47], [61, 31], [58, 18], [70, 7], [62, 3], [42, 2],
];

function BrowserChrome({ name, location }: { name: string; location: string }) {
  return (
    <div className="showcase-chrome">
      <span className="showcase-window-controls" aria-hidden="true"><i/><i/><i/></span>
      <span className="showcase-chrome-title">{name}</span>
      <span className="showcase-chrome-location">{location}</span>
    </div>
  );
}

function EvalForgeInterface() {
  return (
    <div className="showcase-app showcase-eval">
      <aside className="showcase-sidebar">
        <div className="showcase-app-brand"><b>EF</b><span>EvalForge<small>Instructor workspace</small></span></div>
        <span className="showcase-side-label">WORKSPACE</span>
        <span className="showcase-side-link chosen"><i>▦</i> Overview</span>
        <span className="showcase-side-link"><i>≡</i> Submissions</span>
        <span className="showcase-side-link"><i>▤</i> Assessments</span>
        <span className="showcase-side-link"><i>◇</i> Rubric review</span>
        <div className="showcase-side-bottom">UI concept <span>·</span> sample entries</div>
      </aside>
      <div className="showcase-workspace">
        <div className="showcase-workspace-top">
          <span>Teaching / Assessments / Overview</span>
          <span className="showcase-top-avatar">YG</span>
        </div>
        <div className="showcase-dashboard-title">
          <div><span className="showcase-kicker">ASSESSMENT OPERATIONS</span><h3>Review with context.</h3><p>A traceable path from submission to instructor decision.</p></div>
          <span className="showcase-outline-label">Illustrative workspace</span>
        </div>
        <div className="showcase-stat-grid">
          <div><span>PROCESSING</span><strong>Durable queue</strong><small>PostgreSQL + BullMQ</small></div>
          <div><span>REVIEW FLOW</span><strong>Instructor-led</strong><small>Human approval</small></div>
          <div><span>RUBRICS</span><strong>Versioned</strong><small>Criterion evidence</small></div>
        </div>
        <div className="showcase-data-grid">
          <section className="showcase-panel showcase-queue">
            <div className="showcase-panel-heading"><div><b>Submission queue</b><span>Illustrative records</span></div><span>View queue ↗</span></div>
            <div className="showcase-table-head"><span>SUBMISSION</span><span>STATUS</span></div>
            {examples.map((item) => (
              <div className="showcase-queue-row" key={item.code}>
                <div><small>{item.code}</small><strong>{item.title}</strong></div>
                <span className={"showcase-status is-" + item.tone}>{item.status}</span>
              </div>
            ))}
          </section>
          <section className="showcase-panel showcase-review">
            <div className="showcase-panel-heading"><div><b>Evidence review</b><span>Rubric-based workflow</span></div><span>02 / 03</span></div>
            <div className="showcase-rubric-label">CRITERION · EXPLANATION</div>
            <p className="showcase-rubric-copy">Linked evidence from an example student response appears beside the review decision.</p>
            <div className="showcase-evidence-excerpt">“Explains the approach and identifies a meaningful trade-off.”</div>
            <div className="showcase-review-note"><span className="showcase-review-dot"/> Instructor decision required</div>
          </section>
        </div>
        <div className="showcase-product-footer">WORKFLOW MODEL <span>Submission → Durable job → Evidence → Review</span></div>
      </div>
    </div>
  );
}

function GridFlexInterface() {
  return (
    <div className="showcase-app showcase-gridflex">
      <aside className="showcase-sidebar">
        <div className="showcase-app-brand"><b>GF</b><span>Grid Flex<small>Energy intelligence</small></span></div>
        <span className="showcase-side-label">OPERATIONS</span>
        <span className="showcase-side-link chosen"><i>▦</i> Overview</span>
        <span className="showcase-side-link"><i>⌁</i> Production planner</span>
        <span className="showcase-side-link"><i>◈</i> Scenario comparison</span>
        <span className="showcase-side-link"><i>✓</i> Verification</span>
        <div className="showcase-side-bottom">Synthetic factory <span>·</span> UI study</div>
      </aside>
      <div className="showcase-workspace">
        <div className="showcase-workspace-top">
          <span>Operations / Factory 01 / Planning</span>
          <span className="showcase-demo-mark">SYNTHETIC SCENARIO</span>
        </div>
        <div className="showcase-dashboard-title">
          <div><span className="showcase-kicker">INDUSTRIAL ENERGY PLANNING</span><h3>Plan every kilowatt.</h3><p>Model grid demand, solar production and storage trade-offs.</p></div>
          <span className="showcase-outline-label">Illustrative dashboard</span>
        </div>
        <div className="showcase-stat-grid">
          <div><span>TIME HORIZON</span><strong>24 hours</strong><small>Hourly dispatch model</small></div>
          <div><span>OBJECTIVES</span><strong>3 strategies</strong><small>Cost · balanced · carbon</small></div>
          <div><span>FEASIBILITY</span><strong>Post-solve audit</strong><small>Independent constraints</small></div>
        </div>
        <div className="showcase-data-grid">
          <section className="showcase-panel showcase-chart-panel">
            <div className="showcase-panel-heading"><div><b>Modeled energy profile</b><span>Example shape · not solver output</span></div><span>24 h window</span></div>
            <div className="showcase-legend"><span><i className="load"/> Production demand</span><span><i className="solar"/> Solar availability</span></div>
            <div className="showcase-chart" role="img" aria-label="Illustrative comparative bars for synthetic production demand and solar availability over twelve sample time intervals; not calculated optimization results">
              {hourlyExample.map(([load, solar], index) => (
                <div className="showcase-bar-column" key={index}>
                  <span className="showcase-bar load" style={{height: String(load) + "%"}}/>
                  <span className="showcase-bar solar" style={{height: String(solar) + "%"}}/>
                </div>
              ))}
            </div>
            <div className="showcase-chart-axis"><span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span></div>
          </section>
          <section className="showcase-panel showcase-strategies">
            <div className="showcase-panel-heading"><div><b>Decision laboratory</b><span>Optimization strategies</span></div><span>MILP</span></div>
            <div className="showcase-strategy selected"><span><b>Balanced</b><small>Trade-off objective</small></span><span>◉</span></div>
            <div className="showcase-strategy"><span><b>Cost priority</b><small>Tariff-aware planning</small></span><span>○</span></div>
            <div className="showcase-strategy"><span><b>Carbon priority</b><small>Emissions-weighted</small></span><span>○</span></div>
            <div className="showcase-audit-label">VERIFICATION LAYER</div>
            <div className="showcase-audit-checks"><span>Power balance</span><span>Battery bounds</span><span>Job deadlines</span></div>
          </section>
        </div>
        <div className="showcase-product-footer">ENGINEERING MODEL <span>Scenario → MILP → Constraint audit → Compare</span></div>
      </div>
    </div>
  );
}


const studentExamples = [
  { code:"STU-101", status:"Review recommended",tone:"amber" },
  { code:"STU-102", status:"Monitor progress",tone:"blue" },
  { code:"STU-103", status:"Plan documented",tone:"green" },
];

function EduPredictInterface() {
  return (
    <div className="showcase-app showcase-edupredict">
      <aside className="showcase-sidebar">
        <div className="showcase-app-brand"><b>ED</b><span>EduPredict<small>Student success</small></span></div>
        <span className="showcase-side-label">WORKSPACE</span>
        <span className="showcase-side-link chosen"><i>▦</i> Overview</span>
        <span className="showcase-side-link"><i>▤</i> Assess student</span>
        <span className="showcase-side-link"><i>◫</i> Students</span>
        <span className="showcase-side-link"><i>◈</i> Interventions</span>
        <div className="showcase-side-bottom">Synthetic examples <span>·</span> UI depiction</div>
      </aside>
      <div className="showcase-workspace">
        <div className="showcase-workspace-top">
          <span>Student success / Overview</span>
          <span className="showcase-demo-mark">SAMPLE RECORDS</span>
        </div>
        <div className="showcase-dashboard-title">
          <div><span className="showcase-kicker">EARLY WARNING · SUPPORT WORKFLOWS</span><h3>Insights into action.</h3><p>Assess needs, review context, plan follow-up.</p></div>
          <span className="showcase-outline-label">Illustrative interface</span>
        </div>
        <div className="showcase-stat-grid">
          <div><span>ASSESSMENTS</span><strong>Stored history</strong><small>Server-issued identifiers</small></div>
          <div><span>RISK GROUPS</span><strong>3 categories</strong><small>High · medium · low</small></div>
          <div><span>FOLLOW-UP</span><strong>Action plans</strong><small>Student-specific records</small></div>
        </div>
        <div className="showcase-data-grid">
          <section className="showcase-panel showcase-queue">
            <div className="showcase-panel-heading"><div><b>Student review queue</b><span>Illustrative entries — not actual students</span></div><span>View students ↗</span></div>
            <div className="showcase-table-head"><span>ANONYMOUS STUDENT</span><span>FOLLOW-UP</span></div>
            {studentExamples.map(row=>(
              <div className="showcase-queue-row" key={row.code}>
                <div><small>SAMPLE RECORD</small><strong>{row.code}</strong></div>
                <span className={"showcase-status is-"+row.tone}>{row.status}</span>
              </div>
            ))}
          </section>
          <section className="showcase-panel showcase-review">
            <div className="showcase-panel-heading"><div><b>Support plan</b><span>Human-reviewed intervention</span></div><span>WORKFLOW</span></div>
            <div className="showcase-rubric-label">FOLLOW-UP STEPS</div>
            <div className="showcase-edu-steps">
              <div><span>01</span><b>Assess student</b><small>Record academic context</small></div>
              <div><span>02</span><b>Review risk</b><small>Interpret explanation and history</small></div>
              <div><span>03</span><b>Plan intervention</b><small>Track the next student support step</small></div>
            </div>
          </section>
        </div>
        <div className="showcase-product-footer">EDUCATION WORKFLOW <span>React UI → FastAPI → Assessment history → Intervention</span></div>
      </div>
    </div>
  );
}

export default function DashboardPreview({kind,compact=false}:Props) {
  const evalforge=kind==="evalforge";
  const grid=kind==="grid-flex";
  const title=evalforge?"EvalForge":grid?"Grid Flex":"EduPredict AI";
  return (
    <figure className={"portfolio-showcase " + (compact?"showcase-compact ":"") + (evalforge?"showcase-theme-eval":grid?"showcase-theme-grid":"showcase-theme-edu")}>
      <div className="showcase-frame">
        <BrowserChrome name={title} location={evalforge?"assessment / instructor":grid?"energy / planning":"student success / dashboard"}/>
        {evalforge?<EvalForgeInterface/>:grid?<GridFlexInterface/>:<EduPredictInterface/>}
      </div>
      <figcaption>
        <strong>{evalforge?"EvalForge interface concept":grid?"Grid Flex prototype depiction":"EduPredict AI student dashboard"}</strong>
        <span>{evalforge?"Illustrative assessment workflow, not a live screenshot.":grid?"Illustrative synthetic planning data, not measured solver output.":"Illustrative, anonymized example records based on the application's documented workflow; not a live student-data screenshot."}</span>
      </figcaption>
    </figure>
  );
}
