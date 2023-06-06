import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  useEffect(() => {
    document.title = "Blueprint Take Home";
  }, []);

  return (
    <div className="main-content">
      <h1 className="diagnostic-screener-title">
        Please Take This Quick Diagnostic Survey
      </h1>
      <p className="diagnostic-screener-description">
        This diagnostic screener is used to assist your clinician to give you
        higher quality care by providing them with the necessary data.
      </p>
      <Link className="screener-survey-link" to="/diagnostic-screener">
        Begin
      </Link>
    </div>
  );
}
