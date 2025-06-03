import axios from "axios";
import { useState } from "react";
import Spinner from "./Spinner";

export default function UploadMemePage() {

  const [caption, setCaption] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const API_URL_UPLOAD = `${import.meta.env.VITE_API_URL}/api/upload`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!file) {
      alert("Please select an image file.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("caption", caption);

      const response = await axios.post(
        API_URL_UPLOAD,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(response.data.message);

    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.message || "An error occurred while uploading the meme.");
      } else {
        setMessage("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
      setFile(null);
      setCaption('');
    }
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
        {loading ? (
          <Spinner />
        ) : (
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Upload
          </button>)}

        {/* message display */}
        {message && (
          <p className="text-center text-sm text-gray-700 mt-2">{message}</p>
        )}
      </form>
    </div >
  )
}