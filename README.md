# ScreenshotHall

A simple game screenshot gallery

## Stack
- nx workspaces
- NestJS
- Angular
- PostgreSQL

## Configuration

```yaml
# ./config/default.yaml
# Backend
port: 3000
database:
  host: 'localhost'
  port: 5432
  username: 'username'
  password: 'password'
  database: 'dbname'
  synchronize: true
  logging: false
token:
  secret: 'token-secret'
  expiration: '1day'
minio:
  accessKey: 'minioAccessKey'
  secretKey: 'minioPassword'
  endPoint: 'localhost'
  port: 9000
  useSSL: false
igdb:
  apiKey: 'youapi-key'
  endpoint: https://api-v3.igdb.com

# Frontend
front:
  api: 'http://localhost:3000'
  isProd: false
```
