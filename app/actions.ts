"use server";

import { findStudentRecords, type GradeRecord } from "@/lib/grades";

export type LookupState = {
  records: GradeRecord[];
  error: string | null;
};

export async function lookupGrade(
  _prev: LookupState,
  formData: FormData
): Promise<LookupState> {
  const id = String(formData.get("studentId") ?? "");
  if (!id.trim()) return { records: [], error: "Please enter your Student ID." };

  const records = findStudentRecords(id);
  if (records.length === 0) {
    return { records: [], error: "Student ID not found. Please check and try again." };
  }
  return { records, error: null };
}
