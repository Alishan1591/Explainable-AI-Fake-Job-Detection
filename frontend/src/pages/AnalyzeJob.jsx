import { useState } from "react";
import {
  Search,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  Brain,
} from "lucide-react";
import api from "../services/api";

function AnalyzeJob() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    requirements: "",
    company_profile: "",
    benefits: "",
    location: "",
    employment_type: "",
    industry: "",
    salary_range: "",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setResult(null);
    setLoading(true);

    try {
      const response = await api.post(
        "/predict",
        form
      );

      setResult(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        setError(
          "Your session has expired. Please login again."
        );
      } else {
        setError(
          err.response?.data?.detail ||
            "Unable to analyze this job posting."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm({
      title: "",
      description: "",
      requirements: "",
      company_profile: "",
      benefits: "",
      location: "",
      employment_type: "",
      industry: "",
      salary_range: "",
    });

    setResult(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <main className="mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
            <Search size={24} />
          </div>

          <h1 className="text-4xl font-bold">
            Analyze Job Posting
          </h1>

          <p className="mt-3 max-w-2xl text-slate-400">
            Enter the available information from a job
            advertisement. The AI model will analyze the
            posting and provide an explainable prediction.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 md:p-8">
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <InputField
                  label="Job Title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Data Analyst"
                  required
                />

                <TextAreaField
                  label="Job Description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Enter the complete job description..."
                  required
                  rows={7}
                />

                <TextAreaField
                  label="Requirements"
                  name="requirements"
                  value={form.requirements}
                  onChange={handleChange}
                  placeholder="Skills, qualifications, experience..."
                  rows={5}
                />

                <TextAreaField
                  label="Company Profile"
                  name="company_profile"
                  value={form.company_profile}
                  onChange={handleChange}
                  placeholder="Information about the company..."
                  rows={4}
                />

                <TextAreaField
                  label="Benefits"
                  name="benefits"
                  value={form.benefits}
                  onChange={handleChange}
                  placeholder="Benefits, perks, insurance..."
                  rows={4}
                />

                <div className="grid gap-5 md:grid-cols-2">
                  <InputField
                    label="Location"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Mumbai, India"
                  />

                  <InputField
                    label="Employment Type"
                    name="employment_type"
                    value={form.employment_type}
                    onChange={handleChange}
                    placeholder="e.g. Full-time"
                  />

                  <InputField
                    label="Industry"
                    name="industry"
                    value={form.industry}
                    onChange={handleChange}
                    placeholder="e.g. Information Technology"
                  />

                  <InputField
                    label="Salary Range"
                    name="salary_range"
                    value={form.salary_range}
                    onChange={handleChange}
                    placeholder="e.g. ₹4-6 LPA"
                  />
                </div>

                {error && (
                  <div className="flex gap-3 rounded-lg border border-red-900 bg-red-950/30 p-4 text-sm text-red-300">
                    <AlertTriangle
                      size={18}
                      className="mt-0.5 shrink-0"
                    />

                    <p>{error}</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <Loader2
                          size={18}
                          className="animate-spin"
                        />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Brain size={18} />
                        Analyze Job
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="rounded-lg border border-slate-700 px-6 py-3 font-semibold text-slate-300 hover:bg-slate-800"
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Result */}
          <div className="lg:col-span-2">
            <ResultCard result={result} />
          </div>
        </div>
      </main>
    </div>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}
        {required && (
          <span className="ml-1 text-blue-500">*</span>
        )}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-600 outline-none focus:border-blue-500"
      />
    </div>
  );
}

function TextAreaField({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  rows = 4,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}
        {required && (
          <span className="ml-1 text-blue-500">*</span>
        )}
      </label>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="w-full resize-y rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-600 outline-none focus:border-blue-500"
      />
    </div>
  );
}

function ResultCard({ result }) {
  if (!result) {
    return (
      <div className="sticky top-24 rounded-2xl border border-slate-800 bg-slate-900 p-8">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800">
            <Brain size={30} className="text-slate-500" />
          </div>

          <h2 className="mt-5 text-xl font-semibold">
            Analysis Result
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            Submit a job posting to see the AI assessment and
            Explainable AI factors.
          </p>
        </div>
      </div>
    );
  }

  const isFake = result.prediction === 1;
  const score = Number(result.decision_score);

  const confidenceIndicator = Math.min(
    Math.abs(score) * 20,
    100
  );

  return (
    <div className="sticky top-24 space-y-5">
      {/* Main result */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          AI assessment
        </p>

        <div
          className={`mt-5 rounded-2xl border p-6 ${
            isFake
              ? "border-red-900 bg-red-950/30"
              : "border-emerald-900 bg-emerald-950/30"
          }`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-xl ${
                isFake
                  ? "bg-red-900/50"
                  : "bg-emerald-900/50"
              }`}
            >
              {isFake ? (
                <AlertTriangle
                  size={28}
                  className="text-red-400"
                />
              ) : (
                <CheckCircle2
                  size={28}
                  className="text-emerald-400"
                />
              )}
            </div>

            <div>
              <p
                className={`text-2xl font-bold ${
                  isFake
                    ? "text-red-400"
                    : "text-emerald-400"
                }`}
              >
                {result.label}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Based on the trained SVM model
              </p>
            </div>
          </div>
        </div>

        {/* Decision score */}
        <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Decision score
              </p>

              <p className="mt-1 text-2xl font-bold">
                {score.toFixed(4)}
              </p>
            </div>

            <div
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                score >= 0
                  ? "bg-red-950 text-red-300"
                  : "bg-emerald-950 text-emerald-300"
              }`}
            >
              {score >= 0 ? "Risk signal" : "Lower risk signal"}
            </div>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className={`h-full rounded-full ${
                score >= 0
                  ? "bg-red-500"
                  : "bg-emerald-500"
              }`}
              style={{
                width: `${Math.max(
                  confidenceIndicator,
                  5
                )}%`,
              }}
            />
          </div>

          <p className="mt-3 text-xs leading-5 text-slate-500">
            The decision score indicates which side of the SVM
            decision boundary the posting falls on. It is not a
            probability.
          </p>
        </div>
      </div>

      {/* SHAP */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10">
            <Brain size={20} className="text-blue-500" />
          </div>

          <div>
            <h2 className="font-semibold">
              Explainable AI
            </h2>

            <p className="text-xs text-slate-500">
              SHAP feature contributions
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {result.explanation?.map((item, index) => {
            const impact = Math.abs(Number(item.impact));

            return (
              <div
                key={`${item.feature}-${index}`}
                className="rounded-xl border border-slate-800 bg-slate-950 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="break-words text-sm font-medium text-slate-200">
                      {item.feature}
                    </p>

                    <p className="mt-1 text-xs text-slate-600">
                      Feature #{index + 1}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold ${
                      item.direction ===
                      "Potentially Fake"
                        ? "bg-red-950 text-red-300"
                        : "bg-emerald-950 text-emerald-300"
                    }`}
                  >
                    {item.direction}
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-3">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className={`h-full rounded-full ${
                        item.direction ===
                        "Potentially Fake"
                          ? "bg-red-500"
                          : "bg-emerald-500"
                      }`}
                      style={{
                        width: `${Math.min(
                          impact * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>

                  <span className="font-mono text-xs text-slate-500">
                    {Number(item.impact).toFixed(4)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 rounded-lg border border-slate-800 bg-slate-950 p-4">
          <p className="text-xs leading-5 text-slate-500">
            SHAP values indicate the contribution of individual
            features to the model output. They should be
            interpreted as model explanations rather than proof
            that a posting is fraudulent.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AnalyzeJob;