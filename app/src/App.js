import './App.css';
import { useState, useEffect } from "react";

import { NoteListContext } from './NoteListContext';
import NoteForm from "./NoteForm.js";
import NoteList from "./NoteList.js";
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/*
App Module to display all components of the Note Taking App and to provide the NoteListContext
to the child components
*/

function AppHeader() {
    return (
        <Container fluid className="pt-3 bg-dark">
            <Row>
                <h1 className="text-center text-white fw-bold">
                    Reactful Notes
                </h1>
            </Row>
            <Row className="justify-content-md-center py-3 mb-3">
                <Col md={8}>
                    <p className="text-center text-white">
                        Create your note by entering a title and body for your note 
                        The app currently supports note title's of 30 characters long and note body's of 300 characters long.
                        You can view your notes in a modal by clicking on the list below.
                        You can update or delete your notes as you like :)
                    </p>
                </Col>
            </Row>
        </Container>
    );
}

function App() {
    const [noteListContext, setNoteListContext] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8080/notes")
        .then((response) => {
            setNoteListContext(response.data)
        })
        .catch(error => {
            console.error("Error has occured grabbing notes");
        })
    }, []); // dependency array that'll run the above useEffect once to grab the data
    
    return (
        <div className="App">
            <AppHeader />
            <NoteListContext.Provider value={[noteListContext, setNoteListContext]}>
                <NoteForm />
                <NoteList />
            </NoteListContext.Provider>
        </div>
    );
}

export default App;
