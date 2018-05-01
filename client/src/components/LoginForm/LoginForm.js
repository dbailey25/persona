import React from "react";

const LoginForm = props => (
  <form>
    <div className="form-group">
      <input
        className="form-control"
        id="login"
        type="text"
        value={props.userName}
        placeholder="Username"
        name="username"
        onChange={props.handleInputChange}
        required
      />
      <input
        className="form-control"
        id="password"
        type="text"
        value={props.password}
        placeholder="Password"
        name="password"
        onChange={props.handleInputChange}
        required
      />
    </div>
    <div className="pull-right">
      <button
        onClick={props.handleFormSubmit}
        type="submit"
        className="btn btn-lg btn-primary"
      >
        Submit
      </button>
    </div>
  </form>
);

export default LoginForm;
