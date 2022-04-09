import React, { Component } from "react";
import axios from "axios";
import { Container, Form, Button, ButtonGroup } from "react-bootstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstOperand: "",
      secondOperand: "",
      result: "",
      showSuccessMessage: false,
      showFailedMessage: false,
      messageContents: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      result: "",
      showSuccessMessage: false,
      showFailedMessage: false,
      messageContents: "",
    });
  };

  handleSubmit = (event) => {
    if (this.state.firstOperand === "" || this.state.secondOperand === "") {
      this.setState({
        showSuccessMessage: false,
        showFailedMessage: true,
        messageContents:
          "Make sure to enter a value for first and second operand!",
      });
    } else {
      if (event.target.name === "addBtn") {
        axios
          .get(
            "https://us-central1-keen-inscriber-345701.cloudfunctions.net/flask-calc-cors",
            {
              params: {
                operation: "add",
                data1: this.state.firstOperand,
                data2: this.state.secondOperand,
              },
            }
          )
          .then((res) => {
            this.setState({
              result: res.data.data.value,
              showSuccessMessage: false,
              showFailedMessage: false,
              messageContents: "",
            });
          });
      }

      if (event.target.name === "subBtn") {
        axios
          .get(
            "https://us-central1-keen-inscriber-345701.cloudfunctions.net/flask-calc-cors",
            {
              params: {
                operation: "sub",
                data1: this.state.firstOperand,
                data2: this.state.secondOperand,
              },
            }
          )
          .then((res) => {
            this.setState({
              result: res.data.data.value,
              showSuccessMessage: false,
              showFailedMessage: false,
              messageContents: "",
            });
          });
      }

      if (event.target.name === "mulBtn") {
        axios
          .get(
            "https://us-central1-keen-inscriber-345701.cloudfunctions.net/flask-calc-cors",
            {
              params: {
                operation: "mul",
                data1: this.state.firstOperand,
                data2: this.state.secondOperand,
              },
            }
          )
          .then((res) => {
            this.setState({
              result: res.data.data.value,
              showSuccessMessage: false,
              showFailedMessage: false,
              messageContents: "",
            });
          });
      }

      if (event.target.name === "divBtn") {
        axios
          .get(
            "https://us-central1-keen-inscriber-345701.cloudfunctions.net/flask-calc-cors",
            {
              params: {
                operation: "div",
                data1: this.state.firstOperand,
                data2: this.state.secondOperand,
              },
            }
          )
          .then((res) => {
            this.setState({
              result: res.data.data.value,
              showSuccessMessage: false,
              showFailedMessage: false,
              messageContents: "",
            });
          });
      }

      if (event.target.name === "pubSubBtn") {
        if (this.state.result === "") {
          this.setState({
            showSuccessMessage: false,
            showFailedMessage: true,
            messageContents: "You cannot publish empty result!",
          });
        } else {
          axios
            .get(
              "https://us-central1-keen-inscriber-345701.cloudfunctions.net/flask-calc-pubsub",
              {
                params: { message: this.state.result },
              }
            )
            .then((res) => {
              this.setState({
                showSuccessMessage: true,
                showFailedMessage: false,
                messageContents: res.data.data,
              });
            })
            .catch((err) => {
              this.setState({
                showSuccessMessage: false,
                showFailedMessage: true,
                messageContents: "Failed",
              });
            });
        }
      }
    }
  };

  render() {
    return (
      <Container className="mt-5">
        <Form>
          <Form.Group className="mb-3" controlId="firstOperand">
            <Form.Label>First Operand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first operand"
              onChange={this.handleChange}
              name="firstOperand"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="secondOperand">
            <Form.Label>Second Operand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter second operand"
              onChange={this.handleChange}
              name="secondOperand"
            />
          </Form.Group>

          <div className="d-flex justify-content-center">
            <Button
              variant="dark"
              className="mx-2"
              onClick={this.handleSubmit}
              name="addBtn"
            >
              Add
            </Button>
            <Button
              variant="dark"
              className="mx-2"
              onClick={this.handleSubmit}
              name="subBtn"
            >
              Sub
            </Button>
            <Button
              variant="dark"
              className="mx-2"
              onClick={this.handleSubmit}
              name="mulBtn"
            >
              Mul
            </Button>
            <Button
              variant="dark"
              className="mx-2"
              onClick={this.handleSubmit}
              name="divBtn"
            >
              Div
            </Button>
          </div>

          <Form.Group className="mt-3" controlId="secondOperand">
            <Form.Control
              type="text"
              placeholder="Result"
              value={this.state.result}
              disabled
            />
          </Form.Group>

          <div className="mt-3">
            <Button
              variant="success"
              onClick={this.handleSubmit}
              name="pubSubBtn"
            >
              Pub/Sub Result
            </Button>
            <div className="mt-2">
              {this.state.showSuccessMessage ? (
                <h3 className="text-success">{this.state.messageContents}</h3>
              ) : null}
              {this.state.showFailedMessage ? (
                <h3 className="text-danger">{this.state.messageContents}</h3>
              ) : null}
            </div>
          </div>
        </Form>
      </Container>
    );
  }
}

export default App;
