from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for ReactJS communication

# Simple chatbot responses
responses = {
    "hello": "Hi there! How can I help you?",
    "how are you": "I'm just a bot, but I'm doing great! How about you?",
    "bye": "Goodbye! Have a great day!",
    "name":"Hanumansai",
    "hi":"Hi there! How can I help you?",
    

}

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()  # Get JSON data from frontend
    print("Received:", data)  # Debugging output

    user_message = data.get("message", "").strip().lower()
    bot_response = responses.get(user_message, "I'm not sure how to respond to that.")

    return jsonify({"response": bot_response})

if __name__ == "__main__":
    app.run(debug=True)
