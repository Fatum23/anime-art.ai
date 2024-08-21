from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

import datetime

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return "Hello from FastAPI!"

@app.get("/time")
async def time():
    return datetime.datetime.now().__str__()


app.mount("/static", StaticFiles(directory="static"), name="static")

@app.post("/uploadVideo")
async def upload_video(video: UploadFile = File(...)):
    # Save the uploaded video to a file
    with open(f"static/videos/{video.filename}", "wb") as buffer:
        buffer.write(video.file.read())

    return {"message": f"Video '{video.filename}' uploaded successfully!"}

# Optional: Serve the uploaded video
@app.get("/videos/{filename}")
async def get_video(filename: str):
    file_path = f"static/videos/{filename}"
    return FileResponse(file_path) 