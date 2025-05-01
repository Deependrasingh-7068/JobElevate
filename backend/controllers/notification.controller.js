import { Notification } from "../models/notification.model.js";
import { User } from "../models/user.model.js";

export const getNotifications = async (req, res) => {
    try {
        const userId = req.id;
        const notifications = await Notification.find({ recipient: userId })
            .sort({ createdAt: -1 })
            .populate('job')
            .populate('application');

        return res.status(200).json({
            notifications,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error fetching notifications",
            success: false
        });
    }
};

export const markAsRead = async (req, res) => {
    try {
        const userId = req.id;
        const notificationId = req.params.id;

        const notification = await Notification.findOne({
            _id: notificationId,
            recipient: userId
        });

        if (!notification) {
            return res.status(404).json({
                message: "Notification not found",
                success: false
            });
        }

        notification.read = true;
        await notification.save();

        return res.status(200).json({
            message: "Notification marked as read",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error marking notification as read",
            success: false
        });
    }
};

export const deleteNotification = async (req, res) => {
    try {
        const userId = req.id;
        const notificationId = req.params.id;

        const notification = await Notification.findOneAndDelete({
            _id: notificationId,
            recipient: userId
        });

        if (!notification) {
            return res.status(404).json({
                message: "Notification not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Notification deleted successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error deleting notification",
            success: false
        });
    }
}; 