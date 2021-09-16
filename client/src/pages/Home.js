import { useQuery } from "@apollo/react-hooks";
import { useContext } from "react";
import gql from "graphql-tag";
import { AuthContext } from "../context/auth";
import PostForm from "../components/PostForm";

import Post from "../components/Post";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  loadingIcon: {
    margin: "50px 0",
  },
  header: {
    margin: "50px 0",
  },
}));

export default function Home() {
  const classes = useStyles();
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const { user } = useContext(AuthContext);
  return (
    <div>
      <Box display="flex" flexDirection="column" alignItems="center">
        <h1 className={classes.loadingIcon}>Recent Posts</h1>
        {user && <PostForm />}
        {loading ? (
          <CircularProgress className={classes.loadingIcon} />
        ) : (
          data && (
            <Box
              display="flex"
              flexWrap="wrap"
              justifyContent="space-around"
              gap="20px"
            >
              {data.getPosts.map((post) => {
                return <Post key={post.id} post={post} />;
              })}
            </Box>
          )
        )}
      </Box>
    </div>
  );
}

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount

      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
