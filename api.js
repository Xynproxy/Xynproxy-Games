<script>
  fetch('https://sites.google.com/view/xynproxy/home')
    .then(response => response.json())
    .then(data => {
      document.getElementById('output').textContent = data.message;
    });
</script>

<div id="output">Loading...</div>
