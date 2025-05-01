import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        enum: ["new_job", "application_status", "new_application"],
        required: true
    },
    message: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job"
    },
    application: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application"
    }
}, { timestamps: true });

export const Notification = mongoose.model("Notification", notificationSchema); 