const router = require('express-promise-router')();
const blogController = require('../controllers/blogs');

const { validateParam, validateBody, schemas } = require('../helpers/routeHelpers');

// Always use data validation before mongodb, and I mean first thing 
// after the request has been made. Don't rely only on mongoose
// schema to validate your responds, sometimes we will perform some
// calculations instead of saving the data to mongodb and then we will
// miss that request to validate because it never went through schema

router.route('/')
    .get(blogController.index) 

router.route('/addBlog/')
    .post(validateBody(schemas.blogSchema), blogController.newBlog);

router.route('/singleBlog/:blogId')
    .get(validateParam(schemas.idSchema, 'blogId'),blogController.getBlog)
    .delete(validateParam(schemas.idSchema, 'blogId'), blogController.deleteBlog);

module.exports = router;