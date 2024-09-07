import React, { useState } from 'react';
import GlbLoader from '../components/glbLoader';

const Render = () => {
    const [modelUrl, setModelUrl] = useState(null);
    const [render, setRender] = useState(false);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setModelUrl(url);
            setRender(true);
        }
    };

    return (
        <div>
            <input type="file" accept=".glb" onChange={handleFileUpload} />
            {render && (<GlbLoader url={modelUrl} />)}
        </div>
    );
};

export default Render;
