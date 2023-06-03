import { useState, useEffect } from "react";
import Loading from "../Loading";
import "./DiagnosticScreener.css";

export default function DiagnosticScreener() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [surveyPrompt, setSurveyPrompt] = useState("");
  const [answers, setAnswers] = useState([{}]);
  const [questions, setQuestions] = useState([{}]);
  const [surveyDisplayName, setSurveyDisplayName] = useState("");
  const [surveyFullName, setSurveyFullName] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userResponses, setUserResponses] = useState([{}]);

  useEffect(() => {
    fetch("/api/survey/")
      .then((res) => res.json())
      .then((data) => {
        setSurveyDisplayName(data.content.display_name);
        setSurveyFullName(data.full_name);
        setSurveyPrompt(data.content.sections[0].title);
        setAnswers(data.content.sections[0].answers);
        setQuestions(data.content.sections[0].questions);
        setIsLoaded(true);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!isLoaded) return <Loading />;

  return (
    <div className="survey-container">
      <h1 className="survey-name">
        {surveyFullName} ({surveyDisplayName})
      </h1>
      <h2 className="survey-prompt">{surveyPrompt}</h2>
      <div className="survey-question">{questions[currentQuestion].title}</div>
      <div className="survey-answers">
        {answers.map((answer, i) => {
          return (
            <div key={i} className="survey-answer">
              {answer.title}
            </div>
          );
        })}
      </div>
      <div>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${(currentQuestion / questions.length) * 100}%` }}
          ></div>
        </div>
        <div>
          Question {currentQuestion + 1} out of {questions.length}
        </div>
      </div>
    </div>
  );
}
