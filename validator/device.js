const { check } = require('express-validator') //TODO <---
const { validateResult } = require('../helpers/validateHelper')

const validateCreateDevice = [
    check('uid')
        .exists()
        .not()
        .isEmpty()
        .isNumeric(),
    check('vendor')
        .exists()
        .not()
        .isEmpty()
        .isString(),
    check('creation_date')
        .exists()
        .not()
        .isEmpty()
        .isDate(),
    check('status')
        .exists()
        .not()
        .isEmpty()
        .isString(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateCreateDevice }