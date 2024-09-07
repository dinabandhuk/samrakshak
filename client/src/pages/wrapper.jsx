import { useLocation } from "react-router-dom";
import MyNavbar from "../components/navbar";
// import Navbar from "../component/Navbar";

const Wrapper = ({ children }) => {
    const location = useLocation();
    const shouldShowNavbar = !['/login', '/register', "/call"].includes(location.pathname);

    return (
        <div className="d-flex flex-column" style={{ height: "100vh", width: "100vw" }}>
            {shouldShowNavbar && (
                <div style={{ height: "60px" }}>
                    <MyNavbar />
                </div>
            )}
        <div style={{ height: shouldShowNavbar ? "calc(100vh - 60px)" : "100vh" }}>
                {children}
            </div>
        </div>
    );
};

export default Wrapper;
