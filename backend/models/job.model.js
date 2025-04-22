import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true // Removes leading/trailing spaces
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    requirements: {
        type: [String],
        default: [] // Ensures it's always an array
    },
    salary: {
        type: String,
        required: true,
        min: [0, "Salary must be a positive number"] // Prevents negative salary
    },
    experienceLevel: {
        type: String,
        required: true,
        min: [0, "Experience Level must be a positive number"] // Ensures positive experience
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    jobType: {
        type: String,
        required: [true, 'Job type is required'],
        enum: {
            values: ["Full-time", "Part-time", "Internship", "Contract", "Freelance"],
            message: '{VALUE} is not supported. Valid job types are Full-time, Part-time, Internship, Contract, Freelance.',
        },
        trim: true, // Automatically removes leading/trailing spaces
    },
    position: {
        type: Number,
        required: true,
        min: [1, "At least one position must be available"] // Ensures positions are >= 1
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Application",
        }
    ]
}, { timestamps: true });

export const Job = mongoose.model("Job", jobSchema);
