import { useState, useContext } from "react";
import { NoteListContext } from "./NoteListContext.js";
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

/*
Module that creates a subcomponent to display a form to get the note title and note body to generate
a note to store in localStorage, form has basic form validation for empty inputs
*/

export default function NoteForm() {
	const [noteTitle, setNoteTitle] = useState("");
	const [noteBody, setNoteBody] = useState("");
	const [isFormValidated, setIsFormValidated] = useState(false);
	const [, setNoteListContext] = useContext(NoteListContext);

	const handleNoteForm = (event) => {
		// prevent page refresh
		event.preventDefault();

		const form = event.currentTarget;
		// console.log(form.checkValidity())
		// case where any of the form inputs don't have a value so throw 
		// an error to the user in the form and don't create the note
		if (form.checkValidity() === false) {
			event.stopPropagation();
			setIsFormValidated(true);
		} else {
			setIsFormValidated(false);
			var date = new Date();
			

			// create new note
			const newNote = {
				title: noteTitle,
				noteBody: noteBody,
				timeLastModified: date.toLocaleString()
			};

			// add note to the list in the database
			axios.post("http://localhost:8080/notes", newNote)
			.then((response) => {
				//console.log(response)
				setNoteListContext(response.data);
			})
			.catch(error => {
				console.error("Error has occured posting new note");
			})

			// clear form inputs
			setNoteTitle("");
			setNoteBody("");
		}
	}

	return (
		<Container className="mt-3">
			<Row className="justify-content-md-center">
				<Col md={8}>
					<Form noValidate validated={isFormValidated} onSubmit={handleNoteForm}>
						<Form.Group className="mb-3" controlId="formNoteTitle">
							<Form.Label>Note Title</Form.Label>
							<Form.Control
								required
								maxLength="30"
								size="lg" 
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
						</Form.Group>
						<Form.Group className="mb-3" controlId="formNoteBody">
							<Form.Label>Note Body</Form.Label>
							<Form.Control
								required
								maxLength="300"
								as="textarea"
								placeholder="Note Body"
								style={
									{ 
										height: '100px'
									}
								}
								value={noteBody}
								onChange={
									(event) => {
										setNoteBody(event.target.value)
									}
								}
							/>
							<Form.Control.Feedback type="invalid">
								Please enter some text for the note
							</Form.Control.Feedback>
						</Form.Group>
						<Button type="submit" variant="primary">
							Save Note
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
}
