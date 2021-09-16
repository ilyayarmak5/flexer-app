import { useState, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useForm } from "../utils/hooks";

import { AuthContext } from "../context/auth";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "500px",
  },

  formInput: {
    marginBottom: "20px",
  },

  generalError: {
    marginTop: "20px",
    color: "red",
    fontSize: "1.2rem",
  },

  height: {},
}));

export default function Login(props) {
  const classes = useStyles();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div>
      <h1>Login</h1>
      <Box display="flex" flexDirection="column" alignItems="center">
        {loading ? (
          <CircularProgress />
        ) : (
          <form
            className={classes.form}
            noValidate
            autoComplete="off"
            onSubmit={onSubmit}
          >
            <TextField
              id="standard-basic"
              label="Username"
              name="username"
              type="text"
              fullWidth
              value={values.username}
              error={errors.username}
              helperText={errors.username}
              onChange={onChange}
              className={classes.formInput}
            />

            <TextField
              id="standard-basic"
              label="Password"
              name="password"
              type="password"
              fullWidth
              value={values.password}
              error={errors.password}
              helperText={errors.password}
              onChange={onChange}
              className={classes.formInput}
            />

            <Button variant="contained" color="primary" type="submit" fullWidth>
              Login
            </Button>
          </form>
        )}
        {!loading && (
          <Typography className={classes.generalError}>
            {errors.general}
          </Typography>
        )}
      </Box>
    </div>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
