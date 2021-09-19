import { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import gql from "graphql-tag";

import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";

export default function LikeButton({ user, post: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  return (
    <>
      {user ? (
        <IconButton
          aria-label="like post"
          onClick={likePost}
          color={liked ? "secondary" : "default"}
        >
          <FavoriteIcon />
        </IconButton>
      ) : (
        <Link to="/login">
          <IconButton aria-label="like post">
            <FavoriteIcon />
          </IconButton>
        </Link>
      )}
      <p>{likeCount}</p>
    </>
  );
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;
