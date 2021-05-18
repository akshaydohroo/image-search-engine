import React from "react";
import { Container } from "react-bootstrap";
import ImageCard from "./ImageCard";
import styles from "./ImageList.module.css";
export default function ImageList(props) {
  return (
    <Container fluid className={styles["image-list"]}>
      {props.images.map((image) => {
        return <ImageCard key={image.id} image={image} />;
      })}
    </Container>
  );
}
