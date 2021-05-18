import React, { Component } from "react";
import { Button, Container, FormControl, InputGroup } from "react-bootstrap";
import styles from "./SearchBar.module.css";
export default class SearchBar extends Component {
  state = { searchText: "" };

  searchTextOnChangeHandler = (e) => {
    if (e.key) {
      if (e.key === "Enter")
        this.setState({ searchText: e.target.value }, () => {
          this.props.searchTextChangeHandler(this.state.searchText);
          this.setState({ searchText: "" });
        });
    } else this.setState({ searchText: e.target.value });
  };
  searchButtonClickHandler = () => {
    this.props.searchTextChangeHandler(this.state.searchText);
    this.setState({ searchText: "" });
  };
  render() {
    return (
      <Container>
        <InputGroup size="lg">
          <FormControl
            placeholder="Search Images"
            aria-label="Search Images"
            aria-describedby="Input Search for Image"
            value={this.state.searchText}
            onChange={this.searchTextOnChangeHandler}
            onKeyPress={this.searchTextOnChangeHandler}
          />
          <InputGroup.Append>
            <Button
              variant="outline-primary"
              className={styles["search-btn"]}
              onClick={this.searchButtonClickHandler}
            >
              <i className="bi bi-search"></i>
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Container>
    );
  }
}
