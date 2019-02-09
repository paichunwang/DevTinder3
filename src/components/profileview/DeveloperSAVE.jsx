import React, { Component } from "react";
import Navbar from "../mainpage/navBar/navbar";
import "./developerMain.css";
import DeveloperImage from "../../../assets/image/alternativeImage";

export default class developerMain extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <section className="wrapper style1">
          <div className="inner">
            <div className="flex flex-2">
              <div className="mol col1">
                <div className="image round fit">
                  <img src={DeveloperImage} alt="" />
                </div>
              </div>
              <div className="mol col2">
                <h3>As a developer...</h3>
                <p>
                  It is important to keep your skills fine tuned, and what
                  better way to fine tune your skills than while building up
                  your resume and making some money on the side? Dev tinder
                  allows you to accomplish all of the above! By creating an
                  account, you will be eligible to work on a variety of
                  freelance projects our customer user base have created!
                </p>
                <p>
                  So what are you waiting for?! Create a free account today and
                  start building your resume, honing your skills, and making
                  some money on the side!
                </p>
                <a href="/developerlogin" className="button">
                  Start as a developer
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
