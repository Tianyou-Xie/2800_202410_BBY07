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

## Features

-   Create Account and Login (Email/Password or Google)
-   Delete Account and Logout
-   Edit Account
-   Edit Profile
-   View Available Planets
    -   Map Mode
    -   List Mode
-   Create Posts on Various Planets
-   View Posts
    -   Galactic Feed
    -   Planetary Feed
    -   User Feed
-   Interact with Posts
    -   Comment
    -   Like / Unlike
    -   Save / Unsave
    -   Share
-   Change Avatar
-   Search for Posts
-   Search for Users
-   Interact with Users
    -   Follow / Unfollow
    -   Message (real-time)
-   View Interactions
    -   Saved Posts
    -   Liked Posts
    -   Following
    -   Followers
-   View Privacy Policy
-   View Terms of Use
-   View FAQs

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
-   [Popper](https://popper.js.org/docs/v2/)
-   [Axios](https://axios-http.com/docs/intro)
-   [Axios Cache](https://axios-cache-interceptor.js.org/)
-   [Is Mobile](https://www.npmjs.com/package/is-mobile)
-   [Konva](https://konvajs.org/index.html)
-   [React Helmet](https://www.npmjs.com/package/react-helmet)
-   [Use Image](https://www.npmjs.com/package/use-image)

**Server (built with [esno](https://www.npmjs.com/package/esno)):**

-   [Node](https://nodejs.org/en)
-   [MongoDB](https://www.mongodb.com/products/platform/atlas-database) connected by [mongoose](https://mongoosejs.com/)
-   [Express](https://expressjs.com/)
-   [Express File Routing](https://www.npmjs.com/package/express-file-routing)
-   [Joi](https://joi.dev/)
-   [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
-   [HTTP Status Codes](https://www.npmjs.com/package/http-status-codes)
-   [Nodemailer](https://www.nodemailer.com/)
-   [JWT](https://jwt.io/)
-   [CORS](https://www.npmjs.com/package/cors)
-   [dotenv](https://www.dotenv.org/)
-   [Google Auth Library](https://cloud.google.com/nodejs/docs/reference/google-auth-library/latest)
-   [Google APIs](https://www.npmjs.com/package/googleapis)
-   [Socket IO](https://socket.io/) (Server)
-   [Cloudinary](https://cloudinary.com/)
-   [OpenAI](https://openai.com/)
-   [UUID](https://www.npmjs.com/package/uuid)

**Development Utilities:**

-   [Prettier](https://prettier.io/) for consistent code formatting, see `.prettierrc`.
-   [morgan](https://expressjs.com/en/resources/middleware/morgan.html) for request logging
-   [picocolors](https://www.npmjs.com/package/picocolors) for adding colour to request logging

## Code Attributions

-   Regex Escape Utility: [(`./server/utils/regex.ts:10`)](https://github.com/Tianyou-Xie/2800_202410_BBY07/blob/dev/server/src/utils/regex.ts#L10)
    > https://github.com/component/escape-regexp/blob/master/index.js
-   Helmet SEO Component Structure: [(`./client/components/seo/seo.tsx`)](https://github.com/Tianyou-Xie/2800_202410_BBY07/blob/dev/client/src/components/seo/seo.tsx#L23-L37)
    > https://www.freecodecamp.org/news/react-helmet-examples
-   Hotbar Structure and Animation Inspiration: [(`./client/components/hotbar/hotbar.tsx`)](https://github.com/Tianyou-Xie/2800_202410_BBY07/blob/dev/client/src/components/hotbar/hotbar.tsx)
    > https://youtu.be/sgV111KxbwI?si=HnOS5OnfLswXk_8E

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

| Key              | Usage                                                                                   |
| ---------------- | --------------------------------------------------------------------------------------- |
| VITE_PORT        | The port that Vite serves the client on, when running locally                           |
| VITE_SERVER_PORT | The port that the server is running on, when running locally                            |
| VITE_NODE_ENV    | The environment the client is running in (development_local / development / production) |

**Server Variables:**

| Key                     | Usage                                                                                   |
| ----------------------- | --------------------------------------------------------------------------------------- |
| PORT                    | The port that Express starts the server on, when running locally                        |
| CLIENT_PORT             | The port that the client is being served on, when running locally                       |
| NODE_ENV                | The environment the server is running in (development_local / development / production) |
| MONGO_URL               | The MongoDB connection string used to connect to the database                           |
| JWT_SECRET              | The secret used to sign and verify JWT tokens                                           |
| JWT_TTL                 | The JWT token expiry time, in seconds                                                   |
| GOOGLE_OAUTH_ID         | The Google OAuth API Client ID used to authenticate with Google                         |
| GOOGLE_OAUTH_SECRET     | The Google OAuth API Client Secret used to authenticate with Google                     |
| EMAIL_HOST              | The hostname of the email transporter used to send emails from the server               |
| EMAIL_PORT              | The port of the email transporter used to send emails from the server                   |
| EMAIL_USER              | The username of the email transporter used to send emails from the server               |
| EMAIL_PASS              | The password of the email transporter used to send emails from the server               |
| CLOUDINARY_CLOUD_NAME   | The Cloudinary cloud name used to upload images                                         |
| CLOUDINARY_CLOUD_KEY    | The Cloudinary cloud API key used to upload images                                      |
| CLOUDINARY_CLOUD_SECRET | The Cloudinary cloud API secret used to upload images                                   |
| OPENAI_API_KEY          | The OpenAI API key used to generate images                                              |

## Running Locally & Deployment

**Running the Server:**

1. Ensure you have all server environment variables set
2. Enter the server directory (`cd server`)
3. Ensure all dependencies are installed (`npm i`)
4. Launch the server in regular (`npm start`) or watch mode (`npm run dev`)

The server does not compile, it runs as a Node app. In order to deploy it, you must deploy the `server` folder and run the `npm start` command inside the deployed folder.

**Running the Client:**

1. Ensure you have all client environment variables set
2. Enter the client directory (`cd client`)
3. Ensure all dependencies are installed (`npm i`)
4. Launch the client in preview (`npm start`) or watch mode (`npm run dev`)

The client compiles to a `dist` folder (`npm run build`). This folder can be deployed as a static site. Because this project uses client side navigation, you must ensure the service you are using to deploy the client has a rewrite rule to rewrite all requests to the `/` route. If request URLs are not rewritten by the deployment service, the client side routing will not be able to display the correct page when loading the page from a URL that does not point to the `/` route.

## AI Acknowledgement

There are a few instances where AI was used in this project:

-   Default Avatars - when a user signs up, an avatar is automatically generated for them using AI
- Policy Page - an inital draft was creted with the help of ChatGPT
- Terms of Use Page - an inital draft was creted with the help of ChatGPT
- FAQs Page - ChatGPT was use to get an idea of common questions that people have about social media platforms

## Project Links

-   [GitHub](https://github.com/1800-BBY8/1800_202410_BBY8)
-   [Trello](https://trello.com/b/ENhDCODq/2800202410bby07)
-   [FigJam](https://www.figma.com/file/lM0sT0hbMY3v0cW2zLn5hC/2800-202410-BBY07?type=whiteboard&node-id=0-1&t=fR12pb3gUrK1EDNj-0)
