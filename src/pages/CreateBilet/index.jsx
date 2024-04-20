import React, { useEffect, useState } from "react";
import "../Home/home.scss";
import "./createLesson.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { Loader } from "..";
import { useNavigate } from "react-router-dom";

const CreateLesson = () => {
  const bilet = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get(`https://rulionline.uz/api/api/lesson`)
      .then((res) => setData(res?.data))
      .catch((err) => console.error(err));
  }, []);

  const hendleSubmit = (e) => {
    e.preventDefault();
    // dispatch(quizCount(e.target[0].value));
    navigate(`/test/${e.target[0].value}`);
  };

  return (
    <div className="home">
      {data ? (
        <section className="home__peges">
          <form className="home__form" onSubmit={hendleSubmit}>
            <select name="" id="" className="home__select">
              {bilet?.map((item) => (
                <option key={item} value={item}>
                  {item} - Bilet
                </option>
              ))}
            </select>
            <button className="form__submit">Boshlash</button>
          </form>
        </section>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default CreateLesson;
