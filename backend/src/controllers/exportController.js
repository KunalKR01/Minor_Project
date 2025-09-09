const generateHtml = require('../agents/htmlAgent');

const exp = async (req, res) => {
  const conversation = req.result; // have the full conversation

  // logic for creating pdf for the req.converstation and send the pdf link and store in db in the conversation model

  const html = await generateHtml(conversation);
  res.send(html);
};

module.exports = { exp };
