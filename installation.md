## Docker Insatllation Locally:

### create a network:
- `docker network create todoNetwork`

### run the postgres db:
- `docker run -d --name postgres --network todoNetwork -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 postgres`

### build the backend and websocket:
- `docker build -f ./docker/Dockerfile.backend -t todo_backend .`

- `docker build -t todo_websocket -f ./docker/Dockerfile.websocket .`

### build the frontend:
- `docker build --network host --build-arg DATABASE_URL=postgresql://postgres:mysecretpassword@localhost:5432/postgres -f docker/Dockerfile.frontend -t todo_frontend .`


### run all the images:
- `docker run -d --network todoNetwork --name todoBackend -e DATABASE_URL=postgresql://postgres:mysecretpassword@postgres:5432/postgres -p 8080:8080 todo_backend`

- `docker run -d --network todoNetwork -e DATABASE_URL=postgresql://postgres:mysecretpassword@postgres:5432/postgres -p 8081:8081 todo_websocket`

- `docker run -d --network todoNetwork -e DATABASE_URL=postgresql://postgres:mysecretpassword@postgres:5432/postgres -p 3000:3000 todo_frontend`