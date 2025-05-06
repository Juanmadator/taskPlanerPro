const { body, param, validationResult } = require('express-validator');

// Función de validación de resultados
const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Validaciones para crear usuario
const createUserValidations = [
    body('nombre')
        .notEmpty()
        .withMessage('El nombre es requerido')
        .isString()
        .withMessage('El nombre debe ser texto'),
    
    body('email')
        .notEmpty()
        .withMessage('El email es requerido')
        .isEmail()
        .withMessage('Debe ser un email válido'),
    
    body('saldoEuros')
        .optional()
        .isNumeric()
        .withMessage('El saldo debe ser un número')
        .custom(value => {
            if (value < 0) throw new Error('El saldo no puede ser negativo');
            return true;
        }),
    
    body('cuentaBancaria')
        .notEmpty()
        .withMessage('La cuenta bancaria es requerida')
        .isString()
        .withMessage('La cuenta bancaria debe ser texto'),
    
    body('telefono')
        .notEmpty()
        .withMessage('El teléfono es requerido')
        .isString()
        .withMessage('El teléfono debe ser texto'),
    
    body('codigoDepartamento')
        .notEmpty()
        .withMessage('El código de departamento es requerido')
        .isString()
        .withMessage('El código de departamento debe ser texto')
        .isLength({ min: 3, max: 10 })
        .withMessage('El código de departamento debe tener entre 3 y 10 caracteres'),
    
    body('codigoPostal')
        .notEmpty()
        .withMessage('El código postal es requerido')
        .isString()
        .withMessage('El código postal debe ser texto'),
    
    validateResult
];

// Validaciones para actualizar usuario
const updateUserValidations = [
    param('id')
        .notEmpty()
        .withMessage('El ID es requerido')
        .isMongoId()
        .withMessage('Debe ser un ID de MongoDB válido'),

    body('nombre')
        .optional()
        .isString()
        .withMessage('El nombre debe ser texto'),
    
    body('email')
        .optional()
        .isEmail()
        .withMessage('Debe ser un email válido'),
    
    body('saldoEuros')
        .optional()
        .isNumeric()
        .withMessage('El saldo debe ser un número')
        .custom(value => {
            if (value < 0) throw new Error('El saldo no puede ser negativo');
            return true;
        }),
    
    body('cuentaBancaria')
        .optional()
        .isString()
        .withMessage('La cuenta bancaria debe ser texto'),
    
    body('telefono')
        .optional()
        .isString()
        .withMessage('El teléfono debe ser texto'),
    
    body('codigoDepartamento')
        .optional()
        .isString()
        .withMessage('El código de departamento debe ser texto')
        .isLength({ min: 3, max: 10 })
        .withMessage('El código de departamento debe tener entre 3 y 10 caracteres'),
    
    body('codigoPostal')
        .optional()
        .isString()
        .withMessage('El código postal debe ser texto'),
    
    validateResult
];

// Validaciones para obtener usuario por ID
const getUserValidations = [
    param('id')
        .optional()
        .isMongoId()
        .withMessage('Debe ser un ID de MongoDB válido'),
    validateResult
];

module.exports = {
    createUserValidations,
    updateUserValidations,
    getUserValidations
}; 