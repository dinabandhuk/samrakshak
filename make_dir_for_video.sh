#!/bin/bash

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <directory>"
    exit 1
fi

directory="$1"

if [ ! -d "$directory" ]; then
    echo "Error: Directory '$directory' does not exist."
    exit 1
fi

cd "$directory" || exit

for video_file in *.mp4 *.avi *.mkv *.mov *.flv *.wmv; do
    [ -e "$video_file" ] || continue
    video_name=$(basename "$video_file" | sed 's/\.[^.]*$//')
    mkdir -p "$video_name/images"
    mv "$video_file" "$video_name/"
    echo "Moved '$video_file' into '$video_name/' with an 'images/' directory."
done

