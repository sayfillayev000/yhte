import "./App.scss";
import { Route, Routes } from "react-router-dom";
import {
  CreateBilet,
  CreateLesson,
  CreateLessonExam,
  Error,
  Home,
  LessonExam,
  Mavzu,
  RandomBilet,
  RandomQuiz,
  Test,
} from "./pages";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test/:id" element={<Test />} />
      <Route path="/lesson/:id" element={<Mavzu />} />
      <Route path="/lesson" element={<CreateLesson />} />
      <Route path="/test" element={<CreateBilet />} />
      <Route path="/lesson_exam/" element={<CreateLessonExam />} />
      <Route path="/lesson_exam/:id" element={<LessonExam />} />
      <Route path="/exam" element={<RandomBilet />} />
      <Route path="/random" element={<RandomQuiz />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default App;
