const serveLandingPage = (req, res) => {
  const filename = 'index.html';
  res.sendFile(filename, { root: './views' });
};

module.exports = { serveLandingPage };
