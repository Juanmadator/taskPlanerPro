const { body, param, validationResult } = require("express-validator");

const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const createEventoValidations = [
  body("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener al menos 3 caracteres")
    .isLength({ max: 100 })
    .withMessage("El nombre no debe superar los 100 caracteres"),

  body("descripcion")
    .optional()
    .isLength({ max: 500 })
    .withMessage("La descripción no debe superar los 500 caracteres"),

  body("fecha")
    .notEmpty()
    .withMessage("La fecha es obligatoria")
    .isISO8601()
    .withMessage("La fecha debe tener un formato válido (ISO 8601)"),

  validateResult,
];

module.exports = {
  createEventoValidations,
};