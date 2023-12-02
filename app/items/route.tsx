export async function fetchData() {
  try {
    const res = await fetch('https://localhost:PORT/your-path', {
      headers: {
        'Content-Type': 'application/json',
        'API-Key': process.env.DATA_API_KEY
      }
    });

    if (!res.ok) {
      throw new Error('Network response was not ok.');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    // 在实际应用中，您可能需要对错误进行处理
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
}
