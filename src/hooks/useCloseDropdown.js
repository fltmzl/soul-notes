import { useEffect, useRef } from "react";

const useCloseDropdown = (fn) => {
  const domRef = useRef();

  useEffect(() => {
    if (domRef === null || typeof fn !== "function") return;

    const handler = (e) => {
      e.stopPropagation();

      if (!domRef.current.contains(e.target)) {
        fn();
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [domRef, fn]);

  return { domRef };
};

export default useCloseDropdown;
