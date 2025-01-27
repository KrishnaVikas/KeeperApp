import React, {useState} from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

function Note(props) {

  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState({
    title: props.title,
    content: props.content,
  });

  function handleEditChange(event) {
    const { name, value } = event.target;
    setEditedNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  function saveEdit(event) {
    props.onEdit(props.id, editedNote);
    setIsEditing(false);
    event.preventDefault();
  }

  return isEditing ? (
    <div className="note">
      <form>
        <input
          name="title"
          value={editedNote.title}
          onChange={handleEditChange}
          placeholder="Edit Title"
        />
        <textarea
          name="content"
          value={editedNote.content}
          onChange={handleEditChange}
          placeholder="Edit Content"
          rows="3"
        />
        <button onClick={saveEdit}><SaveIcon /></button>
        <button onClick={() => setIsEditing(false)}><CancelIcon /></button>
      </form>
    </div>
  ) : (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={() => setIsEditing(true)}>
        <EditIcon />
      </button>
      <button onClick={props.onDelete}>
        <DeleteIcon />
      </button>
    </div>
  );  
}

export default Note;
