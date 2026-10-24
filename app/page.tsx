import GradeForm from "./GradeForm";
import { CapIcon, InfoIcon } from "./icons";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col items-center px-5 py-10">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 ring-1 ring-blue-100">
        <CapIcon className="h-6 w-6" />
      </div>

      <h1 className="mt-6 text-center text-5xl font-extrabold tracking-tight">Grade Viewer</h1>
      <p className="mt-3 text-center text-xl text-slate-500">
        Enter your Student ID to view your{" "}
        <strong className="font-semibold text-slate-800">tentative final grades</strong> for
        checking purposes only.
      </p>

      <section className="mt-8 flex w-full gap-3 rounded-2xl bg-slate-100/70 p-5 ring-1 ring-slate-200">
        <InfoIcon className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
        <div>
          <h2 className="font-semibold">Confidentiality Notice</h2>
          <p className="mt-1 text-slate-500">
            Your academic information is confidential and intended for personal use only. The
            displayed grades are tentative, subject to verification and possible changes, and not
            considered official until formally released by the university.
          </p>
        </div>
      </section>

      <div className="mt-6 w-full">
        <GradeForm />
      </div>
    </main>
  );
}
