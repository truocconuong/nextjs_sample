import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSizeBrowser } from "../../../redux/actions/sizeBrowser";

function SizeBrowser() {
  const dispatch = useDispatch();

  function getWindowDimensions() {
    if (typeof window !== "undefined" && window) {
      const { innerWidth: width, innerHeight: height } = window;
      return {
        width,
        height,
      };
    }
  }

  useEffect(() => {
    function handleResize() {
      dispatch(setSizeBrowser(getWindowDimensions()));
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <></>;
}
export default SizeBrowser;
