import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

const Assign = ({ show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose} className="modal-form">
            <Modal.Header closeButton>
                <Modal.Title>Assignment of class SE1837-NJ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table hover>
                    <thead style={{
                        borderBottom: '1px solid black',
                        fontSize: '0.875rem',
                        lineHeight: '1.5rem'
                    }}>
                        <tr>
                            <th>Title</th>
                            <th>DueDate</th>
                            <th>Content</th>
                            <th>Link</th>
                        </tr>
                    </thead>
                    <tbody style={{
                        fontWeight: '400',
                        fontSize: '0.875rem',
                        lineHeight: ' 1.43'
                    }}>
                        <tr>
                            <td>SM1_Discussion Result Submit</td>
                            <td>2024-05-13 07:00:00</td>
                            <td>Link</td>
                            <td className="click-icon">
                                <img src='./public/assets/click.png' />
                                Click
                            </td>
                        </tr>
                        <tr>
                            <td>SM2_Discussion Result Submit</td>
                            <td>2024-05-13 07:00:00</td>
                            <td>Link</td>
                            <td className="click-icon">
                                <img src='./click.png' />
                                Click
                            </td>
                        </tr>
                        <tr>
                            <td>SM3_Discussion Result Submit</td>
                            <td>2024-05-13 07:00:00</td>
                            <td>Link</td>
                            <td className="click-icon">
                                <img src='./click.png' />
                                Click
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    CANCEL
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Assign;
