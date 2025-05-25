import { useState } from 'react';
import './App.css'
import UploadMemePage from './UploadMemePage'
import ViewMemePage from './ViewMemePage';

function App() {
  const [activeTab, setActiveTab] = useState("upload");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-6">
      <nav className="mb-6 space-x-4">
        <button
          className={`px-4 py-2 rounded font-semibold transition
            ${activeTab === "upload" ? "bg-blue-500 text-white cursor-default" : "bg-white text-blue-500 border border-blue-500 hover:bg-blue-100"}`}
          onClick={() => setActiveTab("upload")}
          disabled={activeTab === "upload"}>
          Upload
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold transition
            ${activeTab === "view" ? "bg-blue-500 text-white cursor-default" : "bg-white text-blue-500 border border-blue-500 hover:bg-blue-100"}`}
          onClick={() => setActiveTab("view")}
          disabled={activeTab === "view"}>
          View
        </button>
      </nav>

      <div className="w-full max-w-xl">
        {activeTab === "upload" ? <UploadMemePage /> : <ViewMemePage />}
      </div>
    </div>
  )
}

export default App
