import React, { Component } from "react";
import { Button, Container, FormControl, InputGroup } from "react-bootstrap";
import styles from "./SearchBar.module.css";
export default class SearchBar extends Component {
  render() {
    return (
      <Container>
        <InputGroup size="lg">
          <FormControl
            placeholder="Search Images"
            aria-label="Search Images"
            aria-describedby="Input Search for Image"
          />
          <InputGroup.Append>
            <Button variant="outline-primary" className={styles["search-btn"]}>
              <i class="bi bi-search"></i>
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Container>
    );
  }
}
