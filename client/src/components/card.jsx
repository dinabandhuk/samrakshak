import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import useAxios from "../utils/useAxios";

function MyCard({ element, setShow, setAntiqueData }) {
  const [image, setImage] = useState(null);

  const axios = useAxios();

  const handleOnClick = async () => {
    setShow(true);
    setAntiqueData(element);
  };

  const fetchImage = async (imageId) => {
    try {
      const response = await axios.get(`/getImage/${imageId}`, { responseType: "blob" });
      return response.data;
    } catch (error) {
      console.log("Error on fetching image");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await fetchImage(element.image);
      const imageUrl = URL.createObjectURL(responseData);
      setImage(imageUrl);
    };
    fetchData();
  }, []);

  return (
    <Card style={{ width: "30rem", height: "500px", marginBottom: "20px" }} className="ms-4 mb-4">
      <Card.Img
        variant="top"
        src={image}
        style={{
          height: "300px",  // Increase the image height
          width: "100%",
          objectFit: "cover",
          objectPosition: "0px -40px",  // Manually position the image
        }}
      />
      <Card.Body className="pb-0 pt-0">
        <Card.Title className="fs-4 text-bold">{element.antiqueName}</Card.Title>
        <Card.Text>
          {`${element.description.substring(0, 170)}.......`}
        </Card.Text>
        <Button variant="primary" onClick={handleOnClick}>Render 3D</Button>
      </Card.Body>
    </Card>
  );
}

export default MyCard;
