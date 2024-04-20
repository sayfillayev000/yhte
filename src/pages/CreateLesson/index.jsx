import React, { useEffect, useState } from "react";
import "../Home/home.scss";
import "./createLesson.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { Loader } from "..";

const CreateLesson = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get(`https://rulionline.uz/api/api/lesson`)
      .then((res) => setData(res?.data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      {data ? (
        <div className="lesson__create">
          <div className="lesson__header">
            <Link to="/">
              <button className="test__kanes">Testni Yakunlash</button>
            </Link>
            <h1>Lesson</h1>
          </div>
          <section className="lesson__section">
            {data &&
              data?.map((lesson) => (
                <Link
                  to={lesson.id.toString()}
                  key={lesson.id}
                  className="lesson__card"
                >
                  <h1 className="home__select">{lesson.lesson}</h1>
                </Link>
              ))}
          </section>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default CreateLesson;
