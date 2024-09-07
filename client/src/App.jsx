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
import Checkout from "./Checkout.jsx"
// import Wrapper from "./pages/wrapper"
import AR from "./pages/ar"


const App = () => {

  return (
    <>

      {/* <Wrapper> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/object" element={<ObjectGenerator />} />
        <Route path="/preview" element={<Render />} />
        <Route path="/create" element={<CreateModel />} />
        <Route path="/image" element={<Image />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ar" element={<AR />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* </Wrapper> */}

    </>
  )
}
export default App
