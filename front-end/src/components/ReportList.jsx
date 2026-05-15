export default function ReportList({ report }) {
  if (!report || report.length === 0) {
    return <p className="text-sm text-slate-600">No report data available.</p>;
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm text-slate-700">
        <thead className="bg-slate-100 text-slate-600">
          <tr>
            <th className="px-4 py-3">Department</th>
            <th className="px-4 py-3">Employees</th>
          </tr>
        </thead>
        <tbody>
          {report.map((item) => (
            <tr key={item.Department} className="border-t border-slate-200 hover:bg-slate-50">
              <td className="px-4 py-3">{item.Department || 'Unknown'}</td>
              <td className="px-4 py-3 font-semibold">{item.EmployeeCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
