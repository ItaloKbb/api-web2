class ErrorHandler {
  /**
   * Handles errors by sending a structured JSON response with appropriate status code and message.
   * @param {Object} res - Express response object.
   * @param {Object} error - Error object containing details of the issue.
   */
  static handleError(res, error) {
      console.error('Error:', {
          message: error.message,
          stack: error.stack,
          details: error.details || null,
      });

      // Custom error handling based on error message
      if (error.message.includes('Token não fornecido') || error.message.includes('jwt malformed')) {
          res.status(401).json({
              error: {
                  message: error.message,
                  code: 'AUTH_TOKEN_MISSING',
              },
          });
      } else if (error.message.includes('Acesso negado')) {
          res.status(403).json({
              error: {
                  message: error.message,
                  code: 'ACCESS_DENIED',
              },
          });
      } else if (error.message.includes('Validação falhou')) {
          res.status(400).json({
              error: {
                  message: error.message,
                  code: 'VALIDATION_FAILED',
                  details: error.details || null,
              },
          });
      } else if (error.message.includes('Recurso não encontrado')) {
          res.status(404).json({
              error: {
                  message: error.message,
                  code: 'RESOURCE_NOT_FOUND',
              },
          });
      } else if (error.message.includes('Método não permitido')) {
          res.status(405).json({
              error: {
                  message: error.message,
                  code: 'METHOD_NOT_ALLOWED',
              },
          });
      } else if (error.message.includes('Conflito de dados')) {
          res.status(409).json({
              error: {
                  message: error.message,
                  code: 'DATA_CONFLICT',
              },
          });
      } else if (error.message.includes('Requisição inválida')) {
          res.status(422).json({
              error: {
                  message: error.message,
                  code: 'UNPROCESSABLE_ENTITY',
              },
          });
      } else {
          const statusCode = error.statusCode || 500;
          const message = error.message || 'Internal Server Error';

          res.status(statusCode).json({
              error: {
                  message,
                  code: 'INTERNAL_SERVER_ERROR',
                  details: error.details || null,
              },
          });
      }
  }

  /**
   * Handles 404 (Not Found) errors by sending a structured JSON response.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  static notFound(req, res) {
      res.status(404).json({
          error: {
              message: 'Resource not found',
              code: 'RESOURCE_NOT_FOUND',
              method: req.method,
              url: req.originalUrl,
          },
      });
  }

  /**
   * Handles validation errors by sending a 400 status with detailed messages.
   * @param {Object} res - Express response object.
   * @param {Array} errors - Array of validation error objects.
   */
  static validationError(res, errors) {
      res.status(400).json({
          error: {
              message: 'Validation failed',
              code: 'VALIDATION_FAILED',
              details: errors.map(err => ({
                  field: err.field || null,
                  message: err.message,
              })),
          },
      });
  }
}

module.exports = ErrorHandler;