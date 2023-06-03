import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Please This Quick Diagnostic Survey</h1>
      <p>
        This diagnostic screener is used to assist your clinician provide higher
        quality care by providing the necessary data.
      </p>
      <Link to="/diagnostic-screener">Begin</Link>
    </div>
  );
}
