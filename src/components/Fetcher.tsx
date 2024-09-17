import React, { useState } from 'react';
import { MagnifyingGlass } from '@phosphor-icons/react';
import UserCard from './UserCard';

interface SearchFormProps {
  username: string;
  setUsername: (username: string) => void;
  fetchUserData: (e: React.FormEvent) => Promise<void>;
}

const SearchForm: React.FC<SearchFormProps> = ({ username, setUsername, fetchUserData }) => (
  <form onSubmit={fetchUserData} className="search-form">
    <input
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      placeholder="Enter GitHub username"
      aria-label="GitHub username"
      required
    />
    <button type="submit" aria-label="Search">
      <MagnifyingGlass size={20} />
    </button>
  </form>
);



interface UserData {
  avatar_url: string;
  name: string;
  login: string;
  location?: string;
  bio?: string;
  followers: number;
  html_url: string;
}

const UserInfo: React.FC = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      const data = await response.json();
      setUserData(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <main>
        <SearchForm username={username} setUsername={setUsername} fetchUserData={fetchUserData} />

        {loading && <div className="loading-spinner" aria-label="Loading"></div>}
        {error && <p className="error" role="alert">{error}</p>}

        {userData && <UserCard userData={userData} />}
      </main>
    </div>
  );
};

export default UserInfo;