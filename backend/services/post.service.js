const { ServiceError, ErrorHandler } = require("./error-handler.js");
const { Post } = require("../models/index.js");
const { deleteImage } = require("../helpers/index.js");

class PostService {
  async getAll(id) {
    try {
      const posts = await Post.find({ author: id });
      return posts;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async getById(id) {
    try {
      const post = await Post.findById(id);
      if (!post) {
        throw new ServiceError("Post not found", 404);
      }
      return post;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async add(data) {
    try {
      const post = await Post.create({
        author: data.userId,
        title: data.title,
        content: data.content,
        images: data.images,
        hashtags: data.hashtags,
      });
      return post;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async delete(data) {
    try {
      const { userId, role } = data;
      const found = await Post.findById(id);
      if (!found) {
        throw new ServiceError("Post not found", 404);
      }
      const author = found.author;
      if (userId != author && role != "admin") {
        throw ("Cannot access or modify this post", 409);
      }
      await found.deleteOne();
      return author;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async toggleLike(data) {
    try {
      const { userId, postId } = data;
      return await Post.toggleLike(userId, postId);
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async update(data) {
    try {
      const { id, userId, images, description, title } = data;
      const post = await Post.findById(id);
      if (!post) {
        throw new ServiceError("Post not found", 404);
      }
      if (post.author != userId) {
        throw new ServiceError("Cannot access or modify this post", 409);
      }
      if (images.length) {
        post.images.push(...images);
      }
      if (description) {
        post.description = description;
      }
      if (title) {
        post.title = title;
      }
      await post.save();
      return post;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
  async deletePhoto(data) {
    try {
      const { id, userId, filename, role } = data;
      const post = await Post.findById(id);
      if (!post) {
        throw new ServiceError("Post not found", 404);
      }
      const access = post.author == userId || role == "admin";
      if (!access) {
        throw new ServiceError("Cannot access or modify this post", 409);
      }
      post.images = post.images.filter((img) => img != filename);
      await post.save();
      await deleteImage(filename);
      return post;
    } catch (err) {
      throw ErrorHandler.normalize(err);
    }
  }
}

module.exports = new PostService();
