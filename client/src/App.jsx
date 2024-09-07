import { Route, Routes } from "react-router-dom"
import Home from "./pages/home"
import ObjectGenerator from "./pages/objectGenerator"
import Render from "./pages/render"
import Test from "./pages/test"
import CreateModel from "./pages/create3d"
import MyModal from "./components/modal"
import Image from "./pages/image"
import NotFound from "./pages/notFound"
import Register from "./pages/register"
import Login from "./pages/login"

const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/object" element={<ObjectGenerator />} />
        <Route path="/render" element={<Render />} />
        <Route path="/test" element={<Test />} />
        <Route path="/create" element={<CreateModel />} />
        <Route path="/modal" element={<MyModal />} />
        <Route path="/image" element={<Image />} />
<<<<<<< HEAD
        <Route path="*" element={<NotFound />} />
=======
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
>>>>>>> e7eec5d5376419599d45ac2eea5d3ddea33e1b99
      </Routes>
    </>
  )
}
export default App