import React from "react";
import { Paper, Typography, Divider, Grid } from "@mui/material";
import ProfileAvatar from "./profileAvatar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CakeIcon from "@mui/icons-material/Cake";
import PhoneIcon from "@mui/icons-material/Phone";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

interface ProfileGridProps {
  users: any[];
}

// Carte de profil
const ProfileCard = ({ profile }: any) => {
  const notifDate = new Date(profile.dob.date);
  const formattedDate = notifDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <Paper
      className="p-3 flex flex-col h-64 mt-4"
      elevation={4}
      style={{ textDecoration: "none" }}
    >
      <div className="flex items-center mb-2">
        <ProfileAvatar profile={profile} height={90} width={90} />
        <div className="flex flex-col items-left ml-4 space-y-1 w-full overflow-hidden">
          <h6 className="w-full font-semibold text-l truncate">
            {profile.name.first} {profile.name.last}, {profile.dob.age}
          </h6>
        </div>
      </div>
      <Divider className="w-full" sx={{ m: 1 }} />
      <div className="items-center">
        <div className="flex items-center my-1 mx-1">
          <LocationOnIcon />
          <Typography variant="subtitle2">
            {profile.location.country} - {profile.location.city}
          </Typography>
        </div>
        <div className="flex items-center my-1 mx-1">
          <CakeIcon />
          <Typography variant="subtitle2">{formattedDate}</Typography>
        </div>
        <div className="flex items-center my-1 mx-1">
          <AlternateEmailIcon />
          <Typography variant="subtitle2">{profile.email}</Typography>
        </div>
        <div className="flex items-center my-1 mx-1">
          <PhoneIcon />
          <Typography variant="subtitle2">{profile.phone}</Typography>
        </div>
      </div>
    </Paper>
  );
};

// Grille de profils
const ProfileGrid = ({ users }: ProfileGridProps) => {
  return (
    <Grid container spacing={2}>
      {users.map((profile: any) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          zeroMinWidth
          key={profile.email}
        >
          <ProfileCard profile={profile} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProfileGrid;
