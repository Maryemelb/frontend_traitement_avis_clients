## Application d’Analyse de Sentiment (commentaire) avec Service IA Externe + FastAPI + JWT + Docker
![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14+-black.svg)
![Python](https://img.shields.io/badge/Python-3.11+-green.svg)
![Docker](https://img.shields.io/badge/Docker-compose-blue.svg)
![JWT](https://img.shields.io/badge/Auth-JWT-orange.svg)

Cette application permet de traiter automatiquement les avis des clients 
provenant des réseaux sociaux, des formulaires de satisfaction ou des 
plateformes d'e-commerce.

Pour cette tâche, j'ai utilisé un service IA externe : le modèle 
pré-entraîné nlptown/bert-base-multilingual-uncased-sentiment disponible 
sur Hugging Face Inference. Ce modèle classifie automatiquement les 
commentaires selon un score entre 1 et 5 étoiles.

Les fonctionnalités demandées étaient :


1. API sécurisée qui :
   • Reçoit un texte (ex : commentaire client)
   • Envoie le texte au modèle NLP hébergé sur Hugging Face
   • Reçoit la prédiction (sentiment + score 1-5)
   • Retourne la réponse au format JSON
   
2. Authentification sécurisée :
   • Accessible uniquement aux utilisateurs authentifiés via JWT
   
3. Déploiement :
   • Facilement déployable via Docker
   
4. Interface utilisateur :
   • Interface web NextJS pour tester l'API

## Stack Technique
* **python**
* **Modèle IA** : nlptown/bert-base-multilingual-uncased-sentiment
* **API**: fastAPI
* **Base de Données** : PostgreSQL
* **ORM** : SQLAlchemy
* **Tests** : Pytest
* **HTTP Client** : httpx
* **UI**: Tailwind CSS
* **Stockage JWT Frontend** : localStorage
* **Outils de Test API** : Postman
* **Dockerisation** : Dockerfile backend + frontend





##  Fonctionnalités Principales

###  Backend (FastAPI)

| Fonctionnalité | Description |
|----------------|-------------|
| **POST /login** | Authentification username/password → JWT token |
| **POST /predict** | Classification de sentiment (protégé JWT) |
| **JWT Authentication** | Sécurisation des endpoints |
| **Hugging Face Integration** | Appel au modèle BERT multilingual |
| **Error Handling** | Gestion des erreurs et validation |

###  Frontend (Next.js)

| Page | Fonctionnalité |
|------|----------------|
| **/Signup** | Formulaire pour s'enregistrer dans la base de donnée |
| **/login** | Formulaire connexion + stockage JWT |
| **/comments** | Analyse de sentiment en temps réel |


###  Déploiement

-  Docker + Docker Compose
-  Prêt pour production
-  Configuration via `.env`

---

##  Modèle IA Utilisé

### 🤖 Hugging Face Inference API

**Modèle**: `nlptown/bert-base-multilingual-uncased-sentiment`

**Sortie**: Score 1, 2, 3, 4 ou 5

**Classification**:
- **1-2** = 😞 **Négatif**
- **3** = 😐 **Neutre**
- **4-5** = 😊 **Positif**

**Avantages**:
-  Pré-entraîné (gain de temps)
-  Support multilingue
-  Infrastructure robuste
-  Pas besoin d'entraînement

---

## 🚀 Installation & Configuration

### 1️. Cloner le Projet

```bash
git clone https://github.com/<username>/sentiment-analysis-microservice.git
cd sentiment-analysis-microservice
```

### 2️. Configuration Environnement

```bash
# Créer fichier .env
cp .env.example .env

# Remplir les valeurs:
HUGGING_FACE_API_KEY=hf_xxxxxxxxxxxxx
JWT_SECRET=your_secret_key_here
DATABASE_URL=postgresql://user:password@localhost/dbname 
...
```

### 3. Installation Locale (sans Docker)

#### Backend

```bash
cd backend

# Créer environnement virtuel
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate     # Windows

# Installer dépendances
pip install -r requirements.txt

# Lancer le serveur
uvicorn main:app --reload --port 8000
```

#### Frontend

```bash
cd frontend

# Installer dépendances
npm install

# Lancer en développement
npm run dev

# Accessible sur: http://localhost:3000
```

### 4️. Déploiement via Docker

```bash
# Build et lancer tous les services
docker-compose up --build

# Services:
# - Backend: http://localhost:8000
# - Frontend: http://localhost:3000
# - API Docs: http://localhost:8000/docs
```

---

## 📚 Endpoints API

### POST `/login`

**Description**: Authentification utilisateur

**Request**:
```json
{
  "username": "user@example.com",
  "password": "securepassword"
}
```

**Response** (200):
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

---

### POST `/predict`

**Description**: Analyse de sentiment (protégé JWT)

**Headers**:
```
Authorization: Bearer <access_token>
```

**Request**:
```json
{
  "comment": "Ce produit est excellent!"
}
```

**Response** (200):
```json
{
  "score": 5,
  "id_user":1
}
```

---

### Tests Unitaires (Pytest)

```bash
cd backend

# Lancer tous les tests
pytest

```

**Cas de test couverts**:
- ✅ Sentiment extraction correct
---

## 🔐 Authentification JWT

### Workflow

```python
# 1. User se connecte
credentials = { "username": "john", "password": "pass123" }

# 2. Server valide et génère JWT
token = jwt.encode(
    {
        "sub": "john",
        "exp": datetime.utcnow() + timedelta(hours=24)
    },
    SECRET_KEY,
    algorithm="HS256"
)

# 3. Frontend stocke JWT
localStorage.setItem('token', token)

# 4. Requêtes suivantes incluent le token
headers = { "Authorization": f"Bearer {token}" }

# 5. Backend vérifie le token
def verify_token(token: str):
    payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    return payload
```

---


---



## Livrables

-  Code source complet Backend (FastAPI)
-  Code source complet Frontend (Next.js)
-  API fonctionnelle et testée
-  Endpoint `/signup` d'authentification
-  Endpoint `/predict` protégé JWT
-  Endpoint `/login` d'authentification
-  Fichier `.env` configuré
-  Documentation technique complète
-  Tests unitaires (Pytest)
-  Planification Jira
-  README complet

---


---

## 👤 Auteur

Maryem Elbergui: https://www.linkedin.com/in/maryem-elbergui-0939401b7/


---

---

⭐ **N'oublie pas de star le projet si tu le trouves utile!**

**Bon développement!**