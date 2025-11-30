import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AttendanceHistory from './pages/AttendanceHistory';
import TeamAttendance from './pages/TeamAttendance';
import Reports from './pages/Reports';
import EmployeeDashboard from './pages/EmployeeDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';

import { useEffect } from 'react';
import useAuthStore from './store/useAuthStore';

function App() {
    const { checkAuth } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route element={<Layout />}>
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute allowedRoles={['employee']}>
                                <EmployeeDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/history"
                        element={
                            <ProtectedRoute allowedRoles={['employee']}>
                                <AttendanceHistory />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute allowedRoles={['employee']}>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/manager-dashboard"
                        element={
                            <ProtectedRoute allowedRoles={['manager']}>
                                <ManagerDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/all-attendance"
                        element={
                            <ProtectedRoute allowedRoles={['manager']}>
                                <TeamAttendance />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/reports"
                        element={
                            <ProtectedRoute allowedRoles={['manager']}>
                                <Reports />
                            </ProtectedRoute>
                        }
                    />
                </Route>

                <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
