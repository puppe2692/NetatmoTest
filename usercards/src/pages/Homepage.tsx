import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfileGrid from "../components/profileGrid";

const HomePage = () => {
  const [users, setUsers] = useState([]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get("https://randomuser.me/api/?results=10");
      const data = response.data;
      console.log("Fetched user Data from API", data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  const handleFetchProfile = async () => {
    const data = await fetchProfile();
    console.log("DATA", data.results);
    if (data) {
      setUsers(data.results);
    }
    console.log("USERS", users);
  };

  useEffect(() => {
    handleFetchProfile();
  }, []);

  return (
    <div className="max-w-screen mx-auto p-4">
      <ProfileGrid users={users} />
    </div>
  );
};

export default HomePage;
