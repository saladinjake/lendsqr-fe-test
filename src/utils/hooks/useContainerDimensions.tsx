import { useState, useEffect } from "react";

const useContainerDimensions = (myRef, listeners = []) => {
  const getDimensions = () => ({
    width: myRef.current.clientWidth,
    height: myRef.current.clientHeight,
  });

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getDimensions());
    };

    if (myRef.current) {
      setDimensions(getDimensions());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [myRef, ...listeners]);

  return dimensions;
};

export default useContainerDimensions;