import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    document.title = "Not Found";
  }, []);

  return <div className="main-content">404 Not Found</div>;
}
