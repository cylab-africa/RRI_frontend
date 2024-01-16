import React from "react";

const AboutusPage = () => {
  return (
    <div className="jumbotron about-body">
      <h4 className="about-title">About Us</h4>

      <p className="about-description">
        RRI Is a project Lorem ipsum dolor sit, amet consectetur adipisicing
        elit. Sint temporibus vero veritatis ullam blanditiis provident odit,
        incidunt debitis illum ipsa saepe aliquam architecto quos! Nisi
        accusantium consectetur a velit eveniet
      </p>

      <div className="team-member">
        <h2 className="member-name">Wambui</h2>
        <p className="member-role">Reseach Associate</p>
      </div>

      <div className="team-member">
        <h2 className="member-name">Ines </h2>
        <p className="member-role">Research Assistant</p>
      </div>
    </div>
  );
};

export default AboutusPage;
