import { Route, Routes } from "react-router-dom"
import Home from "./pages/home"
import ObjectGenerator from "./pages/objectGenerator"
import Render from "./pages/render"
import Test from "./pages/test"
import CreateModel from "./pages/create3d"
import MyModal from "./components/modal"
import Image from "./pages/image"
import NotFound from "./pages/notFound"

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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
export default App