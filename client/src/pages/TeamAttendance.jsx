import { useEffect, useState } from 'react';
import useAttendanceStore from '../store/useAttendanceStore';
import { format } from 'date-fns';
import { Search, Filter, User, Calendar as CalendarIcon, Clock, ChevronDown } from 'lucide-react';

const TeamAttendance = () => {
    const { attendance, getAllAttendance, isLoading } = useAttendanceStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        getAllAttendance();
    }, [getAllAttendance]);

    const filteredAttendance = attendance.filter(record => {
        const matchesSearch = record.userId?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.userId?.employeeId.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || record.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const statusOptions = [
        { value: 'all', label: 'All Status' },
        { value: 'present', label: 'Present' },
        { value: 'absent', label: 'Absent' },
        { value: 'late', label: 'Late' },
        { value: 'half-day', label: 'Half Day' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-text-main">All Employees Attendance</h1>
                <p className="text-text-muted mt-1">Monitor daily attendance records across the organization.</p>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface p-4 rounded-2xl shadow-sm border border-secondary/20">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-4 top-3.5 text-text-muted w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by name or ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-secondary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-background text-text-main placeholder-text-muted/50 focus:bg-surface"
                    />
                </div>

                <div className="relative">
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="flex items-center px-6 py-3 border border-secondary/20 rounded-xl hover:bg-secondary/10 font-medium text-text-main transition-colors bg-surface"
                    >
                        <Filter className="w-5 h-5 mr-2 text-text-muted" />
                        {statusOptions.find(opt => opt.value === statusFilter)?.label}
                        <ChevronDown className="w-4 h-4 ml-2 text-text-muted" />
                    </button>

                    {isFilterOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-surface rounded-xl shadow-lg border border-secondary/20 py-1 z-10">
                            {statusOptions.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => {
                                        setStatusFilter(option.value);
                                        setIsFilterOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-secondary/10 transition-colors ${statusFilter === option.value ? 'text-black font-medium bg-primary' : 'text-text-main'
                                        }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-surface rounded-2xl shadow-sm border border-secondary/20 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-secondary/20">
                        <thead className="bg-secondary/10">
                            <tr>
                                <th className="px-8 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Employee</th>
                                <th className="px-8 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Date</th>
                                <th className="px-8 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Check In</th>
                                <th className="px-8 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Check Out</th>
                                <th className="px-8 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                                <th className="px-8 py-4 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">Hours</th>
                            </tr>
                        </thead>
                        <tbody className="bg-surface divide-y divide-secondary/20">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="6" className="px-8 py-12 text-center text-text-muted">
                                        <div className="flex justify-center items-center space-x-2">
                                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-75"></div>
                                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-150"></div>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredAttendance.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-8 py-12 text-center text-text-muted">
                                        No records found matching your search.
                                    </td>
                                </tr>
                            ) : (
                                filteredAttendance.map((record) => (
                                    <tr key={record._id} className="group hover:bg-secondary/40 transition-colors">
                                        <td className="px-8 py-5 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center text-text-main font-bold text-sm ring-2 ring-secondary group-hover:ring-white/50 shadow-sm transition-all">
                                                    {record.userId?.name.charAt(0)}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-bold text-text-main">{record.userId?.name}</div>
                                                    <div className="text-xs text-text-muted font-medium">{record.userId?.employeeId}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 whitespace-nowrap">
                                            <div className="flex items-center text-sm text-text-muted">
                                                <CalendarIcon className="w-4 h-4 mr-2 text-text-muted/70" />
                                                {format(new Date(record.date), 'dd MMM yyyy')}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 whitespace-nowrap text-sm text-text-main font-medium">
                                            {record.checkInTime ? format(new Date(record.checkInTime), 'hh:mm a') : '-'}
                                        </td>
                                        <td className="px-8 py-5 whitespace-nowrap text-sm text-text-main font-medium">
                                            {record.checkOutTime ? format(new Date(record.checkOutTime), 'hh:mm a') : '-'}
                                        </td>
                                        <td className="px-8 py-5 whitespace-nowrap">
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full uppercase tracking-wide
                        ${record.status === 'present' ? 'bg-white text-black border border-secondary' :
                                                    record.status === 'absent' ? 'bg-secondary text-white border border-secondary' :
                                                        record.status === 'late' ? 'bg-accent text-white border border-secondary' :
                                                            'bg-secondary/50 text-white border border-secondary'}`}>
                                                {record.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 whitespace-nowrap text-sm text-text-muted">
                                            <div className="flex items-center">
                                                <Clock className="w-4 h-4 mr-2 text-text-muted/70" />
                                                {record.totalHours || 0} hrs
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TeamAttendance;
