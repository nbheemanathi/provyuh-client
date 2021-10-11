import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './css/styles.scss';
import AOS from 'aos';
import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";
import Dashboard from './pages/Dashboard';

function App() {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    });
  });
  return (
    <AuthProvider>
      <Router>    
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/dashboard" component={Dashboard} />
          <AuthRoute exact path="/register" component={Register} />
          <Route exact path="/posts/:postId" component={SinglePost} />
      </Router>
    </AuthProvider>
  );
}

export default App;
