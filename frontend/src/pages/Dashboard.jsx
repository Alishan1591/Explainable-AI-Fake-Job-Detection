import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Search,
  History,
  ArrowRight,
  Brain,
  Lock,
} from "lucide-react";

function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
              <ShieldCheck size={22} />
            </div>

            <div>
              <h1 className="font-bold">
                FakeJob AI
              </h1>

              <p className="text-xs text-slate-500">
                Explainable AI
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/analyze"
              className="hidden rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-700 sm:block"
            >
              Analyze Job
            </Link>

            <Link
              to="/history"
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold hover:bg-slate-800"
            >
              History
            </Link>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* Welcome */}
        <div className="mb-10">
          <p className="text-sm font-medium text-blue-500">
            AI-POWERED JOB ANALYSIS
          </p>

          <h2 className="mt-2 text-4xl font-bold tracking-tight">
            Fake Job Detection Dashboard
          </h2>

          <p className="mt-3 max-w-2xl text-slate-400">
            Analyze job postings using machine learning and
            understand the important factors behind each
            prediction using Explainable AI.
          </p>
        </div>

        {/* Main CTA */}
        <div className="mb-8 overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-blue-950 to-slate-900">
          <div className="grid gap-8 p-8 md:grid-cols-2 md:p-10">
            <div>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
                <Search size={24} />
              </div>

              <h3 className="text-2xl font-bold">
                Analyze a Job Posting
              </h3>

              <p className="mt-3 leading-7 text-slate-300">
                Enter the details of a job advertisement and
                our trained AI model will assess whether it
                appears genuine or potentially fake.
              </p>

              <Link
                to="/analyze"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-700"
              >
                Start Analysis
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="flex items-center justify-center">
              <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-8 text-center">
                <Brain
                  size={55}
                  className="mx-auto text-blue-500"
                />

                <p className="mt-4 font-semibold">
                  Explainable AI
                </p>

                <p className="mt-2 max-w-xs text-sm text-slate-400">
                  Understand which features influence the
                  prediction.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <DashboardCard
            icon={<Search size={24} />}
            title="Analyze Job"
            description="Submit a job posting for AI-powered risk assessment."
            link="/analyze"
            button="Analyze Now"
          />

          <DashboardCard
            icon={<History size={24} />}
            title="Prediction History"
            description="View your previous job posting analysis results."
            link="/history"
            button="View History"
          />

          <DashboardCard
            icon={<Lock size={24} />}
            title="Secure Analysis"
            description="Your prediction history is associated with your authenticated account."
            link="/history"
            button="View Records"
          />
        </div>

        {/* Disclaimer */}
        <div className="mt-8 rounded-xl border border-amber-900/50 bg-amber-950/20 p-5">
          <p className="text-sm leading-6 text-amber-200">
            <strong>Important:</strong> This system provides
            an AI-based risk assessment. A "Potentially Fake"
            result does not by itself prove that a job posting
            is fraudulent. Always independently verify the
            employer and job opportunity.
          </p>
        </div>
      </main>
    </div>
  );
}

function DashboardCard({
  icon,
  title,
  description,
  link,
  button,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-slate-700">
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/10 text-blue-500">
        {icon}
      </div>

      <h3 className="text-xl font-semibold">
        {title}
      </h3>

      <p className="mt-3 min-h-14 text-sm leading-6 text-slate-400">
        {description}
      </p>

      <Link
        to={link}
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-500 hover:text-blue-400"
      >
        {button}
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}

export default Dashboard;