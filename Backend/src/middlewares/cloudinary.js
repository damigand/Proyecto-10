const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const uploadImg = (folder) => {
    const storage = new CloudinaryStorage({
        cloudinary,
        params: {
            folder: folder,
            allowedFormats: ["jpg", "png", "jpeg", "webp"],
            transformation: [
                { width: 300, height: 300, crop: "fill", gravity: "center", quality: 100 },
            ],
        },
    });

    return multer({ storage });
};

const removeImg = (url) => {
    const imgSplited = url.split("/");
    const nameSplited = imgSplited.at(-1).split(".")[0];
    const folderSplited = imgSplited.at(-2);
    const public_id = `${folderSplited}/${nameSplited}`;

    cloudinary.uploader.destroy(public_id, () => {
        console.log("Image deleted in cloudinary: " + public_id);
    });
};

module.exports = { uploadImg, removeImg };
