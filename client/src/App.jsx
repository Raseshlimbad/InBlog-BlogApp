import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./pages/PrivateRoute";
import OnlyAdminPrivateRoute from "./pages/OnlyAdminPrivateRoute";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/sign-in" element={<Signin />}></Route>
        <Route path="/sign-up" element={<Signup />}></Route>
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/create-post" element={<CreatePost />}></Route>
          <Route path="/update-post/:postId" element={<UpdatePost />}></Route>
        </Route>
        <Route path="/projects" element={<Projects />}></Route>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
