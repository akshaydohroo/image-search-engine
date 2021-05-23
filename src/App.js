import React from "react";
import ImageList from "./images/ImageList";
import axiosConfig from "./axiosConfig";
import SearchBar from "./search-bar/SearchBar";
import ErrorPage from "./ErrorPage";
import { Spinner } from "react-bootstrap";
import styles from "./App.module.css";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      errMsg: "",
      statusCode: null,
      showSpinner: false,
    };
  }
  isScroll = false;
  searchText = "";
  pageNumber = 2;
  isPaused = false;
  searchTextChangeHandler = (searchText) => {
    console.log(process.env.REACT_APP_UNSPLASH_API_KEY);
    this.searchText = searchText;
    this.setState({ showSpinner: true, images: [] });
    axiosConfig
      .get("/search/photos", {
        params: {
          query: searchText,
          per_page: 40,
        },
      })
      .then((res) => {
        this.setState({ showSpinner: false });
        if (res.data.results.length === 0) {
          this.setState({
            images: res.data.results,
            errMsg: "Images not found , try again with different Keyword",
            statusCode: 200,
          });
        } else
          this.setState({
            images: res.data.results,
            errMsg: "",
            statusCode: null,
          });
      })
      .catch((err) => {
        this.setState({
          statusCode: err.response.status,
          errMsg: err.response.statusText + ", " + err.response.status,
          images: [],
          showSpinner: false,
        });
      });
  };
  componentDidMount() {
    window.addEventListener("scroll", () => {
      this.isScroll = true;
    });
    setInterval(() => {
      if (!this.isPaused && this.isScroll) {
        this.isScroll = false;
        let root = document.documentElement;
        if (root.scrollHeight - root.scrollTop <= root.clientHeight + 100) {
          console.log("Reached end of scroll");
          this.scrollCalls();
        }
      }
    }, 300);
  }
  scrollCalls = () => {
    this.setState({ showSpinner: true });
    this.isPaused = true;
    axiosConfig
      .get("/search/photos", {
        params: {
          query: this.searchText,
          per_page: 40,
          page: this.pageNumber,
        },
      })
      .then((res) => {
        this.setState({
          images: [...this.state.images, ...res.data.results],
          showSpinner: false,
        });
        this.pageNumber = this.pageNumber + 1;
        this.isPaused = false;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className={`mt-3 ${styles["app-container"]}`}>
        <SearchBar searchTextChangeHandler={this.searchTextChangeHandler} />
        <ImageList images={this.state.images} />
        <ErrorPage
          errMsg={this.state.errMsg}
          statusCode={this.state.statusCode}
        />
        {this.showSpinner && (
          <Spinner animation="border" role="status" className="z3" onLoad={()=>console.log("ehhhhh")}>
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
      </div>
    );
  }
}
