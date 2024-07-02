import React, { useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Drawer,
  Box,
  Divider,
  SelectChangeEvent,
  IconButton,
} from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { useSearchParams } from "react-router-dom";
import { SortType } from "../pages/Homepage";

const SearchFilterSection = ({
  users,
  setUsers,
  setFilteredUsers,
  sortUsers,
}: {
  users: any;
  setUsers: any;
  setFilteredUsers: any;
  sortUsers: (sortingMode: SortType, sortedAscending: boolean) => void;
}) => {
  const [searchParams, setSearchParams] = useSearchParams({
    sortType: "",
    genderFilter: "",
    ascending: "true",
    open: "false",
  });

  const ascending = searchParams.get("ascending") === "true";
  const genderFilter = searchParams.get("genderFilter") || "";
  const sortType = (searchParams.get("sortType") as SortType) || "";
  const open = searchParams.get("open") === "true";

  useEffect(() => {
    setFilteredUsers(
      users.filter((user: any) =>
        genderFilter === ""
          ? true
          : user.gender === genderFilter.toLocaleLowerCase()
      )
    );
  }, [sortType, ascending, users, setFilteredUsers, genderFilter]);

  const handleGenderFilterChange = (event: SelectChangeEvent<string>) => {
    setSearchParams(
      (prevParams) => {
        prevParams.set("genderFilter", event.target.value);
        return prevParams;
      },
      { replace: true }
    );
  };

  return (
    <div className="flex justify-end items-center space-x-4">
      <Button
        onClick={() =>
          setSearchParams(
            (prevParams) => {
              prevParams.set("open", "true");
              return prevParams;
            },
            { replace: true }
          )
        }
      >
        Filter
      </Button>
      <Drawer
        open={open}
        onClose={() =>
          setSearchParams(
            (prevParams) => {
              prevParams.set("open", "false");
              return prevParams;
            },
            { replace: true }
          )
        }
      >
        <Box className="p-6 space-y-6" sx={{ width: 250 }} role="presentation">
          <h2 className="text-xl font-semibold">Filters</h2>
          <Divider className="w-full" sx={{ m: 1 }} />
          <FormControl fullWidth>
            <InputLabel id="gender">Gender</InputLabel>
            <Select
              labelId="gender"
              id="gender"
              value={genderFilter}
              label="gender"
              onChange={handleGenderFilterChange}
            >
              {["", "Male", "Female"].map((sortType, index) => (
                <MenuItem value={sortType} key={index}>
                  {sortType === "" ? <em>All</em> : sortType}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Drawer>
      <FormControl sx={{ width: 200 }}>
        <InputLabel id="sort-by">Sort by</InputLabel>
        <Select
          labelId="sort-by"
          id="sort-by"
          value={sortType}
          label="Sort by"
          onChange={(e) => {
            setSearchParams(
              (prevParams) => {
                prevParams.set("sortType", e.target.value as string);
                return prevParams;
              },
              { replace: true }
            );
          }}
        >
          {["", "Date of Birth", "Alphabetical"].map((sortType, index) => (
            <MenuItem value={sortType} key={index}>
              {sortType === "" ? <em>Default</em> : sortType}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <IconButton
        onClick={() => {
          setSearchParams(
            (prevParams) => {
              prevParams.set("ascending", (!ascending).toString());
              return prevParams;
            },
            { replace: true }
          );
        }}
      >
        <SwapVertIcon />
      </IconButton>
    </div>
  );
};

export default SearchFilterSection;
