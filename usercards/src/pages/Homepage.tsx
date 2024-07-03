import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import ProfileGrid from "../components/profileGrid";
import SearchFilterSection from "../components/searchFilterSection";

export type SortType = "" | "Date of Birth" | "Alphabetical";

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const searchParams = useSearchParams({
    sortType: "",
    ascending: "true",
  })[0];

  const sortType = (searchParams.get("sortType") as SortType) || "";
  const ascending = searchParams.get("ascending") === "true";

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

  const handleSort = (
    sortingMode: SortType,
    sortedAscending: boolean = true
  ) => {
    if (sortingMode === "") {
      return;
    } else if (sortingMode === "Date of Birth") {
      setUsers((prevUsers) =>
        [...prevUsers].sort((a: any, b: any) => {
          const dateA = new Date(a.dob.date);
          const dateB = new Date(b.dob.date);
          return sortedAscending
            ? dateA.getTime() - dateB.getTime()
            : dateB.getTime() - dateA.getTime();
        })
      );
      return;
    } else if (sortingMode === "Alphabetical") {
      setUsers((prevUsers) =>
        [...prevUsers].sort((a: any, b: any) =>
          sortedAscending
            ? a.name.last.localeCompare(b.name.last)
            : b.name.last.localeCompare(a.name.last)
        )
      );
      return;
    }
  };

  const handleFetchProfile = async () => {
    const data = await fetchProfile();
    console.log("DATA", data.results);
    if (data) {
      setUsers(data.results);
      localStorage.setItem("users", JSON.stringify(data.results));
    }
    console.log("USERS", filteredUsers);
  };

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      const parsedUsers = JSON.parse(storedUsers);
      setUsers(parsedUsers);
      handleSort(sortType, ascending);
    } else {
      handleFetchProfile();
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleSort(sortType, ascending);
  }, [sortType, ascending, users]);

  return (
    <div className="max-w-screen mx-auto p-4">
      <SearchFilterSection
        users={users}
        setUsers={setUsers}
        setFilteredUsers={setFilteredUsers}
      />
      <ProfileGrid users={filteredUsers} />
    </div>
  );
};

export default HomePage;
