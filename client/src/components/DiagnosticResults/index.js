import { Link } from "react-router-dom";
import "./DiagnosticResults.css";

export default function DiagnosticResults({ results }) {
  return (
    <div className="diagnostic-results-container">
      <div className="diagnostic-results">Thank you for your time.</div>
      {results.length > 0 ? (
        <div className="diagnostic-results">
          It's recommended you take the following level two assessments:{" "}
          {results.join(", ")}
        </div>
      ) : (
        <div className="diagnostic-results">
          There are no level two assessments recommended at this time.
        </div>
      )}
      <Link to="/">Return to Home Page</Link>
    </div>
  );
}
