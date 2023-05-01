import React from "react";
import  "./Avatar.styles.scss";
import { AvatarProps } from "./Avatar.types";

const Avatar: React.FC<AvatarProps> = ({
  shape = "square",
  size = "md",
  src,
  text = "Avatar",
  name,
}) => {
  return (
    <div  className="avatar">
      <img src={src} alt={name} />
    </div>
  );
};

export default Avatar;
