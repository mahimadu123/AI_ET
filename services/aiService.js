const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: 'YOUR_GEMINI_API_KEY' });

const getCategoryUsingAI = async (description) => {
    try {
        const prompt = `Analyze the following expense description: "${description}". 
        Categorize it into one of these standard categories: Food, Fuel, Movie, Shopping, Bills, Travel, Others. 
        Return ONLY the category name, nothing else.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        let category = response.text ? response.text.trim() : 'Others';
        return category;
    } catch (err) {
        console.log("AI Categorization Error:", err);
        return 'Others';
    }
};

module.exports = { getCategoryUsingAI };