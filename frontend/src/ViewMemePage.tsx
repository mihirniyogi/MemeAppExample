import axios from "axios";
import { useState } from "react";
import Spinner from "./Spinner";

type Meme = {
  url: string;
  caption: string;
}

export default function ViewMemePage() {

  const [currentMeme, setCurrentMeme] = useState<Meme | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const API_URL_VIEW = `${import.meta.env.VITE_API_URL}/api/random-meme`;

  const showRandomMeme = async () => {
    setLoading(true);

    try {
      const response = await axios.get(API_URL_VIEW);
      const url = response.data.url;
      if (!url) {
        throw new Error("No meme URL returned from the server.");
      }
      setCurrentMeme({
        url: response.data.url,
        caption: response.data.caption ?? "No caption available"
      });
      setError('');

      console.log(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "An error occurred while fetching the meme.");
      } else {
        setError(error instanceof Error ? error.message : "An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-6">Random Meme Viewer</h1>

      {loading ? (
        <Spinner />
      ) : (
        <button
          onClick={showRandomMeme}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mb-6"
        >
          Show Random Meme
        </button>
      )}

      {currentMeme && (
        <div className="max-w-md mx-auto shadow rounded p-4">
          <img
            src={currentMeme.url}
            alt={currentMeme.caption}
            className="w-full rounded"
            style={{ height: 'auto' }}
          />
          <p className="mt-2 text-gray-700">{currentMeme.caption}</p>
        </div>
      )}

      {!currentMeme && !loading && !error && (
        <p className="text-gray-500">Click the button to view a random meme.</p>
      )}

      {error && (
        <p className="text-red-500 mt-4">{error}</p>
      )}

    </div>
  );
}