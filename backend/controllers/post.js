const { Post } = require("../models/");
const { deleteImage } = require("../helpers/");

class PostController {
  async add(req, res) {
    const { files } = req;
    const { title, content } = req.body;
    if (!files?.length || !title?.trim() || !content?.trim()) {
      return res.status(400).send({ message: "Missing fields..." });
    }
    const images = files.forEach((file) => file.path);
    try {
      const post = await Post.create({
        author: req.user._id,
        title,
        content,
        city: id,
        images,
      });
      return res
        .status(201)
        .send({ message: "Post created successfully", payload: post });
    } catch (error) {
      return res.status(500).send({ message: "Internal server problem" });
    }
  }
  async delete(req, res) {
    const { id } = req.params;
    const userId = req.user._id.toString();
    if (!id) {
      return res.status(400).send({ message: "Missing id" });
    }
    try {
      const found = await Post.findById(id);
      if (!found) {
        return res.status(404).send({ message: "Post not found" });
      }
      if (
        found.author.toString() != userId.toString() &&
        req.user.role != "admin"
      ) {
        return res.status(409).send({ message: "Cannot acces delete post" });
      }
      await deleteImage(found.images || []);
      await found.deleteOne();
      return res.status(200).send({ message: "Post deleted successfully" });
    } catch (error) {
      return res.status(500).send({ message: "Internal server problem" });
    }
  }
  async like(req, res) {
    const { id } = req.params;
    const userId = req.user._id.toString();
    if (!id) {
      return res.status(400).send({ message: "Missing post id" });
    }
    try {
      const message = await Post.toggleLike(userId, id);
      return res.status(200).send({ message });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal server problem" });
    }
  }
  async update(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ message: "Missing id" });
    }
    const { files } = req;
    const { title, content } = req.body;
    if (!files && !title?.trim() && !content?.trim()) {
      return res.status(400).send({ message: "Missing fields..." });
    }
    try {
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).send({ message: "Post not found" });
      }
      if (files) {
        const images = files.forEach((file) => file.path);
        post.images.push(...images);
      }
      if (title) {
        post.title = title;
      }
      if (content) {
        post.content = content;
      }
      await post.save();
      return res.status(200).send({ message: "Post Updated successfully" });
    } catch (error) {
      return res.status(500).send({ message: "Internal server problem" });
    }
  }
  async deletePhoto(req, res) {
    const { filename } = req.query;
    const { id } = req.params;
    const userId = req.user._id.toString();
    if (!filename || !id) {
      return res.status(400).send({ message: "Missing fields..." });
    }
    try {
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).send({ message: "Post not found" });
      }
      const access = post.author == userId || req.user.role == "admin";
      if (!access) {
        return res.status(409).send({ meesage: "Cannot access!" });
      }
      post.images = post.images.filter((img) => img != filename);
      await post.save();
      await deleteImage(filename);
      return res.status(200).send({ message: "image deleted successfully" });
    } catch (error) {
      return res.status(500).send({ message: "Internal server problem" });
    }
  }
}

module.exports = new PostController();
