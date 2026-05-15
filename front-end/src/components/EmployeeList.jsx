export default function EmployeeList({ employees }) {
  if (!employees || employees.length === 0) {
    return <p className="text-sm text-slate-600">No employees found yet.</p>;
  }

  return (
    <div className="space-y-4">
      {employees.map((employee) => (
        <div key={employee.EmployeeID} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:items-center">
            <div>
              <p className="text-base font-semibold text-brand">{employee.FirstName} {employee.LastName}</p>
              <p className="text-sm text-slate-500">{employee.Position} &middot; {employee.Department}</p>
            </div>
            <p className="text-sm text-slate-500">Status: {employee.Status || 'N/A'}</p>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <p className="text-sm text-slate-600">Email: {employee.Email}</p>
            <p className="text-sm text-slate-600">Phone: {employee.PhoneNumber}</p>
            <p className="text-sm text-slate-600">Hired: {employee.HiredDate}</p>
            <p className="text-sm text-slate-600">Salary: {employee.Salary}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
