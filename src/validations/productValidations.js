const { body, param, validationResult } = require("express-validator");

// Función de validación de resultados
const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validaciones para crear producto
const createProductValidations = [
    body('nombre').notEmpty().withMessage('El nombre es requerido').isString().withMessage('El nombre debe ser texto'),
    
    body('descripcion').notEmpty().withMessage('La descripción es requerida').isString().withMessage('La descripción debe ser texto'),
    
    body('precio').notEmpty().withMessage('El precio es requerido').isNumeric().withMessage('El precio debe ser un número').custom(value => {
        if (value < 0) throw new Error('El precio no puede ser negativo');
        return true;
    }),
    
    body('stock').notEmpty().withMessage('El stock es requerido').isInt({ min: 0 }).withMessage('El stock debe ser un número entero positivo'),
    
    body('categoria').notEmpty().withMessage('La categoría es requerida').isString().withMessage('La categoría debe ser texto'),
    
    body('marca').notEmpty().withMessage('La marca es requerida').isString().withMessage('La marca debe ser texto'),
    
    body('codigoProducto').notEmpty().withMessage('El código de producto es requerido').isString().withMessage('El código de producto debe ser texto'),
    
    body('fechaFabricacion').notEmpty().withMessage('La fecha de fabricación es requerida').isISO8601().withMessage('Debe ser una fecha válida'),
    
    body('garantiaMeses').notEmpty().withMessage('La garantía en meses es requerida').isInt({ min: 1 }).withMessage('La garantía debe ser un número entero positivo'),
    
    body('peso').notEmpty().withMessage('El peso es requerido').isNumeric().withMessage('El peso debe ser un número positivo').custom(value => {
        if (value < 0) throw new Error('El peso no puede ser negativo');
        return true;
    }),
    
    body('dimensiones').notEmpty().withMessage('Las dimensiones son requeridas').isObject().withMessage('Las dimensiones deben ser un objeto válido'),

    // Validación anidada de dimensiones
    body('dimensiones.alto')
      .notEmpty().withMessage('El alto es requerido')
      .isNumeric().withMessage('El alto debe ser un número positivo')
      .custom(value => {
        if (value <= 0) throw new Error('El alto debe ser un número positivo');
        return true;
      }),

    body('dimensiones.ancho')
      .notEmpty().withMessage('El ancho es requerido')
      .isNumeric().withMessage('El ancho debe ser un número positivo')
      .custom(value => {
        if (value <= 0) throw new Error('El ancho debe ser un número positivo');
        return true;
      }),

    body('dimensiones.profundidad')
      .notEmpty().withMessage('La profundidad es requerida')
      .isNumeric().withMessage('La profundidad debe ser un número positivo')
      .custom(value => {
        if (value <= 0) throw new Error('La profundidad debe ser un número positivo');
        return true;
      }),

    body('coloresDisponibles').optional().isArray().withMessage('Los colores deben ser un array de strings'),
    
    body('etiquetas').optional().isArray().withMessage('Las etiquetas deben ser un array de strings'),
    
    body('imagenes').optional().isArray().withMessage('Las imágenes deben ser un array de strings'),
    
    body('esActivo').notEmpty().withMessage('El estado activo es requerido').isBoolean().withMessage('El estado activo debe ser booleano'),
    
    validateResult
];

// Validaciones para actualizar producto
const updateProductValidations = [
    param('id').notEmpty().withMessage('El ID es requerido').isMongoId().withMessage('Debe ser un ID de MongoDB válido'),
    
    body('nombre').optional().isString().withMessage('El nombre debe ser texto'),
    body('descripcion').optional().isString().withMessage('La descripción debe ser texto'),
    body('precio').optional().isNumeric().withMessage('El precio debe ser un número').custom(value => {
        if (value < 0) throw new Error('El precio no puede ser negativo');
        return true;
    }),
    body('stock').optional().isInt({ min: 0 }).withMessage('El stock debe ser un número entero positivo'),
    body('categoria').optional().isString().withMessage('La categoría debe ser texto'),
    body('marca').optional().isString().withMessage('La marca debe ser texto'),
    body('codigoProducto').optional().isString().withMessage('El código de producto debe ser texto'),
    body('fechaFabricacion').optional().isISO8601().withMessage('Debe ser una fecha válida'),
    body('garantiaMeses').optional().isInt({ min: 0 }).withMessage('La garantía debe ser un número entero positivo'),
    body('peso').optional().isNumeric().withMessage('El peso debe ser un número positivo').custom(value => {
        if (value < 0) throw new Error('El peso no puede ser negativo');
        return true;
    }),
    body('alto').optional().isNumeric().withMessage('El alto debe ser un número positivo'),
    body('ancho').optional().isNumeric().withMessage('El ancho debe ser un número positivo'),
    body('profundidad').optional().isNumeric().withMessage('La profundidad debe ser un número positivo'),
    body('coloresDisponibles').optional().isArray().withMessage('Los colores deben ser un array de strings'),
    body('etiquetas').optional().isArray().withMessage('Las etiquetas deben ser un array de strings'),
    body('imagenes').optional().isArray().withMessage('Las imágenes deben ser un array de strings'),
    body('esActivo').optional().isBoolean().withMessage('El estado activo debe ser booleano'),
    
    validateResult
];

// Validaciones para obtener producto por ID
const getProductValidations = [
    param('id').notEmpty().withMessage('El ID es requerido').isMongoId().withMessage('Debe ser un ID de MongoDB válido'),
    validateResult
];

module.exports = {
    createProductValidations,
    updateProductValidations,
    getProductValidations,
};
