const healthCheck = (req, res) => {
  res.json({
    status: "ok",
    service: "secure-document-vault",
  });
};

module.exports = healthCheck;
