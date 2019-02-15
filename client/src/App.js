import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Mainpage from "./components/landingpage/index";
import Loginpage from "./components/loginpage/index";
import Signpage from "./components/signpage/index";

class App extends Component {
  shouldComponentUpdate() {
    console.log("Should component update");
  }
  componentDidMount() {
    console.log("App Component Did Mount ... call some thing here for state");
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Mainpage} />
            <Route exact path="/login" component={Loginpage} />
            <Route exact path="/signup" component={Signpage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

// const App = () => (
//   <Router>
//     <div>
//       <Switch>
//         <Route exact path="/" component={Mainpage} />
//         <Route exact path="/login" component={Loginpage} />
//       </Switch>
//     </div>
//   </Router>
// );

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
