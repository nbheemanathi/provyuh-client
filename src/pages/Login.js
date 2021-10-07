import gql from "graphql-tag";
import React, { useState, useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";
export default function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUser, {
    username: "",
    password: "",
  });

  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    update(_, result) {      
      context.login(result.data.login);
      props.history.push("/");

    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function loginUser() {
    login();
  }
  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          type="text"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />{" "}
        <Form.Input
          label="Enter Password"
          name="password"
          value={values.password}
          type="password"
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
