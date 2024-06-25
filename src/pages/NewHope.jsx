import React, { useState } from "react";
import swal from "sweetalert";
import { API } from "../apis/http";
import { useHistory, useLocation } from "react-router-dom";
import { addToken } from "../utils/localStorageUtils";
import CreateProjectModel from "../components/CreateProjectModel";

const NewHomePage = () => {
  const api = new API();
  const history = useHistory();
  const [projectName, setProjectName] = useState();
  const [isModalOpen, setModalOpen] = useState(false);

  const registerProject = async () => {
    // Validate name
    if (!projectName || projectName.length < 2) {
      setModalOpen(false);
      return;
    }
    try {
      const respo = await api.postRequest(
        "/project",
        { projectName: projectName },
        true
      );
      console.log(respo);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <section class="slider_section">
        <div
          id="carouselExampleIndicators"
          class="carousel slide"
          data-ride="carousel"
        >
          <ol class="carousel-indicators">
            <li
              data-target="#carouselExampleIndicators"
              data-slide-to="0"
              class="active"
            ></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            {/* <!-- <li data-target="#carouselExampleIndicators" data-slide-to="2"></li> --> */}
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="detail-box">
                <h1>
                  RRI <br />
                  <span>Responsible Research and Innovation</span>
                </h1>
                <p>Towards Responsible Innovation for Digital Public Goods</p>
                <div class="btn-box">
                  <a href="" class="btn-1">
                    Start evaluation
                  </a>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="detail-box">
                <div class="number"></div>
                <h1>
                  RRI <br />
                  <span>Upanzi network</span>
                </h1>
                <p>Promoting Responsible Innovation by Design</p>
                <div class="btn-box">
                  <a href="" class="btn-1">
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="center-line">
        <img style={{width:50}} src={require('../images/ArrowDown.png')} alt="" srcset="" />
      </div>

      <section class="about_section layout_padding2">
        <div class="container">
          <div class="heading_container">
            <img style={{width:40}} src={require('../images/info.png')} alt="" />
            <h2>About Responsible Research and Innovation (RRI)</h2>
          </div>
          <hr />

          <div class="row">
            <div class="col-md-6">
              <div class="img-box">
                <img
                  src={require('../images/rri_layers.jpeg')}
                  title="Designed by Eric semindu - CyLab Africa / Upanzi network"
                  alt=""
                />
                <label style={{fontSize:12}} for="">
                  Layered framework for RRI principles
                </label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="detail-box">
                <div class="heading_container">
                  <h2>Upanzi network</h2>
                </div>
                <p>
                  Upanzi-Network is at the forefront, exploring several digital
                  public goods initiatives in agriculture, health, and financial
                  inclusion to enhance the digital transformation of society.
                </p>

                <div class="heading_container">
                  <h2>RRI</h2>
                </div>
                <p>
                  RRI is a policy-driven concept focused on inclusive and
                  sustainable research and innovation. While prevalent in the
                  Global North as a technology-driven approach, in sub-Saharan
                  Africa, it demands a community-based and livelihood-oriented
                  perspective.
                </p>
                <p>
                  At Upanzi Network, we initiated this project to ensure that
                  not only Digital Public Goods (DPG) projects are created in a
                  socially responsible manner, but also that any other research
                  project can benefit from it.
                </p>
                <div class="btn-box">
                  <a
                    target="_blank"
                    href="https://www.africa.engineering.cmu.edu/research/upanzi/index.html"
                  >
                    <span>Read More about Upanzi network</span>
                    <img src={require('../images/link-arrow.png')} alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


  <section class="us_section layout_padding2">
    <div class="container">
      <div class="heading_container">
        <img style={{width:40}} src={require('../images/process.png')} alt=""/>
        <h2>
          Project evaluation process
        </h2>

      </div>
      <hr/>

      <h4>
        The evauation process
      </h4>

      <div class="us_container">
        <div class="box">
          <div class="img1-box">
          </div>
          <div  style={{width:100, height:100}}  class="img2-box">
            <img src={require('../images/process_1.png')} alt=""/>
          </div>
          <div class="detail-box">
            <h6>
              A Form of questions

            </h6>
          </div>
        </div>
        <div class="box">
          <div class="img1-box">
          </div>
          <div  style={{width:100, height:100}}  class="img2-box">
            <img src={require('../images/process_2.png')} alt=""/>
          </div>
          <div class="detail-box">
            <h6>
               RRI index
            </h6>
          </div>
        </div>
        <div class="box">
          <div class="img1-box">
          </div>
          <div style={{width:100, height:100}} class="img2-box">
            <img src={require('../images/process_3.png')} alt=""/>
          </div>
          <div class="detail-box">
            <h6>
              Evaluation resuts
            </h6>
          </div>
        </div>
      </div>
      <br/>
      <div class="heading_container">
        <h4>
          Understanding the Scores 
        </h4>
      </div>
      <p>
        After answering the questions, the system submits your responses to the <a href="">RRI Index</a> calculator, which classifies the results into three categories based on color.
      </p>


      <div class="color_container">
        <div class="box">
          <div class="img-box">
            <img src={require('../images/red.png')} alt="Red color"/>
          </div>
          <div class="detail-box">
            <h6>
              Lower score
            </h6>
            <h5>
              0<span>%</span> - 49<span>%</span>
            </h5>
           
          </div>
        </div>
        <div class="box">
          <div class="img-box">
            <img src={require('../images/amber.png')} alt="Amber"/>
          </div>
          <div class="detail-box">
            <h6>
              Average score
            </h6>
            <h5>
              50<span>%</span> - 69<span>%</span>
            </h5>
           
          </div>
        </div>
        <div class="box">
          <div class="img-box">
            <img src={require('../images/green.png')} alt="Green"/>
          </div>
          <div class="detail-box">
            <h6>
              Higher score
            </h6>
            <h5>
              70<span>%</span> - 100<span>%</span>
            </h5>
           
          </div>
        </div>
      </div>
      <div class="btn-box">
        <a href="">
          <span>
            Read more
          </span>
          <img src={require('../images/link-arrow.png')} alt=""/>
        </a>
      </div>
    </div>
  </section>

    </div>
  );
};

export default NewHomePage;
