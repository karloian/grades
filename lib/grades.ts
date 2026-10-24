import fs from "node:fs";
import path from "node:path";
import Papa from "papaparse";

export type GradeRecord = {
  studentId: string;
  studentName: string;
  schoolYear: string;
  subject: string;
  grade: string;
  status: string;
  remarks: string;
};

const normalize = (s: string) => s.trim().toLowerCase();

function loadAll(): GradeRecord[] {
  const file = path.join(process.cwd(), "data", "grades.csv");
  const text = fs.readFileSync(file, "utf8");
  const { data } = Papa.parse<Record<string, string>>(text, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.replace(/^\uFEFF/, "").trim(),
  });
  const v = (x: string | undefined) => (x ?? "").trim();
  return data.map((r) => ({
    studentId: v(r.StudentID),
    studentName: v(r.StudentName),
    schoolYear: v(r.SchoolYear),
    subject: v(r.Subject),
    grade: v(r.Grade),
    status: v(r.Status),
    remarks: v(r.Remarks),
  }));
}

// Server-side only: the full list is never sent to the browser.
// A student can have several rows (one per subject).
export function findStudentRecords(id: string): GradeRecord[] {
  const key = normalize(id);
  if (!key) return [];
  return loadAll().filter((r) => normalize(r.studentId) === key);
}
