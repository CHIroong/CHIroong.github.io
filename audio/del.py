import os

to_delete = []
for filename in os.listdir():
    if "ask_ask" in filename:
        to_delete.append(filename)
for filename in to_delete:
    os.remove(filename)