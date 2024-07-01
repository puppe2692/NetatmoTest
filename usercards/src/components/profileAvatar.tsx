import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";

const ProfileAvatar: React.FC<{
  profile: any;
  width: number;
  height: number;
}> = ({ profile, width, height }) => {
  const [img, setImg] = useState<string>("");
  useEffect(() => {
    setImg(profile.picture.large);
  }, [profile.picture.large]);
  return (
    <Avatar
      src={img}
      alt="Profile Picture"
      sx={{ width: width, height: height }}
    />
  );
};

export default ProfileAvatar;
