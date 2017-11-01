import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import styles from './CreatePostForm.scss';

class CreatePostForm extends React.Component {
  state = {
    title: '',
    body: '',
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.mutate({
      variables: {
        title: this.state.title,
        body: this.state.body,
      },
    })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleTitleChange = ({ target }) => {
    this.setState({ title: target.value });
  }

  handleBodyChange = ({ target }) => {
    this.setState({ body: target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        <input
          name="title"
          value={this.state.title}
          placeholder="Post title"
          onChange={this.handleTitleChange}
          className={styles.titleInput}
        />
        <textarea
          name="body"
          value={this.state.body}
          placeholder="Post body"
          onChange={this.handleBodyChange}
          className={styles.bodyInput}
        />
        <button type="submit">Add</button>
      </form>
    );
  }
}

CreatePostForm.propTypes = {
  mutate: PropTypes.func.isRequired,
};

const addPost = gql`
  mutation addPost($title: String!, $body: String!) {
    addPost(post: { title: $title, body: $body }) {
      id
      title
      body
    }
  }
`;

export default graphql(addPost)(CreatePostForm);
