import React from 'react';

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import { Login, Send, Changepwd, Signup, Created, Confirmotp, Forgotpwd, Home, Profile, Details } from "./components";

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
          <Route path = "/created" exact component = { () => <Created />}/>
          <Route path = "/profile" exact component = { () => <Profile />}/>
          <Route path = "/details" exact component = { () => <Details />}/>
        </Switch>
      </Router>
    </div>
  );
}
export default App;