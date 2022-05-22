import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [movieInput, setmovieInput] = useState("");
  const [result, setResult] = useState();
  const [resultPoster, setResultPoster] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ movie: movieInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setmovieInput("");
    setResultPoster(data.poster);
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/movie.png" />
      </Head>

      <main className={styles.main}>
        <img src="/movie.png" className={styles.icon} />
        <h3>Suggest Movie to watch</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="movie"
            placeholder="Enter a genre to get a movie recommendation"
            value={movieInput}
            onChange={(e) => setmovieInput(e.target.value)}
          />
          <input type="submit" value="Generate Movies" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
