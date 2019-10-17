import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import axioswithAuth from "../axios";

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5003/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  editMovie = () => {
    this.props.history.push(`/update-movie/${this.state.movie.id}`);
  };

  deleteMovie = () => {
    const id = this.props.match.params.id;
    // 5- we need to hit the quotesURL with a DELETE request.
    // the id of the quote that needs deleting will go
    // at the end of the url (don't forget the forward slash)
    // On success we should fetch all quotes.
    axios
      .delete(`http://localhost:5003/api/movies/${id}`)
      .then(({ data }) => {
        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <button className="save-button" onClick={this.saveMovie}>
          Save
        </button>
        <button className="edit-button" onClick={this.editMovie}>
          Edit
        </button>
        <button className="delete-button" onClick={this.deleteMovie}>
          Delete
        </button>
      </div>
    );
  }
}
