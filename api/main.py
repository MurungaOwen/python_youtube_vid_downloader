# main.py
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import yt_dlp
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

class YouTubeRequest(BaseModel):
    """youtube url"""
    url: str


@app.post("/download")
async def process_youtube_url(request: YouTubeRequest):
    """gain data on url"""
    print("url is ", request.url)
    
    ydl_opts = {
        'format': 'best',
        'noplaylist': True
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info_dict = ydl.extract_info(request.url, download=False)
        video_info = {
            "title": info_dict.get('title'),
            "thumbnail": info_dict.get('thumbnail'),
            "download_link": info_dict.get('url')
        }
    
    return video_info


