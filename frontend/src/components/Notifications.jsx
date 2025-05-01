import React, { useEffect, useState } from 'react';
import { Bell, Check, Trash2, Clock } from 'lucide-react';
import { Button } from './ui/button';
import axios from 'axios';
import { NOTIFICATION_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useSelector(store => store.auth);

    const fetchNotifications = async () => {
        try {
            const res = await axios.get(NOTIFICATION_API_END_POINT, { withCredentials: true });
            if (res.data.success) {
                setNotifications(res.data.notifications);
            }
        } catch (error) {
            toast.error('Failed to fetch notifications');
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (id) => {
        try {
            const res = await axios.put(`${NOTIFICATION_API_END_POINT}/${id}/read`, {}, { withCredentials: true });
            if (res.data.success) {
                setNotifications(notifications.map(notification => 
                    notification._id === id ? { ...notification, read: true } : notification
                ));
                toast.success('Notification marked as read');
            }
        } catch (error) {
            toast.error('Failed to mark notification as read');
        }
    };

    const deleteNotification = async (id) => {
        try {
            const res = await axios.delete(`${NOTIFICATION_API_END_POINT}/${id}`, { withCredentials: true });
            if (res.data.success) {
                setNotifications(notifications.filter(notification => notification._id !== id));
                toast.success('Notification deleted');
            }
        } catch (error) {
            toast.error('Failed to delete notification');
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
                <div className="flex items-center gap-2">
                    <Bell className="text-purple-500" size={24} />
                    <span className="text-gray-600">{notifications.length} notifications</span>
                </div>
            </div>

            {notifications.length === 0 ? (
                <div className="text-center py-12">
                    <Bell className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No notifications</h3>
                    <p className="mt-1 text-gray-500">You don't have any notifications yet.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {notifications.map((notification) => (
                        <div
                            key={notification._id}
                            className={`p-4 rounded-lg border ${
                                notification.read ? 'bg-white' : 'bg-purple-50'
                            }`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <p className="text-gray-800">{notification.message}</p>
                                    <div className="mt-2 flex items-center text-sm text-gray-500">
                                        <Clock className="h-4 w-4 mr-1" />
                                        {new Date(notification.createdAt).toLocaleString()}
                                    </div>
                                    {notification.job && (
                                        <Link
                                            to={`/job/${notification.job._id}`}
                                            className="mt-2 inline-block text-purple-600 hover:text-purple-800"
                                        >
                                            View Job
                                        </Link>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    {!notification.read && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => markAsRead(notification._id)}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            <Check className="h-4 w-4" />
                                        </Button>
                                    )}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => deleteNotification(notification._id)}
                                        className="text-gray-500 hover:text-red-500"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Notifications; 