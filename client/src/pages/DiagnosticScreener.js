import Loading from "../components/Loading";
import { useState, useEffect } from "react";

export default function DiagnosticScreener() {
  const [survey, setSurvey] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/survey/")
      .then((res) => res.json())
      .then((data) => {
        setSurvey(data);
        setIsLoaded(true);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!isLoaded) return <Loading />;

  console.log(survey);
  return (
    <div className="survey-container">
      <h1>Title</h1>
      <div className="survey-question"></div>
      <div className="survey-answers"></div>
    </div>
  );
}
