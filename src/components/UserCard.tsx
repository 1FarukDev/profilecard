import React from "react";
import { Users, MapPin, BookOpen, Link } from '@phosphor-icons/react';


interface UserData {
    avatar_url: string;
    name: string;
    login: string;
    location?: string;
    bio?: string;
    followers: number;
    html_url: string;
}


const UserCard: React.FC<{ userData: UserData }> = ({ userData }) => (
    <div className="user-card" role="region" aria-label="User Information">
        <img src={userData.avatar_url} alt={`${userData.name || userData.login}'s avatar`} className="avatar" />
        <h2>{userData.name || userData.login}</h2>
        <p className="username">@{userData.login}</p>
        {userData.location && (
            <p className="location">
                <MapPin size={16} />
                {userData.location}
            </p>
        )}
        {userData.bio && (
            <p className="bio">
                <BookOpen size={16} />
                {userData.bio}
            </p>
        )}
        <p className="followers">
            <Users size={16} />
            {userData.followers} followers
        </p>
        <a href={userData.html_url} target="_blank" rel="noopener noreferrer" className="profile-link">
            View GitHub Profile
            <Link size={16} />
        </a>
    </div>
);

export default UserCard