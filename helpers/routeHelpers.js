const Joi = require('joi');

module.exports = {
    //validateParam is awesome module property 
    //that can be reused in other projects, 
    //just change the Schema properties for corresponding project
    validateParam: (schema, name) => {
        return (req, res, next) => {

            const result = Joi.validate({ param: req.params[name] }, schema); //[name] is dynamically added property to an object
            if (result.error) {
                //error happened
                return res.status(400).json(result.error);
            } else {
                // if value property exists we need to append new value
                // and not to overwrite the old one.
                // Reason is, maybe req.params has more than one property
                if (!req.value)
                    req.value = {};
                if (!req.value.params)
                    req.value.params = {};
                req.value.params[name] = result.value.param;
                next();
            }
        }
    },

    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);

            if (result.error) {
                //error happened
                return res.status(400).json(result.error);
            } else {
                if (!req.value)
                    req.value = {};
                if (!req.value.body)
                    req.value.body = {};
                req.value.body = result.value;
                next();
            }
        }
    },
    schemas: {

        blogSchema: Joi.object().keys({
            title: Joi.string().required(),
            body: Joi.string().required(),

        }),
        idSchema: Joi.object().keys({
            // param, becuse I named it like that above, in validateParam method
            param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),

    }
}