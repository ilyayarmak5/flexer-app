import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import { useState } from "react";
import gql from "graphql-tag";
import { FETCH_POSTS_QUERY } from "../utils/graphql";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "../utils/hooks";

export default function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });
  const [errors, setErrors] = useState("");

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      // Save cached data
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      // Push the newest post to the top
      data.getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      values.body = "";
      setErrors("");
    },
    onError(error) {
      setErrors(error.graphQLErrors[0].message);
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <div>
      <Box display="flex" flexDirection="column" alignItems="center">
        <h1>Create a Post</h1>

        <form onSubmit={onSubmit}>
          <TextField
            id="standard-basic"
            label="Post Description"
            name="body"
            type="text"
            onChange={onChange}
            value={values.body}
            error={errors ? true : false}
            fullWidth
            helperText={errors}
            style={{ marginBottom: "50px" }}
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            CREATE
          </Button>
        </form>
      </Box>
    </div>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;
