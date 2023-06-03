import { useState, useEffect } from "react";
import Loading from "../Loading";
import DisplayErrors from "../DisplayErrors";
import DiagnosticResults from "../DiagnosticResults";
import "./DiagnosticScreener.css";

export default function DiagnosticScreener() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [surveyPrompt, setSurveyPrompt] = useState("");
  const [answers, setAnswers] = useState([{}]);
  const [questions, setQuestions] = useState([{}]);
  const [surveyDisplayName, setSurveyDisplayName] = useState("");
  const [surveyFullName, setSurveyFullName] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userResponses, setUserResponses] = useState([]);
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch("/api/survey/")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Something went wrong, please try again later");
        }
      })
      .then((data) => {
        setSurveyDisplayName(data.content.display_name);
        setSurveyFullName(data.full_name);
        setSurveyPrompt(data.content.sections[0].title);
        setAnswers(data.content.sections[0].answers);
        setQuestions(data.content.sections[0].questions);
        setIsLoaded(true);
      })
      .catch((err) => {
        setErrors([err.message]);
        setIsLoaded(true);
      });
  }, []);

  // Automatically submit survey after last question is answered
  useEffect(() => {
    if (userResponses.length === questions.length && isLoaded) {
      console.log(userResponses);
      fetch("/api/survey/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: userResponses }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("Something went wrong");
          }
        })
        .then((data) => setResults(data))
        .catch((error) => setErrors([error.message]));
      setHasSubmitted(true);
    }
  }, [userResponses]);

  const handleClick = (e) => {
    if (currentQuestion < questions.length) {
      const response = {
        value: 4,
        question_id: questions[currentQuestion].question_id,
      };
      setUserResponses([...userResponses, response]);
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  if (!isLoaded) return <Loading />;
  if (isLoaded && errors.length) return <DisplayErrors errors={errors} />;

  return (
    <div className="survey-container">
      <h1 className="survey-name">
        {surveyFullName} ({surveyDisplayName})
      </h1>
      <h2 className="survey-prompt">{surveyPrompt}</h2>
      {!hasSubmitted ? (
        <div className="survey-question-container">
          <div className="survey-question">
            {questions[currentQuestion]?.title}
          </div>
          <div className="survey-answers">
            {answers.map((answer, i) => {
              return (
                <div onClick={handleClick} key={i} className="survey-answer">
                  {answer.title}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <DiagnosticResults results={results} />
      )}
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${(currentQuestion / questions.length) * 100}%` }}
        ></div>
      </div>
      <div>
        Question{" "}
        {currentQuestion < questions.length
          ? currentQuestion + 1
          : questions.length}{" "}
        out of {questions.length}
      </div>
    </div>
  );
}
