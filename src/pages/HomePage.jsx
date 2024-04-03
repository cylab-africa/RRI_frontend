import React, { useState } from "react";
import swal from "sweetalert";
import { API } from "../apis/http";
import { useHistory, useLocation } from "react-router-dom";
import { addToken } from "../utils/localStorageUtils";
import CreateProjectModel from "../components/CreateProjectModel";

const HomePage = () => {
  const api = new API();
  const history = useHistory();
  const [projectName, setProjectName] = useState();
  const [isModalOpen, setModalOpen] = useState(false);


  const registerProject= async()=>{

    // Validate name
    if(!projectName || projectName.length < 2)
    {
      setModalOpen(false)
      return
    }
    try{
    const respo = await api.postRequest("/project", { projectName: projectName }, true);
    console.log(respo)
    }catch(e){
      console.log(e)
    }
  }
  

  return (
    <div className="home-body">
      <div style={{ backgroundColor: "#E7ECFF", borderTopLeftRadius:5, borderTopRightRadius:5, padding: "10%" }}>
        <h2 className="home-title">
          Towards Responsible Innovation for Digital Public Goods: Responsible
          Innovation by Design
        </h2>
        <p className="home-description">
        As we conduct research or innovate, let's do so responsibly, considering the community and anyone who may be impacted by our work.
        </p>
        <a onClick={()=>{setModalOpen(true)}} className="home-start-button btn btn-dark">
        Start Evaluation
        </a>
      </div>

      <div style={{ width: "100%" }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "self-start",
            padding: "5px",
          }}
        >
          <h4>ABOUT THE TEST</h4>
          <p style={{ textAlign: "left" }}>
          The diagram below illustrates the three main layers of Responsible Research and Innovation. The evaluation comprises questions focused on these layers, including inquiries about privacy, governance, sustainability, human agency, and more.{" "}
          </p>
        </div>

          <img style={{width:'55%'}}  src={require("../images/rri_layers.jpeg")} alt="" />
        <div hidden className="home-layer-container">
          <div style={{width:'100%', display:'flex', alignItems:'center', marginBottom:20}}>
            <div style={{width:'20%'}}><p>Layer 1</p></div>
            <div style={{display:'flex', width:'80%'}}>
                <div style={{width:'30%', height:80, backgroundColor:'#D9D9D9', display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <p>Human Agency and Oversight</p>
                </div>
                <div style={{width:'13%'}}></div>
                <div style={{width:'30%', height:80, backgroundColor:'#D9D9D9', display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <p>Open Access </p>
                </div>
            </div>
          </div>
          <div style={{width:'100%', display:'flex', alignItems:'center',  marginBottom:20}}>
            <div style={{width:'20%'}}><p>Layer 2</p></div>
            <div style={{display:'flex', width:'80%'}}>
                <div style={{width:'23%', height:80, backgroundColor:'#D9D9D9', display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <p>Responsiveness, Transparency and  Accountability</p>
                </div>
                <div style={{width:'7%'}}></div>
                <div style={{width:'30%', height:80, backgroundColor:'#D9D9D9', display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <p>Sustainability</p>
                </div>
                <div style={{width:'5%'}}></div>
                <div style={{width:'25%', height:80, backgroundColor:'#D9D9D9', display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <p>Fairness,Gender Equality and Inclusity</p>
                </div>
            </div>
          </div>
          <div style={{width:'100%', display:'flex', alignItems:'center',  marginBottom:20}}>
            <div style={{width:'20%'}}><p>Layer 3</p></div>
            <div style={{display:'flex', width:'80%'}}>
                <div style={{width:'25%', height:80, backgroundColor:'#D9D9D9', display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <p>Privacy & Security</p>
                </div>
                <div style={{width:'5%'}}></div>
                <div style={{width:'20%', height:80, backgroundColor:'#D9D9D9', display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <p>Benefit to Society & Public engagement</p>
                </div>
                <div style={{width:'3%'}}></div>
                <div style={{width:'30%', height:80, backgroundColor:'#D9D9D9', display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <p>Ethics and Governance</p>
                </div>
            </div>
          </div>
        </div>
      </div>
      <CreateProjectModel isModalOpen={isModalOpen}  setModalOpen={setModalOpen} setProjectName={setProjectName} />
    </div>
  );
};

export default HomePage;
