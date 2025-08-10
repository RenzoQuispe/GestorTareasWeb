// Middleware para validar los Schemas de Register, Login, 
export const validateSchema = (schema) => (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      return res
        .status(400)
        .json(error.errors.map((error) => error.message)); // mensaje de error de zod resumido
    }
  };