const handleAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    console.error('Internal server error:', err);
    res.status(500).json({ message: 'Internal server error' });
  });
};

module.exports = handleAsync;
