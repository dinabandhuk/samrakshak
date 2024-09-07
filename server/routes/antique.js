const express = require("express");
const Antique = require("../models/antique");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const { getBucket } = require("../database/connect");
const { ObjectId } = require("mongodb");

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

// adding antique with gridfs

router.post("/addAntique", upload.any(), async (req, res) => {
  try {
    const files = req.files; // Array of uploaded files
    if (!files || files.length < 2) {
      return res.status(400).send("Missing files");
    }

    const imageFile = files.find((file) => file.mimetype.startsWith("image/"));
    const glbFile = files.find((file) => file.originalname.endsWith(".glb"));

    if (!imageFile || !glbFile) {
      return res.status(400).send("Invalid file types");
    }

    const bucket = getBucket();

    // Upload image file to GridFS
    const imageUploadStream = bucket.openUploadStream(imageFile.originalname);
    imageUploadStream.end(imageFile.buffer);

    // Upload .glb file to GridFS
    const glbUploadStream = bucket.openUploadStream(glbFile.originalname);
    glbUploadStream.end(glbFile.buffer);

    // Wait for uploads to complete and get the file IDs
    const [imageFileResult, glbFileResult] = await Promise.all([
      new Promise((resolve, reject) => {
        imageUploadStream
          .on("finish", () => resolve({ _id: imageUploadStream.id }))
          .on("error", reject);
      }),
      new Promise((resolve, reject) => {
        glbUploadStream
          .on("finish", () => resolve({ _id: glbUploadStream.id }))
          .on("error", reject);
      }),
    ]);

    // Save Antique document with references to the uploaded files
    const antique = new Antique({
      antiqueName: req.body.antiqueName,
      description: req.body.description,
      origin: req.body.origin,
      location: JSON.parse(req.body.location),
      glbData: glbFileResult._id,
      image: imageFileResult._id,
      userId: req.user._id,
    });

    await antique.save();

    res.status(201).send("Antique created successfully!");
  } catch (err) {
    console.error("Error creating antique:", err);
    res.status(500).send("Error creating antique");
  }
});

router.get("/getZip", async (req, res) => {
  const filePath = path.join(__dirname, "../assets/output.zip");

  res.sendFile(filePath, (error) => {
    if (error)
      return res
        .status(500)
        .json({ message: "Failed to send files from server" });
  });
});

router.get("/getAntique/:id", async (req, res) => {
  try {
    const antiqueId = req.params.id;

    const antique = await Antique.findById(antiqueId).populate(
      "userId",
      "userName email"
    );

    if (!antique) {
      return res.status(404).json({ message: "Antique not found" });
    }

    res.status(200).json(antique);
  } catch (error) {
    console.error("Error fetching antique details:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/getAntique", async (req, res) => {
  try {
    const antiques = await Antique.find();
    if (antiques) {
      return res.status(200).json(antiques);
    } else {
      return res.status(404).json({ message: "No antiques found" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error on get antique from server" });
  }
});

router.get("/getImage/:imageId", async (req, res) => {
  try {
    1;
    const imageId = req.params.imageId;

    // Stream the image file from GridFS using the provided ObjectId
    const bucket = getBucket();
    const downloadStream = bucket.openDownloadStream(new ObjectId(imageId));

    downloadStream.on("error", (err) => {
      console.error("Error streaming image:", err);
      res.status(404).send("Image not found");
    });

    downloadStream.pipe(res);
  } catch (err) {
    console.error("Error retrieving image:", err);
    res.status(500).send("Error retrieving image");
  }
});

router.get("/getGLB/:glbId", async (req, res) => {
  try {
    const glbId = req.params.glbId;

    // Stream the GLB file from GridFS using the provided ObjectId
    const bucket = getBucket();
    const downloadStream = bucket.openDownloadStream(new ObjectId(glbId));

    downloadStream.on("error", (err) => {
      console.error("Error streaming GLB file:", err);
      res.status(404).send("GLB file not found");
    });

    // res.setHeader("")
    res.setHeader("Content-Type", "application/octet-stream");

    downloadStream.pipe(res);
  } catch (err) {
    console.error("Error retrieving GLB file:", err);
    res.status(500).send("Error retrieving GLB file");
  }
});

module.exports = router;
