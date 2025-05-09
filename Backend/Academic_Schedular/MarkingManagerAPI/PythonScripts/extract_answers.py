import fitz  # PyMuPDF
import re
import sys
import json
import pytesseract
from PIL import Image
import io

def extract_text_from_page(page):
    # Try extracting text normally
    text = page.get_text()
    if text.strip():
        return text

    # If no text is found, fallback to OCR
    pix = page.get_pixmap(dpi=300)
    img_bytes = pix.tobytes("png")
    image = Image.open(io.BytesIO(img_bytes))
    ocr_text = pytesseract.image_to_string(image)
    return ocr_text

def extract_answers_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    full_text = ""
    for page in doc:
        full_text += extract_text_from_page(page)
    doc.close()

    # Keep your original regex logic unchanged
    pattern = re.compile(r"(Q\d+)\.?\s*(.*?)\s*(?=Q\d+\.|\Z)", re.DOTALL)
    results = pattern.findall(full_text)

    return [{"question": q, "answer": a.strip()} for q, a in results]

if __name__ == "__main__":
    pdf_path = sys.argv[1]
    extracted = extract_answers_from_pdf(pdf_path)
    print(json.dumps(extracted, ensure_ascii=False, indent=2))
