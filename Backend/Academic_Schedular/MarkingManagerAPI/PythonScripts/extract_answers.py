import fitz
import re
import sys
import json

def extract_answers_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    full_text = ""
    for page in doc:
        full_text += page.get_text()
    doc.close()

    pattern = re.compile(r"(Q\d+)\.?\s*(.*?)\s*(?=Q\d+\.|\Z)", re.DOTALL)
    results = pattern.findall(full_text)

    return [{"question": q, "answer": a.strip()} for q, a in results]

if __name__ == "__main__":
    pdf_path = sys.argv[1]
    extracted = extract_answers_from_pdf(pdf_path)
    print(json.dumps(extracted))
