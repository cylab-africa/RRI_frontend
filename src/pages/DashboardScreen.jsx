import React, { useState, useEffect } from "react";
import { API } from "../apis/http";
import swal from "sweetalert";
import { useHistory, useLocation } from "react-router-dom";
import { Button, Badge, Container, Row, Col, Accordion, Modal } from "react-bootstrap";
import {
  FaAngleLeft,
  FaAngleRight,
  FaCircleExclamation,
} from "react-icons/fa6";
import { FaFilePdf } from "react-icons/fa6";
import { generatePDF, getHtmlContent } from "../utils/htmlToPdf";
import { FaThermometerEmpty } from "react-icons/fa";
import { formatDate, getColorBasedOnNumber, normalizeScoreFun } from "../utils/utils";
import red_dotted_image from "../images/red-dotted.png";
import red_image from "../images/red.png";
import green_dotted_image from "../images/green-dotted.png";
import green_image from "../images/green.png";
import amber_dotted_image from "../images/amber-dotted.png";
import amber_image from "../images/amber.png";
import ProjectPagination from "../components/ProjectPaginator";
import LoadingModal from "../components/LoadingModal";
import { PDFDocument } from "../components/PDFDocument";
//import {PDFaltered} from "../components/PDFaltered";
import ReactPDF from "@react-pdf/renderer";
import { checkUserLoggedIn, getFirstItemFromIndexedDB, SaveToIndexedDB } from "../helpers/indexedDB";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../navigation/AuthProvider";



const DashboardScreen = () => {
  const api = new API();
  let history = useHistory();
  // const location = useLocation()
  const [evaluation, setEvaluation] = useState({});
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const [text, setText] = useState("");
  const { isAuthenticated, setIsAuthenticated, setProfile } = useAuth();
  const [noAccount, setNoAccount] = useState(false);
  const [page, setPage] = useState(0);
  const [buttonText, setButtonText] = useState("Home Page");
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(projects[0]);
  const [currentEvaluation, setCurrentEvaluation] = useState();

  const switchLights = () => {
    // alert(evaluation.score)
    if (evaluation === undefined || evaluations.length === 0) {
      setText(`You need to do atleast one evaluation to see results.`);
      return -1;
    }
    if (loading) {
      return -1;
    }
    if (evaluation.score === 0) {
      if (evaluation.layersDone === 0) {
        setButtonText("Complete the evaluation");
        setText(`No test has been taken yet for this project.`);
      } else if (evaluation.layersDone > 0) {
        setButtonText("Complete the evaluation");

        setText(`Please finish the evalution first to see your results.`);
      }

      return 0;
    } else if (0 < evaluation.score && evaluation.score <= 50) {
      setText(`Project ${evaluation.project} got ${evaluation.score}% overall`);
      return 1;
    } else if (50 < evaluation.score && evaluation.score <= 70) {
      setText(`Project ${evaluation.project} got ${evaluation.score}% overall`);

      return 2;
    } else if (70 < evaluation.score && evaluation.score <= 100) {
      setText(`Project ${evaluation.project} got ${evaluation.score}% overall`);

      return 3;
    } else {
      setText(`Something unexpected happened!`);

      return 4;
    }
  };


  const getPerformanceLabel = (score) => {
    if (score >= 70) {
      return '(Excellent)';
    } else if (score >= 50) {
      return '(Needs improvement)';
    } else {
      return '(Requires Attention)';
    }
  }



  // ----------------------------------- 

  function getQuestionsAndAnswers(data) {
    console.log('data question: ', data.project.answers)
    return data.project.answers.map((answerObj, index) => ({
      number: index + 1,
      question: answerObj.subQuestion.text,
      answer: {
        score: answerObj.score,
        type: answerObj.subQuestion.type
      },
      weight: answerObj.weight
    }));
  }

  const generatePDF = async () => {
    const isLoggedIn = await checkUserLoggedIn('GoogleCredentialsDB', 'CredentialsStore');
    if (!isLoggedIn) {
      setShowModal(true)
      return;
    }

    // async name => {
    // if (!name) throw null;
    const report = await api.getRequest('/report/' + currentEvaluation.id, true);

    console.log('response report: ', report.data.project.description)
    const filtaredData = getQuestionsAndAnswers(report.data);

    const blob = await ReactPDF.pdf(<PDFDocument
      layerScores={[currentEvaluation.score[0], currentEvaluation.score[1], currentEvaluation.score[2]]}
      surveyData={filtaredData}
      principleScores={report.data.project.principleScores}
      names={`${report.data.project.firstName}  ${report.data.project.lastName}`}
      project={currentProject}
      description={report.data.project.description}
      generalScore={currentEvaluation.score[3]} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'RRI_Report.pdf';
    link.click();
    // swal({
    //   text: 'Your names',
    //   content: "input",
    //   button: {
    //     text: "Download",
    //     closeModal: false,
    //   },
    // })
    //   .then(async name => {
    //     if (!name) throw null;
    //     const report = await api.getRequest('/report/' + currentEvaluation.id, true);

    //     console.log('response: ',report)
    //     const filtaredData = getQuestionsAndAnswers(report.data);

    //     const blob = await ReactPDF.pdf(<PDFDocument
    //       layerScores={[currentEvaluation.score[0], currentEvaluation.score[1], currentEvaluation.score[2]]}
    //       surveyData={filtaredData}
    //       principleScores={report.data.project.principleScores}
    //       names={name} project={currentProject}
    //       generalScore={currentEvaluation.score[3]} />).toBlob();
    //     const url = URL.createObjectURL(blob);
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.download = 'RRI_Report.pdf';
    //     link.click();
    //     swal.close();

    //   })

    //   .catch(err => {
    //     console.log('error in report generating: ', err)
    //     if (err?.response) {
    //       // API error
    //       swal("Error fetching report data: " + err.response.data.message);
    //     } else if (err === null) {
    //       swal("You must provide a name for the report.");
    //     } else {
    //       // Generic error
    //       swal("Something went wrong while generating the report.");
    //     }
    //   });

  };



  //  -----------------------------

  const getProjects = async (pid = null) => {
    setLoading(true);
    try {
      let response;
      response = await api.getRequest("/projects", true);
      console.log('projects: ', response)
      if (response.status === 200) {

        let allProjects = response.data.data;
        allProjects.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setProjects(allProjects);
        let seectedProject;
        if (pid) {


          console.log('selected project data: ', response.data.data)
          if (pid) {
            seectedProject = response.data.data.find((obj) => obj.id === pid);
          }
          console.log('pid', pid)
          if (seectedProject) {
            console.log('selected project:', seectedProject)
            setCurrentProject(seectedProject);
          } else {
            seectedProject = response.data.data[0];
            setCurrentProject(seectedProject);
          }
        } else {
          seectedProject = response.data.data[0];
          setCurrentProject(seectedProject);
        }
        console.log('seectedProject.evaluations[0]: ', seectedProject.evaluations[0])
        setCurrentEvaluation(seectedProject.evaluations[0]);
        setLoading(false);
      }
    } catch (e) {
      setNoAccount(true);
      setLoading(false);
    }
    setNoAccount(false);
  };

  const getProject = async (pid = null) => {
    setLoading(true);
    try {
      let response;

      response = await api.getRequest('/projects/' + pid, true);

      if (response.status === 200) {

        let project = response.data;
        if (project) {
          setProjects([project]);
        }

        let seectedProject;
        if (pid) {
          seectedProject = response.data

          console.log('pid', seectedProject)
          if (seectedProject) {
            seectedProject = response.data;
            setCurrentProject(seectedProject.project);
          }
        }
        console.log('seectedProject.evaluations[0]: ', seectedProject.project.evaluations)
        setCurrentEvaluation(seectedProject.project.evaluations[0]);
        setLoading(false);
      }
    } catch (e) {
      setNoAccount(true);
      setLoading(false);
    }
    setNoAccount(false);
  };
  const downloadReport = () => {
    let content = getHtmlContent(
      currentProject.name,
      currentProject.evaluations[0].score[3]
    );
    generatePDF(content);
  };


  const chekIflightIsOn = (color, score) => {
    if (score >= 70) {
      if (color === 'green') {
        return true
      }

    } else if (score < 70 && score >= 50) {
      if (color === 'yellow') {
        return true
      }
    } else if (score < 50 && score >= 0) {
      if (color === 'red') {
        return true
      }
    }
    return false;
  }

  const selectProject = (pid) => {
    const selectedProject = projects.find((obj) => obj.id === pid);
    setCurrentProject(selectedProject);
    setCurrentEvaluation(selectedProject.evaluations[0]);
  };
  const changeTab = (pid, e) => {
    selectProject(pid);
    const tabs = document.querySelectorAll(".nav-link");
    tabs.forEach((el) => {
      el.classList.remove("active");
    });
    tabs[0].classList.add("active");
    const tabPane = document.querySelectorAll(".tab-pane");
    tabPane.forEach((el) => {
      el.classList.remove("active");
      el.classList.remove("show");
      el.classList.remove("fade");
    });
    tabPane[0].classList.add("fade");
    tabPane[0].classList.add("active");
    tabPane[0].classList.add("show");
  };

  const moveToProject = () => {
    history.push({
      pathname: "/consent",
      state: { project: currentProject },
    });
  };


  useEffect(() => {
    const fetchProject=async()=>{
  
      console.log('isAuthenticated changed: ', isAuthenticated);
      let pid = location.state?.projectId;
      if (isAuthenticated) {
        await getProjects(pid);
      }
      else if (pid) {
        await getProject(pid);
      }
    }
    fetchProject()
  }, [isAuthenticated, location.state?.projectId]);

  
  useEffect(() => {
    let page = switchLights();
    setPage(page);
  }, [evaluation, isAuthenticated, switchLights]);

  if (noAccount) {
    return (
      <div>
        <p>Hi there guys!!</p>
      </div>
    );
  }

  // Loading

  if (loading) {
    return (
      <div className="container">
        <LoadingModal show={true} />
      </div>
    );
  }


  const onSuccess = async (response) => {
    try {
      let authResponse;
      let accessToken;
      setShowModal(false)
      const checkUserBody = { token: response.credential };
      // check if user exit
      const checkUserResponse = await api.postRequest("/check-user", checkUserBody, true);
      const data = await checkUserResponse.data;
      const decodedToken = jwtDecode(response.credential);
     
      if (data.userRegistered == false) {
        const registerBody = {
          email: decodedToken.email,
          firstName: decodedToken.given_name,
          lastName: decodedToken.family_name,
          googleCredential: response.credential
        };
        authResponse = await api.postRequest("/signup", registerBody, true);
        accessToken = authResponse.data.accessToken;
      } else {
        accessToken = data.accessToken;
      }
      localStorage.setItem('access token', accessToken)
      // Save Google credentials to IndexedDB
      const googleCredentials = {
        id: decodedToken.sub, // unique identifier
        token: response.credential,
        email: decodedToken.email,
        firstName: decodedToken.given_name,
        lastName: decodedToken.family_name,
        picture: decodedToken.picture,
        accessToken: accessToken
      };
      await SaveToIndexedDB('GoogleCredentialsDB', 'CredentialsStore', googleCredentials);

      // update profile 
      const storedCredentials = await getFirstItemFromIndexedDB('GoogleCredentialsDB', 'CredentialsStore');
      if (storedCredentials) {
        console.log('stored credential: ', storedCredentials)
        const decodedToken = jwtDecode(storedCredentials.accessToken);
        setProfile(decodedToken);
      }

      // const body = { layerId: 1, projectName: localStorage.getItem('projectName'), projectAnswers:{answers: answers} };
      const projectAnswers = await getFirstItemFromIndexedDB('projectDB', 'answersStore')
        .catch((error) => {
          console.error('Error retrieving project answers:', error);
          return null;
        });
      
      // submit answers
      if (projectAnswers) {
        const projectName = localStorage.getItem('projectName');

        const answersBody = {
          projectName: projectName,
          projectAnswers: projectAnswers.projectAnswers
        }
        
        try {
          let evalResponse;
          console.log('curr: ',currentEvaluation)
          if (answersBody) {
            evalResponse = await api.postRequest("/submit-auth", answersBody, true);
  
            // Ensure evalResponse contains data before setting state
            if (evalResponse && evalResponse.data) {
              setCurrentEvaluation(evalResponse.data.evaluation);

              // Wait for the state update (optional, if needed)
              await new Promise((resolve) => setTimeout(resolve, 0));
            }

            setIsAuthenticated(true);
          }

        } catch (error) {
          console.error('error: ', error)
          swal("Something went wrong while generating the report.");
        }

      }

      await generatePDF();
      // window.location.reload();

    } catch (error) {
      console.log(error)
    }
  };

  const errorMessage = (error) => {
    console.log(error);
  };

  // No project
  if (projects.length === 0) {
    return (
      <div>
        {/* modal */}

        {/* end of modal */}


        <section className={`about_section layout_padding2 ${isAuthenticated ? "" : "blur"}`}>
          <div class="container">
            <div class="detail-box">
              <div className="row">
                <div className="col"></div>
                <div className="col">
                  <div class="heading_container">

                    <h2>Your dashboard is empty</h2>
                  </div>

                  <a className="green-link" href="/">
                    Start an evaluation
                  </a>
                </div>
                <div className="col"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      {(showModal == true) &&
        (
          <div className="auth-modal">
            <Modal
              show={showModal}
              onRequestClose={() => console.log("Modal closed")}
              className="auth-modal custom-modal"
              overlayClassName="custom-overlay"
            >
              <div className="modal-content">
                <h2>Sign In </h2>
                <p>Please sign in to To download The full report.</p>
                <GoogleLogin onSuccess={onSuccess} onError={errorMessage} />
                <Button onClick={(e) => {
                  history.push("/");
                }}>
                  Go to Home Page
                </Button>
              </div>
            </Modal>
          </div>
        )}
      <section className="about_section layout_padding2 blur">
        <div class="container">
          <div class="detail-box">
            <div class="heading_container">
              <img
                style={{ width: 30 }}
                src={require("../images/checklist.png")}
                alt=""
              />
              <h2>Evaluation results [{currentProject.name}]</h2>
            </div>

            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  id="home-tab"
                  data-toggle="tab"
                  href="#home"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  {currentProject.name}
                </a>
              </li>

              <li class="nav-item">
                <a
                  class="nav-link"
                  id="contact-tab"
                  data-toggle="tab"
                  href="#contact"
                  role="tab"
                  aria-controls="contact"
                  aria-selected="false"
                >
                  All projects <span class="badge">{projects.length}</span>
                </a>
              </li>

              <li hidden class="nav-item">
                <a
                  // aria-disabled="true"
                  class="nav-link"
                  id="profile-tab"
                  data-toggle="tab"
                  href="#profile"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  Profile
                </a>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <br />

                <div class="card">
                  <div class="card-body">
                    <div className="row">
                      <div className="col-md-7">
                        <h3>{currentProject.name}</h3>
                        {currentEvaluation.layersDone === 0 && (
                          <a onClick={moveToProject} className="red_link">
                            <FaCircleExclamation /> Finish the evaluation for
                            this project <FaCircleExclamation />
                          </a>
                        )}
                      </div>
                      <div className="col"></div>
                      <div className="col-md-3">Completed</div>
                    </div>
                    <div className="row">
                      <div className="col-md-7">
                        <p hidden>Project description</p>
                      </div>
                      <div className="col"></div>
                      <div className="col-md-3">
                        <small style={{ fontSize: 11 }}>
                          {formatDate(currentEvaluation.startTime)}
                        </small>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-7 col-sm-12">
                        {/* <h5>Your RRI Index Score</h5> */}

                        <div className="row">

                          <div id="traffic-light">

                            <input type="radio" className={chekIflightIsOn('red', currentEvaluation.score[3]) ? "traffic-light-color color1-active" : "traffic-light-color"} id="color1" value="color1" />
                            <input type="radio" className={chekIflightIsOn('yellow', currentEvaluation.score[3]) ? "traffic-light-color color2-active" : "traffic-light-color"} id="color2" value="color2" />
                            <input type="radio" className={chekIflightIsOn('green', currentEvaluation.score[3]) ? "traffic-light-color color3-active" : "traffic-light-color"} id="color3" value="colo3" />
                          </div>
                        </div>

                        <br />
                        <div className="row">
                          <div className="col">
                            <h4>
                              RRI Index score:{" "}
                              <span
                                style={{
                                  color: getColorBasedOnNumber(
                                    currentEvaluation.score[3], 100
                                  ),
                                }}
                              >
                                {normalizeScoreFun(currentEvaluation.score[3], 100, 100)}%{' '}
                              </span>{" "}
                              <span style={{
                                color: getColorBasedOnNumber(
                                  currentEvaluation.score[3], 100
                                ),
                                width: 'fit-content'
                              }}>
                                {getPerformanceLabel(normalizeScoreFun(currentEvaluation.score[3], 100, 100))}
                              </span>
                            </h4>
                            <div
                              hidden
                              class="progress"
                              role="progressbar"
                              style={{ height: 12 }}
                              aria-label="Example with label"
                              aria-valuenow="85"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            >
                              <div
                                class="progress-bar"
                                style={{
                                  width: "85%",
                                  backgroundColor: "green",
                                }}
                              >
                                85%
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col"></div>
                      <div className="col-md-3">
                        <ol className="evaluation-list">
                          {currentProject.evaluations?.map((element, index) => {
                            if (element.id === currentEvaluation.id) {
                              return (
                                <li key={index}
                                  onClick={() => setCurrentEvaluation(element)}
                                  style={{ textDecoration: "underline" }}
                                >
                                  Evaluation {currentProject.evaluations.length - index}{' '} :{" "}
                                  {formatDate(element.startTime)}
                                </li>
                              );
                            }
                            return (
                              <li onClick={() => setCurrentEvaluation(element)}>
                                Evaluation {currentProject.evaluations.length - index} :{" "}
                                {formatDate(element.startTime)}
                              </li>
                            );
                          })}
                        </ol>
                      </div>
                    </div>
                    <br />
                    {/*  */}

                    <div className="row">
                      <div className="col">
                        <h3>Score by each layer of the framework</h3>

                        <div className="card">
                          <div class="card-body">
                            <h5>Layer 1</h5>
                            <p>
                              Layer 1 : This score represents an average of your
                              performance on questions related to Layer 1 of the
                              RRI Framework. These questions cover topics such
                              as <b>Privacy</b>, <b>Security</b>, and various other aspects.
                            </p>
                            <p>
                              Score :{" "}
                              <span
                                style={{
                                  backgroundColor: getColorBasedOnNumber(currentEvaluation.score[0], 34.6),
                                  color: "#fff",
                                }}
                                className="badge"
                              >
                                {normalizeScoreFun(currentEvaluation.score[0], 100, 34.6)}/34.6
                              </span>
                              <span style={{
                                color: getColorBasedOnNumber(
                                  currentEvaluation.score[0], 100
                                )
                              }}>
                                {getPerformanceLabel(normalizeScoreFun(currentEvaluation.score[0], 100, 100))}
                              </span>
                            </p>
                          </div>
                        </div>
                        <br />
                        <div className="card">
                          <div class="card-body">
                            <h5>Layer 2</h5>
                            <p>
                              Layer 2 : This score represents an average of your
                              performance on questions related to Layer 2 of the
                              RRI Framework. These questions cover topics such
                              as <b>Transparency and accountabiity</b> , <b>Gender equity
                                and inclusion</b> , <b>Fairness</b> and various other aspects.
                            </p>
                            <p>
                              Score :{" "}
                              <span
                                style={{
                                  backgroundColor: getColorBasedOnNumber(currentEvaluation.score[1], 30),
                                  color: "#fff",
                                }}
                                className="badge"
                              >
                                {normalizeScoreFun(currentEvaluation.score[1], 100, 33.1)}/33.1
                              </span>
                              <span style={{
                                color: getColorBasedOnNumber(
                                  currentEvaluation.score[1], 100
                                )
                              }}>
                                {getPerformanceLabel(normalizeScoreFun(currentEvaluation.score[1], 100, 100))}
                              </span>
                            </p>
                          </div>
                        </div>
                        <br />
                        <div className="card">
                          <div class="card-body">
                            <h5>Layer 3</h5>
                            <p>
                              Layer 3 :This score represents an average of your
                              performance on questions related to Layer 3 of the
                              RRI Framework. These questions are related to
                              <b> Human Agency and Oversight</b>.
                            </p>
                            <p>
                              Score :{" "}
                              <span
                                style={{
                                  backgroundColor: getColorBasedOnNumber(currentEvaluation.score[2], 20),
                                  color: "#fff"
                                }}
                                className="badge"
                              >
                                {normalizeScoreFun(currentEvaluation.score[2], 100, 32.3)}/32.3
                              </span>
                              <span style={{
                                color: getColorBasedOnNumber(
                                  currentEvaluation.score[2], 100
                                )
                              }}>
                                {getPerformanceLabel(normalizeScoreFun(currentEvaluation.score[2], 100, 100))}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <br />
                    <br />

                    <div className="row">
                      <div className="col">
                        <div className="card">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-10 col-sm-6">
                                Total score : {normalizeScoreFun(currentEvaluation.score[3], 100, 100)}%
                              </div>
                              <div className="col-md-2 col-sm-6">
                                <button onClick={generatePDF} type="button" class="btn btn-success">
                                  Your report
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />

              <div
                class="tab-pane fade"
                id="contact"
                role="tabpanel"
                aria-labelledby="contact-tab"
              >
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <h3>
                          Previous evaluation projects ({projects.length})
                        </h3>
                        <ProjectPagination itemsPerPage={2} items={projects} changeTab={changeTab} />

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />

              <div
                class="tab-pane fade"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >

                <div className="card">
                  <div className="card-body">
                    <h3>Profile</h3>

                    <p>Full name : Patrick Iradukunda</p>

                    <div className="row">
                      <div className="col-md-4">
                        <form action="">
                          <div class="mb-3">
                            <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Change Your full name
                            </label>
                            <input
                              type="email"
                              class="form-control"
                              id="exampleFormControlInput1"
                              placeholder="Your full name"
                            />
                          </div>
                          <button type="button" class="btn btn-primary">
                            Submit
                          </button>
                        </form>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardScreen;
