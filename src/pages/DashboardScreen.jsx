import React, { useState, useEffect } from "react";
import { API } from "../apis/http";
import swal from "sweetalert";
import { useHistory, useLocation } from "react-router-dom";
import { Button, Badge, Container, Row, Col, Accordion } from "react-bootstrap";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { FaFilePdf } from "react-icons/fa6";

const ChipList = ({ items, setEvaluation, active }) => {
  const [startIndex, setStartIndex] = useState(0);

  const TruncatedBadgeActive = ({ item, index }) => {
    const truncatedText =
      item.name.length > 9 ? `${item.name.slice(0, 9)}...` : item.name;

    return (
      <Badge
        title={item.name}
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
      item.name.length > 9 ? `${item.name.slice(0, 9)}...` : item.name;

    return (
      <Badge
        title={item.name}
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
    <div style={{ padding: 0 }}>
      {!isBeginning && <FaAngleLeft onClick={handleGoBack} />}
      {displayedItems.map((item, index) => {
        if (item.id === active.id) {
          return <TruncatedBadgeActive index={index} item={item} />;
        }
        return <TruncatedBadge index={index} item={item} />;
      })}
      {!isEnd && <FaAngleRight onClick={handleGetMore} />}
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
  const [noAccount, setNoAccount] = useState(false);
  const [page, setPage] = useState(0);
  const [buttonText, setButtonText] = useState("Home Page");
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(projects[0]);
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

  const getProjects = async () => {

    setLoading(true);
    try{
    const response = await api.getRequest("/projects", true);
    // console.log(response)
    if (response.status === 200) {
      setProjects(response.data.data);
      setCurrentProject(response.data.data[0]);
    }
  }catch(e){
    setNoAccount(true)
  }
  setNoAccount(false)

    setLoading(false);
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
    // getEvaluations();
    getProjects();
  }, []);

  useEffect(() => {
    let page = switchLights();
    setPage(page);
  }, [evaluation]);

  if(noAccount){
    return <div><p>Hi there guys!!</p></div>
  }

  return (
    <div className="jumbotron scores-body">
      <div style={{ width: "100%" }} className="row">
        <div
          style={{ width: "100%", display: "flex", alignItems: "flex-start" }}
        >
          <ChipList
            active={currentProject}
            setEvaluation={setCurrentProject}
            items={projects}
          />
          {/* <div style={{width:'200%'}}></div> */}
        </div>

        <div
        className="dahboard-board"
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
          
            marginTop: 20,
          }}
        >
         
          <div
            className="description-board"
            style={{
              height:'100%',
              width: "80%",
              border: "solid",
              borderRadius: 5,
              borderWidth: 0.5,
              borderColor: "grey",
              margin: 10,
            }}
          >
            <div
              style={{
                height: "85%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Accordion style={{ width: "95%" }} defaultActiveKey="0">
                <Accordion.Item  style={{ margin: 10 }} eventKey="0" >
                  <Accordion.Header >LAYER I  <Badge style={{marginLeft:10}}>70%</Badge> </Accordion.Header>
                  <Accordion.Body style={{textAlign:'left', fontSize:12}}>
                      This score represents an average of your performance on questions related to Layer 1 of the RRI Framework. These questions cover topics such as privacy, security, and various other aspects.  
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item style={{ margin: 10 }} eventKey="1">
                  <Accordion.Header>LAYER II  <Badge style={{marginLeft:10}}>70%</Badge></Accordion.Header>
                  <Accordion.Body style={{textAlign:'left', fontSize:12}} >
                      This score represents an average of your performance on questions related to Layer 2 of the RRI Framework. These questions cover topics such as Transparency and accountabiity, Gender equity and inclusion, Fairness and various other aspects.  
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item style={{ margin: 10 }} eventKey="2">
                  <Accordion.Header>LAYER III   <Badge style={{marginLeft:10}}>70%</Badge></Accordion.Header>
                  <Accordion.Body style={{textAlign:'left'}}>
                      This score represents an average of your performance on questions related to Layer 3 of the RRI Framework. These questions are related to Human Agency and Oversight.  
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <p style={{ textAlign: "left", fontSize: 12, width: "94%" }}>
               If you are interested in understanding how we calculated the score for each layer and the <a style={{textDecoration:'none'}} href="">underlying methodology.</a> 
              </p>
            </div>

            <div
              style={{
                height: "15%",
                paddingRight: 10,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Button title="Download your report" variant="dark">
                Download <FaFilePdf />
              </Button>
            </div>
          </div>
          <div
            className="lights"
            style={{
              width: "20%",
              border: "solid",
              borderColor: "grey",
              borderWidth: 0.5,
              borderRadius: 5,
              height:'100%',
              margin: 10,
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              className="red"
              
            >
              <span style={{ fontSize: 22, fontWeight: "bold", color: "#fff" }}>
                70%
              </span>
            </div>

            <div
              className="yellow disactivated"
             
            ></div>

            <div
              className="green disactivated"
             
            ></div>
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default DashboardScreen;
