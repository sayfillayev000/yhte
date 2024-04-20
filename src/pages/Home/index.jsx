import "./home.scss";
import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { quizCount } from "../../store/testCount";

const index = memo(() => {
  const navigate = useNavigate();
  const [data, setdata] = useState(null);
  const dispatch = useDispatch();
  const hendleClick = () => {
    dispatch(quizCount(Math.round(Math.random() * 19)));
    navigate("/exam");
  };
  return (
    <div className="home">
      <section
        className="test__info"
        style={{
          backgroundImage:
            "url(" +
            "./" +
            ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2>
          TA'LIM MUASSASALARIDA AVTOMOBIL HAYDOVCHILARINI TAYYORLASH SIFATINI
          OSHIRISH USLUBINI TAKOMILLASHTIRISH BO'YICHA SIZ TEST SINOVIDAN
          O'TMOQDASIZ
        </h2>
        <button
          className="mavzular"
          onClick={() => navigate("/lesson")}
          type="button"
        >
          Mavzu bo'yicha trenirovkani boshlash
        </button>
        <button
          className="mavzular"
          onClick={() => navigate("/lesson_exam")}
          type="button"
        >
          Mavzular bo'yicha imtihon topshirish
        </button>
        <button
          onClick={() => navigate("/test")}
          type="button"
          className="mavzular"
        >
          Biletlar bo'yicha trenirovkani boshlash
        </button>
        <div className="btn__box">
          <button onClick={() => navigate("/random")} type="button">
            Random Test
          </button>
          <button onClick={hendleClick}>Imtihon Topshirish</button>
        </div>
        <a href="https://t.me/yashnarjon123" className="boglanish">
          Taklif va shikoyatlar uchun
        </a>
      </section>
    </div>
  );
});

export default index;
