import React, {useState, useEffect} from "react";
import QuestionCard from "../components/QuestionCard";
import { API } from "../apis/http";
import { Button, Col, Placeholder, Row } from "react-bootstrap";
import LoadingModal from "../components/LoadingModal";
import ConfirmModal from "../components/ConfirmModal";
import { addToken } from "../utils/localStorageUtils";
import swal from 'sweetalert';
import { useHistory, useLocation } from "react-router-dom";
import EvaluationForm from "../components/Questionaire";

const EvaluationPage = (props) => {
  const api = new API()
  const location = useLocation();
  // console.log(location)
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [layerId, setLayerId] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false)
  const [projectId, setProjectId] = useState()
  const [project, setProject] = useState()
  let history = useHistory();

  // console.log(project)

  const DisplayQuestions=(questions)=>{
    if(layerId === 1){

    }
  }


  const validateForm = ()=>{
    if(questions.length != answers.length){
      swal("Please assign a score to each question.");
      return false
    }
    return true
  }

  const submitEvaluation = async(e)=>{
    try{
    const isFormValid = validateForm()
    if(!isFormValid){
      return
    }
    // Clear the selections first
    document.getElementById('form').reset()
    setLoading(true)
    const body = {layerId:layerId, projectId:projectId, answers:answers}
    let response = await api.postRequest('/answers', body, true)
    if(response.status === 202){
      addToken(response.data.data.token)
      response = await api.postRequest('/answers', body, true)
    }

   
    if(response.status === 200){
      // Some stuffs will be recorded here
    }
    setTimeout(()=>{
      setLoading(false)
      if(layerId<3){
        setShowConfirm(true)
      }else{
        history.push({
          pathname: "/dashboard",
          state: { projectId: projectId },
        });
      }
    },1000)

   
  }catch(e){
    // console.log(e)
    setLoading(false)
    
    swal(e.response.data.message)
    setTimeout(()=>{
      if(e.response.status === 401){
        history.push({
          pathname: "/dashboard",
          state: { projectId: projectId },
        });
      }
    },1000)
    
  }
    // some codes here 

  }

  const getQuestionsLayer = async ()=>{
    setLoading(true)
    try{
      
        const response = await api.getRequest('/questions')
        // console.log(response)
        setQuestions(response.data.questions)
    }catch(e){
        // console.log(e)
    }
    setTimeout(()=>{
      setLoading(false)
      window.scrollTo(0, 0)
    }, 1000)

  }

  const changeLayer=()=>{
    setAnswers([])
    if(layerId === 1){
      setLayerId(2)

    }else if(layerId === 2){
      setLayerId(3)
    }else{
      alert("Redirect to score view page.")
    }  
    setShowConfirm(false)
  }

  
  useEffect(()=>{
        if(layerId > 3){
          history.push({
            pathname: "/dashboard",
            state: { projectId: location.state.project.id },
          });
        }
        getQuestionsLayer()
        setProjectId(location.state.project.id)
        setProject(location.state.project)

  },[layerId])

  const selectScore =(selected)=>{
     let lisOfAnswers = answers;
     const index = lisOfAnswers.findIndex(ans => ans.id === selected.id);
     if (index !== -1) {
        lisOfAnswers[index] = selected;
      } else {
        lisOfAnswers.push(selected);
      }
     setAnswers(lisOfAnswers)
  }

  return (
    <div class="jumbotron conatiner">
      
   {!loading ? <EvaluationForm questions={questions} scrollUp={()=>{window.scrollTo(60,60)}} />:

   <div>
          <Placeholder  animation="glow">
            <Placeholder style={{height:30, margin:5}} xs={10} />
            <Placeholder style={{height:30, margin:5}} xs={10} />
            <Placeholder style={{height:30, margin:5}} xs={10} />   
            {/* <Placeholder style={{height:30, margin:5}} xs={10} />
            <Placeholder style={{height:30, margin:5}} xs={10} />
            <Placeholder style={{height:30, margin:5}} xs={10} /> */}
            <Placeholder style={{height:30, margin:5}} xs={10} /> 
            <Placeholder style={{height:30, margin:5}} xs={10} />  
            <Placeholder style={{height:30, margin:5}} xs={10} />
            <Placeholder style={{height:30, margin:5}} xs={10} />
            <Placeholder style={{height:30, margin:5}} xs={10} />
            <Placeholder style={{height:30, margin:5}} xs={10} />
            <Placeholder style={{height:30, margin:5}} xs={10} /> 
          </Placeholder>
    </div>
}

     <LoadingModal show={loading}  />
     <ConfirmModal
        setShow={(val)=>{setShowConfirm(false)}}
        show={showConfirm} 
        nextEvaluation={changeLayer} 
        finishEvaluation={()=>{
            // alert("Redirect to score view page.")
            setShowConfirm(false)

            history.push({
              pathname: "/dashboard",
              state: { projectId: projectId },
            });
        }}
    />
    </div>
  );
};

export default EvaluationPage;
