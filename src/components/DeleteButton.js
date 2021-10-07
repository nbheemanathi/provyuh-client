import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { Button, Confirm, Icon } from "semantic-ui-react";
import { FETCH_POSTS_QUERY } from "../util/graphql";

export default function DeleteButton({ postId, callback, commentId }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deletePostOrMutation] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);
      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        });
        const posts = data.getPosts.filter((p) => p.id !== postId);
        proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: { getPosts: posts } });
      }
      if (callback) callback();
    },
    variables: {
      postId,
      commentId
    },
  });

  return (
    <>
      <Button as="div" floated="right" onClick={() => setConfirmOpen(true)} basic>
        <Icon name="trash" color="red" style={{ margin: 0 }} />
      </Button>
      <Confirm open={confirmOpen} onCancel={() => setConfirmOpen(false)} onConfirm={deletePostOrMutation} />
    </>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;
const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;
