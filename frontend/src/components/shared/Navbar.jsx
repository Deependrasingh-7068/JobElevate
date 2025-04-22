import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Bell } from 'lucide-react'  // Add the Bell icon here
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    // Function to navigate to the notifications page
    const goToNotifications = () => {
        navigate('/notifications'); // Redirect to the notifications page
    }

    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
                <div>
                    <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Elevate</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className="flex font-medium items-center gap-5">
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li>
                                    <Link
                                        to="/admin/companies"
                                        className="group flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-gray-800 font-semibold rounded-full backdrop-blur-lg bg-opacity-30 border border-transparent hover:opacity-80 transition-transform duration-300 ease-in-out hover:scale-105"
                                    >
                                        <span className="relative flex items-center">
                                            <span className="transform transition-transform duration-300 group-hover:opacity-0">→</span>
                                            <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300">←</span>
                                        </span>
                                        Companies
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/admin/jobs"
                                        className="group flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-gray-800 font-semibold rounded-full backdrop-blur-lg bg-opacity-30 border border-transparent hover:opacity-80 transition-transform duration-300 ease-in-out hover:scale-105"
                                    >
                                        <span className="relative flex items-center">
                                            <span className="transform transition-transform duration-300 group-hover:opacity-0">→</span>
                                            <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300">←</span>
                                        </span>
                                        Jobs
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        to="/"
                                        className="group flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-gray-800 font-semibold rounded-full backdrop-blur-lg bg-opacity-30 border border-transparent hover:opacity-80 transition-transform duration-300 ease-in-out hover:scale-105"
                                    >
                                        <span className="relative flex items-center">
                                            <span className="transform transition-transform duration-300 group-hover:opacity-0">→</span>
                                            <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300">←</span>
                                        </span>
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/jobs"
                                        className="group flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-gray-800 font-semibold rounded-full backdrop-blur-lg bg-opacity-30 border border-transparent hover:opacity-80 transition-transform duration-300 ease-in-out hover:scale-105"
                                    >
                                        <span className="relative flex items-center">
                                            <span className="transform transition-transform duration-300 group-hover:opacity-0">→</span>
                                            <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300">←</span>
                                        </span>
                                        Jobs
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/browse"
                                        className="group flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-gray-800 font-semibold rounded-full backdrop-blur-lg bg-opacity-30 border border-transparent hover:opacity-80 transition-transform duration-300 ease-in-out hover:scale-105"
                                    >
                                        <span className="relative flex items-center">
                                            <span className="transform transition-transform duration-300 group-hover:opacity-0">→</span>
                                            <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300">←</span>
                                        </span>
                                        Browse
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* Add the Notification Bell Icon */}
                    <div className="relative cursor-pointer" onClick={goToNotifications}>
                        <Bell size={24} className="text-gray-700" />
                        <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1 py-0.5">
                            3 {/* You can dynamically set this number */}
                        </div>
                    </div>

                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant="outline">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className=''>
                                        <div className='flex gap-2 space-y-2'>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium'>{user?.fullname}</h4>
                                                <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 text-gray-600'>
                                            {
                                                user && user.role === 'student' && (
                                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                        <User2 />
                                                        <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                                                    </div>
                                                )
                                            }

                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link">Logout</Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }

                </div>
            </div>

        </div>
    )
}

export default Navbar
