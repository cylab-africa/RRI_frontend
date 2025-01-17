import React, { useState, useEffect } from "react";
import QuestionCard from "../components/QuestionCard";
import { API } from "../apis/http";
import { Button, Col, Placeholder, Row } from "react-bootstrap";
import LoadingModal from "../components/LoadingModal";
import ConfirmModal from "../components/ConfirmModal";
import { addToken } from "../utils/localStorageUtils";
import swal from 'sweetalert';
import { useHistory, useLocation } from "react-router-dom";
import EvaluationForm from "../components/Questionaire";
import { fetchQuestions, getFirstItemFromIndexedDB, SaveToIndexedDB } from "../helpers/indexedDB";

const EvaluationPage = (props) => {
  const api = new API()
  const location = useLocation();
  // console.log(location)
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [layerId, setLayerId] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false)
  const [projectId, setProjectId] = useState()
  const [project, setProject] = useState()
  let history = useHistory();

  // console.log(project)

  const getQuestionsLayer = async () => {
    setLoading(true);
    const dbName = "QuestionsDB";
    const storeName = "QuestionsStore";

    try {
      let questions = await getFirstItemFromIndexedDB(dbName, storeName);
      if (questions) {
        console.log('questions: ', questions);
        setQuestions(questions);
      } else {
        setLoading(true)
        try {
          const response = await api.getRequest('/questions')
          console.log('response questions: ', response)
          SaveToIndexedDB(dbName, storeName, response.data.questions);
          setQuestions(response.data.questions)
        } catch (e) {
          console.log(e)
        }
        setTimeout(() => {
          setLoading(false)
          window.scrollTo(0, 0)
        }, 1000)

      }
      // const data = await fetchQuestions(dbName, storeName, api);
      // setQuestions(data);  // Ensure correct state update
    } catch (err) {
      console.error("Error fetching questions:", err);
    } finally {
      setLoading(false);
      window.scrollTo(0, 0);
    }

  }

  const changeLayer = () => {
    setAnswers([])
    if (layerId === 1) {
      setLayerId(2)

    } else if (layerId === 2) {
      setLayerId(3)
    } else {
      alert("Redirect to score view page.")
    }
    setShowConfirm(false)
  }


  useEffect(() => {
    if (layerId > 3) {
      history.push({
        pathname: "/dashboard",
        state: { projectId: location.state.project.id },
      });
    }
    getQuestionsLayer()
    setProjectId(location.state.project.id)
    setProject(location.state.project)

  }, [layerId])


  return (
    <div class="container layout_padding2" >

      {!loading ?

        <EvaluationForm
          projectId={projectId}
          questions={questions}
          scrollUp={() => { window.scrollTo(60, 60) }}
        />

        :

        <div>
          <Placeholder animation="glow">
            <Placeholder style={{ height: 30, margin: 5 }} xs={10} />
            <Placeholder style={{ height: 30, margin: 5 }} xs={10} />
            <Placeholder style={{ height: 30, margin: 5 }} xs={10} />
            <Placeholder style={{ height: 30, margin: 5 }} xs={10} />
            <Placeholder style={{ height: 30, margin: 5 }} xs={10} />
            <Placeholder style={{ height: 30, margin: 5 }} xs={10} />
            <Placeholder style={{ height: 30, margin: 5 }} xs={10} />
            <Placeholder style={{ height: 30, margin: 5 }} xs={10} />
            <Placeholder style={{ height: 30, margin: 5 }} xs={10} />
            <Placeholder style={{ height: 30, margin: 5 }} xs={10} />
          </Placeholder>
        </div>
      }

      <LoadingModal show={loading} />
      <ConfirmModal
        setShow={(val) => { setShowConfirm(false) }}
        show={showConfirm}
        nextEvaluation={changeLayer}
        finishEvaluation={() => {
          // alert("Redirect to score view page.")
          setShowConfirm(false)

          history.push({
            pathname: "/dashboard",
            state: { projectId: projectId },
          });
        }}
      />
    </div>
  );
};

export default EvaluationPage;
