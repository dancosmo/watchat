import React, { useState, useContext } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { AuthContext } from './context/auth';

const VideoSearch = ({ onSearchSubmit }) => {
  const [term, setTerm] = useState('');
  const { theme } = useContext(AuthContext);

  const onFormSubmit = (event) => {
    event.preventDefault();
    onSearchSubmit(term);
  };

  return (
    <Container style={{ paddingRight: '22px', marginRight: '0px' }}>
      <Form onSubmit={onFormSubmit}>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search for videos"
            aria-label="Search for videos"
            aria-describedby="basic-addon2"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
          <Button
            style={{ color: `${theme.text}` }}
            type="submit"
            variant="outline-secondary"
            id="button-addon2"
          >
            Search
          </Button>
        </InputGroup>
      </Form>
      <div></div>
    </Container>
  );
};

export default VideoSearch;
