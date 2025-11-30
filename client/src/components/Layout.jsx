import { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import {
    LayoutDashboard,
    Calendar,
    Users,
    FileText,
    LogOut,
    UserCircle,
    Menu,
    X
} from 'lucide-react';
import clsx from 'clsx';

const Layout = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = user?.role === 'manager' ? [
        { label: 'Dashboard', path: '/manager-dashboard', icon: LayoutDashboard },
        { label: 'All Attendance', path: '/all-attendance', icon: Users },
        { label: 'Reports', path: '/reports', icon: FileText },
    ] : [
        { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { label: 'My History', path: '/history', icon: Calendar },
        { label: 'Profile', path: '/profile', icon: UserCircle },
    ];

    return (
        <div className="flex h-screen bg-background font-sans text-text-main">
            {/* Mobile Menu Button */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 bg-surface rounded-lg shadow-md text-text-muted hover:text-primary"
                >
                    {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/20 z-30 backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={clsx(
                "fixed lg:static inset-y-0 left-0 z-40 w-72 bg-surface shadow-xl flex flex-col transition-transform duration-300 ease-in-out transform border-r border-secondary/20",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            )}>
                <div className="p-8 border-b border-secondary/20">
                    <div className="flex items-center space-x-3">
                        <div className="bg-primary p-2 rounded-lg">
                            <LayoutDashboard className="w-6 h-6 text-black" />
                        </div>
                        <h1 className="text-2xl font-bold text-text-main tracking-tight">AttendEase</h1>
                    </div>
                    <div className="mt-6 p-4 bg-background rounded-xl border border-secondary/20">
                        <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Logged in as</p>
                        <p className="text-sm font-bold text-text-main truncate">{user?.name}</p>
                        <p className="text-xs text-text-muted capitalize">{user?.role}</p>
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsSidebarOpen(false)}
                            className={clsx(
                                "flex items-center px-4 py-3.5 rounded-xl transition-all duration-200 group",
                                location.pathname === item.path
                                    ? "bg-primary text-black shadow-lg shadow-primary/30"
                                    : "text-text-muted hover:bg-surface hover:text-primary"
                            )}
                        >
                            <item.icon className={clsx(
                                "w-5 h-5 mr-3 transition-colors",
                                location.pathname === item.path ? "text-black" : "text-text-muted/70 group-hover:text-primary"
                            )} />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-secondary/20">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-3.5 text-text-muted hover:bg-secondary/20 rounded-xl transition-colors group"
                    >
                        <LogOut className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto bg-background w-full">
                <div className="max-w-7xl mx-auto p-4 lg:p-8 pt-16 lg:pt-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
