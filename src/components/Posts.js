import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

function Posts({ data }) {
  const posts = data.posts || [];
  return (
    <div>
      {posts.map(({ id, title, body }) => (
        <div key={id}>
          <h2>{title}</h2>
          <p>{body}</p>
        </div>
      ))}
    </div>
  );
}

Posts.propTypes = {
  data: PropTypes.shape({
    posts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    })),
  }).isRequired,
};

export const PostsQuery = gql`
  query {
    posts {
      id
      title
      body
    }
  }
`;

export default graphql(PostsQuery)(Posts);
