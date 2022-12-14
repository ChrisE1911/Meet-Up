import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import GroupsComponent from "./components/GroupsComponent";
import GroupDetailsComponent from "./components/GroupDetailsComponent";
import CreateGroupFormComponent from "./components/CreateGroupFromComponent";
import EditGroupFormComponent from "./components/EditGroupFormComponent";




function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/groups' component={GroupsComponent} />
          <Route exact path='/groups/new' component={CreateGroupFormComponent} />
          <Route exact path='/groups/:groupId' component={GroupDetailsComponent} />
          <Route exact path='/groups/:groupId/edit' component={EditGroupFormComponent} />
        </Switch>
      )}
    </>
  );
}

export default App;
