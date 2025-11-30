import { useEffect, useState } from 'react';
import useAttendanceStore from '../store/useAttendanceStore';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import clsx from 'clsx';

const AttendanceHistory = () => {
    const { attendance, getMyHistory } = useAttendanceStore();
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        getMyHistory();
    }, [getMyHistory]);

    const daysInMonth = eachDayOfInterval({
        start: startOfMonth(currentDate),
        end: endOfMonth(currentDate),
    });

    const getStatusColor = (date) => {
        const record = attendance.find(a => isSameDay(new Date(a.date), date));
        if (!record) return 'bg-secondary/5 border-secondary/10 hover:bg-secondary/30';

        switch (record.status) {
            case 'present': return 'bg-white text-black border-secondary hover:bg-white/90';
            case 'absent': return 'bg-secondary text-white border-secondary hover:bg-secondary/90';
            case 'late': return 'bg-accent text-white border-secondary hover:bg-accent/90';
            case 'half-day': return 'bg-secondary/50 text-white border-secondary hover:bg-secondary/60';
            default: return 'bg-secondary/5 border-secondary/10';
        }
    };

    const getStatusText = (date) => {
        const record = attendance.find(a => isSameDay(new Date(a.date), date));
        return record ? record.status : '';
    };

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-text-main">My Attendance History</h1>
                    <p className="text-text-muted mt-1">View your attendance records by month.</p>
                </div>

                <div className="flex items-center space-x-4 bg-surface p-2 rounded-xl shadow-sm border border-secondary/20">
                    <button onClick={prevMonth} className="p-2 hover:bg-secondary/10 rounded-lg transition-colors text-text-muted">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="flex items-center space-x-2 px-4">
                        <CalendarIcon className="w-5 h-5 text-text-main" />
                        <span className="font-bold text-lg text-text-main w-32 text-center">
                            {format(currentDate, 'MMMM yyyy')}
                        </span>
                    </div>
                    <button onClick={nextMonth} className="p-2 hover:bg-secondary/10 rounded-lg transition-colors text-text-muted">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="bg-surface p-8 rounded-2xl shadow-sm border border-secondary/20">
                <div className="grid grid-cols-7 gap-4 mb-6">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-center font-bold text-text-muted text-sm uppercase tracking-wider">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-4">
                    {/* Add empty cells for days before start of month if needed - simplified here */}
                    {daysInMonth.map((date) => (
                        <div
                            key={date.toString()}
                            className={clsx(
                                "h-32 p-3 rounded-xl border-2 flex flex-col justify-between transition-all duration-200 cursor-pointer",
                                getStatusColor(date)
                            )}
                        >
                            <span className={clsx(
                                "font-bold text-lg",
                                getStatusText(date) ? "opacity-100" : "text-text-muted/50"
                            )}>{format(date, 'd')}</span>

                            {getStatusText(date) && (
                                <span className="text-xs font-bold uppercase tracking-wide px-2 py-1 rounded-md bg-white/50 backdrop-blur-sm self-start">
                                    {getStatusText(date)}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-6 text-sm bg-surface p-6 rounded-xl border border-secondary/20 shadow-sm">
                <div className="flex items-center"><div className="w-4 h-4 bg-white border-2 border-secondary rounded mr-3"></div> <span className="font-medium text-text-main">Present</span></div>
                <div className="flex items-center"><div className="w-4 h-4 bg-secondary border-2 border-secondary rounded mr-3"></div> <span className="font-medium text-text-main">Absent</span></div>
                <div className="flex items-center"><div className="w-4 h-4 bg-accent border-2 border-secondary rounded mr-3"></div> <span className="font-medium text-text-main">Late</span></div>
                <div className="flex items-center"><div className="w-4 h-4 bg-secondary/50 border-2 border-secondary rounded mr-3"></div> <span className="font-medium text-text-main">Half Day</span></div>
            </div>
        </div>
    );
};

export default AttendanceHistory;
