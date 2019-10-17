import React from "react";
import { Form, Field, Formik } from "formik";
import axioswithAuth from "../axios";

//Step 2 Create the EditMovie Component

export default function EditMovie(props) {
  const handleSubmit = (values, actions) => {
    axioswithAuth()
      .put(`http://localhost:5003/api/update-movie/${values.id}`, values)
      .then(res => {
        console.log(res.data);
      })
      .catch();
  };

  return (
    <Formik
      initialValues={props.values}
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
