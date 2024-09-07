import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import useAxios from "../utils/useAxios";

function MyCard({ element, setShow, setAntiqueData }) {
  const [image, setImage] = useState(null)

  const axios = useAxios()

  const handleOnClick = async () => {
    setShow(true)
    setAntiqueData(element)
  }


  const fetchImage = async (imageId) => {
    try {
      const response = await axios.get(`/getImage/${imageId}`, { responseType: "blob" })
      return response.data;
    } catch (error) {
      console.log("Error on fetching image")
    }
  }


  useEffect(() => {
    const fetchData = async () => {

      const responseData = await fetchImage(element.image)
      const imageUrl = URL.createObjectURL(responseData)
      setImage(imageUrl)
    }
    fetchData()
  }, [])

  return (
    <Card style={{ width: "30rem" }} className="ms-4 mb-4 h-100">
      <Card.Img variant="top" src={`${image}`} />
      <Card.Body>
        <Card.Title className="fs-4 text-bold">{element.antiqueName}</Card.Title>
        <Card.Text>
          {`${element.description.substring(0, 200)}.......`}
        </Card.Text>
        <Button variant="primary" onClick={handleOnClick}>Render 3D</Button>
      </Card.Body>
    </Card>
  );
}

export default MyCard;
