import { useState, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "500px",
  },

  formInput: {
    marginBottom: "20px",
  },
}));

function Register(props) {
  const classes = useStyles();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <div>
      <h1>Register</h1>
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
              label="Email"
              name="email"
              type="email"
              fullWidth
              value={values.email}
              error={errors.email}
              helperText={errors.email}
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
            <TextField
              id="standard-basic"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              fullWidth
              value={values.confirmPassword}
              error={errors.confirmPassword}
              helperText={errors.confirmPassword}
              onChange={onChange}
              className={classes.formInput}
            />
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Register
            </Button>
          </form>
        )}
      </Box>
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
