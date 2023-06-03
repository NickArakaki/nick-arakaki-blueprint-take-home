import "./DiagnosticResults.css";

export default function DiagnosticResults({ results }) {
  return (
    <div>
      It is recommended you take the following level two assessments:{" "}
      {results.join(", ")}
    </div>
  );
}
