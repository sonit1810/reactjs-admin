import React from 'react';
import  { Modal, Button } from 'react-bootstrap';

class AlertComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
        this.handleClose = this.handleClose.bind(this);
    }
    handleClose() {

    }
    componentDidMount() {

    }
    render() {
        const { props } = this;
        return (
            <Modal show={props.isShow} onHide={() => props.onClick(false)}>
                <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.message}</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => props.onClick(false)}>
                    No
                </Button>
                <Button variant="primary" onClick={() => props.onClick(true)}>
                    Yes
                </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default (AlertComponent);