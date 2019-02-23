import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Mainpage from "./components/landingpage/index";
import Loginpage from "./components/loginpage/index";
import Signpage from "./components/signpage/index";
import Started from "./components/gettingstarted/index";
import User from "./components/user/index";

import { MuiThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: { useNextVariants: true },
  palette: {
    primary: { main: "#3498db" },
    secondary: { main: "#FFFFFF" },
    inherit: { main: "#3498db" },
    error: { 500: "#f44336" }
  }
});

// function PrivateRoute({ component: Component, authenticated, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={props =>
//         authenticated === true ? (
//           <Component {...props} />
//         ) : (
//           <Redirect
//             to={{ pathname: "/login", state: { from: props.location } }}
//           />
//         )
//       }
//     />
//   );
// }

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: null,
      authenticated: false
    };

    //   this.getUser = this.getUser.bind(this);
    //   this.componentDidMount = this.componentDidMount.bind(this);
    //   this.updateUser = this.updateUser.bind(this);
  }

  // componentDidMount() {
  //   this.getUser();
  // }

  // updateUser(userObject) {
  //   this.setState(userObject);
  // }

  // getUser() {
  //   axios.get("/user/").then(response => {
  //     console.log("Get user response: ");
  //     console.log(response.data);
  //     if (response.data.user) {
  //       console.log("Got User: There is a user saved in the server session: ");

  //       this.setState({
  //         loggedIn: true,
  //         username: response.data.user.username
  //       });
  //     } else {
  //       console.log("Get user: no user");
  //       this.setState({
  //         loggedIn: false,
  //         username: null
  //       });
  //     }
  //   });
  // }

  //this catches when cookie have user session stored and push user to /user page
  // renderRedirect = () => {
  //   if (this.state.loggedIn) {
  //     return <Redirect to="/user" />;
  //   }
  // };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Mainpage} />
              <Route exact path="/login" component={Loginpage} />
              <Route exact path="/signup" component={Signpage} />
              <Route exact path="/gettingstarted" component={Started} />
              <Route exact path="/user" component={User} />
              {/* {this.renderRedirect()} */}
            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;

// import React, { Component } from "react";
// import "./App.css";

// class App extends Component {
//   // Initialize state
//   state = { passwords: [] };

//   // Fetch passwords after first mount
//   componentDidMount() {
//     this.getPasswords();
//   }

//   getPasswords = () => {
//     // Get the passwords and store them in state
//     fetch("/api/passwords")
//       .then(res => res.json())
//       .then(passwords => this.setState({ passwords }));
//   };

//   render() {
//     const { passwords } = this.state;

//     return (
//       <div className="App">
//         {/* Render the passwords if we have them */}
//         {passwords.length ? (
//           <div>
//             <h1>5 Passwords.</h1>
//             <ul className="passwords">
//               {/*
//                 Generally it's bad to use "index" as a key.
//                 It's ok for this example because there will always
//                 be the same number of passwords, and they never
//                 change positions in the array.
//               */}
//               {passwords.map((password, index) => (
//                 <li key={index}>{password}</li>
//               ))}
//             </ul>
//             <button className="more" onClick={this.getPasswords}>
//               Get More
//             </button>
//           </div>
//         ) : (
//           // Render a helpful message otherwise
//           <div>
//             <h1>No passwords :(</h1>
//             <button className="more" onClick={this.getPasswords}>
//               Try Again?
//             </button>
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// export default App;
