import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import EditMovie from "./Movies/EditMovie";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  // const [submit, setSubmit] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
      {/* Step 1 */}
      <Route
        path="/update-movie/:id"
        render={props => <EditMovie {...props} values={{}} />}
      />
    </>
  );
};

export default App;
