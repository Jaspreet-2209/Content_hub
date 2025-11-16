# Knowledge Discovery & Internal Search — Starter Project

- Indexing of uploaded marketing documents
- Fast text search via elasticlunr
- Naive automatic categorization
- Preview/download endpoints
- Responsive React UI with upload, search, filters and preview.

## How to run (locally)

Prerequisites: Node 18+, npm.

1. Backend
```bash
cd backend
npm install
npm start
```
Backend will run on port 5000 by default.

2. Frontend (in a separate terminal)
```bash
cd frontend
npm install
npm start
```
Frontend dev server will proxy `/api` to backend if configured; for this simple demo, run frontend and backend and use `package.json` scripts, or serve frontend build with backend by copying `build` into `backend/public`.
