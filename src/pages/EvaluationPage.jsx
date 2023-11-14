import React, {useState, useEffect} from "react";
import QuestionCard from "../components/QuestionCard";
import { API } from "../apis/http";

const EvaluationPage = (props) => {
  const api = new API()
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([])

  const getQuestionsLayerOne = async ()=>{
    try{
        const response = await api.getRequest('/questions?id=1')
        // console.log(response)
        setQuestions(response.data.questions)
    }catch(e){
        console.log(e)
    }
  }

  useEffect(()=>{
        getQuestionsLayerOne()
  },[])

  const selectScore =(selected)=>{
     let lisOfAnswers = answers;
     const index = lisOfAnswers.findIndex(ans => ans.id === selected.id);
     if (index !== -1) {
        lisOfAnswers[index] = selected;
      } else {
        lisOfAnswers.push(selected);
      }
     setAnswers(lisOfAnswers)
     console.log(lisOfAnswers)
  }
  return (
    <div class="conatiner">
      <h3>Layer 3</h3>

      <ol>
        {questions.map((question)=>{
            return <QuestionCard question={question} selectScore={selectScore}  />

        })}
      </ol>
    </div>
  );
};

export default EvaluationPage;
