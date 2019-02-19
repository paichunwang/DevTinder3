import React from "react";

class Project extends React.Component {
  render() {
    const { location } = this.props;

    return <div>{location.pathname}</div>;
  }
}

export default Project;
