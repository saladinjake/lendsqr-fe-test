import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import PropTypes from "prop-types";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonWrap = (
  height,
  circle,
  width,
  color,
  count,
  duration,
  wrapper
) => {
  return (
    <SkeletonTheme color={color}>
      <Skeleton
        height={height}
        circle={circle}
        width={width}
        count={count}
        duration={duration}
        wrapper={wrapper}
      />
    </SkeletonTheme>
  );
};

export default Skeleton;
