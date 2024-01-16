import React, { useState, useEffect } from "react";
import { API } from "../apis/http";
import swal from "sweetalert";
import { useHistory, useLocation } from "react-router-dom";
import { Button, Badge, Container, Row, Col } from "react-bootstrap";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const ChipList = ({ items, setEvaluation, active }) => {
  const [startIndex, setStartIndex] = useState(0);

  const TruncatedBadgeActive = ({ item, index }) => {
    const truncatedText =
      item.project.length > 9 ? `${item.project.slice(0, 9)}...` : item.project;

    return (
      <Badge
        title={item.project}
        style={{ cursor: "pointer" }}
        onClick={() => {
          setEvaluation(item);
        }}
        key={index}
        pill
        className="m-1"
        bg="dark"
      >
        {truncatedText}
      </Badge>
    );
  };
  const TruncatedBadge = ({ item, index }) => {
    const truncatedText =
      item.project.length > 9 ? `${item.project.slice(0, 9)}...` : item.project;

    return (
      <Badge
        title={item.project}
        style={{ cursor: "pointer" }}
        onClick={() => {
          setEvaluation(item);
        }}
        key={index}
        pill
        className="m-1"
        bg="secondary"
      >
        {truncatedText}
      </Badge>
    );
  };

  const handleGetMore = () => {
    setStartIndex((prevIndex) => prevIndex + 3);
  };

  const handleGoBack = () => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - 3));
  };

  const displayedItems = items.slice(startIndex, startIndex + 3);
  const isBeginning = startIndex === 0;
  const isEnd = startIndex + 3 >= items.length;

  return (
    <div style={{  padding: 0 }}>
      {!isBeginning && (
          <FaAngleLeft onClick={handleGoBack} />
      )}
        {displayedItems.map((item, index) => {
          if (item.id === active.id) {
            return <TruncatedBadgeActive index={index} item={item} />;
          }
          return <TruncatedBadge index={index} item={item} />;
        })}
      {!isEnd && (
          <FaAngleRight onClick={handleGetMore} />
      )}
    </div>
  );
};

const DashboardScreen = () => {
  const api = new API();
  let history = useHistory();
  const [evaluation, setEvaluation] = useState({});
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [text, setText] = useState("");
  const [page, setPage] = useState(0);
  const [buttonText, setButtonText] = useState("Home Page");

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
      setText(`Somthing un expected happed!`);

      return 4;
    }
  };

  const getEvaluations = async () => {
    try {
     

      const response = await api.getRequest("/evaluation", true);
     
      if (response.data.data.length > 0) {

        setEvaluations(response.data.data);

        if (location.state) {
          setEvaluation(
            response.data.data.filter(
              (item) => item.id === location.state.projectId
            )[0]
          );
        } else {
          setEvaluation(response.data.data[0]);
        }
      } else {
        setEvaluation(undefined);
      }
    } catch (e) {
      console.log(evaluations);
      // swal(e.response.data.message);
    }
  };

  const bottomButtonHandler = () => {
    if (evaluation.layersDone <= 0 || evaluation.layersDone <= 2) {
      setTimeout(() => {
        history.push({
          pathname: "/evaluation",
          state: { project: evaluation },
        });
      }, 1000);
    } else {
      setTimeout(() => {
        history.push({
          pathname: "/",
        });
      }, 1000);
    }
  };

  useEffect(() => {
    getEvaluations();
  }, []);

  useEffect(() => {
    let page = switchLights();
    setPage(page);
  }, [evaluation]);

  
  return (
    <div className="jumbotron scores-body">
      <div style={{ width: "100%" }} className="row">
    
          <div
            style={{ width: "100%", display: "flex", alignItems: "flex-start" }}
          >
            <ChipList
              active={evaluation}
              setEvaluation={setEvaluation}
              items={evaluations}
            />
            {/* <div style={{width:'200%'}}></div> */}
          </div>
          
        {page === 1 && (
          <div className="col-md-12">
            <div className="score-lights">
              <h3>Risponsible Research and Innovation Final score</h3>
              {/* <h4>{evaluation.project}</h4> */}

              {/* <hr /> */}

              <div class="trafficlight">
                <div class="red active"></div>
                <div class="yellow disactivated"></div>
                <div class="green disactivated"></div>
              </div>

              <div className="traffic-description bg-red">
                <p className="">{text}</p>
              </div>
              <div className="traffic-actions">
                <button
                  type="button"
                  onClick={bottomButtonHandler}
                  class="btn btn-dark"
                >
                  {buttonText}
                </button>
              </div>
            </div>
          </div>
        )}

        {page === 2 && (
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
                <button
                  type="button"
                  onClick={bottomButtonHandler}
                  class="btn btn-dark"
                >
                  {buttonText}
                </button>
              </div>
            </div>
          </div>
        )}

        {page === 3 && (
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
                <button
                  type="button"
                  onClick={bottomButtonHandler}
                  class="btn btn-dark"
                >
                  {buttonText}
                </button>
              </div>
            </div>
          </div>
        )}

        {page === 0 && (
          <div className="col-md-12">
            <div className="score-lights">
              <h3>Risponsible Research and Innovation Final score</h3>
              <hr />

              <h4>{evaluation.project}</h4>
              <div className="traffic-description bg-normal">
                <p className="">{text}</p>
              </div>
              <div className="traffic-actions">
                <button
                  type="button"
                  onClick={bottomButtonHandler}
                  class="btn btn-success"
                >
                  {buttonText}
                </button>
              </div>
            </div>
          </div>
        )}

        {page === -1 && (
          <div className="col-md-12">
            <div className="score-lights">
              <h3>Risponsible Research and Innovation Final score</h3>
              <hr />

              <h4>{evaluation.project}</h4>
              <div className="traffic-description bg-normal">
                <p className="">{text}</p>
              </div>
              <div className="traffic-actions">
                <button
                  type="button"
                  onClick={bottomButtonHandler}
                  class="btn btn-success"
                >
                  {buttonText}
                </button>
              </div>
            </div>
          </div>
        )}

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
