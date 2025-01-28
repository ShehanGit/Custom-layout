# utils.py
import os
from datetime import datetime

def ensure_folder_exists(folder_path):
    """Ensure that a folder exists, create it if it doesn't"""
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)

def generate_filename(prefix='doc'):
    """Generate a unique filename with timestamp"""
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    return f"{prefix}_{timestamp}.pdf"