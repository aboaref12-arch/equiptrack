# EquipTrack API (Django + DRF + JWT)
A starter backend matching your SRS (Orders, OrderItems, Stores, ServiceRequests, Attachments, Lookups).

## Quick Start (no Docker)
1) Create virtualenv & install deps:
   ```bash
   python -m venv .venv && source .venv/bin/activate
   pip install -r requirements.txt
   ```
2) Create `.env` (copy `.env.example`), then:
   ```bash
   python manage.py migrate
   python manage.py createsuperuser
   python manage.py runserver 0.0.0.0:8000
   ```
3) Visit: http://localhost:8000/api/

## JWT
- Obtain: `POST /api/auth/token/` with {username, password}
- Refresh: `POST /api/auth/token/refresh/`

## Docker
```bash
docker compose up --build
```

## Postman
Import `postman_collection.json` to test endpoints.
