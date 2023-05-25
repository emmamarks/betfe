import React from 'react';

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import { Login, Send, Changepwd, Signup, Forgototp, Confirmotp, Forgotpwd, Home } from "./components";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path = "/" exact component = { () => <Login />}/>
          <Route path = "/send" exact component = { () => <Send />}/>
          <Route path = "/signup" exact component = { () => <Signup />}/>
          <Route path = "/reset" exact component = { () => <Changepwd />}/>
          <Route path = "/confirm" exact component = { () => <Confirmotp />}/>
          <Route path = "/forgot" exact component = { () => <Forgotpwd />}/>
          <Route path = "/home" exact component = { () => <Home />}/>
        </Switch>
      </Router>
    </div>
  );
}
export default App;