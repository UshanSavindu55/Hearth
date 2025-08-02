from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)

classifier = pipeline("text-classification", model="bhadresh-savani/bert-base-uncased-emotion", top_k=3)

@app.route("/detect-emotion", methods=["POST"])
def detect_emotion():
    data = request.get_json()
    message = data.get("message", "")
    if not message:
        return jsonify({"error": "Please provide a message"}), 400
    
    results = classifier(message)

    emotions = {res["label"]: float(res["score"]) for res in results[0]}
    return jsonify({"emotions": emotions})

if __name__ == '__main__':
    app.run(port=5000)
