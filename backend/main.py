import os
import random
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from google.cloud import storage

# GCP Auth
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "service-account.json"

# GCS Client
BUCKET_NAME = "meme-app-example"
client = storage.Client()
bucket = client.bucket(BUCKET_NAME)

# FastAPI Setup
app = FastAPI()
origins = ["http://localhost:5173"]

# middleware to handle CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Change this to your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# HTTP Status Codes
HTTP_200_OK = 200
HTTP_201_CREATED = 201
HTTP_204_NO_CONTENT = 204

@app.get("/")
def read_root():
  return form_response(HTTP_200_OK, "message", "Welcome to the Meme App API!")

@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...), caption: str = Form(None)):
  blob = bucket.blob(file.filename)
  blob.metadata = { "caption": caption } if caption else {}
  blob.upload_from_file(file.file, content_type=file.content_type)
  return form_response(HTTP_201_CREATED, "message", f"File {file.filename} uploaded successfully")

@app.get("/api/random-meme")
def get_random_meme():
  blobs = list(bucket.list_blobs())
  if not blobs:
    return form_response(HTTP_204_NO_CONTENT, "message", "There are no memes available in the bucket.")
  blob = random.choice(blobs)
  url = f"https://storage.googleapis.com/{BUCKET_NAME}/{blob.name}"
  print(url)
  return form_response(HTTP_200_OK, "url", url, "caption", blob.metadata.get("caption"))

def form_response(status_code: int, *args):
  assert len(args) % 2 == 0, "Arguments must be in pairs of (title, message)"
  content = {args[i]: args[i + 1] for i in range(0, len(args), 2)}
  return JSONResponse(
      status_code=status_code,
      content=content
  )