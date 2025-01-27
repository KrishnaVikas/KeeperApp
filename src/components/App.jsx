import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  const [searchText, setSearchText] = useState("");

  function handleSearch(event) {
    setSearchText(event.target.value.toLowerCase());
  }

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchText) ||
      note.content.toLowerCase().includes(searchText)
  );

  function editNote(id, updatedNote) {
    setNotes((prevNotes) =>
      prevNotes.map((noteItem, index) =>
        index === id ? updatedNote : noteItem
      )
    );
  }  

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <input
        type="text"
        placeholder="Search notes..."
        value={searchText}
        onChange={handleSearch}
      />
      <CreateArea onAdd={addNote} />
      {filteredNotes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            onEdit={editNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
