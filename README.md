<div align="center">
    <img width="50%" src="Skynet Logo.png" />
    <h1>Skynet by BBY07</h1>
</div>

## Introduction

An interplanetary town square that maintains connections between cultures and ideologies of colonies across the galaxy.

## Authors

-   Kamal Dolikay
    -   GitHub: [@kamalkdolikay](https://github.com/kamalkdolikay)
    -   Email: [kamaldolikay@gmail.com](mailto:kamaldolikay@gmail.com)
-   Ole Lammers
    -   GitHub: [@zyrakia](https://www.github.com/Zyrakia)
    -   Email: [ole.lammers@pm.me](mailto:ole.lammers@pm.me)
-   Tianyou Xie
    -   GitHub: ([@Tianyou-Xie](https://github.com/Tianyou-Xie))
    -   Email: [tianyouxie001@gmail.com](mailto:tianyouxie001@gmail.com)
-   Samarjit Bhogal
    -   GitHub: ([@SamarjitBhogal](https://github.com/SamarjitBhogal))
    -   Email: [samarjit.v.bhogal@gmail.com](mailto:samarjit.v.bhogal@gmail.com)
-   Marcus Lages
    -   GitHub: ([@MarcusLages](https://github.com/MarcusLages))
    -   Email: [marcusvlages@gmail.com](mailto:marcusvlages@gmail.com)

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

-   Regex Escape Utility: [(`./server/src/utils/regex.ts:10`)](https://github.com/Tianyou-Xie/2800_202410_BBY07/blob/dev/server/src/utils/regex.ts#L10)
    > https://github.com/component/escape-regexp/blob/master/index.js
-   Helmet SEO Component Structure: [(`./client/src/components/seo/seo.tsx`)](https://github.com/Tianyou-Xie/2800_202410_BBY07/blob/dev/client/src/components/seo/seo.tsx#L23-L37)
    > https://www.freecodecamp.org/news/react-helmet-examples
-   Hotbar Structure and Animation Inspiration: [(`./client/src/components/Hotbar/Hotbar.tsx`)](https://github.com/Tianyou-Xie/2800_202410_BBY07/blob/dev/client/src/components/Hotbar/Hotbar.tsx)
    > https://youtu.be/sgV111KxbwI?si=HnOS5OnfLswXk_8E
-   Customized React Toast: [(`./client/src/index.css`)](https://github.com/Tianyou-Xie/2800_202410_BBY07/blob/dev/client/src/index.css)
    > -   https://stackoverflow.com/questions/60849448/how-can-i-change-the-styles-of-the-react-toastify-popup-message
    > -   https://fkhadra.github.io/react-toastify/introduction/
-   Planet Map Orbit Calculations [(`./client/src/pages/planet-map/planet-visual.tsx`)](https://github.com/Tianyou-Xie/2800_202410_BBY07/blob/dev/client/src/pages/planet-map/planet-visual.tsx#L70-L78)
    > https://jsfiddle.net/ColinCee/a2yu0af6/

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
-   Policy Page - an inital draft was created with the help of ChatGPT
-   Terms of Use Page - an inital draft was created with the help of ChatGPT
-   FAQs Page - ChatGPT was use to get an idea of common questions that people have about social media platforms

## Project Links

-   [GitHub](https://github.com/1800-BBY8/1800_202410_BBY8)
-   [Trello](https://trello.com/b/ENhDCODq/2800202410bby07)
-   [FigJam](https://www.figma.com/file/lM0sT0hbMY3v0cW2zLn5hC/2800-202410-BBY07?type=whiteboard&node-id=0-1&t=fR12pb3gUrK1EDNj-0)

## Files and Folders (as of commit [5967d16](https://github.com/Tianyou-Xie/2800_202410_BBY07/commit/5967d16031c8085646fdacf3b991fa1af5de4a15))

```
.
�   .gitignore
�   .prettierrc
�   README.md
�   Skynet Logo.png
�   tree.txt
�
+---.vscode
�       extensions.json
�       settings.json
�
+---client
�   �   .env
�   �   index.html
�   �   package-lock.json
�   �   package.json
�   �   tsconfig.json
�   �   vite.config.ts
�   �
�   +---public
�   �       among-us.jpg
�   �       among-us2.jpg
�   �       favicon.ico
�   �       logo.webp
�   �
�   +---src
�       �   app.tsx
�       �   environment.ts
�       �   index.css
�       �   index.tsx
�       �   vite-env.d.ts
�       �
�       +---assets
�       �   +---fonts
�       �   �       BabaPro-Bold.ttf
�       �   �       BITSUMIS.TTF
�       �   �       FjallaOne-Regular.ttf
�       �   �       TT-Octosquares-Trial-Regular.ttf
�       �   �
�       �   +---images
�       �   �   �   amongus-black.webp
�       �   �   �   amongus-blue.webp
�       �   �   �   amongus-green.webp
�       �   �   �   amongus-pink.webp
�       �   �   �   amongus-red.webp
�       �   �   �   amongus-white.webp
�       �   �   �   amongus-yellow.webp
�       �   �   �   icons8-cursor-38.png
�       �   �   �   Infinity_Gauntlet_Cursor.png
�       �   �   �   Infinity_Gauntlet_Pointer.png
�       �   �   �   SkynetLogo.png
�       �   �   �
�       �   �   +---icons
�       �   �           android-chrome-192x192.png
�       �   �           android-chrome-512x512.png
�       �   �           apple-touch-icon.png
�       �   �           favicon-16x16.png
�       �   �           favicon-32x32.png
�       �   �           favicon.ico
�       �   �           site.webmanifest
�       �   �
�       �   +---videos
�       �           home.gif
�       �           message.gif
�       �           post.gif
�       �
�       +---components
�       �   +---cursor
�       �   �       cursor.module.css
�       �   �       cursor.tsx
�       �   �
�       �   +---google-auth-btn
�       �   �       google-auth-btn.tsx
�       �   �
�       �   +---Header
�       �   �       Header.module.css
�       �   �       Header.tsx
�       �   �
�       �   +---hotbar
�       �   �       hotbar-animation.css
�       �   �       hotbar.module.css
�       �   �       hotbar.tsx
�       �   �
�       �   +---loader
�       �   �       loader.module.css
�       �   �       loader.tsx
�       �   �       small-loader.module.css
�       �   �       small-loader.tsx
�       �   �
�       �   +---ModalConfirmation
�       �   �       ModalConfirmation.module.css
�       �   �       ModalConfirmation.tsx
�       �   �
�       �   +---Page
�       �   �       Page.module.css
�       �   �       Page.tsx
�       �   �
�       �   +---paginated-post-feed
�       �   �       paginated-post-feed.tsx
�       �   �
�       �   +---paginated-user-list
�       �   �       paginated-user-list.module.css
�       �   �       paginated-user-list.tsx
�       �   �
�       �   +---Post
�       �   �   �   Post.module.css
�       �   �   �   Post.tsx
�       �   �   �
�       �   �   +---post-header
�       �   �           post-header.module.css
�       �   �           post-header.tsx
�       �   �
�       �   +---Profile
�       �   �       Profile.module.css
�       �   �       Profile.tsx
�       �   �
�       �   +---ques-accordion
�       �   �       ques-accordion.module.css
�       �   �       ques-accordion.tsx
�       �   �
�       �   +---scrambler
�       �   �       scrambler.tsx
�       �   �
�       �   +---seo
�       �   �       seo.tsx
�       �   �
�       �   +---UIBox
�       �   �       UIBox.module.css
�       �   �       UIBox.tsx
�       �   �
�       �   +---UserInfo
�       �           UserInfo.module.css
�       �           UserInfo.tsx
�       �
�       +---lib
�       �       auth.ts
�       �       axios.ts
�       �       callPosts.ts
�       �       create-slug.ts
�       �       isUser.ts
�       �       with-ref.ts
�       �
�       +---pages
�           +---about
�           �   �   about-page.module.css
�           �   �   about-page.tsx
�           �   �
�           �   +---options
�           �           about-skynet-page.tsx
�           �           policy-page.tsx
�           �           terms-page.tsx
�           �
�           +---edit-profile-page
�           �       edit-profile-page.module.css
�           �       edit-profile-page.tsx
�           �
�           +---faqs
�           �       faqs-page.tsx
�           �       faqs.module.css
�           �
�           +---follower
�           �       follower.module.css
�           �       follower.tsx
�           �
�           +---following
�           �       following.module.css
�           �       following.tsx
�           �
�           +---forgetpassword
�           �       forgetpassword.module.css
�           �       forgetpassword.tsx
�           �
�           +---general-feed
�           �       general-feed.module.css
�           �       general-feed.tsx
�           �
�           +---home
�           �       home.module.css
�           �       home.tsx
�           �
�           +---landing-page
�           �       landing-page.module.css
�           �       landing-page.tsx
�           �
�           +---login
�           �       login-component.tsx
�           �       login-html.tsx
�           �       login.module.css
�           �
�           +---messages
�           �       messages-component.tsx
�           �       messages-html.tsx
�           �       messages.module.css
�           �
�           +---messages-all
�           �       messages.module.css
�           �       messages.tsx
�           �
�           +---page404
�           �       page404.module.css
�           �       page404.tsx
�           �
�           +---planet-feed
�           �       planet-feed.module.css
�           �       planet-feed.tsx
�           �
�           +---planet-home
�           +---planet-map
�           �       center-visual.tsx
�           �       decorative-star.tsx
�           �       planet-info-card.tsx
�           �       planet-map.tsx
�           �       planet-visual.tsx
�           �       space-traveller.tsx
�           �       star-background.tsx
�           �
�           +---planets
�           �       planets-component.tsx
�           �       planets-html.tsx
�           �       planets.module.css
�           �
�           +---post
�           �       post.module.css
�           �       post.tsx
�           �
�           +---post-page
�           �       post-page.module.css
�           �       post-page.tsx
�           �
�           +---profile-page
�           �       profile-page.module.css
�           �       profile-page.tsx
�           �
�           +---resetpassword
�           �       resetpassword.module.css
�           �       resetpassword.tsx
�           �
�           +---search-page
�           �       search-page.module.css
�           �       search-page.tsx
�           �
�           +---signup
�           �       signup-component.tsx
�           �       signup-html.tsx
�           �       signup.module.css
�           �
�           +---support-page
�           �       support-page.module.css
�           �       support-page.tsx
�           �
�           +---user-page
�           �       user-page.module.css
�           �       user-page.tsx
�           �
�           +---user-settings
�               �   user-settings-page.module.css
�               �   user-settings-page.tsx
�               �
�               +---options
�                       change-email-modal.tsx
�                       change-password-modal.tsx
�                       change-username-modal.tsx
�                       commented.tsx
�                       delete-account-modal.tsx
�                       liked.tsx
�                       manage-account-page.tsx
�                       saved.tsx
�                       your-info-modal.tsx
�
+---server
    �   .env
    �   index.ts
    �   package-lock.json
    �   package.json
    �   tsconfig.json
    �
    +---src
        �   environment.ts
        �
        +---@types
        �       express.d.ts
        �       model.d.ts
        �
        +---lib
        �   +---auth
        �       �   auth-adapter.ts
        �       �   auth-worker.ts
        �       �
        �       +---adapters
        �               basic-jwt.ts
        �               google-oauth.ts
        �
        +---middlewares
        �       auth-protected.ts
        �       log.ts
        �
        +---models
        �       comment-relationship.ts
        �       conversation.ts
        �       deletedUser.ts
        �       follow-relationship.ts
        �       like-interaction.ts
        �       location.ts
        �       media.ts
        �       message.ts
        �       planet.ts
        �       post.ts
        �       question.ts
        �       token.ts
        �       user.ts
        �
        +---routes
        �   �   index.ts
        �   �
        �   +---faqs
        �   �       index.ts
        �   �
        �   +---feed
        �   �       index.ts
        �   �       [planetOrUserId].ts
        �   �
        �   +---planet
        �   �       index.ts
        �   �       [nameOrId].ts
        �   �
        �   +---post
        �   �   �   index.ts
        �   �   �
        �   �   +---search
        �   �   �       [search].ts
        �   �   �
        �   �   +---[id]
        �   �           comment.ts
        �   �           index.ts
        �   �           like.ts
        �   �           parent.ts
        �   �           save.ts
        �   �
        �   +---user
        �       �   changeavatar.ts
        �       �   changeBio.ts
        �       �   changeEmail.ts
        �       �   changepassword.ts
        �       �   changeUsername.ts
        �       �   chat.ts
        �       �   commented.ts
        �       �   conversations.ts
        �       �   follower.ts
        �       �   following.ts
        �       �   forgetpassword.ts
        �       �   getchats.ts
        �       �   index.ts
        �       �   liked.ts
        �       �   login.ts
        �       �   saved.ts
        �       �   signup.ts
        �       �   [id].ts
        �       �
        �       +---deleteaccount
        �       �       delete.ts
        �       �
        �       +---oauth
        �       �       google.ts
        �       �
        �       +---resetpassword
        �       �       [token].ts
        �       �
        �       +---search
        �       �       [search].ts
        �       �
        �       +---[id]
        �               follow.ts
        �
        +---utils
                bcrypt.ts
                email.ts
                express.ts
                image.ts
                jwt.ts
                regex.ts

```
