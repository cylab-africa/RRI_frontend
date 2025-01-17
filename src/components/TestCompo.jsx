import React, { useState } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import swal from "sweetalert";
import { API } from "../apis/http";
import { addToken } from '../utils/localStorageUtils';
import { useHistory, useLocation } from "react-router-dom";
import { checkUserLoggedIn, SaveToIndexedDB } from '../helpers/indexedDB';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
`;

const PopupContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 55%;
  height:70%;
  display: flex;
  flex-direction: column;
//   justify-content: center;
  padding-left:4%;
  padding-right:4%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  text-align:center;
`;

const Title = styled.h2`
  margin-top: 0;
  
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  // height: 100px; 
  overflow-y: auto; 

`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #6D6E71;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #ccc;
    color: #6D6E71;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

// Popup Component
const TestCompo = ({ projects, onClose, onSubmit }) => {
  const [selectedProject, setSelectedProject] = useState('');
  const [newProjectName, setNewProjectName] = useState('');
  const [loading, setLoading] = useState(false);


  // const api = new API()
  const history = useHistory()

  const registerProject = async (projectName) => {
    setLoading(false)

    // Validate name
    if (!projectName || projectName.length < 2) {
      swal("Error!", `Provide a valid project name.`);

      // setModalOpen(false)
      return
    }
    // const isLoggedIn = await checkUserLoggedIn('GoogleCredentialsDB', 'CredentialsStore');
    try {
      // let respo = await api.postRequest("/project", { projectName: projectName }, true);
      localStorage.setItem('projectName',projectName)
      // console.log('respo: ', respo);
      // if (respo.status === 202) {
      //   console.log(respo.data)
      //   addToken(respo.data.data.token);
        swal({
          title: 'project created successfully',
          text: `${projectName}`,
          button: "Start",
        }).then((val) => {
          history.push({
            pathname: "/consent",
            state: { project: projectName },
          });
        });
      // }

      // if (respo.status === 200) {

      //   swal({
      //     title: respo.data.message,
      //     text: `${respo.data.data.name}`,
      //     button: "Start",
      //   }).then((val) => {
      //     history.push({
      //       pathname: "/consent",
      //       state: { project: respo.data.data },
      //     });
      //   });
      // }

      // if (respo.status > 299) {
      //   swal("Error!", `${respo.data.message}`);
      // }


    } catch (e) {
      console.log("Error!", `${e}`);
      swal("Error!", `${e}`);
      if (e) {
        // console.log(e)
        swal("Error!", `${e.response ? e.response.data.message : e.message}`);
      }
    }
    // setModalOpen(false)

    setLoading(false)
  }


  const handleSubmit = () => {
    if (selectedProject != '') {
      registerProject(selectedProject);
    } else if (newProjectName != '' && newProjectName) {
      registerProject(newProjectName)
    }
  };

  return (
    <Overlay>
      <PopupContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>Start the evaluation</Title>
        <p>Create a project/Select existing one</p>
        {projects.length > 0 &&
          (<>
            <label style={{ textAlign: 'left' }} htmlFor="">Select from previous projects</label>
            <Select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
            >
              <option value="" disabled>Select a project</option>
              {projects.map((project, index) => (
                <option key={index} value={project.name}>
                  {project.name}
                </option>

              ))}
              <option value="" >Clear</option>
            </Select></>)}
        <br />
        {selectedProject === '' && projects.length > 0 && <p>Or</p>}
        {selectedProject === '' && <>
          <label style={{ textAlign: 'left' }} htmlFor="">Start a new project evaluation</label>

          <Input
            type="text"
            placeholder="Project name"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
          /> </>}
        <br />
        <br />
        {loading ? <Button >Sending...</Button> : <Button onClick={handleSubmit}>Submit</Button>}
      </PopupContainer>
    </Overlay>
  );
};

export default TestCompo