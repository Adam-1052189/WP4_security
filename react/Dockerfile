# Kies een basisimage
FROM node

# Stel de werkomgeving in
WORKDIR /app

# Kopieer package.json en package-lock.json naar de container
COPY package*.json ./

EXPOSE 8087

# Installeer de vereisten
RUN npm install

# Kopieer de rest van de code naar de container
COPY . .

# Stel de standaardcommando in voor de container
CMD ["npx", "expo", "start", "--port", "8087"]