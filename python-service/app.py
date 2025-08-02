from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)

emotion_classifier = pipeline("text-classification", model="bhadresh-savani/bert-base-uncased-emotion", top_k=3)
relevancy_classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")


#EMOTION DETECTION MODAL
@app.route("/detect-emotion", methods=["POST"])
def detect_emotion():
    data = request.get_json()
    message = data.get("message", "")
    if not message:
        return jsonify({"error": "Please provide a message"}), 400
    
    results = emotion_classifier(message)

    emotions = {res["label"]: float(res["score"]) for res in results[0]}
    return jsonify({"emotions": emotions})


#RELEVANCY CHECKING MODAL
@app.route("/detect-relevancy", methods=["POST"])
def detect_relevancy():
    data = request.get_json()
    message = data.get("message", "")
    if not message:
        return jsonify({"error": "Please provice a message"}), 400
    
    labels = ["mental health", "not mental health"]
    result = relevancy_classifier(message, labels)

    mental_health_score = float(
        result["scores"][result["labels"].index("mental health")]
    )

    return jsonify({"relevancy_score": mental_health_score})

if __name__ == '__main__':
    app.run(port=5000)
