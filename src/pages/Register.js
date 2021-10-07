import gql from "graphql-tag";
import React, { useState,useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";

export default function Register(props) {
  const context = useContext(AuthContext);

  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      context.login(result.data.register);

      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }
  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
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
        <Form.Input
          label="Confirm Password"
          name="confirmPassword"
          value={values.confirmPassword}
          type="password"
          error={errors.confirmPassword ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          name="email"
          value={values.email}
          onChange={onChange}
          error={errors.email ? true : false}
          type="email"
        />
        <Button type="submit" primary>
          Register
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

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
