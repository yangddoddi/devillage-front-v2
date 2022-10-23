import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearchBox.module.scss";

export const SearchBox = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setSearch(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:8080/posts/search?q=${search}&page=1&size=10`)
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <form className={styles.searchBox} onSubmit={onSubmitHandler}>
      <input
        placeholder="Please enter your search term"
        type="text"
        onChange={onChangeHandler}
      ></input>
    </form>
  );
};
