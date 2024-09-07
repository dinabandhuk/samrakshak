// // src/utils/zipUtils.js
// import jszip from "jszip";

// export const extractGlbFilesFromZip = async (arrayBuffer) => {
//   try {
//     // Convert ArrayBuffer to Blob and load into JSZip
//     const blob = new Blob([arrayBuffer], { type: "application/zip" });
//     const zip = await jszip.loadAsync(blob);

//     // Extract .glb files
//     const extractedFiles = [];
//     const filePromises = [];

//     zip.forEach((relativePath, file) => {
//       if (file.name && file.name.endsWith(".glb")) {
//         const promise = file.async("blob").then((content) => {
//           extractedFiles.push({
//             name: file.name,
//             content: URL.createObjectURL(content), // Create object URL
//           });
//         });
//         filePromises.push(promise);
//       }
//     });

//     // Wait for all files to be processed
//     await Promise.all(filePromises);

//     return extractedFiles;
//   } catch (error) {
//     console.error("Error extracting files from ZIP:", error);
//     throw error; // Re-throw to be handled in the calling component
//   }
// };

import JSZip from "jszip";

async function extractGlbFromArrayBuffer(arrayBuffer) {
  const zip = new JSZip();
  try {
    // Load the ArrayBuffer into JSZip
    const zipContent = await zip.loadAsync(arrayBuffer);

    // Find and extract the .glb file
    for (const filename of Object.keys(zipContent.files)) {
      if (filename.toLowerCase().endsWith(".glb")) {
        const glbFile = await zipContent.files[filename].async("arraybuffer");

        return glbFile; // Return the extracted GLB file as an ArrayBuffer
      }
    }

    console.log("No .glb file found in the zip.");
    return null;
  } catch (error) {
    console.error("Error extracting GLB file:", error);
  }
}

export default extractGlbFromArrayBuffer;
