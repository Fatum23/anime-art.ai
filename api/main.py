from fastapi import FastAPI, File, UploadFile, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.post("/upload-video")
async def upload_video(video: UploadFile = File(...)):
    # Save the uploaded video to a file
    print(video)
    with open(f"static/videos/{video.filename}", "wb") as buffer:
        buffer.write(video.file.read())

    return {"message": f"Video '{video.filename}' uploaded successfully!"}

# Optional: Serve the uploaded video
@app.get("/videos/{filename}")
async def get_video(filename: str):
    file_path = f"static/videos/{filename}"
    return FileResponse(file_path) 


# clients = set()


# @app.websocket("/stream")

# async def stream(websocket: WebSocket):

#     await websocket.accept()

#     clients.add(websocket)

#     try:

#         while True:

#             # Receive a message from the client

#             message = await websocket.receive_bytes()

#             # Broadcast the message to all connected clients

#             for client in clients:

#                 if client != websocket:

#                     await client.send_bytes(message)

#     finally:

#         clients.remove(websocket)

#TODO delete video on upload to telegram