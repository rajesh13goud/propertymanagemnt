import React from "react";
import {
  Modal,
  Button,
  FormGroup,
  FormLabel,
  FormControl
} from "react-bootstrap";

class SignModal extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="static-modal">
        <Modal show={this.props.showSignup}>
          <Modal.Header>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>
              <FormGroup controlId="formBasicText">
                <FormLabel>Password</FormLabel>
                <FormControl
                  type="password"
                  placeholder="Enter a password for your account"
                  onChange={e => this.setState({ password: e.target.value })}
                />
                <FormControl.Feedback />
              </FormGroup>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.props.onClose}>Cancel</Button>
            <Button
              bsStyle="primary"
              onClick={() => this.props.onsignupClicked(this.state.password)}
            >
              Sign Up
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default SignModal;
