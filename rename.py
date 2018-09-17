import os

for i in range(48):
    keyword = i // 8 + 1
    num = i % 8
    os.rename(f"SS_{i}.mp3", f"SS_{keyword}_{num}.mp3")
    os.rename(f"SG_{i}.mp3", f"SG_{keyword}_{num}.mp3")