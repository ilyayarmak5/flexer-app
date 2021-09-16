import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

export default function PostForm() {
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <Box display="flex" flexDirection="column" alignItems="center">
        <h1>Create a Post</h1>

        <form onSubmit={onSubmit}>
          <TextField
            id="standard-basic"
            label="Username"
            name="username"
            type="text"
            fullWidth
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Login
          </Button>
        </form>
      </Box>
    </div>
  );
}
