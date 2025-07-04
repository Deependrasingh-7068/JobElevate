JobElevate – MERN Stack Job Portal


JobElevate is a full-fledged job portal web application built using the MERN Stack (MongoDB, Express.js, React.js, Node.js). It is designed to bridge the gap between freshers and employers by offering a smooth and user-friendly platform for job search and recruitment.

🚀 Features
🔍 Job Search – Easily search for jobs by role, category, or company.

📝 Resume Upload & Profile Creation – Freshers can create profiles and upload resumes.

🧑‍💼 Employer Dashboard – Post job openings, manage listings, and view applicants.

📧 Apply to Jobs – Instant application to posted jobs with resume and cover letter.

🔐 Authentication System – Secure login and signup for both job seekers and employers.

📊 Admin Panel – Manage users, jobs, and platform activity.

🛠️ Tech Stack
Technology	Description
MongoDB	NoSQL database for storing user and job data
Express.js	Backend framework for Node.js
React.js	Frontend framework for building the UI
Node.js	JavaScript runtime environment
JWT	For secure authentication
Mongoose	ODM for MongoDB
Redux (optional)	For state management
Bootstrap/Tailwind CSS	UI styling

📂 Project Structure
bash
Copy
Edit
JobElevate/
├── client/           # React Frontend
│   ├── public/
│   └── src/
├── server/           # Node.js + Express Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── middleware/
├── .env
├── README.md
└── package.json
🧑‍🎓 Use Cases
For Freshers:
Build a digital profile, search jobs by category, and apply with one click.

For Recruiters:
Post openings, manage applicants, and find ideal candidates quickly.

For Admin:
Monitor users, jobs, and ensure platform integrity.

🛠️ Installation
Clone the repository

bash
Copy
Edit
git clone https://github.com/your-username/JobElevate.git
Install dependencies for both frontend and backend

bash
Copy
Edit
cd JobElevate/client
npm install

cd ../server
npm install
Add your environment variables in .env
Example:

ini
Copy
Edit
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
Run the project

bash
Copy
Edit
# Run backend
cd server
npm run dev

# Run frontend
cd ../client
npm start

![signup (1)](https://github.com/user-attachments/assets/11e660ba-f6e3-421c-89e6-b49484e3aa7b)

![login (1)](https://github.com/user-attachments/assets/39ff0410-0572-4dcd-b82f-acebf5faca78)
![homepage (1)](https://github.com/user-attachments/assets/552dffa4-61a0-463e-9184-f4cfea3c5cc3)



🧑‍💻 Developed By
Deependra Singh



📜 License
This project is licensed under the MIT License.

