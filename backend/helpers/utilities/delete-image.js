const fs = require("fs/promises");
const path = require("path");

async function deleteImage(imagePath) {
  if (!deleteImage.basePath) {
    deleteImage.basePath = path.resolve("./backend");
  }
  let deletedCount = 0;
  if (Array.isArray(imagePath)) {
    for (const img of imagePath) {
      const filePath = path.resolve(deleteImage.basePath, img);
      try {
        await fs.unlink(filePath);
        deletedCount++;
      } catch {
        // File may already be deleted
      }
    }
    return deletedCount;
  }
  const filePath = path.resolve(deleteImage.basePath, imagePath);

  try {
    await fs.unlink(filePath);
    return ++deletedCount;
  } catch (err) {
    if (err.code === "ENOENT") {
      return ++deletedCount;
    } else {
      return deletedCount;
    }
  }
}

module.exports = deleteImage;
