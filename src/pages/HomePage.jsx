import React, {useState} from "react";
import swal from "sweetalert";
import { API } from "../apis/http";
import { useHistory, useLocation } from "react-router-dom";
import { addToken } from "../utils/localStorageUtils";


const HomePage = () => {
  const api = new API()
  const history = useHistory()
  const [projectName, setProjectName] = useState()
  const createProject = async()=>{
    swal({
        text: "What's the name of your project?",
        content: "input",
        buttons:["Close", "Save"]
      })
      .then(async name => {

        
        if(name == null) throw  null
        if (!name) throw  new Error("Project name is required")
        if(name.length<3) throw new Error("Project name too small")
        setProjectName(name)
        return api.postRequest("/project", {projectName:name}, true)
        // return fetch(`https://itunes.apple.com/search?term=${name}&entity=movie`);
      }).then((results)=>{
        if(results.status === 202){
            addToken(results.data.data.token)
            return api.postRequest("/project", {projectName:projectName}, true)
        }
        return results
      })
      .then(results => {
        return results.data
      })
      .then(json => {
        const project = json.data
       
        if (!project) {
          return swal("Project not created");
        }
       
       
        swal({title: "Project created", text:`${project.name}`, button:"Start"}).then((val)=>{
            history.push({
                pathname: "/evaluation",
                state: { project: project },
            })
        })
      })
      .catch(err => {
        if (err) {
          swal("Error!", `${err}`);
        } else {
          swal.stopLoading();
          swal.close();
        }
      });
  }

  return (
    <div className="home-body">
      <h1 className="home-title">Welcome to the RRI evaluation platform</h1>
      <p className="home-description">
        We are excited to have you! Click the button below to start the
        evaluation.
      </p>
      <a onClick={createProject} className="home-start-button">
        Start Evaluation
      </a>
    </div>
  );
};

export default HomePage;
