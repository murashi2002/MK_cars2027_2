import { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './components/Login';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import ReportList from './components/ReportList';
import Logout from './components/Logout';

function App() {
    const [session, setSession] = useState({ authenticated: false });
    const [employees, setEmployees] = useState([]);
    const [report, setReport] = useState([]);
    const [posts, setPosts] = useState([]);

    const loadSession = async () => {
        try {
            const response = await axios.get('http://localhost:3002/api/session', { withCredentials: true });
            setSession(response.data);
        } catch (err) {
            setSession({ authenticated: false });
        }
    };

    const loadEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:3002/api/employees', { withCredentials: true });
            setEmployees(response.data || []);
        } catch (err) {
            setEmployees([]);
        }
    };

    const loadReport = async () => {
        try {
            const response = await axios.get('http://localhost:3002/api/reports/employees-by-department', { withCredentials: true });
            setReport(response.data || []);
        } catch (err) {
            setReport([]);
        }
    };

    const loadPosts = async () => {
        try {
            const response = await axios.get('http://localhost:3002/api/posts', { withCredentials: true });
            setPosts(response.data || []);
        } catch (err) {
            setPosts([]);
        }
    };

    useEffect(() => {
        loadSession();
    }, []);

    useEffect(() => {
        if (session.authenticated) {
            loadEmployees();
            loadReport();
            loadPosts();
        }
    }, [session.authenticated]);

    const handleCreate = async (employee) => {
        try {
            await axios.post('http://localhost:3002/api/employees', employee, { withCredentials: true });
            await loadEmployees();
            await loadReport();
        } catch (err) {
            console.error('Failed to create employee:', err);
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3002/api/logout', {}, { withCredentials: true });
            setSession({ authenticated: false });
            setEmployees([]);
            setReport([]);
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 px-4 py-6">
            <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
                <header className="mb-8 flex flex-col gap-3 rounded-3xl border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold text-brand">MK Cars Employee Manager</h1>
                        <p className="mt-2 text-slate-600">Session-based login, Tailwind UI, and reports by department.</p>
                    </div>
                    {session.authenticated && <Logout onLogout={handleLogout} userName={session.user?.name} />}
                </header>

                {!session.authenticated ? (
                    <Login onLoggedIn={loadSession} />
                ) : (
                    <main className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
                        <section className="space-y-6">
                            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                                <h2 className="mb-4 text-xl font-semibold text-brand">Add New Employee</h2>
                                <EmployeeForm onCreate={handleCreate} posts={posts} />
                            </div>
                            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                                <h2 className="mb-4 text-xl font-semibold text-brand">Employee List</h2>
                                <EmployeeList employees={employees} />
                            </div>
                        </section>

                        <section className="space-y-6">
                            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                                <h2 className="mb-4 text-xl font-semibold text-brand">Report: Employees by Department</h2>
                                <ReportList report={report} />
                            </div>
                        </section>
                    </main>
                )}
            </div>
        </div>
    );
}

export default App;
