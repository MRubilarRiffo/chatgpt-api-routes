const OpenAI = require('openai');
const { config } = require('../config/config');

const openai = new OpenAI({
    apiKey: config.openai_api_key,
});

const generateReviewsAI = async (product, quantity = 4) => {
    const prompt = `
        Eres un generador experto de reseñas. A continuación, genera ${quantity} reseñas únicas en formato JSON. 
        Cada reseña debe tener estos campos:
            1. **name**: El nombre del autor.
            2. **rating**: Un valor que puede ser 4 o 5.
            3. **review**: El contenido de la reseña.

        Instrucciones adicionales:
        - La mitad de las reseñas debe ser breve y directa, como:
            "Excelente compra, llegó súper rápido."
            "Todo bien, cumple su función."
        - La otra mitad debe ser más extensa, con experiencias personales, anécdotas o sugerencias.
        - Alterna entre un tono **formal** e **informal**.
        - Usa expresiones chilenas y permite errores menores para mayor autenticidad.
        
        Ejemplo de JSON esperado:
        [
            { "name": "Ricardo F.", "rating": 5, "review": "Excelente compra, llegó súper rápido." },
            { "name": "Ana M.", "rating": 5, "review": "Desde que uso estas plantillas, mis pies están mucho mejor..." }
        ]

        Ahora, genera reseñas para el siguiente producto: "${product}"
    `;

    try {    
        const response = await openai.chat.completions.create({
            // model: 'gpt-3.5-turbo',
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: 'Eres un generador de reseñas experto.' },
                { role: 'user', content: prompt }
            ],
            temperature: 0.7,
            max_tokens: 1500,
        });

        return response;
    } catch (err) {
        const error = new Error(err.message);
        error.statusCode = error.status;
        throw error;
    };
};

module.exports = { generateReviewsAI };