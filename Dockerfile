FROM node:22.11.0

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 5000

ENV HOST 0.0.0.0
ENV PORT 5000

CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0", "-p", "5000"]
