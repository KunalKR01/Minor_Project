// library
const OpenAI = require('openai');

const client = new OpenAI({
  apiKey: process.env.API_OPENAI,
});

async function generateHtml(conversation) {
  const { query, answer, papers, summary, validation } = conversation;

  const prompt = `
        You are an "HTML Agent". Format this data into clean, semantic HTML:

        - Use <section> for each main category: Query, Answer, Papers, Summary, Validation.
        - Use <article> for each paper, including title, authors, link, and paper ID.
        - Use <h1> for main heading, <h2> for section headings, <h3> for subheadings.
        - Bold important labels like Authors, Link, Paper ID, Feedback.
        - For Validation:
            - Show "Is Valid" in green if true, red if false.
            - Include Score, Feedback, and Citations as separate <p>.
        - Papers are in an array; create one <article> per paper.
        - Return ONLY HTML, no explanations.

        Query: ${query}
        Answer: ${answer}
        Papers: ${JSON.stringify(papers)} 
        Summary: ${summary}
        Validation: ${JSON.stringify(validation)}
        `;

  try {
    // req to agent
    const response = await client.responses.create({
      model: 'gpt-4o-mini',
      input: [
        {
          role: 'user',
          content: [{ type: 'input_text', text: prompt }], // messges is an array cause gpt thinks message can have multiple in one request therefore
        },
      ],
    });

    if (!response.output_text) {
      throw Error("No output_text");
    }
    console.log('output_text- ' + response.output_text);
    return response.output_text;

  } catch (error) {
    console.log("error in htmlAgent- " + error);
    return "here we send raw html";

  }
}

module.exports = generateHtml;
