const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const uploadImg = (folder) => {
    const storage = new CloudinaryStorage({
        cloudinary,
        params: {
            folder: folder,
            allowedFormats: ["jpg", "png", "jpeg", "webp"],
        },
    });

    return multer({ storage });
};

module.exports = { uploadImg };
