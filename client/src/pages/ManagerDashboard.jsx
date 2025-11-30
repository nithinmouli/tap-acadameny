import { useEffect } from 'react';
import useAttendanceStore from '../store/useAttendanceStore';
import { Users, UserCheck, UserX, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ManagerDashboard = () => {
    const { stats, getManagerStats } = useAttendanceStore();

    useEffect(() => {
        getManagerStats();
    }, [getManagerStats]);

    // Use real data from backend or fallback to empty array
    const data = stats?.weeklyStats || [];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-text-main">Manager Dashboard</h1>
                <p className="text-text-muted mt-1">Overview of your team's performance.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-surface p-6 rounded-2xl shadow-sm border border-secondary/20 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-secondary/20 rounded-xl text-text-main">
                            <Users className="w-6 h-6" />
                        </div>
                        <span className="text-3xl font-bold text-text-main">{stats?.totalEmployees || 0}</span>
                    </div>
                    <h3 className="text-text-muted font-medium">Total Employees</h3>
                </div>

                <div className="bg-surface p-6 rounded-2xl shadow-sm border border-secondary/20 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-secondary/20 rounded-xl text-text-main">
                            <UserCheck className="w-6 h-6" />
                        </div>
                        <span className="text-3xl font-bold text-text-main">{stats?.presentCount || 0}</span>
                    </div>
                    <h3 className="text-text-muted font-medium">Present Today</h3>
                </div>

                <div className="bg-surface p-6 rounded-2xl shadow-sm border border-secondary/20 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-secondary/20 rounded-xl text-text-main">
                            <UserX className="w-6 h-6" />
                        </div>
                        <span className="text-3xl font-bold text-text-main">{stats?.absentCount || 0}</span>
                    </div>
                    <h3 className="text-text-muted font-medium">Absent Today</h3>
                </div>

                <div className="bg-surface p-6 rounded-2xl shadow-sm border border-secondary/20 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-secondary/20 rounded-xl text-text-main">
                            <Clock className="w-6 h-6" />
                        </div>
                        <span className="text-3xl font-bold text-text-main">{stats?.lateCount || 0}</span>
                    </div>
                    <h3 className="text-text-muted font-medium">Late Today</h3>
                </div>
            </div>

            {/* Charts */}
            <div className="bg-surface p-8 rounded-2xl shadow-sm border border-secondary/20">
                <h2 className="text-xl font-bold text-text-main mb-6">Weekly Attendance Overview</h2>
                <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                            barSize={40}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333333" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#6B7280', fontSize: 12 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#6B7280', fontSize: 12 }}
                            />
                            <Tooltip
                                cursor={{ fill: '#262626' }}
                                contentStyle={{ backgroundColor: '#121212', borderRadius: '8px', border: '1px solid #333333', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)', color: '#ffffff' }}
                            />
                            <Legend wrapperStyle={{ paddingTop: '20px' }} />
                            <Bar dataKey="present" name="Present" fill="#ffffff" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="absent" name="Absent" fill="#525252" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="late" name="Late" fill="#a3a3a3" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default ManagerDashboard;
