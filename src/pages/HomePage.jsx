import React, { useState } from "react";
import swal from "sweetalert";
import { API } from "../apis/http";
import { useHistory, useLocation } from "react-router-dom";
import { addToken } from "../utils/localStorageUtils";

const HomePage = () => {
  const api = new API();
  const history = useHistory();
  const [projectName, setProjectName] = useState();
  const createProject = async () => {
    swal({
      text: "What's the name of your project?",
      content: "input",
      buttons: ["Close", "Save"],
    })
      .then(async (name) => {
        if (name == null) throw null;
        if (!name) throw new Error("Project name is required");
        if (name.length < 3) throw new Error("Project name too small");
        setProjectName(name);
        return api.postRequest("/project", { projectName: name }, true);
        // return fetch(`https://itunes.apple.com/search?term=${name}&entity=movie`);
      })
      .then((results) => {
        if (results.status === 202) {
          addToken(results.data.data.token);
          return api.postRequest(
            "/project",
            { projectName: projectName },
            true
          );
        }
        return results;
      })
      .then((results) => {
        return results.data;
      })
      .then((json) => {
        const project = json.data;

        if (!project) {
          return swal("Project not created");
        }

        swal({
          title: "Project created",
          text: `${project.name}`,
          button: "Start",
        }).then((val) => {
          history.push({
            pathname: "/evaluation",
            state: { project: project },
          });
        });
      })
      .catch((err) => {
        if (err) {
          swal("Error!", `${err}`);
        } else {
          swal.stopLoading();
          swal.close();
        }
      });
  };

  return (
    <div className="home-body">
      <div style={{ backgroundColor: "#E7ECFF", borderTopLeftRadius:5, borderTopRightRadius:5, padding: "10%" }}>
        <h1 className="home-title">
          Towards Responsible Innovation for Digital Public Goods: Responsible
          Innovation by Design
        </h1>
        <p className="home-description">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus
        </p>
        <a onClick={createProject} className="home-start-button btn btn-dark">
          Take the test
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
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus{" "}
          </p>
        </div>

        <div className="home-layer-container">
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
    </div>
  );
};

export default HomePage;
