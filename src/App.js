// import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import './App.css'


export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route  path="/dashboard" component={Dashboard} />
        <Redirect from="/" to="/login" />
      </Switch>
    </BrowserRouter>
  )
}
