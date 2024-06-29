import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';

export default function BuyMoreTicket() {
    const [inputs, setInputs] = useState([{ username: "", ticket: 1 }]);
    const [isLoading, setIsLoading] = useState(false);
    const [existUsername, setExistUsername] = useState(false);

    const handleAddInput = () => {
        setInputs([...inputs, { username: "", ticket: 1 }]);
    };

    const handleChange = (event, index) => {
        let { name, value } = event.target;
        let onChangeValue = [...inputs];
        onChangeValue[index][name] = value;
        setInputs(onChangeValue);
    };

    const handleDeleteInput = (index) => {
        const newArray = [...inputs];
        newArray.splice(index, 1);
        setInputs(newArray);
    };

    return (
        <div className="container">
            {inputs.map((item, index) => (
                <div className="input_container" key={index}>
                    <Row className="my-1">
                        <Col className="pl-5 pr-3 text-start">
                            <Form.Label className="fs-6">Username</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text>@</InputGroup.Text>
                                <Form.Control 
                                    type="text" 
                                    name="username"
                                    required 
                                    isInvalid 
                                    className="text-light border" 
                                    minLength={7} 
                                    disabled={isLoading}
                                    onChange={(event) => handleChange(event, index)}
                                    style={{ 
                                        maxWidth: "100%",
                                        padding: "0.5em 1em",
                                    }} />
                            </InputGroup>
                        </Col>
                        {/* <Col lg="3" className="pl-5 pr-3 text-start">
                            <Form.Label className="fs-6">Total Ticket</Form.Label>
                            <InputGroup>
                                <Form.Control 
                                    className="text-light border" 
                                    type="number" 
                                    required 
                                    min={1} 
                                    max={1}
                                    name="ticket"
                                    disabled="true"
                                    onChange={(event) => handleChange(event, index)}
                                    style={{ 
                                        maxWidth: "100%",
                                        padding: "0.5em 1em",
                                    }} />
                                <InputGroup.Text>ticket</InputGroup.Text>
                            </InputGroup>
                        </Col> */}
                        <Col>
                            <Form.Label className="fs-6">Action</Form.Label>
                            <Col>
                                {inputs.length > 1 && (
                                    <Button className="mx-1" variant="danger" onClick={() => handleDeleteInput(index)}>Delete</Button>
                                )}
                                {index === inputs.length - 1 && (
                                    <Button className="mx-1" variant="light" onClick={() => handleAddInput()}>Add</Button>
                                )}
                            </Col>
                        </Col>
                    </Row>
                </div>
            ))}
        </div>
    );
}
