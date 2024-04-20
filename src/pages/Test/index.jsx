import React, { memo, useEffect, useState } from "react";
import defaultImg from "../../img/default-img.jpg";
import "./test.scss";
// import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Loader } from "..";

const index = memo(() => {
  // const selector = useSelector((state) => state.tests);
  // console.log(Number(selector.test));
  const [language, setLanguage] = useState("uz");

  // console.log(localStorage.getItem("language"));
  const [data, setData] = useState(null);
  // const count = Number(selector.test) - 1;
  const [surildi, setSurildi] = useState(1);
  const [shablon, setShablon] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`https://rulionline.uz/api/api/bilet/${id}`)
      .then((res) => setData(res?.data?.data))
      .catch((err) => console.error(err));
  }, []);
  data?.questions.sort((a, b) => {
    return a?.question_id - b?.question_id;
  });
  const hendleClick = (index, i) => {
    // console.log(i, 'i');
    // console.log(data?.questions[i-1].answers[0]?.status,'status');
    // console.log(index, 'index');
    setShablon([
      ...shablon,
      {
        disabled: true,
        savol: i, // savol
        variant: index, //
        status: data?.questions[i - 1].answers[0]?.status == index,
      },
    ]);
  };
  // console.log(shablon);
  const hendlenext = (id) => {
    // console.log(id);
    setSurildi(id);
  };
  const changeLanguage = (language) => {
    setLanguage(language);
    // localStorage.setItem("language", language);
    // setLanguage(localStorage.getItem("language"));
  };
  // console.log(data);
  return (
    <div className="container__test">
      {data ? (
        <>
          <header className="header__test" id="header__test">
            <div className="header__left">
              <Link to="/test">
                <button className="test__kanes">Testni Yakunlash</button>
              </Link>
              <h2 className="bilet__nomer">{data?.bilet} - Bilet</h2>
              <h3 className="time__test">0:23:00</h3>
              <select
                className="test__kanes"
                onChange={(e) => changeLanguage(e.target.value)}
              >
                <option id="lang" value="uz">
                  uzb
                </option>
                <option id="lang" value="ru">
                  rus
                </option>
              </select>
            </div>
            <ul>
              {data &&
                data?.questions?.map((item, index) => (
                  <li
                    style={
                      shablon?.find((e) => e.savol == item.question_id)
                        ?.disabled
                        ? shablon?.find((e) => e.savol == item.question_id)
                            ?.status
                          ? { backgroundColor: "green" }
                          : { backgroundColor: "red" }
                        : null
                    }
                    id={item.question_id == surildi ? "true" : "false"}
                    className={item.question_id == surildi ? "true" : "false"}
                    onClick={() => hendlenext(item.question_id)}
                    key={item.id}
                  >
                    {item.question_id}
                  </li>
                ))}
            </ul>
          </header>

          <div className="test__container">
            {data &&
              data?.questions?.map((item, i) => (
                <div
                  id="test"
                  key={item.id}
                  className="test__pege"
                  style={
                    surildi == item.question_id
                      ? { display: "block" }
                      : { display: "none" }
                  }
                >
                  <h1 className="test__title">{item?.question[language]}</h1>
                  <div className="test__box" id="test__box">
                    <img
                      className="test__img"
                      src={
                        item.image
                          ? `https://rulionline.uz/api/storage/${item.image}`
                          : defaultImg
                      }
                      alt=""
                    />
                    <ul className="test__savollari">
                      {item?.answers[0]?.answer[language]?.map(
                        (answer, index) =>
                          answer && (
                            <button
                              className="answer"
                              style={
                                shablon?.find(
                                  (e) => e.savol === item.question_id
                                )?.disabled
                                  ? shablon?.find(
                                      (e) =>
                                        e.savol === item.question_id &&
                                        e.variant === index + 1
                                    )?.variant ===
                                    index + 1 // bosilganiga teng bo'lishi kerak
                                    ? shablon?.find(
                                        (e) =>
                                          e.savol === item.question_id &&
                                          e.status
                                      )?.status // agar statusi true bo'lsa
                                      ? { backgroundColor: "green" }
                                      : { backgroundColor: "red" }
                                    : !shablon?.find(
                                        (e) =>
                                          e.savol === item.question_id &&
                                          item?.answers[0].status ===
                                            index + 1 &&
                                          !e.status
                                      )?.status &&
                                      item?.answers[0].status === index + 1 // bunda to'gri javobga teng bo'lishi kerak lekin status false bo'ladi
                                    ? { backgroundColor: "green" }
                                    : null
                                  : null
                              }
                              disabled={
                                shablon.find((e) => e.savol == item.question_id)
                                  ?.disabled
                              }
                              id={i.toString()}
                              key={index}
                              onClick={() => {
                                hendleClick(index + 1, item?.question_id);
                                surildi < 20
                                  ? setTimeout(
                                      () => setSurildi(surildi + 1),
                                      1300
                                    )
                                  : setTimeout(() => setSurildi(1), 1300);
                              }}
                            >
                              <p>F{index + 1}</p>
                              <p>{answer}</p>
                            </button>
                          )
                      )}
                    </ul>
                  </div>
                </div>
              ))}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
});

export default index;
