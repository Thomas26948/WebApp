from typing import Union

from fastapi import FastAPI
from src.ml.inference import f, image

app = FastAPI()


@app.get("/")
def read_root():
    return {"Python API ": "Home"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


@app.get("/inference/{x}")
def inference(x: int):
    return {"output": f(x)}


@app.get("/image/")
def img():
    return image()
