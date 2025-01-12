import yt_dlp
import assemblyai as aai
from dotenv import load_dotenv
import os
import subprocess

api_key = os.getenv("ASSEMBLY_AI_API_KEY")

def download_youtube_audio(url, destination="."):
    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': f'{destination}/%(title)s.%(ext)s',
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info_dict = ydl.extract_info(url, download=True)
        audio_file = ydl.prepare_filename(info_dict)
    base, ext = os.path.splitext(audio_file)
    audio_file = base + '.webm'

    print(f"Downloaded and converted to MP3: {audio_file}")
    return audio_file

def transcribe_audio_with_assemblyai(audio_file,api_key):
    aai.settings.api_key = api_key
    transcriber = aai.Transcriber()
    transcript = transcriber.transcribe(audio_file)
    return transcript.text

def save_transcription(transcription, file_name="transcription.txt"):
    with open(file_name, "w") as f:
        f.write(transcription)
    print(f"Transcription saved to {file_name}")
    
def process(url,api_key):
    audio_file_path = download_youtube_audio(url)
    transcription = transcribe_audio_with_assemblyai(audio_file_path,api_key)
    save_transcription(transcription)
    return transcription




if __name__ == "__main__":
    youtube_link = "https://youtu.be/078tYSD7K8E?si=YP2_8FJq1bVxLlkL" # for test purpose 
    api_key = api_key

    transcription = process(youtube_link, api_key)
    if transcription:
        print("\nTranscription:\n")
        print(transcription)
    else:
        print("Failed to transcribe audio.")
