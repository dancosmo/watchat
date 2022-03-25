import React, { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/button";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

const VideoSearch = ({ onSearchSubmit }) => {
  const [term, setTerm] = useState("");

  const onFormSubmit = (event) => {
    event.preventDefault();
    onSearchSubmit(term);
  };

  return (
    <Container >
      <Form onSubmit={onFormSubmit}>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search for videos"
            aria-label="Search for videos"
            aria-describedby="basic-addon2"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
          <Button type="submit" variant="outline-secondary" id="button-addon2">
            Search
          </Button>
        </InputGroup>
      </Form>
      <div>
        
      </div>
    </Container>
  );
};

export default VideoSearch;
