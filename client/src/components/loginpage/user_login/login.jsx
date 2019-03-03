import React, { Component } from "react";
import { Input, Icon } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./login.css";

class Login extends Component {
  //need to check if login is active
  constructor() {
    super();
    this.state = {
      redirectTo: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.getCookie = this.getCookie.bind(this);
    // this.componentDidMount = this.componentDidMount.bind(this);
  }

  handleChange(event) {
    // //console.log(event.target.name, event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  //axios post for user login
  handleSubmit(event) {
    event.preventDefault();
    //console.log("handleSubmit with ", this.state.email + this.state.password);
    axios
      .post("/user/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          this.setState({
            userInfo: response.data,
            redirectTo: "/user"
          });
          //console.log("post login user response: ", response.data);
        }
      })
      .catch(error => {
        //console.log("Login page .catch error: ", error);
      });
  }

  // componentDidMount() {
  //   this.getCookie();
  // }

  //this call is not passported
  // getCookie() {
  //   axios.get("/user/").then(response => {
  //     //console.log("Get user response: ");
  //     //console.log(response.data.user);
  //     //here need to pass id back from passport call
  //     if (response.data.user) {
  //       this.setState({
  //         redirectTo: "/users"
  //       });
  //     } else {
  //       //console.log("No user found.");
  //       this.setState({
  //         redirectTo: null
  //       });
  //     }
  //   });
  // }

  render() {
    if (this.state.redirectTo) {
      //console.log("Hiting loginpage user_login login Redirect");
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <div>
          <div className="column">
            <div className="login_page_title">
              <p>
                <Icon className="computerIcon" name="computer" size="huge" />
              </p>
              devTinder
            </div>
            <div className="rowUser">
              <Input
                name="email"
                className="emailInput"
                label="Email"
                iconPosition="left"
                icon="envelope"
                placeholder="ie: John@google.com"
                onChange={this.handleChange}
              />
            </div>
            <div className="rowPassword">
              <Input
                name="password"
                type="password"
                className="passwordInput"
                label="Password"
                iconPosition="left"
                icon="key"
                placeholder="ie: maryklover123"
                onChange={this.handleChange}
              />
            </div>
            <div className="rowLogaction">
              <div className="login">
                <button
                  className="ui secondary button loginAction"
                  onClick={this.handleSubmit}
                >
                  Sign In
                </button>
              </div>
              <div className="forgotpassword">
                <button className="ui basic button forgotAction">
                  Forgot Password?
                </button>
              </div>
              <div className="newDevtinder">
                <p>New to DevTinder?</p>
                Sign Up and start using DevTinder
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Login;
