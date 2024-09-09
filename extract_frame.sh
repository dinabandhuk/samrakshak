#!/bin/bash

# Check if the correct number of arguments is provided
if [ "$#" -ne 3 ]; then
    echo "Usage: $0 <input_file> <num_images> <output_pattern>"
    exit 1
fi

# Assign command-line arguments to variables
input="$1"
num_images="$2"
output="$3"

# Check if the input file exists
if [ ! -f "$input" ]; then
    echo "Error: File '$input' not found!"
    exit 1
fi

# Check if the number of images is a positive integer
if ! [[ "$num_images" =~ ^[0-9]+$ ]] || [ "$num_images" -le 0 ]; then
    echo "Error: Number of images must be a positive integer!"
    exit 1
fi

# Get the duration of the video in seconds
duration=$(ffprobe -i "$input" -show_entries format=duration -v quiet -of csv="p=0")
if [ -z "$duration" ]; then
    echo "Error: Could not determine the duration of the video!"
    exit 1
fi

# Calculate the interval between frames
if [ "$num_images" -gt 1 ]; then
    interval=$(echo "$duration / ($num_images - 1)" | bc -l)
else
    interval=0
fi

# Extract frames using ffmpeg with the specified interval
for ((i=0; i<$num_images; i++))
do
    timestamp=$(echo "$i * $interval" | bc -l)
    
    # Ensure timestamp is rounded to a reasonable precision
    timestamp=$(printf "%.2f" "$timestamp")
    
    # Format the output filename
    output_file=$(printf "$output" $i)

    echo "Extracting frame at $timestamp seconds to '$output_file'"

    # Extract the frame using ffmpeg
    ffmpeg -ss "$timestamp" -i "$input" -frames:v 1 -q:v 2 "images/$output_file" -loglevel fatal
    if [ $? -ne 0 ]; then
        echo "Error extracting frame at $timestamp seconds"
        exit 1
    fi
done
