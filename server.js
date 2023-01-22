/// global includes and setup ////
const express = require("express");
const fs = require("fs");
const path = require("path");
const routes = require("./routes");
const app = express();
const PORT = 3001;
const notesJSON = require("./db/notes.json");


///middleware ///
app.use(express.static("public"));
app.use(routes);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//// GET API Route /////
// route to the notes JSON file //
app.get("/api/notes", (req, res) => res.json(notesJSON));

///route to a specfic note JSON ///
app.get("/api/notes/:note_id", (req, res) => {
  if (req.params.note_id) {
    console.info(`${req.method} request received to get a single note`);
    const noteId = req.params.note_id;
    for (let i = 0; i < notesJSON.length; i++) {
      const currentNote = notesJSON[i];
      if (currentNote.note_id === noteId) {
        res.json(currentNote);
        return;
      }
    }
    res.status(404).send("Note not found");
  } else {
    res.status(400).send("Note ID not provided");
  }
});

// POST API Route  //////
app.post("/api/notes", (req, res) => {
  ////destructuring the req body ///
  const { title, text } = req.body;
  //// setting the note_id number to increment by one
  const noteNumber = notesJSON.length + 1;
  const noteNumberString = noteNumber.toString();
  // checking to make sure title and text is not blank from the user //
  if (title && text) {
    console.info(`${req.method} request received to add a note`);
    // setting the "newNote" with body elements///
    const newNote = {
      title,
      text,
      note_id: noteNumberString,
    };

    // get the current notes from the JSON file  /////
    fs.readFile("./db/notes.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object ////
        const parsedNotes = JSON.parse(data);

        // Add a new note ///
        parsedNotes.push(newNote);

        // Write the JSON from a string back to a JSON ///
        fs.writeFile(
          "./db/notes.json",
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info("Successfully updated notes!")
        );
      }
    });

    const response = {
      status: "success",
      body: newNote,
    };


    res.status(201).json(response);
  } else {
    res.status(500).json("Error in posting note");
  }
});

/////////delete API /////////
app.delete("/api/notes/:id", (req, res) => {
  // read and convert the notes.json to a string
  fs.readFile("./db/notes.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      // Convert string into JSON object ////
      let parsedNotes = JSON.parse(data);
      const { id } = req.params;
      const noteToDelete = parsedNotes.find(
        (parsedNotes) => parsedNotes.note_id === id);
      if (noteToDelete) {
        let = parsedNotes = parsedNotes.filter(
          (parsedNotes) => parsedNotes.note_id !== id);
        
        // Write the JSON from a string back to a JSON ///
        fs.writeFile(
          "./db/notes.json",
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              :console.info("Successfully updated notes!")
        );
      } else {
        res.status(404).json({
          message: "this note does not exsist",
        });
      }
    }
  });
});

///main notes page route /////
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

/// server localhost listen ////
// app.listen(PORT, () =>
//   console.log(`Example app listening at http://localhost:${PORT}`)
// );

app.listen(process.env.PORT || PORT)
console.log(`Example app listening at http://localhost:${PORT}`)
