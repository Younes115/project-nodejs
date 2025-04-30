const { body, validationResult } = require('express-validator');

const validation = ()=> {
    return [
    body('title')
        .notEmpty().withMessage("title is required")
        .isLength({ min: 2 }).withMessage("length at least 2"),
    body("price")
        .notEmpty().withMessage("price is required"),
  
];
}
module.exports = { validation };
