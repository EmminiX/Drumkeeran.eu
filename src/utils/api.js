// This file contains simulated API calls. In a real application, these would be replaced
// with actual API calls to your backend or third-party services.

export const fetchWeatherData = async () => {
    try {
        // Simulated API call
        const response = await new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    temperature: Math.floor(Math.random() * 25) + 5, // Random temperature between 5 and 30
                    condition: ['Sunny', 'Cloudy', 'Rainy', 'Windy'][Math.floor(Math.random() * 4)],
                    windSpeed: Math.floor(Math.random() * 20) + 1, // Random wind speed between 1 and 20
                });
            }, 1000);
        });
        return response;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};

export const submitContactForm = async (formData) => {
    try {
        // Simulated API call
        const response = await new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form submitted:', formData);
                resolve({ success: true, message: 'Thank you for your message!' });
            }, 1000);
        });
        return response;
    } catch (error) {
        console.error('Error submitting contact form:', error);
        throw error;
    }
};