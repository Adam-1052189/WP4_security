# Kies een basisimage
FROM python

# Stel de werkomgeving in
WORKDIR /app

# Kopieer de requirements.txt naar de container
COPY requirements.txt .

EXPOSE 8000

# Installeer de vereisten
RUN pip install -r requirements.txt

# Kopieer de rest van de code naar de container
COPY . .

# Stel de standaardcommando in voor de container
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]