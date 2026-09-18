import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  History as HistoryIcon,
  Search,
  ArrowLeft,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import api from "../services/api";

function History() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchHistory = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/history");
      setRecords(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Your session has expired. Please login again.");
      } else {
        setError(
          err.response?.data?.detail ||
            "Unable to load prediction history."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
              <HistoryIcon size={24} />
            </div>

            <h1 className="text-4xl font-bold">
              Prediction History
            </h1>

            <p className="mt-2 text-slate-400">
              View your previous job posting analysis results.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={fetchHistory}
              className="flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold hover:bg-slate-800"
            >
              <RefreshCw size={16} />
              Refresh
            </button>

            <Link
              to="/analyze"
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-700"
            >
              <Search size={16} />
              Analyze Job
            </Link>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-900 bg-red-950/30 p-4 text-red-300">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex min-h-64 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900">
            <div className="text-center">
              <Loader2
                size={32}
                className="mx-auto animate-spin text-blue-500"
              />

              <p className="mt-3 text-slate-400">
                Loading prediction history...
              </p>
            </div>
          </div>
        ) : records.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-12 text-center">
            <HistoryIcon
              size={45}
              className="mx-auto text-slate-600"
            />

            <h2 className="mt-5 text-xl font-semibold">
              No predictions yet
            </h2>

            <p className="mt-2 text-slate-400">
              Your analyzed job postings will appear here.
            </p>

            <Link
              to="/analyze"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-700"
            >
              Analyze Your First Job
              <Search size={18} />
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left">
                <thead className="border-b border-slate-800 bg-slate-950">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Job
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Result
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Location
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Industry
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Decision Score
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Date
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-800">
                  {records.map((record) => {
                    const isFake = record.prediction === 1;

                    return (
                      <tr
                        key={record.id}
                        className="transition hover:bg-slate-800/40"
                      >
                        <td className="px-6 py-5">
                          <p className="font-semibold text-white">
                            {record.title}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {record.employment_type || "Not specified"}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
                              isFake
                                ? "bg-red-950 text-red-300"
                                : "bg-emerald-950 text-emerald-300"
                            }`}
                          >
                            {isFake ? (
                              <AlertTriangle size={14} />
                            ) : (
                              <CheckCircle2 size={14} />
                            )}

                            {record.label}
                          </span>
                        </td>

                        <td className="px-6 py-5 text-sm text-slate-400">
                          {record.location || "Not specified"}
                        </td>

                        <td className="px-6 py-5 text-sm text-slate-400">
                          {record.industry || "Not specified"}
                        </td>

                        <td className="px-6 py-5 font-mono text-sm text-slate-300">
                          {record.decision_score !== null
                            ? Number(record.decision_score).toFixed(4)
                            : "—"}
                        </td>

                        <td className="px-6 py-5 text-sm text-slate-500">
                          {record.created_at
                            ? new Date(
                                record.created_at
                              ).toLocaleString()
                            : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}

export default History;