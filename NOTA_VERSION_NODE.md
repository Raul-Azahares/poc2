# ⚠️ Nota sobre Versión de Node.js

## Problema Detectado

El sistema actual tiene **Node.js v18.15.0**, pero Next.js 16 requiere **Node.js >=20.9.0**.

## Soluciones

### Opción 1: Actualizar Node.js (Recomendado para producción)

#### Usando nvm (Node Version Manager):

```bash
# Instalar nvm si no lo tienes
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Instalar Node.js 20
nvm install 20

# Usar Node.js 20
nvm use 20

# Verificar versión
node --version
```

#### Usando apt (Ubuntu/Debian):

```bash
# Añadir repositorio de NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Instalar Node.js 20
sudo apt-get install -y nodejs

# Verificar versión
node --version
```

### Opción 2: Downgrade de Next.js (Para desarrollo rápido)

Si no puedes actualizar Node.js ahora mismo, puedes usar Next.js 14 que es compatible con Node.js 18:

```bash
# Cambiar a Next.js 14
npm install next@14 react@^18 react-dom@^18

# Ajustar devDependencies
npm install -D eslint-config-next@14
```

**IMPORTANTE:** Si haces downgrade, algunos paquetes pueden necesitar ajustes.

### Opción 3: Usar Docker (Más limpio)

Crear un `Dockerfile`:

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
```

Ejecutar:

```bash
docker build -t poc-asistente .
docker run -p 3000:3000 -v $(pwd):/app poc-asistente
```

## Para Deploy en Vercel

**No hay problema:** Vercel automáticamente usa Node.js 20+ en producción, sin importar tu versión local.

Solo asegúrate de:
1. Subir el código a GitHub
2. Conectar en Vercel
3. Añadir `GROQ_API_KEY` en las variables de entorno
4. Deploy automático

## Verificar si el Proyecto Funciona

Aunque la build falle, el modo desarrollo **podría** funcionar:

```bash
npm run dev
```

Si funciona en desarrollo, puedes trabajar localmente y deployar a Vercel sin problemas.

## Recomendación

Para este POC:
- **Desarrollo local:** Actualiza Node.js a v20 o prueba `npm run dev`
- **Deploy/Producción:** Usa Vercel (maneja la versión de Node automáticamente)

