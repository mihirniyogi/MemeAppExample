# official python image
FROM python:3.11-slim

# set working dir
WORKDIR /app

# copy dependencies
COPY requirements.txt .

# install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# copy project
COPY . .

# informs docker about port usage
EXPOSE 8080

# run fastapi app on port 8080
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]

# ----------- for developer's information ----------- #

# (local) build the image
### >> docker build -t memebackend .

# (local) run the container
### >> docker run -d -p 8000:8000 memebackend