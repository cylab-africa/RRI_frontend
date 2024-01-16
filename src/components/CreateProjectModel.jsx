import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import { API } from '../apis/http';
import { addToken } from '../utils/localStorageUtils';
import swal from 'sweetalert';
import { Spinner } from 'react-bootstrap';
import { useHistory, useLocation } from "react-router-dom";


const CreateProjectModel = (props) => {

    const {isModalOpen, setModalOpen} = props;
    const [projectName, setProjectName ] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory();

    const api = new API()

    const registerProject= async()=>{
        setLoading(false)

        // Validate name
        if(!projectName || projectName.length < 2)
        {
          swal("Error!", `Provide a valid project name.`);

          setModalOpen(false)
          return
        }
        try{
        let respo = await api.postRequest("/project", { projectName: projectName }, true);
        // console.log(respo)

            if(respo.status === 202){
                addToken(respo.data.data.token);
                respo = await api.postRequest(
                  "/project",
                  { projectName: projectName },
                  true
                );
            }
            setModalOpen(false)

            if(respo.status === 200){
              // console.log(respo)

                swal({
                    title: respo.data.message,
                    text: `${respo.data.data.project}`,
                    button: "Start",
                  }).then((val) => {
                    history.push({
                      pathname: "/evaluation",
                      state: { project: respo.data.data },
                    });
                  });
            }

            if(respo.status > 299){
                swal("Error!", `${respo.data.message}`);
            }


        }catch(e){

          if (e) {
            swal("Error!", `${e.response.data.message}`);
          }
        }
        setModalOpen(false)

        setLoading(false)
      }


  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      {/* <button onClick={openModal}>Open Modal</button> */}

      {isModalOpen && (
        <div onClick={(e)=>{
          if (e.target.className === 'modal-overlay') {
            closeModal();
          }
        }} className="modal-overlay">
          <div className="modal-body">
            {/* <button onClick={closeModal} className="close-button">
              Close Modal
            </button> */}

            <div style={{height:'100%'}} className="modal-content">
              {/* Your modal content goes here */}
              <h3>Please specify the project name to initiate the evaluation process.</h3>
                <form style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%'}} action="">
                    <div style={{width:'70%', display:'flex', flexDirection:'column', alignItems:'flex-start'}} class="mb-3">
                        <label for="project-name" class="form-label">Project name</label>
                        <input type="text" class="form-control" onChange={(text)=>{
                            setProjectName(text.target.value)
                        }} id="project-name" placeholder="Ex: Irembo"/>
                    </div>
                    {!loading ? <Button style={{borderRadius:0, marginTop:'2%'}} variant="dark" onClick={registerProject}>
                        CONTINUE
                    </Button>:
                        <Spinner animation="grow" />
                    
                    }
                    
                </form>
                

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateProjectModel