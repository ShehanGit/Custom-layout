# app.py
from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from io import BytesIO
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

def create_pdf(fields):
    # Create a BytesIO buffer to receive PDF data
    buffer = BytesIO()
    
    # Create the PDF object using ReportLab
    p = canvas.Canvas(buffer, pagesize=letter)
    width, height = letter
    
    # Add a title
    p.setFont("Helvetica-Bold", 16)
    p.drawString(50, height - 50, "Generated Document")
    
    # Add current date
    p.setFont("Helvetica", 10)
    current_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    p.drawString(width - 200, height - 50, f"Generated on: {current_date}")
    
    # Add fields
    y_position = height - 100
    p.setFont("Helvetica-Bold", 12)
    
    for field in fields:
        if y_position < 50:  # Check if we need a new page
            p.showPage()
            y_position = height - 50
            
        label = field.get('label', '')
        value = field.get('value', 'N/A')
        
        # Draw field label
        p.setFont("Helvetica-Bold", 12)
        p.drawString(50, y_position, f"{label}:")
        
        # Draw field value
        p.setFont("Helvetica", 12)
        p.drawString(200, y_position, str(value))
        
        y_position -= 30
    
    # Add page number
    p.setFont("Helvetica", 9)
    p.drawString(width/2 - 30, 30, f"Page 1")
    
    # Close the PDF object
    p.showPage()
    p.save()
    
    # Get the value of the BytesIO buffer and return it
    buffer.seek(0)
    return buffer

@app.route('/generate-pdf', methods=['POST'])
def generate_pdf():
    try:
        data = request.get_json()
        fields = data.get('fields', [])
        
        # Generate PDF
        pdf_buffer = create_pdf(fields)
        
        # Send the PDF file
        return send_file(
            pdf_buffer,
            mimetype='application/pdf',
            as_attachment=True,
            download_name='generated_document.pdf'
        )
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Test endpoint
@app.route('/test', methods=['GET'])
def test():
    return jsonify({'message': 'Backend is working!'})

if __name__ == '__main__':
    app.run(debug=True)