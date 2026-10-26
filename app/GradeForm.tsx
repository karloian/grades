"use client";

import { useActionState, useState } from "react";
import { lookupGrade, type LookupState } from "./actions";
import { REGISTRAR_LINK } from "@/lib/config";
import { CheckCircleIcon, CheckCircleSolidIcon, LogoutIcon, SearchIcon } from "./icons";

const initial: LookupState = { records: [], error: null };
const ID_FORMAT = /^\d{4}-\d{4}$/;

function statusStyle(status: string) {
  const s = status.toLowerCase();
  if (s.includes("pass")) return { pill: "bg-green-50 text-green-700 ring-green-200", dot: "bg-green-500", icon: "text-green-600" };
  if (s.includes("fail")) return { pill: "bg-red-50 text-red-700 ring-red-200", dot: "bg-red-500", icon: "text-red-500" };
  return { pill: "bg-amber-50 text-amber-700 ring-amber-200", dot: "bg-amber-500", icon: "text-amber-500" };
}

function GradeFormInner({ onLogout }: { onLogout: () => void }) {
  const [state, action, pending] = useActionState(lookupGrade, initial);
  const loggedIn = state.records.length > 0;
  const [id, setId] = useState("");
  const validFormat = ID_FORMAT.test(id.trim());

  return (
    <div className="w-full">
      {loggedIn ? (
        <div className="flex items-center justify-between gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="min-w-0">
            <p className="text-sm text-slate-400">Signed in as</p>
            <p className="truncate text-lg font-semibold">{state.records[0].studentId}</p>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="flex shrink-0 items-center gap-2 rounded-2xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <LogoutIcon className="h-5 w-5" />
            Logout
          </button>
        </div>
      ) : (
      <form
        action={action}
        className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
      >
        <div className="mb-2 flex items-baseline justify-between">
          <label htmlFor="studentId" className="text-lg font-semibold">
            Student ID
          </label>
          <span className="text-sm text-slate-400">Format: YYYY-XXXX</span>
        </div>

        <div className="relative">
          <input
            id="studentId"
            name="studentId"
            value={id}
            onChange={(e) => setId(e.target.value)}
            autoComplete="off"
            inputMode="text"
            placeholder="2021-0001"
            className="w-full rounded-2xl border border-slate-300 px-4 py-4 pr-12 text-lg tracking-wide outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
          {validFormat && (
            <CheckCircleIcon className="absolute right-4 top-1/2 h-6 w-6 -translate-y-1/2 text-green-600" />
          )}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-4 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
        >
          <SearchIcon className="h-5 w-5" />
          {pending ? "Checking…" : "View my grade"}
        </button>

        {state.error && (
          <p role="alert" className="mt-4 text-center text-sm font-medium text-red-600">
            {state.error}
          </p>
        )}

    
      </form>
      )}

      {state.records.map((r, i) => {
        const st = statusStyle(r.status);
        return (
          <article
            key={`${r.subject}-${i}`}
            className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="rounded-lg bg-slate-100 px-3 py-1 font-mono text-base font-medium tracking-wide text-slate-600">
                  {r.studentId}
                </span>
                {r.schoolYear && <span className="text-sm text-slate-500">{r.schoolYear}</span>}
              </div>
              {r.status && (
                <span className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-1.5 text-base font-medium ring-1 ${st.pill}`}>
                  <span className={`h-2 w-2 rounded-full ${st.dot}`} />
                  {r.status}
                </span>
              )}
            </div>

            <h2 className="mt-4 text-3xl font-bold tracking-tight">{r.studentName}</h2>
            {r.subject && <p className="mt-1 text-lg text-slate-500">{r.subject}</p>}

            <hr className="my-5 border-slate-100" />

            <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Un-official grade for academic counseling use only
                <br />
                Final grade will be posted on SOS
              </p>
              <p className="mt-2 text-6xl font-extrabold tracking-tight">{r.grade}</p>
              <p className="mt-3 flex items-center gap-2 text-slate-500">
                <CheckCircleSolidIcon className={`h-5 w-5 shrink-0 ${st.icon}`} />
                <span>
                  Remarks{r.remarks && <>: <span className="font-medium text-slate-700">{r.remarks}</span></>}
                </span>
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default function GradeForm() {
  // Changing the key remounts the form, which clears the result and the typed ID.
  const [session, setSession] = useState(0);
  return <GradeFormInner key={session} onLogout={() => setSession((n) => n + 1)} />;
}
