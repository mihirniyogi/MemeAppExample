import { useState } from "react";

export default function UploadMemePage() {

  const [caption, setCaption] = useState('');
  const [file, setFile] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Uploading:", { file, caption });
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Upload a Meme</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">

        <div className="flex flex-col space-y-2">

          {/* image picker */}
          <label className="cursor-pointer bg-gray-100 border border-dashed border-gray-400 p-4 rounded text-center hover:bg-gray-200 transition">
            <span className="block text-sm text-gray-700">
              {file ? `Selected: ${file.name}` : "Click to choose an image"}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
              required
            />
          </label>
        </div>

        {/* caption picker */}
        <input
          type="text"
          placeholder="Enter a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="border p-2 rounded"
          required
        />

        {/* submit button */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Upload
        </button>
      </form>
    </div>
  )
}