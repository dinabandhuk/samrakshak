import { useState, useEffect } from "react";
import GlbLoader from "../components/glbLoader";
// import { extractGlbFilesFromZip } from "../utils/zip";
import extractGlbFromArrayBuffer from "../utils/zip";
import useAxios from "../utils/useAxios";
import BufferToBlob from "../utils/blob";

const ObjectGenerator = () => {
    const [glbData, setGlbData] = useState(null);
    const [render, setRender] = useState(false);

    const axios = useAxios();

    const handleOnDownload = async () => {
        try {
            const response = await axios.get("/getZip", { responseType: 'arraybuffer' });

            const extractedFile = await extractGlbFromArrayBuffer(response.data)
            console.log(extractedFile)

            const glbBlob = new Blob([extractedFile], { type: 'model/gltf-binary' });
            const url = URL.createObjectURL(glbBlob);

            setGlbData(url);
            setRender(true);
        } catch (error) {
            console.error("Error during file extraction:", error);
        }
    };

    useEffect(() => {
        // Cleanup function to revoke object URLs
        return () => {

        };
    }, []);

    return (
        <>
            <button onClick={handleOnDownload}>Download zip</button>
            {render && glbData && (
                <GlbLoader url={glbData} />
            )}
        </>
    );
};

export default ObjectGenerator;
