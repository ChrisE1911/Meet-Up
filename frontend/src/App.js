import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import GroupsComponent from "./components/GroupsComponent";
import GroupDetailsComponent from "./components/GroupDetailsComponent";
import CreateGroupFormComponent from "./components/CreateGroupFromComponent";
import EditGroupFormComponent from "./components/EditGroupFormComponent";
import EventsComponent from "./components/EventsComponent";
import EventDetailsComponent from "./components/EventDetailsComponent";
import CreateEventFormComponent from "./components/CreateEventFormComponent";
import SplashPageComponent from "./components/SplashPageComponent";
import UserProfileComponent from "./components/UserProfileComponent";
import EditProfileComponent from "./components/EditProfileComponent";




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
          <Route exact path='/' component={SplashPageComponent} />
          <Route exact path='/groups' component={GroupsComponent} />
          <Route exact path='/groups/new' component={CreateGroupFormComponent} />
          <Route exact path='/groups/:groupId' component={GroupDetailsComponent} />
          <Route exact path='/groups/:groupId/edit' component={EditGroupFormComponent} />
          <Route exact path='/events' component={EventsComponent} />
          <Route exact path='/events/:groupId/new' component={CreateEventFormComponent} />
          <Route exact path='/events/:eventId' component={EventDetailsComponent} />
          <Route exact path='/my-profile' component={UserProfileComponent} />
          <Route exact path='/my-profile/edit' component={EditProfileComponent} />
          {/* <Route exact path='/events/:eventId/edit' component={EditEventFormComponent} /> */}
        </Switch>
      )}
    </>
  );
}

export default App;
