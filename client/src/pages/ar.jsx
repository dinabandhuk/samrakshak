import "@google/model-viewer";
import { useState } from "react";

const AR = () => {
    const [files, setFiles] = useState(['buddha.glb', 'garuda.glb', 'ox.glb', 'patan.glb'])
    const [url, setUrl] = useState(null)

    const handleOnClick = (element) => {
        setUrl(element)
    }


    return (
        <>
            {
                files.map((element, index) => {
                    return (
                        // <option value="someOption">Some option</option>
                        <div key={index} onClick={() => handleOnClick(element)}>
                            {element}
                        </div>

                    )
                })
            }
            <model-viewer
                src={url}
                ar
                shadow-intensity="1"
                camera-controls
                touch-action="pan-y"
            ></model-viewer>
        </>
    );
};

export default AR;
