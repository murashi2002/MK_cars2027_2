# MK Cars 2027

This workspace contains a full-stack application for managing employees and users with a MySQL database, Express backend, and React front-end.

## Structure
- `backend project/`: Node.js + Express backend with session-based login and RESTful APIs
- `front-end/`: React + Tailwind CSS frontend with Axios integration
- `docs/`: Requirements, data flow, and database design documentation

## Setup
1. Install Node.js if not installed.
2. In `backend project/` run:
   - `npm install`
   - copy `.env.template` to `.env` and update values
   - run MySQL script in `init_db.sql`
   - `npm start`
3. In `front-end/` run:
   - `npm install`
   - `npm run dev`

## Notes
- The backend uses a session-based login with `express-session`.
- The frontend uses Tailwind utility classes for responsive UI.
- Replace the placeholder author name with your real name in project documentation if required.
