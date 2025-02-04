import React, { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";
// import { ProgressBar } from "react-bootstrap";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import swal from "sweetalert";
import { API } from "../apis/http";
import { useHistory, useLocation } from "react-router-dom";
import { addToken } from "../utils/localStorageUtils";
import { checkUserLoggedIn, getFirstItemFromIndexedDB, SaveToIndexedDB } from "../helpers/indexedDB";

const EvaluationForm = (props) => {
  const { scrollUp, questions } = props;

  const findQuestion = (number) => {
    console.log(questions)
    return questions.filter((que) => que.number === number);
  };

  const findSubquestion = (answer) => {
    let question = findQuestion(answer.q_number)[0];
    if (question) {
      return question.subQuestions.filter((q) => q.id === answer.id)[0];
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
      console.log('answers',answers)

      const body = { layerId: 1, projectName: localStorage.getItem('projectName'), projectAnswers:{answers: answers} };
      
      SaveToIndexedDB('projectDB', 'answersStore', body);
      const isLoggedIn = await checkUserLoggedIn('GoogleCredentialsDB', 'CredentialsStore');
      
      if(isLoggedIn){
        
        let response = await api.postRequest("/submit-auth", body, true);
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
      }else{

        history.push({
          pathname: "/dashboard",
        });
      }
      
      
    } catch (e) {
      console.log('error in submit ansers', typeof(e.response.status))
      setLoadingSubmit(false);
      if(e?.response?.status==401){
        swal('Session expired or Unauthorized');
        return
      }
      if (e?.response?.data) {
        swal(e.response.data);
      }
      if (e?.message) {
        swal(e.message);
      }else{
        swal('Internal Server Error')
      }
      setTimeout(() => {
        if (e?.response?.status === 401) {
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
        paddingTop: 100,
        paddingBottom: 100,
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
      <h4 style={{ marginBottom: 30 }}>  {currentQuestion}. {cQuestion[0]?.text}</h4>
      <hr />
      {/* Questions */}
      <div>
        {cQuestion[0].subQuestions.map((question, index) => {
          let q_number = alphabest[index]
          if (cQuestion[0].subQuestions.length <= 1) {
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
              !areAllQuestionsAnswered(answers, cQuestion[0].subQuestions)
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
