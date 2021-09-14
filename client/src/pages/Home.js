import { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Post from "../components/Post";
import CachedIcon from "@material-ui/icons/Cached";
import { Container, Box } from "@material-ui/core";

export default function Home() {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  console.log(data);

  // if (data) {
  //   // const { posts } = data.getPosts;
  // }

  return (
    <div>
      <h1>Home Page</h1>
      <h1>Recent Posts</h1>
      {loading ? (
        <CachedIcon />
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
