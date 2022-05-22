import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion("text-davinci-002", {
    prompt: generatePrompt(req.body.movie),
    temperature: 0.6,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(movie) {
  const capitalizedMovie =
    movie[0].toUpperCase() + movie.slice(1).toLowerCase();
    return `Suggest movies to watch by choosing a genre

    
    Genre: Action
    Movie: The Matrix

   
    Genre: Drama  
    Movie: Taxi Driver

    Genre: ${capitalizedMovie}
    Movies:`;
    }
    
