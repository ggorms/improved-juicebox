import { Route, Routes } from "react-router-dom";
import AuthForm from "./components/authForm/AuthForm";
import "./App.css";
import { useSelector } from "react-redux";
import UserPosts from "./Pages/UserPosts";

function App() {
  const me = useSelector((state) => state.auth.credentials.user);

  const guestRouter = (
    <Routes>
      <Route path="/*" element={<AuthForm />} />
    </Routes>
  );

  const userRouter = (
    <Routes>
      <Route index element={<UserPosts />} />
    </Routes>
  );

  const loggedIn = me.userId;

  return loggedIn !== null ? userRouter : guestRouter;
}

export default App;
