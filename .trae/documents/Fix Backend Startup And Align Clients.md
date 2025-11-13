## Diagnose Error
- Startup crash in backend shows `EADDRINUSE: address already in use :::3000` when running `npm start`.
- Error originates at `Backend/server.js:42` during `app.listen`.

## Backend Port Fix
- Confirm backend now uses environment-driven port: `Backend/server.js:15` sets `const port = process.env.PORT ? Number(process.env.PORT) : 5000`.
- Add `PORT=5000` to `Backend/.env` (optional; falls back to 5000 if unset).
- If you prefer port `3000`, set `PORT=3000` and stop the other process using 3000 before starting.

## Align Frontends To Backend URL
- Update hardcoded base URLs to `http://localhost:5000`:
  - `frontend/src/Context/StoreContext.jsx:10`
  - `Admin/src/pages/List.jsx:7`
  - `Admin/src/pages/Orders.jsx:8`
  - `Admin/src/pages/Reservations.jsx:6`
  - `Admin/src/assets/assets.js:17` (currently `http://localhost:4000`)
- Optionally centralize base URL in a single config per app to avoid future drift.

## Verify Database Connectivity
- Ensure local MySQL is running and credentials in `Backend/.env` are correct (`DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`).
- Sequelize auto-syncs tables with `{ alter: true }` in `Backend/config/db.js:26` after `sequelize.authenticate()`.
- Run table verification script to confirm all tables: `node scripts/verifyAllTables.js`.

## Start And Validate Backend
- Install dependencies: `npm install` in `Backend`.
- Start server: `npm start`.
- Health check: open `http://localhost:5000/` → should respond "Api is working".
- API check: `GET http://localhost:5000/api/food/list` returns food items.

## Test Auth And Cart
- Register/login from frontend; token stored in localStorage.
- Verify protected endpoints pass `token` header (`Backend/middlewares/auth.js:3–26`).
- Test cart endpoints: add/remove (`/api/cart/add`, `/api/cart/remove`) and get (`/api/cart/get`).

## Static Files And CORS
- Images served at `GET /images/:filename` from `uploads` (`Backend/server.js:35`).
- CORS allows `http://localhost:5173` and `5174` (Vite dev servers) configured at `Backend/server.js:19–22`. Add other origins if needed.

## Next Steps (upon approval)
- Update client URLs to `http://localhost:5000`.
- Add `PORT=5000` to `.env` (optional) and restart backend.
- Run verification scripts and smoke test primary endpoints.

Please confirm and I will apply these changes and run the backend to verify everything end-to-end.