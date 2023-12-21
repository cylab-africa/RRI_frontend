import React, { useState, useEffect } from "react";
import { API } from "../apis/http";
import swal from "sweetalert";
import { useHistory, useLocation } from "react-router-dom";

const DashboardScreen = () => {
  const api = new API();
  let history = useHistory();
  const [evaluation, setEvaluation] = useState({});
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [text, setText] = useState('')
  const [page, setPage] = useState(0)

  const switchLights = ()=>{
    // alert(evaluation.score)
    if(evaluation === undefined){
      setText(`You need to do atleast one evaluation to see results.`)

      return -1
    }
    if(loading){
      return -1
    }
    if(evaluation.score === 0){
      if(evaluation.layersDone === 0){
        setText(`No test has been taken yet for this project.`)

      }
      setText(`You have completed the evaluation for layer ${evaluation.layersDone} you can proceed with the test with the remaining layers`)

      return 0
    }else if(0< evaluation.score && evaluation.score <= 50){
      setText(`This project ${evaluation.project} has got ${evaluation.score}% overall`)
      return 1
    }else if(50 < evaluation.score && evaluation.score <=70  ){
      setText(`This project ${evaluation.project} has got ${evaluation.score}% overall`)

      return 2
    }else if( 70 < evaluation.score && evaluation.score <=100){
      setText(`This project ${evaluation.project} has got ${evaluation.score}% overall`)

      return 3
    }else{
      setText(`Somthing un expected happed!`)

      return 4
    }
  }

  const getEvaluationsByProjectId = async () => {
    try {
      // console.log(location.state)
      let response = []
      if(location.state){
        response = await api.getRequest(
          "/evaluation?projectId=" + location.state.projectId,
          true
        );
        console.log(response)

      }else{

        response = await api.getRequest(
          "/evaluation",
          true
        );
        console.log(response)

      }
      // console.log(response)
      if(response.data.data.length >0 ){
      setEvaluation(response.data.data[0]);
      setEvaluations(response.data.data);
      }else{
        setEvaluation(undefined);

      }

    } catch (e) {
      console.log(e)
      // swal(e.response.data.message);
    }
  };

  useEffect(() => {
    getEvaluationsByProjectId()
  }, []);

  useEffect(()=>{
    let page = switchLights()
    setPage(page)
  },[evaluation])
  return (
    <div className="jumbotron scores-body">
      {/* <div class="score-container">
        <h1 class="score-title">PROJECT NAME</h1>
        <pre class="score-text">
          {JSON.stringify(evaluation)}
        </pre>
      </div> */}
     
      <div style={{ width: "100%" }} className="row">
        <ul style={{listStyle:'none' , display:'flex', flexDirection:'row'}}>
          {evaluations.slice(0, 4).map((ev)=>{
            return <li style={{margin:4}}> <a class="btn btn-link" onClick={()=>{
              setEvaluation(ev)
            }}>{ev.project}</a></li>  
          })}
          {/* <li style={{margin:4}}> <a href="">RRI</a></li>
          <li style={{margin:4}}><a href="">Open Data</a></li>
          <li style={{margin:4}}><a href="">CBA</a></li>
          <li style={{margin:4}}><a href="">VAP Testing Tool</a></li>
          <li style={{margin:4}}><a style={{textDecoration:'none'}} href="">{"..."}</a></li> */}
        </ul>
        {page === 1 &&
        <div className="col-md-12">
          <div className="score-lights">
            <h3>Risponsible Research and Innovation Final score</h3>
            <hr />

            <div class="trafficlight">
              <div class="red active"></div>
              <div class="yellow disactivated"></div>
              <div class="green disactivated"></div>
            </div>

            <div className="traffic-description bg-red">
              <p className="">{text}</p>
            </div>
            <div className="traffic-actions">
            <button type="button" onClick={()=>{history.push('/')}} class="btn btn-success">Home page</button>
            </div>
          </div>
        </div>}



        {page === 2 &&
        <div className="col-md-12">
          <div className="score-lights">
            <h3>Risponsible Research and Innovation Final score</h3>
            <hr />

            <div class="trafficlight">
              <div class="red disactivated"></div>
              <div class="yellow active"></div>
              <div class="green disactivated"></div>
            </div>

            <div className="traffic-description bg-yellow">
              <p className="">{text}</p>
            </div>
            <div className="traffic-actions">
            <button type="button" onClick={()=>{history.push('/')}} class="btn btn-success">Home page</button>
            </div>
          </div>
        </div>}

        {page === 3 &&
        <div className="col-md-12">
          <div className="score-lights">
            <h3>Risponsible Research and Innovation Final score</h3>
            <hr />

            <div class="trafficlight">
              <div class="red disactivated"></div>
              <div class="yellow disactivated"></div>
              <div class="green active"></div>
            </div>

            <div className="traffic-description bg-green">
              <p className="">{text}</p>
            </div>
            <div className="traffic-actions">
            <button type="button" onClick={()=>{history.push('/')}} class="btn btn-success">Home page</button>
            </div>
          </div>
        </div>}


        {page === 0 &&
        <div className="col-md-12">
          <div className="score-lights">
            <h3>Risponsible Research and Innovation Final score</h3>
            <hr />

            
            <h4>{evaluation.project}</h4>
            <div className="traffic-description bg-normal">
              <p className="">{text}</p>
            </div>
            <div className="traffic-actions">
            <button type="button" onClick={()=>{history.push('/')}} class="btn btn-success">Home page</button>
            </div>
          </div>
        </div>}


        {page === -1 &&
        <div className="col-md-12">
          <div className="score-lights">
            <h3>Risponsible Research and Innovation Final score</h3>
            <hr />

            
            {/* <h4>{evaluation.project}</h4> */}
            <div className="traffic-description bg-normal">
              <p className="">{text}</p>
            </div>
            <div className="traffic-actions">
            <button type="button" onClick={()=>{history.push('/')}} class="btn btn-success">Home page</button>
            </div>
          </div>
        </div>}

{/* 
<div className="col-md-12">
  
          <div className="score-lights">
          <i  style={{color:'#cf0610', marginBottom:'1%'}}  class="fa-solid fa-circle-exclamation"></i>
          <h4 style={{color:'#cf0610'}}>To obtain an overall score for your project (RRI), you have already completed the initial evaluation. Please select any other layer and continue with the assessment.</h4>
          <hr />

            <h4>Layers</h4>
            <div className="dashboard-layers ">
              
              <div className="score-container score-container-finished">
                  <h5>Layer 1</h5>
              </div>
              <div className="score-container">
                  <h5>Layer 2</h5>
              </div>
              <div className="score-container">
                  <h5>Layer 3</h5>
              </div>

            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default DashboardScreen;
