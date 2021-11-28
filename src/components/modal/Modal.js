import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

export const Modal = ({ title, message, messageX, styleMessage, show, onClose }) => (
	<ToastContainer position='middle-center' className='p-3'>
		<Toast bg={styleMessage} show={show} onClose={onClose}>
			<Toast.Header>
				<strong className='me-auto'>{title}</strong>
				<small>{messageX}</small>
			</Toast.Header>
			<Toast.Body>{message}</Toast.Body>
		</Toast>
	</ToastContainer>
);