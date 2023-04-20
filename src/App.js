import React from 'react';

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import { Login, Send, Forgot, Reset, Winning, Leader, Verify,
Signup, Create, Forum, Thread, Created, Changes, Predictions, Confirm, Exam } from "./components";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path = "/" exact component = { () => <Login />}/>
          <Route path = "/send" exact component = { () => <Send />}/>
          <Route path = "/forgotpassword" exact component = { () => <Forgot />}/>
          <Route path = "/passwordreset/:resetToken" exact component = { () => <Reset />}/>
          <Route path = "/winning" exact component = { () => <Winning />}/>
          <Route path = "/changepassword" exact component = { () => <Leader />}/>
          <Route path = "/verify/:confirmToken" exact component = { () => <Verify />}/>
          <Route path = "/signup" exact component = { () => <Signup />}/>
          <Route path = "/otp" exact component = { () => <Create />}/>
          <Route path = "/forum" exact component = { () => <Forum />}/>
          <Route path = "/confirmation" exact component = { () => <Thread />}/>
          <Route path = "/created" exact component = { () => <Created />}/>
          <Route path = "/changes" exact component = { () => <Changes />}/>
          <Route path = "/predictions" exact component = { () => <Predictions />}/>
          <Route path = "/confirm" exact component = { () => <Confirm />}/>
          <Route path = "/forgot" exact component = { () => <Exam />}/>
        </Switch>
      </Router>
    </div>
  );
}
export default App;