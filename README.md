# Paperless NG
A frontend for Paperless
![Screenshot](https://raw.githubusercontent.com/128keaton/paperless-ng/master/screenshot.png)

## Configuration
1. Make sure that your have enabled CORS on the Paperless server:
    ```
    PAPERLESS_CORS_ALLOWED_HOSTS=localhost:8080,localhost:4200
    ```

2. Create a `.env` file with your Paperless URL, username, and password:
    ``` 
    PAPERLESS_URL=http://localhost:8000
    PAPERLESS_USERNAME=stanley
    PAPERLESS_PASSWORD=yelnats
   ```

3. Build and run with Docker Compose:
    ```bash
    $ docker-compose up -d --build
    ```
