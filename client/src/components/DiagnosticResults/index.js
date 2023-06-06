import { Link } from "react-router-dom";
import "./DiagnosticResults.css";

export default function DiagnosticResults({ results }) {
  let diagnosticResults;
  if (results.length > 1) {
    diagnosticResults =
      "It's recommended you take the following level two assessments:";
  } else if (results.length === 1) {
    diagnosticResults =
      "It's recommended you take the following level two assessment:";
  } else {
    diagnosticResults =
      "There are no recommended level two assessments for you to take at this time.";
  }

  return (
    <div className="diagnostic-results-container">
      <div className="diagnostic-results diagnostic-results-thank-you">
        Thank you for your time.
      </div>
      <div className="diagnostic-results">{diagnosticResults}</div>
      {results.map((result, i) => (
        <div key={i} className="level-two-assessment">
          {result}
        </div>
      ))}
      <Link className="screener-survey-link" to="/">
        Return to Home Page
      </Link>
    </div>
  );
}
