export const getAIResponse = (userMessage) => {
    const responses = [
      '¡Hola! ¿Cómo estás?',
      'Aquí, tranquilo. ¿Y tú?',
      'Estoy ocupado ahora, hablemos después.',
      '¡Qué bien oír eso!',
      '¿En qué puedo ayudarte?',
    ];
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  };
  