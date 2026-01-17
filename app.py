from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import cv2
import numpy as np
import json
import random

app = Flask(__name__)
CORS(app)  # Allow requests from Live Server

# Load criminal database
with open("criminal_db.json", "r") as f:
    criminal_db = json.load(f)

@app.route("/scan", methods=["POST"])
def scan():
    try:
        data = request.get_json(force=True)
        user_input = data.get("user_id", "").strip()
        image_data = data.get("image")

        if not user_input or not image_data:
            return jsonify({"error": "Missing user ID or image"}), 400

        # Decode image (optional, fake analysis here)
        encoded = image_data.split(",")[1]
        img_bytes = base64.b64decode(encoded)
        np_arr = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        if img is None:
            return jsonify({"error": "Image decoding failed"}), 400

        # Fake AI analysis
        eye = random.randint(70, 95)
        jaw = random.randint(65, 90)
        overall = int((eye + jaw) / 2)

        # Case-insensitive user ID match
        matched_key = None
        for key in criminal_db.keys():
            if key.lower() == user_input.lower():
                matched_key = key
                break

        criminal_status = criminal_db.get(matched_key, "No Record Found")

        return jsonify({
            "eye_match": eye,
            "jaw_match": jaw,
            "overall": overall,
            "criminal_status": criminal_status
        })

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/", methods=["GET"])
def health():
    return jsonify({"status": "Server running"})

if __name__ == "__main__":
    print("Starting Flask server on http://127.0.0.1:5000")
    app.run(host="0.0.0.0", port=8675, debug=True)
