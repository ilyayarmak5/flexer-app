import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

export default function DeleteButton() {
  const deletePost = () => {
    console.log("DeletePost");
  };
  return (
    <IconButton aria-label="delete post" onClick={deletePost}>
      <DeleteIcon />
    </IconButton>
  );
}
