import random
import time
from fastapi.responses import FileResponse


def f(x: int):
    time.sleep(2)
    return str(x) + "random generation : " + str(random.randint(0, 100))


def image():
    time.sleep(2)
    img_path = r"C:\Users\Thomas\Desktop\nodejs\ai-web-app\public\img\hf.svg"
    return FileResponse(img_path)
    
    