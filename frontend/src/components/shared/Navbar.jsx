import React, { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Bell, Check, Trash2, Clock, Briefcase, Building2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT, NOTIFICATION_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    const fetchNotifications = async () => {
        try {
            const res = await axios.get(NOTIFICATION_API_END_POINT, { withCredentials: true });
            if (res.data.success) {
                setNotifications(res.data.notifications);
                setUnreadCount(res.data.notifications.filter(n => !n.read).length);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const markAsRead = async (id) => {
        try {
            const res = await axios.put(`${NOTIFICATION_API_END_POINT}/${id}/read`, {}, { withCredentials: true });
            if (res.data.success) {
                setNotifications(notifications.map(notification => 
                    notification._id === id ? { ...notification, read: true } : notification
                ));
                setUnreadCount(prev => prev - 1);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchNotifications();
        }
    }, [user]);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="text-2xl font-bold text-purple-600">
                                JobElevate
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {user ? (
                            <>
                                {/* Navigation Links for Students */}
                                {user.role === 'student' && (
                                    <div className="hidden md:flex items-center gap-4">
                                        <Link
                                            to="/jobs"
                                            className="text-gray-600 hover:text-purple-600 transition-colors"
                                        >
                                            Jobs
                                        </Link>
                                        <Link
                                            to="/browse"
                                            className="text-gray-600 hover:text-purple-600 transition-colors"
                                        >
                                            Browse
                                        </Link>
                                    </div>
                                )}

                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="ghost" className="relative">
                                            <Bell className="h-5 w-5" />
                                            {unreadCount > 0 && (
                                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                                    {unreadCount}
                                                </span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80 p-0">
                                        <div className="p-2">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="font-semibold">Notifications</h3>
                                                <Link to="/notifications" className="text-sm text-purple-600 hover:text-purple-800">
                                                    View All
                                                </Link>
                                            </div>
                                            {notifications.length === 0 ? (
                                                <div className="text-center py-4 text-sm text-gray-500">
                                                    No notifications
                                                </div>
                                            ) : (
                                                <div className="space-y-2 max-h-96 overflow-y-auto">
                                                    {notifications.slice(0, 5).map((notification) => (
                                                        <div
                                                            key={notification._id}
                                                            className={`p-2 rounded-lg ${
                                                                notification.read ? 'bg-white' : 'bg-purple-50'
                                                            }`}
                                                        >
                                                            <div className="flex items-start justify-between">
                                                                <div className="flex-1">
                                                                    <p className="text-sm">{notification.message}</p>
                                                                    <div className="mt-1 flex items-center text-xs text-gray-500">
                                                                        <Clock className="h-3 w-3 mr-1" />
                                                                        {new Date(notification.createdAt).toLocaleString()}
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center gap-1">
                                                                    {!notification.read && (
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="sm"
                                                                            onClick={() => markAsRead(notification._id)}
                                                                            className="h-6 w-6 p-0"
                                                                        >
                                                                            <Check className="h-3 w-3" />
                                                                        </Button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </PopoverContent>
                                </Popover>

                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="ghost" className="relative">
                                            <Avatar>
                                                <AvatarImage src={user.profile.profilePhoto} />
                                            </Avatar>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-48">
                                        <div className="space-y-2">
                                            {user.role === 'recruiter' && (
                                                <>
                                                    <Link
                                                        to="/admin/companies"
                                                        className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
                                                    >
                                                        <Building2 className="h-4 w-4" />
                                                        Companies
                                                    </Link>
                                                    <Link
                                                        to="/admin/jobs"
                                                        className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
                                                    >
                                                        <Briefcase className="h-4 w-4" />
                                                        Jobs
                                                    </Link>
                                                </>
                                            )}
                                            <Link
                                                to="/profile"
                                                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
                                            >
                                                <User2 className="h-4 w-4" />
                                                Profile
                                            </Link>
                                            <button
                                                onClick={logoutHandler}
                                                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg w-full text-left"
                                            >
                                                <LogOut className="h-4 w-4" />
                                                Logout
                                            </button>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link
                                    to="/login"
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
