import { useState } from "react";
import useAxios from "../utils/useAxios";

const Image = () => {
    // const [imageBase64, setImageBase64] = useState(null);
    const [image, setImage] = useState(null)
    const [glbData, setGlbData] = useState(null);
    const axios = useAxios();

    function fileToBase64(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    const handleOnChange = async (event) => {
        const file = event.target.files[0];
        // const base64 = await fileToBase64(file);
        // setImageBase64(base64);
        setImage(file)
    };

    const handleOnGlb = (event) => {
        const file = event.target.files[0];
        setGlbData(file); // Set the raw .glb file
    };

    const handleOnAdd = async () => {
        const formData = new FormData();
        formData.append("antiqueName", "Car");
        formData.append("description", "Car is used for traveling");
        formData.append("origin", "Nepal");
        formData.append("location", JSON.stringify([27.6710, 85.4298])); // Convert location array to JSON string
        formData.append("imageFile", image); // Append the .glb file directly
        formData.append("glbFile", glbData); // Append the Base64 image string

        const response = await axios.post("/addAntique", formData);
        console.log(response);
    };

    return (
        <>
            <input type="file" onChange={handleOnChange} />
            <input type="file" onChange={handleOnGlb} />

            {/* {imageBase64 && (
                <img
                    src={`data:image/png;base64,${imageBase64}`}
                    alt="Selected"
                />
            )} */}
            <button onClick={handleOnAdd}>Add Antique</button>
        </>
    );
};

export default Image;
