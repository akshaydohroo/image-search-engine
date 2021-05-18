import React from "react";
import styles from "./ErrorPage.module.css";
export default class ErrorPage extends React.Component {
  errIconSelector = (statusCode) => {
    if (statusCode === null) {
      return "";
    } else if (statusCode === 200) {
      return styles["err-icon"];
    } else {
      return styles["req-error-icon"];
    }
  };
  render() {
    return (
      <div className={styles["err-container"]}>
        <span className={styles["err-wrap"]}>
          <span className={this.errIconSelector(this.props.statusCode)} />
        </span>
        <span className={styles["err-msg"]}>{this.props.errMsg}</span>
      </div>
    );
  }
}
