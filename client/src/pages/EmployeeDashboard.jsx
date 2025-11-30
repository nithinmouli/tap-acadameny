import { useEffect } from 'react';
import useAttendanceStore from '../store/useAttendanceStore';
import useAuthStore from '../store/useAuthStore';
import { Clock, Calendar, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';

const EmployeeDashboard = () => {
    const { user } = useAuthStore();
    const {
        todayStatus,
        stats,
        checkIn,
        checkOut,
        getTodayStatus,
        getEmployeeStats,
        isLoading
    } = useAttendanceStore();

    useEffect(() => {
        getTodayStatus();
        getEmployeeStats();
    }, [getTodayStatus, getEmployeeStats]);

    const handleCheckIn = async () => {
        try {
            await checkIn();
            getEmployeeStats(); // Refresh stats
        } catch (error) {
            console.error(error);
        }
    };

    const handleCheckOut = async () => {
        try {
            await checkOut();
            getEmployeeStats(); // Refresh stats
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-text-main">Welcome back, {user?.name}</h1>
                <p className="text-text-muted mt-1">Here's your attendance overview for today.</p>
            </div>

            {/* Today's Status Card */}
            <div className="bg-surface p-8 rounded-2xl shadow-lg border border-secondary/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 opacity-50"></div>

                <div className="flex justify-between items-center mb-8 relative z-10">
                    <div>
                        <h2 className="text-xl font-bold text-text-main">Today's Status</h2>
                        <p className="text-text-muted">{format(new Date(), 'dd MMM yyyy')}</p>
                    </div>
                    <div className={`px-4 py-2 rounded-full font-semibold text-sm ${todayStatus ? 'bg-white text-black border border-secondary' : 'bg-secondary/10 text-text-muted'}`}>
                        {todayStatus ? (todayStatus.checkOutTime ? 'Completed' : 'Active') : 'Not Started'}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
                    <div className="flex items-center space-x-6 mb-6 md:mb-0">
                        <div className={`p-5 rounded-2xl shadow-sm ${todayStatus ? 'bg-white text-black border border-secondary' : 'bg-secondary/10 text-text-muted'}`}>
                            <Clock className="w-10 h-10" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-text-muted uppercase tracking-wide">Current Status</p>
                            <p className="text-3xl font-bold text-text-main mt-1">
                                {todayStatus ? (todayStatus.checkOutTime ? 'Checked Out' : 'Checked In') : 'Not Checked In'}
                            </p>
                        </div>
                    </div>

                    <div className="flex space-x-4">
                        {!todayStatus && (
                            <button
                                onClick={handleCheckIn}
                                disabled={isLoading}
                                className="bg-primary text-black px-8 py-3 rounded-xl font-semibold hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all disabled:opacity-50 transform hover:-translate-y-0.5"
                            >
                                Check In Now
                            </button>
                        )}
                        {todayStatus && !todayStatus.checkOutTime && (
                            <button
                                onClick={handleCheckOut}
                                disabled={isLoading}
                                className="bg-red-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-600 hover:shadow-lg hover:shadow-red-200 transition-all disabled:opacity-50 transform hover:-translate-y-0.5"
                            >
                                Check Out Now
                            </button>
                        )}
                    </div>
                </div>

                {todayStatus && (
                    <div className="mt-8 grid grid-cols-2 gap-6 border-t border-secondary/20 pt-6 relative z-10">
                        <div className="bg-background p-4 rounded-xl">
                            <p className="text-xs font-semibold text-text-muted uppercase">Check In Time</p>
                            <p className="text-lg font-bold text-text-main mt-1">{format(new Date(todayStatus.checkInTime), 'hh:mm a')}</p>
                        </div>
                        {todayStatus.checkOutTime && (
                            <div className="bg-background p-4 rounded-xl">
                                <p className="text-xs font-semibold text-text-muted uppercase">Check Out Time</p>
                                <p className="text-lg font-bold text-text-main mt-1">{format(new Date(todayStatus.checkOutTime), 'hh:mm a')}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Stats Grid */}
            <h3 className="text-xl font-bold text-text-main pt-4">Monthly Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-surface p-6 rounded-2xl shadow-sm border border-secondary/20 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-secondary/20 rounded-xl text-text-main">
                            <CheckCircle className="w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold text-text-main">{stats?.present || 0}</span>
                    </div>
                    <h3 className="text-text-muted font-medium">Present Days</h3>
                </div>

                <div className="bg-surface p-6 rounded-2xl shadow-sm border border-secondary/20 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-secondary/20 rounded-xl text-text-main">
                            <XCircle className="w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold text-text-main">{stats?.absent || 0}</span>
                    </div>
                    <h3 className="text-text-muted font-medium">Absent Days</h3>
                </div>

                <div className="bg-surface p-6 rounded-2xl shadow-sm border border-secondary/20 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-secondary/20 rounded-xl text-text-main">
                            <AlertCircle className="w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold text-text-main">{stats?.late || 0}</span>
                    </div>
                    <h3 className="text-text-muted font-medium">Late Days</h3>
                </div>

                <div className="bg-surface p-6 rounded-2xl shadow-sm border border-secondary/20 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-secondary/20 rounded-xl text-text-main">
                            <Clock className="w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold text-text-main">{stats?.totalHours || 0}</span>
                    </div>
                    <h3 className="text-text-muted font-medium">Total Hours</h3>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
