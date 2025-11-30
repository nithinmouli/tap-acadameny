import useAuthStore from '../store/useAuthStore';
import { User, Mail, Briefcase, Hash, Shield } from 'lucide-react';

const Profile = () => {
    const { user } = useAuthStore();

    if (!user) {
        return <div className="text-center mt-10 text-text-muted">Loading profile...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-text-main">My Profile</h1>

            <div className="bg-surface rounded-xl shadow-sm border border-secondary/20 overflow-hidden">
                <div className="bg-primary h-32"></div>
                <div className="px-8 pb-8">
                    <div className="relative flex justify-between items-end -mt-12 mb-6">
                        <div className="bg-surface p-1 rounded-full">
                            <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center text-3xl font-bold text-white border-4 border-surface">
                                {user.name.charAt(0)}
                            </div>
                        </div>
                        <div className="mb-2">
                            <span className="bg-secondary text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                                {user.role}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-text-main">{user.name}</h2>
                            <p className="text-text-muted">{user.email}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-secondary/20 pt-6">
                            <div className="flex items-start space-x-3">
                                <Briefcase className="w-5 h-5 text-text-muted mt-0.5" />
                                <div>
                                    <p className="text-sm text-text-muted">Department</p>
                                    <p className="font-medium text-text-main">{user.department}</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <Hash className="w-5 h-5 text-text-muted mt-0.5" />
                                <div>
                                    <p className="text-sm text-text-muted">Employee ID</p>
                                    <p className="font-medium text-text-main">{user.employeeId}</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <Mail className="w-5 h-5 text-text-muted mt-0.5" />
                                <div>
                                    <p className="text-sm text-text-muted">Email</p>
                                    <p className="font-medium text-text-main">{user.email}</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <Shield className="w-5 h-5 text-text-muted mt-0.5" />
                                <div>
                                    <p className="text-sm text-text-muted">Role</p>
                                    <p className="font-medium text-text-main capitalize">{user.role}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
