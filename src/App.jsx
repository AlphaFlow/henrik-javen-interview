import React, { useEffect } from "react";
import "./App.scss";

let _notes = JSON.parse(localStorage.getItem("notes") || "[]") || [];
const updatePage = () => window.location.reload();
let style = {
  fontSize: "28px",
  fontWeight: "bold",
  color: "#6600eb",
  marginBottom: "24px",
};

const Main = () => {
  let [notes, setNotes] = React.useState(_notes);

  const getFormattedTime = (ms) => {
    const jsDate = new Date(ms);

    const hours = jsDate.getHours();
    const formattedHours = hours > 12 ? hours % 12 : hours;
    const minutes = jsDate.getMinutes();
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const seconds = jsDate.getSeconds();
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

    return (
      `${jsDate.getMonth()}/${jsDate.getDate()}/${jsDate.getFullYear()} ` +
      formattedTime
    );
  };

  console.log(notes);
  const deleteNote = (noteText) => {
    notes = notes.filter((note) => note.text !== noteText);
    localStorage.setItem("notes", JSON.stringify(notes));
    updatePage();
  };

  let cards = notes.map(function (note) {
    return (
      <div class="note">
        <div class="note-time">{getFormattedTime(note.createdAt)}</div>

        <br />
        <div class="note-body">{note.text}</div>
        <br />
        <button onClick={() => deleteNote(note.text)}>Delete</button>
        <br />
        <button>
          {/* eslint-disable-next-line react/jsx-no-target-blank */}
          <a
            target="_blank"
            style={{
              textDecoration: "none",
              color: "white",
              width: "100%",
              height: "100%",
            }}
            href={`mailto:?subject=Check out this note&body=${note.text}`}
            // onClick={() =>
            //   (window.location = `mailto:?subject=Check out this note&body=${note.text}`)
            // }
          >
            Share
          </a>
        </button>
      </div>
    );
  });

  // let cards = notes.map(function (note) {
  //   return (
  //     <div>
  //       <div className="time">{note.createdAt}</div>
  //       <div className="body">{note.text}</div>
  //     </div>
  //   );
  // });

  useEffect(() => {
    const newNoteInputElement = document.getElementById("new-note");
    const newNoteButtonElement = document.getElementById("new-note-button");
    newNoteButtonElement?.addEventListener("click", () => {
      const text = newNoteInputElement.value;
      if (!text) return;

      newNoteInputElement.value = "";
      notes.push({
        text,
        createdAt: Date.now(),
      });

      // console.log({ notes });
      localStorage.setItem("notes", JSON.stringify(notes));
      updatePage();
    });
  });

  var searchNotes = (searchText) => {
    let searchInputElement = document.getElementById("note-search");
    if (searchInputElement) {
      setNotes(
        _notes.filter((note) => note.text.includes(searchInputElement.value))
      );
    } else {
      setNotes(_notes);
    }
  };

  return (
    <div class="Main" style={{ padding: "16px", display: "flex" }}>
      <section class="left">
        <div class="title" style={style}>
          Notes App
        </div>
        <input
          type="text"
          oninput={searchNotes}
          id="note-search"
          placeholder="Search notes..."
          onChange={searchNotes}
        />
        <br />
        <br />
        <div id="note-form">
          <textarea
            placeholder="Add a new note..."
            id="new-note"
            rows="10"
          ></textarea>
          <button id="new-note-button">Save</button>
        </div>
      </section>
      <div class="right">
        {cards.map((card, idx) => (
          <div key={idx}>{card}</div>
        ))}
      </div>
    </div>
  );
};

export default Main;
