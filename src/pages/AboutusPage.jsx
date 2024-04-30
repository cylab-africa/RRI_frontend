import React from "react";

const AboutusPage = () => {
  return (
    <div className="jumbotron about-body" style={{backgroundColor: "#E7ECFF"}}>
      <h4 className="about-title">About The Project</h4>

      <p className="about-description">
      The project aims to promote Responsible Research and Innovation (RRI) in sub-Saharan Africa by developing a tailored framework and web-based tool for assessing how well research and innovation projects incorporate RRI principles.
      </p>
      <hr />
      <h4 className="about-title">The Team</h4>

      <div className="team-member">
        <h2 className="member-name"><a  target="_blank" href="https://rw.linkedin.com/in/wambui-njogu">Wambui Njogu</a></h2>
        <p className="member-role">Reseach Associate &bull; Upanzi network &bull; CyLab Africa </p>
      </div>

      <div className="team-member">
        <h2 className="member-name"><a target="_blank" href="https://rw.linkedin.com/in/in%C3%A8s-ineza-5696a7174?trk=people-guest_people_search-card">Inese Ineza</a></h2>
        <p className="member-role">Research Assistant &bull; Upanzi network &bull; CyLab Africa</p>
      </div>

      <div className="team-member">
        <h2 className="member-name"><a target="_blank" href="https://rw.linkedin.com/in/george-okeyo-59796b11?trk=public_profile_browsemap-profile">Dr George Okeyo Onyango</a>  </h2>
        <p className="member-role">Associate Teaching Professor &bull; CMU Africa</p>
      </div>

      <div className="team-member">
        <h2 className="member-name"><a target="_blank" href="https://www.linkedin.com/in/iradukunda-patrick-9b7ba118b/">Patrick Iradukunda</a></h2>
        <p className="member-role">Research Associate &bull; Upanzi network &bull; CyLab Africa</p>
      </div>
    </div>
  );
};

export default AboutusPage;
