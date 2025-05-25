import { useState } from "react";

type Meme = {
  url: string;
  caption: string;
}

export default function ViewMemePage() {
  const [memes, setMemes] = useState<Meme[]>([
    {
      url: "https://i.imgflip.com/1bij.jpg",
      caption: "meme1",
    },
    {
      url: "https://i.imgflip.com/26am.jpg",
      caption: "meme2",
    },
  ]);

  const [currentMeme, setCurrentMeme] = useState<Meme | null>(null);

  const showRandomMeme = () => {
    if (memes.length === 0) return;
    const randomIndex = Math.floor(Math.random() * memes.length);
    setCurrentMeme(memes[randomIndex]);
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-6">Random Meme Viewer</h1>

      <button
        onClick={showRandomMeme}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mb-6"
      >
        Show Random Meme
      </button>

      {currentMeme && (
        <div className="max-w-md mx-auto bg-white shadow rounded p-4">
          <img
            src={currentMeme.url}
            alt={currentMeme.caption}
            className="w-full h-64 object-cover rounded"
          />
          <p className="mt-2 text-gray-700">{currentMeme.caption}</p>
        </div>
      )}

      {!currentMeme && (
        <p className="text-gray-500">Click the button to view a random meme.</p>
      )}
    </div>
  );
}