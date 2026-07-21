import React, { useEffect, useState } from "react";
import { getProfile } from "../api/auth.js";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <p className="text-gray-500">Loading profile...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Name</p>
          <p className="font-medium">{profile.name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">{profile.email}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Snippets Created</p>
          <p className="font-medium text-brand text-xl">{profile.totalSnippets}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
