# Auto-generated SDK for Test API v1.0.0
# Do not edit manually

import requests

BASE_URL = "https://api.test.com"

def get_users():
    """List users"""
    url = f"https://api.test.com/users"
    response = requests.get(url)
    return response.json()
