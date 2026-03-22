# --- FASE 1: El Constructor ---
# Usamos una imagen de Node para tener todas las herramientas de compilaci�n
FROM node:20-alpine AS builder

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos los archivos de configuraci�n y package.json
COPY package.json package-lock.json* ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto del c�digo
COPY . .

# Compilamos en modo producción explícito
ENV NODE_ENV=production
RUN npm run build


# --- FASE 2: El Servidor Final ---
# Usamos la imagen oficial de Caddy, el mismo servidor que usa Easypanel
FROM caddy:2-alpine

# Borramos el archivo de configuraci�n por defecto de Caddy
RUN rm /etc/caddy/Caddyfile

# Copiamos nuestra propia configuraci�n simple
COPY Caddyfile /etc/caddy/Caddyfile

# Copiamos SOLAMENTE los archivos compilados de la FASE 1
# desde la carpeta /app/dist del constructor a la carpeta ra�z del servidor Caddy
COPY --from=builder /app/dist/ /usr/share/caddy