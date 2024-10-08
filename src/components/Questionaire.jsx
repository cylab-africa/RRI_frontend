import React, { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";
// import { ProgressBar } from "react-bootstrap";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import swal from "sweetalert";
import { API } from "../apis/http";
import { useHistory, useLocation } from "react-router-dom";
import { addToken } from "../utils/localStorageUtils";

const EvaluationForm = (props) => {
  const { scrollUp, questions } = props;

  const findQuestion = (number) => {
    return questions.filter((que) => que.number === number);
  };

  const findSubquestion = (answer) => {
    let question = findQuestion(answer.q_number)[0];
    if (question) {
      return question.subquestions.filter((q) => q.id === answer.id)[0];
    }
    return null;
  };
  // State variables
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [cQuestion, setCQuestion] = useState(findQuestion(currentQuestion));
  const [answers, setAnswers] = useState([]);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const api = new API();
  const history = useHistory();
  const alphabest = ['a.', 'b.', 'c.', 'd.', 'e.', 'f.', 'g.', 'h.']


  const updateAnswer = (answer) => {
    let q = findSubquestion(answer);
    if (q) {
      const existingAnswerIndex = answers.findIndex(
        (an) => an.id === answer.id
      );

      if (existingAnswerIndex !== -1) {
        const updatedAnswers = [...answers];
        updatedAnswers[existingAnswerIndex] = answer;
        setAnswers(updatedAnswers);
      } else {
        setAnswers((prevAnswers) => [...prevAnswers, answer]);
      }
      
      return 1;
    }
    return 0;
  };

  function areAllQuestionsAnswered(answers, questions) {
    // Get the IDs of questions and answers
    const questionIds = questions.map((question) => question.id);
    const answeredQuestionIds = answers.map((answer) => answer.id);

    // Check if all question IDs are present in the answered question IDs
    return questionIds.every((questionId) =>
      answeredQuestionIds.includes(questionId)
    );
  }

  const selectScore = (answer) => {
    let updated = updateAnswer(answer);
  };

  // Function to handle next question
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length)
      setCurrentQuestion(currentQuestion + 1);
    scrollUp();
  };

  // Function to handle previous question
  const handlePreviousQuestion = () => {
    if (currentQuestion > 1) setCurrentQuestion(currentQuestion - 1);
    scrollUp();
  };

  const validateForm = () => {
    console.log(questions.length);
    console.log(answers.length);

    if (questions.length != answers.length) {
      swal("Please assign a score to each question.");
      return false;
    }
    return true;
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    setLoadingSubmit(true);

    try {
      setLoadingSubmit(true);
      console.log(answers)
      const body = { layerId: 1, projectId: props.projectId, answers: answers };
      let response = await api.postRequest("/answers", body, true);
      if (response.status === 202) {
        addToken(response.data.data.token);
        response = await api.postRequest("/answers", body, true);
      }

      if (response.status === 200) {
        // Some stuffs will be recorded here
        setTimeout(() => {
          setLoadingSubmit(false);

          history.push({
            pathname: "/dashboard",
            state: { projectId: props.projectId },
          });
        }, 1000);
      }
    } catch (e) {
      // console.log(e)
      setLoadingSubmit(false);

      swal(e.response.data.message);
      setTimeout(() => {
        if (e.response.status === 401) {
          history.push({
            pathname: "/dashboard",
            state: { projectId: props.projectId },
          });
        }
      }, 1000);
    }
    // some codes here

    setLoadingSubmit(false);
  };

  useEffect(() => {
    setCQuestion(findQuestion(currentQuestion));
  }, [currentQuestion]);

  return (
    <div
      style={{
        paddingTop:100,
        paddingBottom:100,
      }}
      className="evaluation-form">
      {/* Progress bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
        // className="progress-bar"
      >
       
        <progress
          class="progress progress1"
          max={`${questions.length}`}
          value={`${currentQuestion}`}
        >
          <span>
            ${currentQuestion}/${questions.length}
          </span>
        </progress>
        
      </div>
      <br />
      {/* Company name */}
      <h4  style={{ marginBottom: 30 }}>  {currentQuestion}. {cQuestion[0].question}</h4>
      <hr />
      {/* Questions */}
      <div>
        {cQuestion[0].subquestions.map((question, index) => {
          let q_number = alphabest[index] 
          if(cQuestion[0].subquestions.length <= 1){
            q_number = ""
          }
            
          return (
            <QuestionCard
              number={q_number}
              q_number={cQuestion[0].number}
              question={question}
              answers={answers}
              question_id={cQuestion[0].id}
              selectScore={selectScore}
            />
          );
        })}
      </div>

      {/* Navigation buttons */}
      <div className="navigation-buttons">
        {currentQuestion >= 1 && (
          <button onClick={handlePreviousQuestion}>
            <IoIosArrowBack />
          </button>
        )}
        {currentQuestion < questions.length && (
          <button
            disabled={
              !areAllQuestionsAnswered(answers, cQuestion[0].subquestions)
            }
            onClick={handleNextQuestion}
          >
            <IoIosArrowForward />
          </button>
        )}
        {currentQuestion === questions.length && (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
};

export default EvaluationForm;
