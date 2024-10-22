const { validations } = require("../helpers/validations");
const { generateReviewsAI } = require("../services/openaiService");

const generateReviews = async (req, res, next) => {
    try {
        const { product, quantity = 4 } = req.body;

        const validationRules = {
            product: { type: 'string', required: true, length: { min: 50 } },
            quantity: { type: 'number', required: false, greaterThan: 1, lessThan: 21 }
        };

        const errors = validations({ product, quantity }, validationRules);

        if (Object.keys(errors).length > 0) {
            const error = new Error('Se encontraron errores de validación.');
            error.statusCode = 400;
            error.validationErrors = errors;
            throw error;
        };

        const response = await generateReviewsAI(product, quantity);
        
        let content = response.choices[0].message.content.trim();
    
        // Eliminar posibles delimitadores de bloque de código
        if (content.startsWith('```json')) {
          content = content.slice(7); // Elimina '```json\n'
        };
        if (content.endsWith('```')) {
          content = content.slice(0, -3); // Elimina '```'
        };
    
        // Convertir el texto limpio a JSON
        const reviews = JSON.parse(content);
    
        res.json(reviews);
    } catch (error) {
        next(error);
    };
};

module.exports = { generateReviews };