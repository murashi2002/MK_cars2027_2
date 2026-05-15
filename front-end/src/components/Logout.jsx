export default function Logout({ onLogout, userName }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:w-max">
      <div>
        <p className="text-sm text-slate-500">Signed in as</p>
        <p className="text-base font-semibold text-brand">{userName || 'User'}</p>
      </div>
      <button
        onClick={onLogout}
        className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
      >
        Logout
      </button>
    </div>
  );
}
