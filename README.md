<div align="center">
    <img width="50%" src="Skynet Logo.png" />
    <h1>Skynet by BBY07</h1>
</div>

## Introduction

An interplanetary town square that maintains connections between cultures and ideologies of colonies across the galaxy.

## Authors

-   Kamal Dolikay ([@kamalkdolikay](https://github.com/kamalkdolikay))
-   Ole Lammers ([@zyrakia](https://www.github.com/Zyrakia))
-   Tianyou Xie ([@Tianyou-Xie](https://github.com/Tianyou-Xie))
-   Samarjit Bhogal ([@SamarjitBhogal](https://github.com/SamarjitBhogal))
-   Marcus Lages ([@MarcusLages](https://github.com/MarcusLages))

## Technologies

The project is built using [Typescript](https://www.typescriptlang.org/), and split into two modules, the client and server.

**Client (built with [Vite](https://vitejs.dev/)):**

-   [React](https://react.dev/)
-   [React Bootstrap](https://react-bootstrap.netlify.app/)
-   [React Icons](https://react-icons.github.io/react-icons/)
-   [Wouter](https://www.npmjs.com/package/wouter)
-   [CSS Modules](https://github.com/css-modules/css-modules) (implemented by Vite)
-   [Bootstrap](https://getbootstrap.com/)
-   [axios](https://axios-http.com/)
-   [dotenv](https://www.dotenv.org/)
-   [React If](https://https://www.npmjs.com/package/react-if/)
-   [React Toastify](https://fkhadra.github.io/react-toastify/introduction/)
-   [Socket IO](https://socket.io/) (Client)

**Server (built with [esno](https://www.npmjs.com/package/esno)):**

-   [Node](https://nodejs.org/en)
-   [MongoDB](https://www.mongodb.com/products/platform/atlas-database) connected by [mongoose](https://mongoosejs.com/)
-   [Express](https://expressjs.com/)
-   [Express File Routing](https://www.npmjs.com/package/express-file-routing)
-   [Joi](https://joi.dev/)
-   [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
-   [http-status-codes](https://www.npmjs.com/package/http-status-codes)
-   [nodemailer](https://www.nodemailer.com/)
-   [JWT](https://jwt.io/)
-   [CORS](https://www.npmjs.com/package/cors)
-   [dotenv](https://www.dotenv.org/)
-   [Google Auth Library](https://cloud.google.com/nodejs/docs/reference/google-auth-library/latest)
-   [Google APIs](https://www.npmjs.com/package/googleapis)
-   [Http Status Codes](https://www.npmjs.com/package/http-status-codes)
-   [Socket IO](https://socket.io/) (Server)

**Development Utilities:**

-   [Prettier](https://prettier.io/) for consistent code formatting, see `.prettierrc`.
-   [morgan](https://expressjs.com/en/resources/middleware/morgan.html) for request logging
-   [picocolors](https://www.npmjs.com/package/picocolors) for adding colour to request logging

## Code Attributions

-   Regex Escape Utility: [(`./server/utils/regex.ts:10`)](https://github.com/Tianyou-Xie/2800_202410_BBY07/blob/dev/server/src/utils/regex.ts#L10)
    > https://github.com/component/escape-regexp/blob/master/index.js
-   Helmet SEO Component Structure: [(`./client/components/seo/seo.tsx`)](https://github.com/Tianyou-Xie/2800_202410_BBY07/blob/dev/client/src/components/seo/seo.tsx#L23-L37)
    > https://www.freecodecamp.org/news/react-helmet-examples

## Environment Variables

Both the server and client utilize a `.env` file.

```
|.
├── client/
│   └── .env -- client environment variables (injected by Vite)
└── server/
    └── .env -- server environment variables (injected by dotenv)
```

**Client Variables:**

| Key            | Usage                                           |
| -------------- | ----------------------------------------------- |
| PORT           | Port used for the frontend app                  |
| VITE_LOCALHOST | Host used for listening to Server Socket Events |

**Server Variables:**

| Key        | Usage                                         |
| ---------- | --------------------------------------------- |
| PORT       | Port used for the express server              |
| MONGO_URL  | The MongoDB connection string                 |
| JWT_TTL    | The JWT token expiry time, in seconds         |
| JWT_SECRET | The secret used to sign and verify JWT tokens |

## Running Locally & Deployment

During development, both the client and server use the command `npm run dev` to launch the development server with file watching.

The client compiles to a `dist` folder with the command `npm run build`. This folder can be deployed as is. The command `npm start` will first build and then preview the build with vite.

The server does not compile, esno is used in watch mode during development (`npm run dev`), and in static mode during deployment. The whole project must be deployed and started with `npm start`.

## Project Links

-   [GitHub](https://github.com/1800-BBY8/1800_202410_BBY8)
-   [Trello](https://trello.com/b/ENhDCODq/2800202410bby07)
-   [FigJam](https://www.figma.com/file/lM0sT0hbMY3v0cW2zLn5hC/2800-202410-BBY07?type=whiteboard&node-id=0-1&t=fR12pb3gUrK1EDNj-0)
