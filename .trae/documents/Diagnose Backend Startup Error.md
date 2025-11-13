## Objectives

* Reproduce the backend startup error in the terminal

* Capture the exact stack trace and failing module

* Apply the minimal fix and verify successful startup

## Run & Observe

1. Install dependencies

   * Command: `cd Backend && npm install`
2. Start the backend

   * Command: `npm start` (runs `nodemon server.js`)
3. Capture error output

   * Record the full stack trace and error code (e.g., `EADDRINUSE`, Sequelize connection errors, env issues)

## Environment & Config Checks

* Verify `.env` exists and values are loaded by `dotenv/config`

  * Keys: `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`, `JWT_S`, `STRIPE_KEY`, optional `PORT`

* Confirm MySQL server is running and accepting connections with the configured credentials

* Confirm `Backend/config/db.js` can `authenticate()` and `sync({ alter: true })`

## Likely Fix Paths

* Port conflict (`EADDRINUSE`)

  * If another process uses `3000`, set `PORT=5000` in `.env` or stop the conflicting process

* Database connection errors (access denied/unknown database)

  * Correct credentials; if `Unknown database`, allow auto-create via `mysql2` helper in `db.js`

* Missing/invalid `JWT_S`

  * Provide a secure value in `.env`

## Verification

* Health endpoint: open `http://localhost:<PORT>/` and expect `"Api is working"`

* Confirm DB logs show `Database connected ✅`

* Confirm no crash logs in terminal after changes

## Deliverables

* Root-cause summary with exact error

* Applied fix with the specific change (file and line reference)

* Final run confirmation and health check output

