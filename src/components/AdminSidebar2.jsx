import React from "react";
import personImage from '../images/Person.png';

const AdminSideBar2 = () => {
    const userData = {
        imgUrl: personImage
    }
    const usersLogs = [
        {
            userName: 'Didier',
            activity: 'created account',
            timeStamp: new Date('2024-10-03T18:15:00'), // Example timestamp
            imgUrl: personImage
        },
        {
            userName: 'Ines',
            activity: 'updated profile',
            timeStamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
            imgUrl: personImage
        },
        {
            userName: 'Eric',
            activity: 'uploaded a file',
            timeStamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
            imgUrl: personImage
        },
        {
            userName: 'Trevor',
            activity: 'signed out',
            timeStamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
            imgUrl: personImage
        },
    ];

    // Helper function to format timestamp as relative time
    const getRelativeTime = (date) => {
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

        if (diffInSeconds < 60) return `${rtf.format(-diffInSeconds, 'seconds')}`;
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) return `${rtf.format(-diffInMinutes, 'minutes')}`;
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${rtf.format(-diffInHours, 'hours')}`;
        const diffInDays = Math.floor(diffInHours / 24);
        return `${rtf.format(-diffInDays, 'days')}`;
    };

    return (
        <div>
            <div className="user-photo">
                <img src={userData?.imgUrl} alt="no image" />
            </div>
            <div className="user-activities">
                <h3>Users Activities</h3>
                {usersLogs.map((log, index) => (
                    <div key={index} className="activity-log">
                        <div>
                            <img src={log.imgUrl} alt={`${log.userName} avatar`} className="activity-avatar" />
                        </div>
                        <div className="">
                            <p><strong>{log.userName}</strong> {log.activity}</p>
                            <p>
                                <small>
                                    {log.timeStamp
                                        ? getRelativeTime(log.timeStamp)
                                        : 'No timestamp available'}
                                </small>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="user-photo">
                {/* <img src={userData?.imgUrl} alt="no image" /> */}
            </div>
        </div>
    );
}
export default AdminSideBar2;