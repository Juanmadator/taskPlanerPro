const { body, param, validationResult } = require("express-validator");

const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const createTareaValidations = [
  body("titulo")
    .notEmpty()
    .withMessage("El título es obligatorio")
    .isLength({ min: 3 })
    .withMessage("El título debe tener al menos 3 caracteres"),

  body("descripcion")
    .notEmpty()
    .withMessage("La descripción es obligatoria")

    .isLength({ max: 500 })
    .withMessage("La descripción no debe superar los 500 caracteres"),

  body("estado")
    .notEmpty()
    .withMessage("El título es obligatorio")

    .isIn(["pendiente", "en-progreso", "completado"])
    .withMessage("El estado debe ser: pendiente, en progreso o completada"),
  validateResult
];

const updateTareaValidations = [
  body("titulo")
    .notEmpty()
    .withMessage("El título es obligatorio")

    .isLength({ min: 3 })
    .withMessage("El título debe tener al menos 3 caracteres"),

  body("descripcion")
    .notEmpty()
    .withMessage("La descripción es obligatoria")

    .isLength({ max: 500 })
    .withMessage("La descripción no debe superar los 500 caracteres"),

  body("estado")
    .notEmpty()
    .withMessage("El estado es obligatorio")

    .isIn(["pendiente", "en-progreso", "completado"])
    .withMessage("El estado debe ser: pendiente, en progreso o completada"),
    validateResult
];

const getTareaValidations = [
  param("id")
    .optional()
    .isMongoId()
    .withMessage("Debe ser un ID de MongoDB válido"),
  validateResult,
];

module.exports = {
  createTareaValidations,
  updateTareaValidations,
  getTareaValidations,
};
