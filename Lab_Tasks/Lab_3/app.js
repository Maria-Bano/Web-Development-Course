const express = require('express');
const app = express();
const PORT = 3000;

// Serve everything in the 'Public' folder
app.use(express.static('Public'));

// Route for homepage with links to each assignment/lab
app.get('/', (req, res) => {
  res.send(`
    <h1>My Web Course Tasks</h1>
    <ul>
      <li><a href="/Assignment_1/index.html" target="_blank">Assignment 1</a></li>
      <li><a href="/Assignment_2/web.html" target="_blank">Assignment 2</a></li>
      <li><a href="/Lab_1/web.html" target="_blank">Lab 1</a></li>
      <li><a href="/Lab_2/web.html" target="_blank">Lab 2</a></li>
    </ul>
  `);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);

});
