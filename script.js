document.getElementById('sendRequest').addEventListener('click', async () => {
  const endpoint = document.getElementById('endpoint').value;
  const method = document.getElementById('method').value;
  const payload = document.getElementById('payload').value;

  try {
    const response = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: method !== 'GET' ? payload : null,
    });

    const result = await response.json();
    document.getElementById('responseOutput').textContent = JSON.stringify(result, null, 2);
  } catch (error) {
    document.getElementById('responseOutput').textContent = 'Error: ' + error.message;
  }
});
