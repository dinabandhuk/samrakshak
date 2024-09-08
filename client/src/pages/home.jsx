import { useState, useEffect } from "react";
import MyNavbar from "../components/navbar";
import MyCarousel from "../components/carousel";
import MyCard from "../components/card";
import useAxios from "../utils/useAxios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Footer from "../components/footer";
import BufferToBlob from "../utils/blob";
import GlbLoader from "../components/glbLoader"
import MyModal from "../components/modal";
import teamImage from "../images/team.jpeg"

const Home = () => {
    const [antiques, setAntiques] = useState([]);
    const [objectUrl, setObjectUrl] = useState(null)
    const [show, setShow] = useState(false)
    const [antiqueData, setAntiqueData] = useState({})

    const axios = useAxios();
    let map;

    const fetchGlb = async (glbId) => {
        try {
            const response = await axios.get(`/getGLB/${glbId}`, { responseType: "arraybuffer" })
            return response;
        } catch (error) {
            console.log("Error on fetching glb file")
        }
    }

    useEffect(() => {
        const fetchAntique = async () => {
            const response = await axios.get("/getAntique");
            setAntiques(response.data);

            const glbData = await fetchGlb(response.data[4].glbData)
            const url = BufferToBlob(glbData)
            setObjectUrl(url)


            // Initialize map
            map = L.map("map").setView([27.6710, 85.4298], 10);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);

            response.data.forEach((antique) => {
                if (antique.location) { // Ensure latitude and longitude are available
                    L.marker([antique.location[0], antique.location[1]]).addTo(map)
                }
            });
        };

        fetchAntique();

        return () => {
            if (map) {
                map.remove();
            }
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, []);

    return (
        <>
            {
                show && antiqueData && <MyModal setShow={setShow} show={show} antiqueData={antiqueData} />
            }
            <MyNavbar />
            <MyCarousel />



            <div className="container-fluid p-0 d-flex flex-column justify-content-center align-items-center">
                {/* project intro */}
                <div className="container-fluid mt-5 d-flex flex-row " style={{ width: "80vw", boxShadow: "0px 1px 2px grey", padding: "0px" }}>
                    <div className="d-flex flex-column justify-content-center w-50 ms-2" style={{ height: "400px" }}>
                        <h2>Welcome to <span className="text-danger">Digital Devalaya</span></h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus culpa qui corrupti accusantium beatae sint cum eveniet quas hic sequi, id, mollitia similique amet ipsa error, voluptatem nostrum! Nostrum, omnis.</p>
                    </div>
                    <div className="w-50">
                        <img src={teamImage} alt="ProjectImage" style={{ backgroundPosition: "center", objectFit: "cover", maxHeight: "400px", width: "100%", }} />
                    </div>
                </div>


                {/* 3D preview */}
                <div style={{ width: "80vw" }} className="mt-5">
                    <h2 className="text-center mb-4">3D Model</h2>
                    {
                        objectUrl && <GlbLoader url={objectUrl} />
                    }
                </div>


                {/* preservation section  */}
                <div className="mt-5 d-flex flex-column" style={{ width: "80vw", overflow: "visible" }}>
                    <h2 className="text-center mt-3 mb-4">Historical Monuments</h2>

                    <div className="d-flex flex-row flex-wrap justify-content-center" style={{ overflow: "visible" }}>
                        {
                            antiques.length > 0 && antiques.map((element, key) => {
                                return (
                                    <div key={key} style={{ minHeight: "20vh", height: "auto", overflow: "visible" }}>
                                        <MyCard element={element} setShow={setShow} setAntiqueData={setAntiqueData} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                {/* leaflet start here */}
                {/* <div>
                    <h2 className="text-center mt-5">Location</h2>
                    <div id="map" style={{ height: "400px", width: "80vw" }} className="mb-5 mt-4"></div>
                </div> */}

                {/* footer here */}
                <Footer />

            </div>
        </>
    );
};

export default Home;
