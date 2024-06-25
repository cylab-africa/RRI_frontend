import React from "react";

const AboutusPage = () => {
  return (
    <div>
      <section class="about_section layout_padding2 ">
        <div class="container">
          <div class="detail-box">
            <div class="heading_container">
              <img
                style={{ width: 30, marginBottom:2 }}
                src={require("../images/about.png")}
                alt=""
              />
              <h2>About Upanzi network</h2>
            </div>
            <p>
              Led by Carnegie Mellon University Africa, the Upanzi Network
              leverages the strengths of the African Engineering and Technology
              (Afretec) network. Launched in September 2022, it is funded by the
              Bill & Melinda Gates Foundation.
            </p>
          </div>
          <div class="btn-box">
            <a
              className="green_link"
              target="_blank"
              href="https://www.africa.engineering.cmu.edu/research/upanzi/index.html"
            >
              <span>Read more</span>
              <img src={require("../images/link-arrow.png")} alt="" />
            </a>
          </div>
        </div>
      </section>

      <section class="us_section layout_padding2 layout_padding-bottom">
        <div class="container">
          <div class="heading_container">
            <img style={{width:30}} src={require("../images/group.png")} alt="" />
            <h2>The research team</h2>
            <p style={{textAlign:'left'}}>
              The following are the members of the Upanzi Network who contribute
              daily to the project, although there are other members who
              contribute from near or far.
            </p>
            <br />
          </div>

          <div
           className="profile_section"
          >
            <div class="box">
              <div class="img1-box">
                <img
                  style={{ width: 120, borderRadius: "50%" }}
                  src="https://media.licdn.com/dms/image/C5603AQGDprD5xS2KGw/profile-displayphoto-shrink_200_200/0/1631023345845?e=1724284800&v=beta&t=CqCe0Hxg2Jbq8Njck0Q57KJf64IIqj4bKY85w3CFwzQ"
                  alt="Prof George Okeyo"
                />
              </div>
              <br />

              <div class="detail-box">
                <h6>
                  <a
                    className="green_link"
                    target="_blank"
                    href="https://www.linkedin.com/in/george-okeyo-59796b11/"
                  >
                    Prof George Okeyo
                  </a>
                  <img src={require("../images/link-arrow.png")} alt="" />
                </h6>
              </div>
            </div>

            <div class="box">
              <div class="img1-box">
                <img
                  style={{ width: 120, borderRadius: "50%" }}
                  src="https://media.licdn.com/dms/image/C4D03AQGr8mZZX8TSUg/profile-displayphoto-shrink_200_200/0/1633531021860?e=1724284800&v=beta&t=XcPBuXe2NTdEqE-aoBgwvcStPiRTshchBsPa8AwmnHw"
                  alt="Ines Ineza"
                />
              </div>
              <br />
              <div class="detail-box">
                <h6>
                  <a
                    className="green_link"
                    target="_blank"
                    href="https://www.linkedin.com/in/in%C3%A8s-ineza-5696a7174/"
                  >
                    Ines Ineza
                  </a>
                  <img src={require("../images/link-arrow.png")} alt="" />
                </h6>
              </div>
            </div>

            <div class="box">
              <div class="img1-box">
                <img
                  style={{ width: 120, borderRadius: "50%" }}
                  src="https://media.licdn.com/dms/image/D4D03AQGwMuAfMxLkzg/profile-displayphoto-shrink_200_200/0/1693921988314?e=1724284800&v=beta&t=mDe1bpy1-CkUFdBFfhuax_EKLE_PpwNVZMk03evU4rE"
                  alt="Wambui Njogu"
                />
              </div>
              <br />

              <div class="detail-box">
                <h6>
                  <a
                    className="green_link"
                    target="_blank"
                    href="https://www.linkedin.com/in/wambui-njogu/"
                  >
                    Wambui Njogu
                  </a>
                  <img src={require("../images/link-arrow.png")} alt="" />
                </h6>
              </div>
            </div>
            <div class="box">
              <div class="img1-box">
                <img
                  style={{ width: 120, borderRadius: "50%" }}
                  src="https://media.licdn.com/dms/image/D4D03AQH1sR14oXGE_A/profile-displayphoto-shrink_200_200/0/1693814788005?e=1724284800&v=beta&t=wiEIoRAygPcs0byZxX6w5A6v4kEgoNPPVwBcx151TOw"
                  alt="Patrick Iradukunda"
                />
              </div>
              <br />

              <div class="detail-box">
                <h6>
                  <a
                    className="green_link"
                    target="_blank"
                    href="https://www.linkedin.com/in/iradukunda-patrick-9b7ba118b/"
                  >
                    Patrick Iradukunda
                  </a>
                  <img src={require("../images/link-arrow.png")} alt="" />
                </h6>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutusPage;
