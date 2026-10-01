import React, { useEffect, useRef, useState } from 'react';

const STEPS = [
  {
    n: '01',
    name: 'Audit',
    body: 'We map AI spend across teams, models, vendors and workflows, and find where the waste is.',
    who: 'CFO · CIO',
  },
  {
    n: '02',
    name: 'Advise',
    body: 'A prioritised plan: what to change, what it saves, what it risks, in terms finance and engineering can both sign off.',
    who: 'CFO · CTO',
  },
  {
    n: '03',
    name: 'Implement',
    body: 'Our engineers make the changes in your systems (model choices, architecture, usage patterns) and measure the savings.',
    who: 'CTO · Engineering',
  },
];

const LEAKS = [
  ['Oversized models', 'Frontier models answering questions a small model handles just as well. Often the single largest line.'],
  ['No caching', 'The same long system prompts and documents sent, and paid for, on every call.'],
  ['Duplicate and runaway calls', 'Retries, loops and parallel teams hitting the same endpoint for the same answer.'],
  ['Idle capacity', 'Reserved GPUs and provisioned throughput sized for a peak that rarely comes.'],
];

const AUDIT = [
  ['Weeks 1–2', 'Map', 'We connect to billing and usage data, interview the teams using AI and build a complete record of spend by workflow, model and vendor.'],
  ['Week 3', 'Measure', 'We test cheaper alternatives against your own quality bar, so every saving comes with evidence that nothing got worse.'],
  ['Week 4', 'Plan', 'You get a prioritised plan: each change, its saving, its risk and its effort, signed off by finance and engineering together.'],
];

const FAQ = [
  ['Will cutting cost hurt quality?', "No change ships without being tested against your own quality benchmarks. If a cheaper setup does worse, we don't recommend it."],
  ['Do you need access to our data?', "We need billing and usage metadata, not your customers' data. Where prompts or outputs are needed for quality testing, we work inside your environment under your controls."],
  ['Which models and vendors do you work with?', 'All the major model providers, open-weight models and the main cloud platforms. We have no reseller deals, so our advice is independent.'],
  ['What happens after the audit?', 'You keep the plan either way. Most clients ask our engineers to implement it, and we report the savings measured against the audit baseline.'],
  ['How big does our AI spend need to be?', 'The audit pays off best once AI is a noticeable line in your monthly cloud or vendor bill, typically from the first production workloads onward.'],
];

const LEDGER = [
  ['Support triage', 'gpt-class · 41M tok/mo', 'Route to small model', true],
  ['Contract summaries', 'frontier · 12M tok/mo', 'Prompt caching', true],
  ['Internal search', 'embeddings · 180M tok/mo', 'Batch + dedupe', true],
  ['Code review bot', 'frontier · 9M tok/mo', 'Keep as is', false],
];

function Nav() {
  return (
    <header className="nav">
      <a href="#top" className="nav-logo" aria-label="Kolofon.ai home">
        <img src="/logo-horizontal-reversed.svg" alt="Kolofon.ai" />
      </a>
      <nav className="nav-links" aria-label="Primary">
        <a href="#approach">Approach</a>
        <a href="#audit-offer">The audit</a>
        <a href="#faq">FAQ</a>
        <a href="#audit" className="btn btn-primary btn-sm">Book an AI Cost Audit</a>
      </nav>
    </header>
  );
}

function Hero() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches && videoRef.current) {
      videoRef.current.pause();
      setPlaying(false);
    }
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="hero" id="top">
      <video
        ref={videoRef}
        className="hero-video"
        src="/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="hero-scrim" />
      <div className="hero-content">
        <p className="eyebrow accent">AI cost efficiency · Consulting + engineering</p>
        <h1 className="display-xl hero-title">
          Know what your AI costs. <span className="accent">Then make it cost less.</span>
        </h1>
        <p className="body-l hero-sub">
          Our consultants find where your AI spend goes. Our engineers build the changes that bring it
          down, without cutting quality.
        </p>
        <div className="hero-actions">
          <a href="#audit" className="btn btn-primary">Book an AI Cost Audit</a>
          <a href="#approach" className="btn btn-secondary">See how we work</a>
        </div>
      </div>
      <button className="hero-toggle" onClick={toggle} aria-label={playing ? 'Pause background video' : 'Play background video'}>
        <span className="mono">{playing ? 'Pause' : 'Play'}</span>
      </button>
    </section>
  );
}

function Tension() {
  return (
    <section className="section tension light">
      <p className="eyebrow accent">The tension</p>
      <p className="editorial">
        AI is the fastest-growing line on the enterprise bill, and <span className="hl">the least understood.</span>
      </p>
      <p className="body-l muted tension-sub">
        Teams experiment. Models multiply. Invoices arrive. Nobody can say which workflows earn their
        cost and which quietly burn it.
      </p>
    </section>
  );
}

function Leaks() {
  return (
    <section className="section" id="leaks">
      <div className="section-head">
        <p className="eyebrow accent">Where the money goes</p>
        <h2 className="display-l">Most AI spend leaks in the same four places.</h2>
      </div>
      <ul className="leaks">
        {LEAKS.map(([title, body], i) => (
          <li key={title} className="leak">
            <span className="mono accent">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3 className="subheading">{title}</h3>
              <p className="body muted">{body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Approach() {
  return (
    <section className="section approach light" id="approach">
      <div className="approach-media">
        <div className="section-head">
          <p className="eyebrow accent">How we work</p>
          <h2 className="display-l">Audit. Advise. Implement.</h2>
        </div>
        <img
          src="/engineers.jpg"
          alt="Two engineers reviewing an AI spend breakdown on a monitor"
          className="photo photo-engineers"
          loading="lazy"
        />
      </div>
      <ol className="steps">
        {STEPS.map((s) => (
          <li key={s.n} className="step">
            <span className="step-n mono">{s.n}</span>
            <h3 className="heading">{s.name}</h3>
            <p className="body muted">{s.body}</p>
            <span className="chip">{s.who}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Record() {
  return (
    <section className="section record" id="record">
      <div className="record-copy">
        <p className="eyebrow accent">The record</p>
        <h2 className="display-l">Every token, accounted for.</h2>
        <p className="body-l muted">
          A colophon is the note at the end of a book that records how it was made. We keep that record
          for your AI: what every model, workflow and token costs, and what it is worth. Then we rewrite
          it to cost less.
        </p>
        <img
          src="/report.jpg"
          alt="A hand annotating a printed cost report, one line highlighted"
          className="photo photo-report"
          loading="lazy"
        />
      </div>
      <div className="ledger" role="table" aria-label="Example AI spend record">
        <div className="ledger-row ledger-head" role="row">
          <span role="columnheader">Workflow</span>
          <span role="columnheader">Usage</span>
          <span role="columnheader">Action</span>
        </div>
        {LEDGER.map(([w, u, a, change]) => (
          <div className="ledger-row" role="row" key={w}>
            <span role="cell">{w}</span>
            <span role="cell" className="muted">{u}</span>
            <span role="cell" className={change ? 'ok' : 'muted'}>
              {change ? '↓ ' : '— '}
              {a}
            </span>
          </div>
        ))}
        <p className="caption muted ledger-note">Illustrative example. Not client data.</p>
      </div>
    </section>
  );
}

function AuditOffer() {
  return (
    <section className="section light" id="audit-offer">
      <div className="section-head">
        <p className="eyebrow accent">The AI Cost Audit</p>
        <h2 className="display-l">Four weeks. A fixed scope. A plan you can sign.</h2>
        <p className="body-l muted audit-lede">
          The audit is where every engagement starts. It needs a finance owner, an engineering lead and
          read access to your AI billing and usage data.
        </p>
      </div>
      <ol className="timeline">
        {AUDIT.map(([when, what, body]) => (
          <li key={what} className="timeline-row">
            <span className="mono accent timeline-when">{when}</span>
            <h3 className="heading">{what}</h3>
            <p className="body muted">{body}</p>
          </li>
        ))}
      </ol>
      <p className="caption muted audit-deliver">
        You receive: the full spend record · a tested savings estimate per change · an implementation plan
        with owners and effort.
      </p>
    </section>
  );
}

function Faq() {
  return (
    <section className="section faq" id="faq">
      <div className="section-head">
        <p className="eyebrow accent">Questions</p>
        <h2 className="display-l">What buyers ask us first.</h2>
      </div>
      <div>
        {FAQ.map(([q, a]) => (
          <details key={q} className="faq-item">
            <summary className="subheading">{q}</summary>
            <p className="body-l muted">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Campus() {
  return (
    <figure className="band">
      <img src="/campus.jpg" alt="A glass and concrete tech campus among coconut palms at dusk" loading="lazy" />
      <figcaption className="band-caption eyebrow">Rooted in Kerala, built for the world</figcaption>
    </figure>
  );
}

function Proof() {
  return (
    <section className="proof">
      <img src="/cfo.jpg" alt="" className="proof-bg" loading="lazy" />
      <div className="proof-scrim" />
      <p className="quote">We don't hand you a report. We hand you <span className="accent">a smaller bill.</span></p>
      <p className="mono muted proof-note">[ First client result goes here — a sourced % reduction in monthly AI spend ]</p>
    </section>
  );
}

function Cta() {
  const [sent, setSent] = useState(false);

  // No backend yet: compose the enquiry in the visitor's email app.
  const onSubmit = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `Name: ${f.get('name')}\nEmail: ${f.get('email')}\nCompany: ${f.get('company')}\nRole: ${f.get('role')}\nMonthly AI spend: ${f.get('spend')}\n\n${f.get('message')}`;
    window.location.href = `mailto:hello@kolofon.ai?subject=${encodeURIComponent('AI Cost Audit enquiry')}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section className="section cta" id="audit">
      <div>
        <p className="eyebrow">Start here</p>
        <h2 className="display-l">How much of your AI budget is doing <span className="hl">real work?</span></h2>
        <p className="body-l cta-sub">
          Tell us a little about your setup. We'll reply within two working days with whether an audit
          makes sense for you.
        </p>
      </div>
      <form className="form" onSubmit={onSubmit}>
        <label>
          <span className="caption">Name</span>
          <input name="name" required autoComplete="name" />
        </label>
        <label>
          <span className="caption">Work email</span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
        <label>
          <span className="caption">Company</span>
          <input name="company" required autoComplete="organization" />
        </label>
        <label>
          <span className="caption">Role</span>
          <input name="role" autoComplete="organization-title" />
        </label>
        <label className="span-2">
          <span className="caption">Approximate monthly AI spend</span>
          <select name="spend" defaultValue="">
            <option value="" disabled>Choose a range</option>
            <option>Not sure yet</option>
            <option>Under ₹10 lakh</option>
            <option>₹10 lakh – ₹1 crore</option>
            <option>Over ₹1 crore</option>
          </select>
        </label>
        <label className="span-2">
          <span className="caption">What are you trying to solve?</span>
          <textarea name="message" rows="4" />
        </label>
        <div className="span-2 form-foot">
          <button type="submit" className="btn btn-primary">Request an AI Cost Audit</button>
          {sent && <p className="caption" role="status">Your email app should open with the message ready to send.</p>}
        </div>
      </form>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <img src="/logo-horizontal-reversed.svg" alt="Kolofon.ai" className="footer-logo" />
      <p className="caption muted">Rooted in Kerala, built for the world. © {new Date().getFullYear()} Kolofon Prosperity AI Pvt. Ltd.</p>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Tension />
        <Campus />
        <Leaks />
        <Approach />
        <Record />
        <AuditOffer />
        <Proof />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
