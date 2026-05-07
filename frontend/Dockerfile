FROM node:20-alpine AS builder

WORKDIR /app

# Install deps first (cache)
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Build
COPY . .
# REACT_APP_BACKEND_URL must be passed at build time
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL
RUN yarn build

# ---- runtime stage ----
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
