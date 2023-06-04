import { Link } from "react-router-dom";
import "./DiagnosticResults.css";

export default function DiagnosticResults({ results }) {
  return (
    <div className="diagnostic-results-container">
      {results.length > 0 ? (
        <div className="diagnostic-results">
          It's recommended you take the following level two assessments:{" "}
          {results.join(", ")}
        </div>
      ) : (
        <div className="diagnostic-results">
          Thank you for your time, there are no followup assessments
          recommended.
        </div>
      )}
      <Link to="/">Return to Home Page</Link>
    </div>
  );
}
