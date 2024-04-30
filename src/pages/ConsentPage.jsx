import React, {useState, useEffect} from "react";
import { Button, Col, Row } from "react-bootstrap";
import LoadingModal from "../components/LoadingModal";
import { useHistory, useLocation } from "react-router-dom";
import swal from "sweetalert";

const ConsentPage = (props) => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState()
  const [accepted, setAccepted] = useState(false);
  let history = useHistory();
   
  

  const submitEvaluation = (e)=>{
    if(accepted){
        history.push({
            pathname: "/evaluation",
            state: { project: project },
        });
    }else{
        swal(
            {
                title: "Terms and conditions",
                text: "Please read and accept our terms and conditions before proceeding.",
                html: true,
                confirmButtonColor: "red"
            }
        )
    }
  }

  
  
  
  useEffect(()=>{

        setProject(location.state.project)

  },[])

  return (
    <div class="jumbotron conatiner" style={{backgroundColor: "#E7ECFF"}}>
      {/* <h3>Layer {layerId}</h3> */}
      
      <u><b><h3>Responsible Resaerch and Innovation</h3></b></u>
      <br />
      <div style={{textAlign:'left'}}>
      <p>The evaluation consists of <b>14</b> questions, and you will not spend more than <b>15 minutes</b>  responding to all of the questions.</p> 
       <p><u>There are three types of questions:</u></p> 
        <ol>
          <li><b> Open questions:</b> You will provide your answer in a text box. Please take your time with these.</li>
          <li><b>Scaled questions:</b> You will need to choose a value between 1 and 10 to evaluate how well your project aligns with the question.</li>
          <li><b>Likert scale questions:</b> You will indicate how much you agree or disagree with the question.</li>
        </ol>
        <p><small>All questions are compulsory, but if a question is not applicable to your project, simply select the <b>'N/A'</b> choice.</small> </p> 
      
      </div>
      <br />
      <hr />
      <p style={{textAlign:'left'}}>CyLab Africa - Upanzi network cares about your privacy. Therefore, we recommend that you read our <a href="">privacy policy and terms and conditions</a> before you proceed.</p>

      
      <div style={{display:'flex'}}>
          <p style={{marginRight:15}}>By checking the box,  you agree to our  <a href="">Privacy policy and terms and conditions.</a></p>
          <input onChange={()=>{setAccepted(!accepted)}} style={{marginTop:-15}} type="checkbox" name="" id="" />

      </div>
   
      <Row>
        <Col></Col>
        <Col xs={6}></Col>
        <Col style={{display:'flex', justifyContent:'flex-end'}}>
        <Button onClick={submitEvaluation} style={{minWidth:'80%'}} variant="dark">Start</Button>
        </Col>
      </Row>
     <LoadingModal show={loading}  />
     
    </div>
  );
};

export default ConsentPage;
