import os
import pdfplumber
import pytesseract
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = 'uploads'
PROCESSED_FOLDER = 'processed'
ALLOWED_EXTENSIONS = {'pdf'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['PROCESSED_FOLDER'] = PROCESSED_FOLDER

# Ensure folders exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def extract_answers_from_pdf(pdf_path):
    """Extract answers from PDF using text extraction and OCR"""
    answers = []
    
    with pdfplumber.open(pdf_path) as pdf:
        for i, page in enumerate(pdf.pages):
            # Extract text directly from PDF
            text = page.extract_text()
            
            # If no text found, try OCR
            if not text or len(text.strip()) < 10:
                image = page.to_image(resolution=300)
                text = pytesseract.image_to_string(image.original)
            
            # Here you would add your specific logic to identify questions and answers
            # This is a simplified version - you'll need to customize based on your answer sheet format
            
            # Example: Assume each page is one question
            answers.append({
                'question_number': i + 1,
                'answer_text': text.strip()
            })
    
    return answers

@app.route('/process_pdf', methods=['POST'])
def process_pdf():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        try:
            answers = extract_answers_from_pdf(filepath)
            
            # Move processed file
            processed_path = os.path.join(app.config['PROCESSED_FOLDER'], filename)
            os.rename(filepath, processed_path)
            
            return jsonify({
                'status': 'success',
                'answers': answers,
                'processed_file': processed_path
            })
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    return jsonify({'error': 'Invalid file type'}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)