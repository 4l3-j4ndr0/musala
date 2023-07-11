const { check } = require('express-validator') //TODO <---
const { validateResult } = require('../helpers/validateHelper')

const validateCreate = [ 
    check('serial_number')
        .exists()
        .not()
        .isEmpty()
        .isString(),
    check('name')
        .exists()
        .not()
        .isEmpty()
        .isString(),
    check('ipv4_address')
        .exists()
        .not()
        .isEmpty()
        .isIP(4).withMessage('Invalid IP'),
    check('devices')
        .isEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateCreate }