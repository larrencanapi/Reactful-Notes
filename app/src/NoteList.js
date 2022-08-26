import { useContext } from "react";
import { NoteListContext } from "./NoteListContext.js";
import { useState } from "react";
import axios from 'axios';

import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

/*
Module that creates a subcomponent to get and display all of the notes stored in localStorage 
into a ListGroup where users can then click to view the entire note in a Modal or delete it
*/

function getNoteById(id, noteList) {
    var note;
    for (let i = 0; i < noteList.length; i++) {
        if (id === noteList[i].id) {
            note = noteList[i];
            break;
        }
    }
    return note;
}

export default function NoteList() {
    const [noteListContext, setNoteListContext] = useContext(NoteListContext);
    const [chosenNoteId, setChosenNoteId] = useState(0);
    const [modalTitle, setModalTitle] = useState("");
    const [modalBody, setModalBody] = useState("");
    const [modalDate, setModalDate] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [showModalUpdate, setModalUpdate] = useState(false);
    const [isUpdateValid, setIsUpdateValid] = useState(false);


    const [noteTitle, setNoteTitle] = useState("");
    const [noteBody, setNoteBody] = useState("");

    function handleModelOpen(id) {
        var chosenNote = getNoteById(id, noteListContext);
        setModalTitle(chosenNote.title);
        setModalBody(chosenNote.notebody);
        setModalDate(chosenNote.timelastmodified);
        setChosenNoteId(id);
        setShowModal(true);
        setModalUpdate(false);
    }

    function deleteNote() {
        axios.delete(`http://localhost:8080/notes/${chosenNoteId}`)
        .then((response) => {
            setNoteListContext(response.data);
        })
        .catch(error => {
            console.error("Error has occured updating note");
        })
        setShowModal(false);
    }

    function closeModal() {
        setShowModal(false);
        setModalUpdate(false);
    }

    function openUpdateNote() {
        setNoteTitle(modalTitle);
        setNoteBody(modalBody);
        setModalUpdate(true);
    }

    const updateNote = (event) => {
		event.preventDefault();
        const form = event.currentTarget;
        
		if (form.checkValidity() === false) {
			event.stopPropagation();
			setIsUpdateValid(true);
		} else {
            setIsUpdateValid(false);
            var date = new Date();
            var title = noteTitle;
            var timeLastModified = date.toLocaleString()
            axios.put(`http://localhost:8080/notes/${chosenNoteId}`, {title, noteBody, timeLastModified})
            .then((response) => {
                setNoteListContext(response.data);
                setModalTitle(noteTitle);
                setModalBody(noteBody);
                setModalDate(timeLastModified);
            })
            .catch(error => {
                console.error("Error has occured updating note");
            })
            setModalUpdate(false);
        }
    }

    const listGroupItems = noteListContext.map((note) => {
        return (
            <ListGroup.Item key={note.id} id={note.id} action onClick={() => handleModelOpen(note.id)}>
                <div className="fw-bold">{note.title}</div>
                {"Last Modified: " + note.timelastmodified}
            </ListGroup.Item>
        );
    });

    /*
    Display any created notes in a ListGroup to the screen, display the modal only if the user clicked on a note
    Display the update note form if the user has clicked the Update button
    */
    return (
        <>
            <Container>
                <Row className="mt-5 mb-3">
                    <h1 className="text-center">
                        Your Notes
                    </h1>
                </Row>
                <Row className="justify-content-md-center">
                    <Col md={8}>
                        <ListGroup>
                            {listGroupItems}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
            <Modal size="lg" show={showModal} onHide={() => closeModal()}>
                {showModalUpdate 
                ? 
                    <Form noValidate validated={isUpdateValid} onSubmit={updateNote}>
                        <Modal.Header>
                        <Modal.Title>
                            <Form.Control
                                required
                                maxLength="30"
								type="text"
								placeholder="Note Title"
                                value={noteTitle}
								onChange={
									(event) => {
										setNoteTitle(event.target.value)
									}
								}
							/>
							<Form.Control.Feedback type="invalid">
								Please enter a title for the note
							</Form.Control.Feedback>
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body 
                            style={
                                {
                                    whiteSpace: "pre-line"
                                }
                            }
                        >
							<Form.Control
                                required
                                maxLength="300"
								as="textarea"
                                placeholder="Note Body"
                                value={noteBody}
								style={
									{ 
										height: '100px'
									}
								}
								onChange={
									(event) => {
										setNoteBody(event.target.value)
									}
								}
							/>
							<Form.Control.Feedback type="invalid">
								Please enter some text for the note
							</Form.Control.Feedback>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button type="submit" variant="primary">
                            Apply Changes
                        </Button>
                        <Button variant="danger" onClick={() => setModalUpdate(false)}>
                            Cancel Changes
                        </Button>
                        </Modal.Footer>
                    </Form>
                :
                    <div>
                        <Modal.Header>
                        <Modal.Title>{modalTitle}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body
                            scrollable={true} 
                            style={
                                {
                                    whiteSpace: "pre-line",
                                    overflow: "scroll"
                                }
                            }
                        >   
                            <h6>{"Last Modified: " + modalDate + '\n'}</h6>
                            {modalBody}
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="primary" onClick={() => openUpdateNote()}>
                            Update
                        </Button>
                        <Button variant="danger" onClick={() => deleteNote()}>
                            Delete
                        </Button>
                        <Button variant="secondary" onClick={() => closeModal()}>
                            Close
                        </Button>
                        </Modal.Footer>
                    </div>
                }
            </Modal>
        </>
    );
  
}