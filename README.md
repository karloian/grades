# Grade Viewer

Students enter their Student ID and see their own tentative grades. No database.

## CSV format (`data/grades.csv`)
`StudentID,StudentName,SchoolYear,Subject,Grade,Status,Remarks`

- One row per student per subject. A student with several subjects gets several cards.
- If a field contains a comma, wrap it in double quotes.

## Update grades
1. Replace `data/grades.csv`.
2. `git add . && git commit -m "update grades" && git push`
3. Vercel redeploys automatically.

## Customize
- Registrar link: `lib/config.ts`
- Texts / notice: `app/page.tsx`, `app/GradeForm.tsx`

## Run locally
```
npm install
npm run dev
```
