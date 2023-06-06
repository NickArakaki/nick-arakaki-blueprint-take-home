import { useEffect } from "react";
import Screener from "../../components/DiagnosticScreener";

export default function DiagnosticScreener() {
  useEffect(() => {
    document.title = "Blueprint Diagnostic Screener";
  }, []);

  return (
    <div className="main-content">
      <Screener />
    </div>
  );
}
