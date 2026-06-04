# skytech-portfolio
Official portfolio website for SkyTech — cybersecurity, hardware engineering, and web development services.

## Local setup
1. Open `index.html` in your browser or serve the folder with a static host.
2. The contact form uses `data-api-url` on the `<body>` tag to determine the backend endpoint.

## API integration
- Local backend: leave `data-api-url="/api/contact"` and run a Node backend under the same origin.
- Remote backend: replace `data-api-url` with your live Render backend URL, for example:
  ```html
  <body data-api-url="https://skytech-backend.onrender.com/api/contact">
  ```

## Deployment plan
- Deploy the backend to Render or a similar Node hosting service.
- Deploy the frontend to Vercel as a static site.
- Set the frontend `data-api-url` attribute to the deployed backend's API endpoint.

## Contact API
- The form sends JSON to the backend endpoint.
- The backend can log messages, validate input, and optionally send email notifications.
