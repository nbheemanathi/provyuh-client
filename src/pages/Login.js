import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";
import { LOGIN_USER } from "../util/graphql";
import Header from "../partials/Header";

export default function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUser, {
    username: "",
    password: "",
  });

  const [login,{loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      //setting user data in context store 
      context.login(result.data.login);
      props.history.push("/dashboard");
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
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Welcome back. We exist to make your meals easier.</h1>
              </div>
              <div className="max-w-sm mx-auto">
                <form onSubmit={onSubmit}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="Username"
                      >
                        Username
                      </label>
                      <input
                        id="Username"
                        name="username"
                        type="text"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your Username"
                        required
                        value={values.username}
                        onChange={onChange}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label
                          className="block text-gray-800 text-sm font-medium mb-1"
                          htmlFor="password"
                        >
                          Password
                        </label>
                      </div>
                      <input
                        id="password"
                        type="password"
                        name="password"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your password"
                        required
                        value={values.password}
                        onChange={onChange}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button disabled={loading}
                        type="submit"
                        className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                      >
                        {loading ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
                        ) : (
                          "Sign In"
                        )}
                      </button>
                    </div>
                  </div>
                </form>
                {Object.keys(errors).length > 0 && (
                  <div className="text-center py-4 text-red-500">
                    <ul className="list">
                      {Object.values(errors).map((error) => (
                        <li key={error}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
