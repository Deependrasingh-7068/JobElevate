import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react'; // Import the close (X) icon

const NotificationPanel = ({ onClose }) => {
  return (
    <div className="fixed top-0 right-0 w-72 h-screen bg-white shadow-lg z-40 p-4">
      {/* Close Button */}
      <div className="flex justify-end">
        <X 
          className="cursor-pointer" 
          size={24} 
          onClick={onClose} // Close the panel when clicked
        />
      </div>

      <h3 className="text-xl font-bold mb-4">New Job Notifications</h3>
      <div className="space-y-4">
        {/* Example job notification */}
        <div className="flex justify-between items-center">
          <Link to="/job/1" className="text-blue-600">
            New Software Developer Role
          </Link>
          <span className="text-sm text-gray-500">1 hour ago</span>
        </div>
        <div className="flex justify-between items-center">
          <Link to="/job/2" className="text-blue-600">
            Frontend Developer Position
          </Link>
          <span className="text-sm text-gray-500">2 hours ago</span>
        </div>
        {/* Add more notifications as needed */}
      </div>
    </div>
  );
};

export default NotificationPanel;
