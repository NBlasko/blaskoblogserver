const Blog = require('../models/blog');


module.exports = {
    index: async (req, res, next) => {
        //get all blogs
        const blogs = await Blog.find({});
        res.status(200).json(blogs);
    },
    newBlog: async (req, res, next) => {
        //post new blog

        const blog = await Blog.create(req.value.body);
        res.status(200).json(blog);
    },
    getBlog : async (req, res, next ) => {
        const { blogId } = req.value.params; //value is new added property created with module helpers/routeHelpers
        const blog = await Blog.findById(blogId)
        res.status(200).json(blog);
    },

    deleteBlog : async (req, res, next ) => {
      
        const { blogId } = req.value.params; 
        const blog = await Blog.findById(req.value.params.blogId);
        if (!blog) return res.status(404).json({error: "blog doesn\'t exist"});     
        await blog.remove();
        res.status(200).json(blog);
    },
}
