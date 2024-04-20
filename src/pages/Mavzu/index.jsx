import React, { memo, useEffect, useState } from "react";
import defaultImg from "../../img/default-img.jpg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./lesson.scss";
import { Loader } from "..";

const index = memo(() => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [language, setLanguage] = useState("uz");
  const [shablon, setShablon] = useState([]);
  const [surildi, setSurildi] = useState(0);
  useEffect(() => {
    axios
      .get(`https://rulionline.uz/api/api/question/${id}`)
      .then((res) => setData(res?.data))
      .catch((err) => console.error(err));
  }, []);
  const hendleClick = (index, i) => {
    setShablon([
      ...shablon,
      {
        disabled: true,
        savol: i, // savol
        variant: index, //
        status: data?.data[i].answers[0]?.status == index,
      },
    ]);
  };
  const hendlenext = (id) => {
    setSurildi(id);
  };
  return (
    <>
      {data ? (
        <div className="container__test">
          <header id="header__test" className="header__test">
            <div className="header__left">
              <Link to="/lesson">
                <button className="test__kanes">Testni Yakunlash</button>
              </Link>
              <h2
                style={{ textTransform: "capitalize" }}
                className="bilet__nomer"
              >
                {data?.lesson.lesson}
              </h2>
              <h3 className="time__test">0:23:00</h3>
              <select
                className="test__kanes"
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="uz">uzb</option>
                <option value="ru">rus</option>
              </select>
            </div>
            <ul>
              {data &&
                data?.data?.map((item, index) => (
                  <li
                    style={
                      shablon?.find((e) => e.savol == index)?.disabled
                        ? shablon?.find((e) => e.savol == index)?.status
                          ? { backgroundColor: "green" }
                          : { backgroundColor: "red" }
                        : null
                    }
                    id={index == surildi ? "true" : "false"}
                    className={item.id == surildi ? "true" : "false"}
                    onClick={() => hendlenext(index)}
                    key={item.id}
                  >
                    {index + 1}
                  </li>
                ))}
            </ul>
          </header>

          <div className="test__container">
            {data?.data?.length > 0 ? (
              data?.data?.map((item, i) => (
                <div
                  id="test"
                  key={item.id}
                  className="test__pege"
                  style={
                    surildi == i ? { display: "block" } : { display: "none" }
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
                      {item?.answers[0].answer[language]?.map(
                        (answer, index) =>
                          answer && (
                            <button
                              className="answer"
                              style={
                                shablon?.find((e) => e.savol === i)?.disabled
                                  ? shablon?.find(
                                      (e) =>
                                        e.savol === i && e.variant === index + 1
                                    )?.variant ===
                                    index + 1
                                    ? shablon?.find(
                                        (e) => e.savol === i && e.status
                                      )?.status
                                      ? { backgroundColor: "green" }
                                      : { backgroundColor: "red" }
                                    : null
                                  : null
                              }
                              disabled={
                                shablon.find((e) => e.savol == i)?.disabled
                              }
                              id={i.toString()}
                              key={index}
                              onClick={() => {
                                hendleClick(index + 1, i);
                                surildi < data?.data?.length - 1
                                  ? setTimeout(
                                      () => setSurildi(surildi + 1),
                                      1300
                                    )
                                  : setTimeout(() => setSurildi(0), 1300);
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
              ))
            ) : (
              <h1
                className=""
                style={{ color: "red", backgroundColor: "white" }}
              >
                Ҳозирча {data?.lesson.lesson} мавзусига тест қўшилмаган
              </h1>
            )}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
});

export default index;
