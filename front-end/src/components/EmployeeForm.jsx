import { useState } from 'react';

export default function EmployeeForm({ onCreate, posts }) {
  const [form, setForm] = useState({
    PostID: '',
    FirstName: '',
    LastName: '',
    Gender: '',
    DateOfBirth: '',
    Email: '',
    PhoneNumber: '',
    Position: '',
    HiredDate: '',
    Salary: '',
    Status: '',
    Department: '',
    Address: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onCreate({
      ...form,
      PostID: Number(form.PostID),
      Salary: Number(form.Salary)
    });
    setForm({
      PostID: '',
      FirstName: '',
      LastName: '',
      Gender: '',
      DateOfBirth: '',
      Email: '',
      PhoneNumber: '',
      Position: '',
      HiredDate: '',
      Salary: '',
      Status: '',
      Department: '',
      Address: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <input
          name="FirstName"
          value={form.FirstName}
          onChange={handleChange}
          placeholder="First name"
          className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-2 focus:ring-accent/20"
          required
        />
        <input
          name="LastName"
          value={form.LastName}
          onChange={handleChange}
          placeholder="Last name"
          className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-2 focus:ring-accent/20"
          required
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <input
          name="Gender"
          value={form.Gender}
          onChange={handleChange}
          placeholder="Gender"
          className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
        <input
          type="date"
          name="DateOfBirth"
          value={form.DateOfBirth}
          onChange={handleChange}
          className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <input
          type="email"
          name="Email"
          value={form.Email}
          onChange={handleChange}
          placeholder="Email"
          className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
        <input
          name="PhoneNumber"
          value={form.PhoneNumber}
          onChange={handleChange}
          placeholder="Phone number"
          className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <input
          name="Position"
          value={form.Position}
          onChange={handleChange}
          placeholder="Position"
          className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
        <input
          type="date"
          name="HiredDate"
          value={form.HiredDate}
          onChange={handleChange}
          className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <input
          type="number"
          name="Salary"
          value={form.Salary}
          onChange={handleChange}
          placeholder="Salary"
          className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
        <input
          name="Department"
          value={form.Department}
          onChange={handleChange}
          placeholder="Department"
          className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <select
          name="PostID"
          value={form.PostID}
          onChange={handleChange}
          className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-2 focus:ring-accent/20"
          required
        >
          <option value="" disabled>Select Post</option>
          {posts && posts.map((post) => (
            <option key={post.PostID} value={post.PostID}>
              {post.PostName}
            </option>
          ))}
        </select>
        <input
          name="Status"
          value={form.Status}
          onChange={handleChange}
          placeholder="Status"
          className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>
      <textarea
        name="Address"
        value={form.Address}
        onChange={handleChange}
        placeholder="Address"
        rows="3"
        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
      <button className="w-full rounded-2xl bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-600">
        Add Employee
      </button>
    </form>
  );
}
