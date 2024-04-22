import React, {useState} from 'react';
import {Container, Form, Button, Row, Col, Card} from 'react-bootstrap';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Voer hier de inloglogica uit
        console.log(`Inloggen met gebruikersnaam: ${username} en wachtwoord: ${password}`);
    };

    return (
        <Container style={{backgroundColor: '#fff7ea', minHeight: '100vh'}}>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <Card style={{width: '18rem'}}>
                        <Card.Body>
                            <Card.Title>Inloggen</Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Gebruikersnaam</Form.Label>
                                    <Form.Control type="text" value={username}
                                                  onChange={(e) => setUsername(e.target.value)}/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Wachtwoord</Form.Label>
                                    <Form.Control type="password" value={password}
                                                  onChange={(e) => setPassword(e.target.value)}/>
                                </Form.Group>

                                <Button variant="primary" type="submit" style={{backgroundColor: '#d30f4c'}}>
                                    Inloggen
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Container fluid className="text-muted position-absolute bottom-0 end-0"
                       style={{backgroundColor: '#d30f4c', padding: '40px', fontFamily: 'Poppins'}}>
                <Row className="d-flex justify-content-end">
                    <Col className="text-end">
                        <a href="tel:+310107941111"
                           style={{color: 'white', textDecoration: 'none', position: 'absolute', right: '650px', bottom: '25px', fontSize: '1rem', fontFamily: 'Poppins'}}
                           onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                           onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>
                            010 - 794 1111
                        </a>
                    </Col>
                    <Col className="text-end">
                        <a href="mailto:service@hr.nl" style={{color: 'white', textDecoration: 'none', position: 'absolute', right: '520px', bottom: '25px', fontSize: '1rem', fontFamily: 'Poppins'}}
                           onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                           onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>
                            service@hr.nl
                        </a>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default Login;