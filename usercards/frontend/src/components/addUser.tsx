import React from "react";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";

const AddUser = ({ setUsers }: { setUsers: any }) => {
  // Recuperation des utilisateurs depuis l'API
  const fetchAddedProfile = async () => {
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

  // Ajout des nouveaux utilisateurs aux utilisateurs existants
  const handleFetchProfile = async () => {
    const data = await fetchAddedProfile();
    if (data) {
      const storedUsers = localStorage.getItem("users");
      let combinedUsers = data.results;
      if (storedUsers) {
        combinedUsers = [...JSON.parse(storedUsers), ...data.results];
      }

      setUsers(combinedUsers);
      localStorage.setItem("users", JSON.stringify(combinedUsers));
    }
  };

  return (
    <IconButton onClick={handleFetchProfile}>
      <AddIcon />
    </IconButton>
  );
};

export default AddUser;
