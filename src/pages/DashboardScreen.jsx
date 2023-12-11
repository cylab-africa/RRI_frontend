import React, {useState, useEffect} from "react";
import { API } from "../apis/http";
import swal from "sweetalert";
import { useHistory, useLocation } from "react-router-dom";

const DashboardScreen = () => {
  const api = new API()
  const [evaluation, setEvaluation] = useState({})
  const location = useLocation();


  const getEvaluationsByProjectId =async()=>{
      try{
        // console.log(location.state.projectId)

        const response = await api.getRequest("/evaluation?projectId="+location.state.projectId, true)
        // console.log(response.data.data)

        setEvaluation(response.data.data[0])
      }catch(e){
        swal(e.response.data.message)
      }
  }

  useEffect(()=>{
    // getEvaluationsByProjectId()
  },[])
  return (
    <div className="scores-body">
      {/* <div class="score-container">
        <h1 class="score-title">PROJECT NAME</h1>
        <pre class="score-text">
          {JSON.stringify(evaluation)}
        </pre>
      </div> */}

      <div style={{ width:'100%'}} className="row">
        <div className="col-md-3">
          <div className="score-container">
            <h1>Layer 1</h1>
          </div>

          <div className="score-container">
            <h1>Layer 2</h1>
          </div>

          <div className="score-container">
            <h1>Layer 3</h1>
          </div>
        </div>
        <div className="col-md-9">
        <div className="score-lights">
            <h1>Traffic lights</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
