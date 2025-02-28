const Post = require('../models/post');

const createPost = (req, res) => {
    const { title, content } = req.body;
    const post = new Post({
        title,
        content,
        author: req.userDatauserId,
    });
    post.save()
        .then(result => res.status(201).json({ message: 'Post created', post: result }))
        .catch(err => res.status(500).json({ error: err.message }));
};

const getPosts = (req, res) => {
    Post.find()
        .populate('author', 'username')
        .then(posts => res.status(200).json(posts))
        .catch(err => res.status(500).json({ error: err.message }));
};

module.exports = { createPost, getPosts };