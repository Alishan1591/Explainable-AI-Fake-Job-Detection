import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Brain,
  Search,
  Database,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.18),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-20 md:pb-28 md:pt-28">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-900 bg-blue-950/40 px-4 py-2 text-sm text-blue-300">
              <ShieldCheck size={17} />
              Explainable AI-Based Job Detection
            </div>

            <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-7xl">
              Detect Potentially Fake
              <span className="block text-blue-500">
                Job Postings with AI
              </span>
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
              Analyze job advertisements using Natural Language
              Processing, Machine Learning and Explainable AI to
              understand potential fraud risk factors.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/register"
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 font-semibold transition hover:bg-blue-700"
              >
                Start Analyzing
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/login"
                className="rounded-lg border border-slate-700 px-6 py-3.5 font-semibold text-slate-200 transition hover:bg-slate-800"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-slate-800 bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-500">
              Core capabilities
            </p>

            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              AI analysis with understandable results
            </h2>

            <p className="mt-4 text-slate-400">
              The system combines text analysis, structured job
              information and explainability techniques.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Feature
              icon={<Search />}
              title="Job Posting Analysis"
              text="Submit job details including description, requirements, company information and other structured attributes."
            />

            <Feature
              icon={<Brain />}
              title="Explainable AI"
              text="SHAP-based explanations highlight features that contribute to the model's prediction."
            />

            <Feature
              icon={<Database />}
              title="Prediction History"
              text="Authenticated users can access their previous analysis records stored in MySQL."
            />
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-500">
                How it works
              </p>

              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                From job posting to explainable prediction
              </h2>

              <div className="mt-8 space-y-5">
                <Step
                  number="01"
                  title="Enter job information"
                  text="Provide the available information from a job advertisement."
                />

                <Step
                  number="02"
                  title="AI processes the data"
                  text="The trained NLP and machine learning pipeline converts the information into model features."
                />

                <Step
                  number="03"
                  title="Review prediction and explanation"
                  text="View the model assessment together with influential SHAP features."
                />
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
                <div className="flex items-center gap-3">
                  <CheckCircle2
                    className="text-emerald-400"
                    size={24}
                  />

                  <span className="font-semibold">
                    Explainable prediction
                  </span>
                </div>

                <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full w-3/5 rounded-full bg-blue-600" />
                </div>

                <div className="mt-6 space-y-3">
                  <div className="rounded-lg bg-slate-900 p-3">
                    <p className="text-xs text-slate-500">
                      Feature
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      Job description terms
                    </p>
                  </div>

                  <div className="rounded-lg bg-slate-900 p-3">
                    <p className="text-xs text-slate-500">
                      Feature
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      Employment information
                    </p>
                  </div>

                  <div className="rounded-lg bg-slate-900 p-3">
                    <p className="text-xs text-slate-500">
                      Feature
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      Company information
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-800">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Analyze your next job posting
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Use the AI-powered system to assess job postings and
            inspect the factors behind the prediction.
          </p>

          <Link
            to="/register"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 font-semibold hover:bg-blue-700"
          >
            Create Free Account
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 text-sm text-slate-500 md:flex-row">
          <p>
            © 2026 FakeJob AI. Academic final-year project.
          </p>

          <p>
            Explainable AI-Based Fake Job Posting Detection System
          </p>
        </div>
      </footer>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-7">
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/10 text-blue-500">
        {icon}
      </div>

      <h3 className="text-xl font-semibold">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-slate-400">
        {text}
      </p>
    </div>
  );
}

function Step({ number, title, text }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-700 text-sm font-bold text-blue-500">
        {number}
      </div>

      <div>
        <h3 className="font-semibold">{title}</h3>

        <p className="mt-1 text-sm leading-6 text-slate-400">
          {text}
        </p>
      </div>
    </div>
  );
}

export default Home;