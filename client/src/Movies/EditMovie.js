import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Field, Formik } from "formik";

//Step 2 Create the EditMovie Component

export default function EditMovie(props) {
  const [movie, setMovie] = useState(null);

  const handleSubmit = (values, actions) => {
    axios
      .put(`http://localhost:5003/api/movies/${values.id}`, values)
      .then(res => {
        actions.resetForm();
        props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  const getMovie = id => {
    axios
      .get(`http://localhost:5003/api/movies/${id}`)
      .then(res => {
        // put movie object in state
        setMovie(res.data);
      })
      .catch(err => console.log(err.response));
  };

 

  // componentDidMount + componentWillReceiveProps
  useEffect(() => {
    // get id from URL
    const id = props.match.params.id;
    getMovie(id);
  }, [props.match.params.id]);

  return (
    <Formik
      initialValues={movie}
      // in case the initialValue changes based on state, use this.
      enableReinitialize
      onSubmit={handleSubmit}
      render={() => (
        <Form className="edit-movie">
          <Field name="title" type="text" placeholder="title" />
          <Field name="director" type="text" placeholder="director" />
          <Field name="metascore" type="number" placeholder="metascore" />
          <input type="submit" />
        </Form>
      )}
    />
  );
}

// <EditMovie values={} />
