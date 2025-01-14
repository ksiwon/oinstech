import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Mypage: React.FC = () => {
    const { role, studentData, teacherData } = useSelector((state: RootState) => state.user);
    const isLoggedIn = (role !== null);
    const user = (role === "student") ? studentData : teacherData;

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {user.role === 'student' ? (
                <div>
                    <h1>Student Page</h1>
                    <p>Welcome, {user.name}!</p>
                    {/* Add more student-specific content here */}
                </div>
            ) : user.role === 'teacher' ? (
                <div>
                    <h1>Teacher Page</h1>
                    <p>Welcome, {user.name}!</p>
                    {/* Add more teacher-specific content here */}
                </div>
            ) : (
                <div>
                    <h1>Unknown Role</h1>
                    <p>Error!</p>
                </div>
            )}
        </div>
    );
};

export default Mypage;