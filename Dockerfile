FROM node:18-slim

WORKDIR /app

# Install qoderclicn globally
RUN npm install -g @qodercn-ai/qoderclicn

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production

# Copy source code
COPY clean/ ./clean/
COPY public/ ./public/
COPY scripts/ ./scripts/

# Listen on all interfaces for cloud deployment
ENV HOST=0.0.0.0
ENV PORT=3000
ENV CLI_BACKEND=cn

EXPOSE 3000

CMD ["npm", "start"]
