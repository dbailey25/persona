import React, { Component } from "react";
import Card from "../../components/Card";
import LoginForm from "../../components/LoginForm";
// import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";

class Login extends Component {
  state = {
    userName: "",
    password: ""
    };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.getArticles();
  };

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col size="md-4">
              <Card title="Login" icon="newspaper-o">
                <LoginForm
                  handleInputChange={this.handleInputChange}
                  handleFormSubmit={this.handleFormSubmit}
                  userName={this.state.userName}
                  password={this.state.password}
                />
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
