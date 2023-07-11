<<<<<<< HEAD
import React from 'react';

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import { Login, Send, Changepwd, Signup, Created, Confirmotp, Trending,
  Forgotpwd, Home, Profile, Details, Ticket, Pay, Accept, Paid, Hits
} from "./components";

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
          <Route path = "/profile/:author" exact component = { () => <Profile />}/>
          <Route path = "/details/:_id" exact component = { () => <Details />}/>
          <Route path = "/tickets/:_id" exact component = { () => <Ticket />}/>
          <Route path = "/pay/:_id" exact component = { () => <Pay />}/>
          <Route path = "/accept" exact component = { () => <Accept />}/>
          <Route path = "/paid" exact component = { () => <Paid />}/>
          <Route path = "/hits" exact component = { () => <Hits />}/>
          <Route path = "/trending" exact component = { () => <Trending />}/>
        </Switch>
      </Router>
    </div>
  );
}
=======
import React from 'react';

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import { Login, Send, Changepwd, Signup, Created, Confirmotp,
  Forgotpwd, Home, Profile, Details, Ticket, Pay, Accept, Paid
} from "./components";

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
          <Route path = "/profile/:author" exact component = { () => <Profile />}/>
          <Route path = "/details/:_id" exact component = { () => <Details />}/>
          <Route path = "/tickets/:_id" exact component = { () => <Ticket />}/>
          <Route path = "/pay/:_id" exact component = { () => <Pay />}/>
          <Route path = "/accept" exact component = { () => <Accept />}/>
          <Route path = "/paid" exact component = { () => <Paid />}/>
        </Switch>
      </Router>
    </div>
  );
}
>>>>>>> cc381b892c93892bec67ebf8aef4d74c2bee83ad
export default App;