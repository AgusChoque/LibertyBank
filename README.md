# 🏦 Liberty Bank – Gestión de Turnos

**Liberty Bank** es una **SPA** (Single Page Application) que permite a los usuarios solicitar, consultar y cancelar turnos con su banco de manera rápida, simple y sin necesidad de hacer filas. Está pensada para mejorar la experiencia de atención al cliente en sucursales físicas.

---

## 📌 Descripción

Este proyecto simula cómo funcionaría un sistema real de turnos bancarios. Los usuarios pueden:

- Registrarse o iniciar sesión.
- Solicitar un nuevo turno entre diferentes motivos (por ejemplo, consultas, trámites, reclamos).
- Ver sus turnos agendados.
- Cancelar un turno si ya no lo necesitan.

El enfoque está en la **facilidad de uso**, tanto para los clientes como para quienes deseen probar el sistema.

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **JavaScript (JSX)**: Lenguaje de programación que se usa para crear la parte visual de la aplicación.
- **React**: Biblioteca que facilita la creación de interfaces de usuario modernas.
- **CSS (legacy + modules)**: Se usó una técnica mixta:
  - Estilos generales como tipografía y fondo se definieron una sola vez de forma global.
  - Estilos más detallados y específicos se escribieron por componente, usando una técnica llamada "modules" para evitar errores y confusiones.

### Backend
- **Node.js + Express**: Sirven para crear el servidor que responde a las acciones del usuario.
- **TypeScript**: Lenguaje que ayuda a evitar errores y mantener el código ordenado.
- **PostgreSQL**: Base de datos donde se guardan los turnos, usuarios, etc.

---

## ⚙️ Instalación

### 1. Requisitos previos
Antes de comenzar, necesitás tener instalado en tu computadora:
- **Node.js** (versión 18 o superior)
- **npm** o **yarn** (viene con Node.js)
- **PostgreSQL**
- **Una cuenta de Gmail** (si querés probar el envío de correos)

### 2. Clonar el repositorio
Abrí la terminal y escribí:
```bash
git clone https://github.com/AgusChoque/LibertyBank.git
cd LibertyBank
```

### 3. Configurar variables de entorno
Dentro del proyecto hay un archivo llamado `.env` necesario para que todo funcione. Deberás completarlo con tus propios datos:
```ini
# General Configuration
PORT=3000

# Database Configuration
PASSWORD=tu_password_de_postgres
DATABASE=nombre_de_tu_base_de_datos
PORTDB=5432
USER=usuario_postgres
HOST=localhost

# Mail Service Configuration
SERVICE_MAIL=gmail
USER_MAIL=tu_correo@gmail.com
PASS_MAIL=contraseña_para_apps
```

---

## ▶️ Cómo usar la aplicación

### 1. Iniciar el backend
Entrá a la carpeta del backend:
```bash
cd back
```
Instalá las dependencias:
```bash
npm install
```
Levantá el servidor:
```bash
npm start
```

### 2. Iniciar el frontend
Abrí otra terminal y andá a la carpeta del frontend:
```bash
cd ../front
```
Instalá las dependencias:
```bash
npm install
```
Levantá el frontend:
```bash
npm run dev
```
Ahora podés abrir tu navegador y visitar la url que te proporciona `VITE` para usar la app 🚀

---

## 🤝 Colaboraciones

Si deseas colaborar con este proyecto, ¡serás muy bienvenido!

### Pasos para colaborar:

1. **Fork del repositorio**: Haz un "fork" de este repositorio para tener tu propia copia.

2. **Crea tu rama**: Crea una nueva rama para realizar cambios. Por ejemplo, `git checkout -b feature/nueva-funcionalidad`.

3. **Realiza los cambios**: Implementa las mejoras o correcciones que desees.

4. **Pruebas**: Asegúrate de que todo funcione correctamente y realiza las pruebas necesarias.

5. **Envía un pull request**: Una vez que hayas terminado tus cambios, envía un pull request para que los revisemos y lo incorporemos al proyecto.

---

## 🙌 Agradecimientos

### A quienes quiero agradecer

Este proyecto no habría sido posible sin el acompañamiento y la formación que recibí en **Henry**. Gracias por brindarme un espacio donde aprender, equivocarme y crecer como desarrollador 🚀. Fue ahí donde surgió la idea de crear esta aplicación, y donde pude transformarla en una realidad concreta.

### Documentación útil

Durante el desarrollo de este proyecto, me apoyé en distintas fuentes de documentación que me ayudaron a entender y aplicar conceptos clave:

- [Express Documentation](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)

### Contacto

👉 Si te interesó el proyecto, tenés una propuesta o simplemente querés charlar sobre desarrollo, ¡no dudes en escribirme! Siempre estoy abierto a nuevas ideas, desafíos y colaboraciones.  
Podes hacerlo a través de mi mail **aguschoque.dev@gmail.com**, **[Linkedin](https://www.linkedin.com/in/agustinchoque/)** o por acá mismo.