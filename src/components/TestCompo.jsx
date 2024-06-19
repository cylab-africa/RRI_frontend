import React, { useState } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';

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

  const handleSubmit = () => {
    onSubmit(selectedProject, newProjectName);
  };

  return (
    <Overlay>
      <PopupContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>Start the evaluation</Title>
        <p>Create a project/Select existing one</p>
        <hr />
        <Select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
        >
          <option value="" disabled>Select a project</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>

          ))}
          <option value="" >Clear</option>
        </Select>
        <br />
        {selectedProject === '' && <Input
          type="text"
          placeholder="Enter new project name"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
        />}
        <br />
        <br />
        <Button onClick={handleSubmit}>Submit</Button>
      </PopupContainer>
    </Overlay>
  );
};

export default TestCompo