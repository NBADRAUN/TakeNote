////// global includes /////
const express = require('express')
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const router = express.Router(); 
const { v4: uuidv4 } = require('uuid'); 


/// gets notes from notes JSON to populate the page/// 
    router.get('/', (req, res, next) => {
        readFile('./db/db.json')
            .then((data) => res.json(JSON.parse(data)))
    });


/// Helper function to write new note to JSON///
    const writeFile = (notesJSON, newNote) => {
        fs.writeFile(notesJSON, JSON.stringify(newNote, null, 4), err => {
      });
    };


//////////// add new note ////////////////

    // post route to get note info from user and post to JSON /// 
    router.post('/', (req, res, next) => {
        const { title, text} = req.body; 
        const newNote = { 
            title: title,
            text: text,
            id: uuidv4()
            };
            addNote('./db/db.json', newNote);
           res.json();  
    });

    // function to add note to the JSON and page // 
        const addNote = (notesJSON, newNote) => {
            fs.readFile(notesJSON, 'utf-8', (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    const notesData = JSON.parse(data);
                    notesData.push(newNote); 
                    writeFile(notesJSON, notesData); 
                };
            });
        };

///////////// function to delete note ////////////////////

    const deleteNote = (notesJSON, id) => {
        fs.readFile(notesJSON, 'utf-8', (err,data) => {
            if (err) {
                console.log(err); 
            } else {
                const notesArray = JSON.parse(data); 
                for (i=0; i<notesArray.length; i++) { 
                    if (notesArray[i].id == id) {
                        notesArray.splice(i, 1) 
                    };
                };
                writeFile('./db/db.json', notesArray);
            };
        });
    };


    // Delete note route // 
    router.delete('/:id', (req, res,) => {
        deleteNote('./db/db.json', req.params.id);
        res.json()
    }); 

    module.exports = router;