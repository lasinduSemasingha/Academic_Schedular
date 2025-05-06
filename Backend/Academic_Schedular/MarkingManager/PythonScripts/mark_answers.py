import os
import json

# Simulated processing
def mark_answers():
    answers_path = 'AnswerSheets'
    result_path = 'MarkedResults/marks.json'
    os.makedirs('MarkedResults', exist_ok=True)
    
    marks = {}
    for filename in os.listdir(answers_path):
        if filename.endswith('.pdf'):
            student_id = filename.split('.')[0]
            # Simulate score
            marks[student_id] = {
                "name": student_id,
                "score": 85  # Placeholder
            }

    with open(result_path, 'w') as f:
        json.dump(marks, f)

if __name__ == "__main__":
    mark_answers()
