import { useState, useEffect } from 'react';
import useAttendanceStore from '../store/useAttendanceStore';
import { Download, Calendar } from 'lucide-react';
import { format } from 'date-fns';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Reports = () => {
    const { attendance, getAllAttendance, isLoading } = useAttendanceStore();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        getAllAttendance();
    }, [getAllAttendance]);

    const handleFilter = () => {
        if (startDate && endDate) {
            getAllAttendance({
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString()
            });
        } else {
            getAllAttendance();
        }
    };

    const handleExport = () => {
        // Simple CSV export logic
        const headers = ['Employee Name', 'Employee ID', 'Date', 'Status', 'Check In', 'Check Out', 'Total Hours'];
        const csvContent = [
            headers.join(','),
            ...attendance.map(row => [
                row.userId?.name,
                row.userId?.employeeId,
                format(new Date(row.date), 'dd MMM yyyy'),
                row.status,
                row.checkInTime ? new Date(row.checkInTime).toLocaleTimeString() : '-',
                row.checkOutTime ? new Date(row.checkOutTime).toLocaleTimeString() : '-',
                row.totalHours || 0
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'attendance_report.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-text-main">Attendance Reports</h1>

            <div className="bg-surface p-6 rounded-xl shadow-sm border border-secondary/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-2">Start Date</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-3 text-text-muted/50 w-5 h-5 z-10" />
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                                className="w-full pl-10 pr-4 py-2 border border-secondary/20 rounded-lg focus:outline-none focus:border-primary bg-background text-text-main"
                                placeholderText="Select start date"
                                dateFormat="dd MMM yyyy"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-2">End Date</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-3 text-text-muted/50 w-5 h-5 z-10" />
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                                className="w-full pl-10 pr-4 py-2 border border-secondary/20 rounded-lg focus:outline-none focus:border-primary bg-background text-text-main"
                                placeholderText="Select end date"
                                dateFormat="dd MMM yyyy"
                            />
                        </div>
                    </div>
                    <div className="flex items-end gap-4">
                        <button
                            onClick={handleFilter}
                            disabled={isLoading}
                            className="flex-1 bg-primary text-black px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center font-medium disabled:opacity-50"
                        >
                            {isLoading ? 'Loading...' : 'Filter'}
                        </button>
                        <button
                            onClick={handleExport}
                            disabled={attendance.length === 0}
                            className="flex-1 border border-primary text-primary px-6 py-2 rounded-lg hover:bg-primary/10 transition-colors flex items-center justify-center font-medium disabled:opacity-50"
                        >
                            <Download className="w-5 h-5 mr-2" />
                            Export
                        </button>
                    </div>
                </div>

                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4 text-text-muted">
                    <p>
                        {attendance.length > 0
                            ? `Showing ${attendance.length} records.`
                            : "No records found for the selected range."}
                    </p>
                </div>

                {attendance.length > 0 && (
                    <div className="mt-6 overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-text-muted border-b border-secondary/20">
                                    <th className="py-3 px-4">Employee</th>
                                    <th className="py-3 px-4">Date</th>
                                    <th className="py-3 px-4">Status</th>
                                    <th className="py-3 px-4">Check In</th>
                                    <th className="py-3 px-4">Check Out</th>
                                    <th className="py-3 px-4">Hours</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendance.map((record) => (
                                    <tr key={record._id} className="border-b border-secondary/10 hover:bg-secondary/5">
                                        <td className="py-3 px-4">
                                            <div>
                                                <p className="font-medium text-text-main">{record.userId?.name}</p>
                                                <p className="text-xs text-text-muted">{record.userId?.employeeId}</p>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-text-main">{format(new Date(record.date), 'dd MMM yyyy')}</td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize
                                                ${record.status === 'present' ? 'bg-green-100 text-green-700' :
                                                    record.status === 'late' ? 'bg-yellow-100 text-yellow-700' :
                                                        record.status === 'absent' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}
                                            >
                                                {record.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-text-main">{record.checkInTime ? new Date(record.checkInTime).toLocaleTimeString() : '-'}</td>
                                        <td className="py-3 px-4 text-text-main">{record.checkOutTime ? new Date(record.checkOutTime).toLocaleTimeString() : '-'}</td>
                                        <td className="py-3 px-4 text-text-main">{record.totalHours || '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reports;
