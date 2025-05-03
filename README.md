![Github Cover](https://github.com/user-attachments/assets/b93e3f12-8f50-4860-86db-5d9998290b30)

<p align = "center">
Ghostmail is a service that allows users to create disposable email addresses. These addresses can be used temporarily to protect users' primary inboxes from spam or unwanted messages. The service is designed to be secure, anonymous, and easy to use.
</p>

<p align="center" width="50%">
<a href="https://html.com/" target="_blank" rel="noreferrer"> <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" alt="html5"/></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank" rel="noreferrer"> <img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" alt="css3"/></a>
<a href="https://www.w3schools.com/js/" target="_blank" rel="noreferrer"> <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="javascript"/> </a>
<a href="http://typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="typescript"/> </a>
<a href="https://tailwindcss.com/" target="_blank" rel="noreferrer"> <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="tailwind"/></a> <a href="https://legacy.reactjs.org/docs/getting-started.html" target="_blank" rel="noreferrer"> <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="react"/> </a>
<a href="https://redux.js.org/" target="_blank" rel="noreferrer"> <img src="https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white" alt="redux"/></a>
<a href="https://reactrouter.com/en/main" target="_blank" rel="noreferrer"> <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="react router"/></a>
 <a href="https://vite.dev/" target="_blank" rel="noreferrer"> <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="vite"/></a>
 <a href="https://nodejs.org/en" target="_blank" rel="noreferrer"> <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="node js"/></a>
<a href="https://expressjs.com/" target="_blank" rel="noreferrer"> <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="express"/></a>
<a href="https://socket.io/" target="_blank" rel="noreferrer"> <img src="https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101" alt="socket io"/></a>
<a href="https://jwt.io/" target="_blank" rel="noreferrer"> <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens" alt="jwt"/></a>
<a href="https://www.mysql.com/" target="_blank" rel="noreferrer"> <img src="https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white" alt="mysql"/></a>
<a href="https://sequelize.org/" target="_blank" rel="noreferrer"> <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white" alt="sequelize"/></a>
<a href="https://supabase.com/" target="_blank" rel="noreferrer"> <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="supabase"/></a>
<a href="https://aws.amazon.com/" target="_blank" rel="noreferrer"> <img src="https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white" alt="AWS"/></a>
<a href="https://vercel.com/" target="_blank" rel="noreferrer"> <img src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white" alt="vercel"/></a>
<a href="https://www.figma.com/" target="_blank" rel="noreferrer"> <img src="https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white" alt="figma"/></a>
</p>

</br>
<br/>

## Table Of Contents
* [About the Project](#about-the-project)
* [Features](#features)
* [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Contributing](#contributing)
* [Code of conduct](#code-of-conduct)
* [License](#license)
* [Project Links](#project-links)


## About The Project
![Ghostmail](https://github.com/user-attachments/assets/0a750417-b659-488d-be4f-3474f33e52d7)

<p align="left">
Ghostmail is a service that allows users to create disposable email addresses. These addresses can be used temporarily to protect users' primary inboxes from spam or unwanted messages. The service is designed to be secure, anonymous, and easy to use.

## Features

### 1. Disposable Email Creation:
- **Authenticated Users**: Can create up to **10 disposable email addresses** at a time.
- **Unauthorized Users (Guests)**: Can create **1 disposable email address** at a time.
- Emails are **temporary** and **anonymous**, protecting users' privacy.

### 2. Real-Time Email Reception:
- Users are notified instantly when they receive new emails via **WebSockets**.
- No need for manual refresh — inboxes are updated in real time.

### 3. Email Deletion:
- Users can **delete individual emails** or clear their entire inbox.
- **Guests** have all their emails deleted automatically after **24 hours**.

### 4. Email Address Change:
- Authenticated users can **rename or change** their disposable email address while keeping the inbox and messages intact.

### 5. Email Expiry for Guests:
- **Guest emails** are automatically deleted after **24 hours**, ensuring cleanup and resource management.

### 6. GitHub Actions for Cron Jobs:
- Periodic cleanup of **expired guest email addresses** and their messages using **GitHub Actions**.

### 7. Real-Time Updates:
- Email inboxes for users are updated instantly with new incoming emails using **WebSocket** technology.

### 8. Limits:
- **Authenticated Users** can create up to **10 disposable emails**.
- **Unauthenticated Users** can create **1 disposable email** at a time.


## Built With
#### Frontend
* [HTML](https://www.w3schools.com/Html/)
* [CSS](https://www.w3schools.com/css/)
* [Typescript](https://www.typescriptlang.org/)
* [Tailwind](https://tailwindcss.com/)
* [React](https://react.dev/)
* [React Router](https://reactrouter.com/)
* [Redux](https://redux.js.org/)
* [Redux Thunk](https://redux.js.org/usage/writing-logic-thunks)
* [Redux Toolkit](https://redux-toolkit.js.org/)
* [Shadcn](https://ui.shadcn.com/docs)
* [Google OAuth](https://developers.google.com/identity/protocols/oauth2)
* [Socket Client](https://www.npmjs.com/package/socket.io-client) 
* [Zod](https://www.npmjs.com/package/zod)
* [Vite](https://vite.dev/)
* [Figma](https://www.figma.com/)

#### Backend
* [Typescript](https://www.typescriptlang.org/)
* [Node.js](https://nodejs.org/en)
* [Express.js](https://expressjs.com/)
* [MySQL](https://www.mysql.com/)
* [Sequelize](https://sequelize.org/)
* [Supabase](https://supabase.com/)
* [Jwt](https://jwt.io/)
* [Bcryptjs](https://www.npmjs.com/package/bcrypt)
* [Socket](https://www.npmjs.com/package/socket.io)
  
#### SMTP SERVER
* [Javascript](https://www.w3schools.com/js/)
* [SMTP Server](https://www.npmjs.com/package/smtp-server)
* [Mailparser](https://mailparser.io/)
* [AWS](https://aws.amazon.com/)
 

## Getting Started  

### Prerequisites
<a href="https://www.npmjs.com/package/npm" >npm</a>  is a package manager for the JavaScript programming language maintained by npm, Inc. npm is the default package manager for the JavaScript runtime environment Node.js and is included as a recommended feature in the Node.js installer. 

<a href="https://nodejs.org/en">Node.js</a> is a cross-platform, open-source JavaScript runtime environment that can run on Windows, Linux, Unix, macOS, and more. Node.js runs on the V8 JavaScript engine, and executes JavaScript code outside a web browser. Node.js lets developers use JavaScript to write command line tools and for server-side scripting.

<a href="https://git-scm.com/downloads" >Git</a> is a distributed version control system used for software development. It allows multiple developers to work on the same codebase simultaneously, keeping track of changes and managing versions. It also enables users to revert changes and collaborate more effectively.


### Installation

<p><b>Step 1 -</b> Clone the chitchat project.</p>

```
git clone https://github.com/prince2520/ghostmail.git
```

#### Frontend

<p><b>Step 2 -</b> Change directory to frontend </p>

```
cd frontend 
```

<p><b>Step 3 -</b> Install the necessary dependencies </p>

```
npm install 
```

<p><b>Step 4 -</b> Add environment variables </p>

```
# Create .env file and paste to src folder

# Add the url of your server
// Backend Server url 
VITE_API_SERVER_URL=*****

// Google client id
VITE_API_GOOGLE_CLIENT_ID=*****
```
<p><b>Step 5 -</b> Run frontend server locally.</p>

```
npm run dev 
```

#### Backend

<p><b>Step 6 -</b> Change directory to server </p>

```
cd server 
```

<p><b>Step 7 -</b> Install the necessary dependencies. </p>

```
npm install 
```

<p><b>Step 8 -</b> Add environment variables. </p>

```
# add .env file to root directory

// MYSQL CREDENTIAL 
DB_HOST=localhost
DB_USERNAME=root
DB_PASSWORD=****
DB_NAME=****
DB_DIALECT=mysql

JWT_SECRET_KEY=****
MAIL_DOMAIN_ADDRESS=ghostmails.site

CLIENT_URL=http://localhost:5173 // Default 
SMTP_SERVER_URL=****

SUPABASE_DB_URL=****
```

<p><b>Step 9 -</b> Run backend server locally.</p>

``` 
npm run build
npm start 
```


#### SMTP Server

<p><b>Step 6 -</b> Change directory to smtp-server </p>

```
cd server 
```

<p><b>Step 7 -</b> Install the necessary dependencies. </p>

```
npm install 
```

<p><b>Step 8 -</b> Add environment variables. </p>

```
# add .env file to root directory
# add backend server url
SERVERURL=****
```

<p><b>Step 9 -</b> Run smtp server locally.</p>

``` 
node server.js
```


## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.
* If you have suggestions for adding or removing projects, feel free to [open an issue](https://github.com/prince2520/ghostmail/issues) to discuss it

* Please make sure you check your spelling and grammar.

### Creating A Pull Request

Wanna contribute to Ghostmail ?

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/FeatureName`)
3. Commit your Changes (`git commit -m 'Add some FeatureName'`)
4. Push to the Branch (`git push origin feature/FeatureName`)
5. Open a Pull Request


## Code of conduct

Developers are requested to go through our <a href="https://github.com/prince2520/ghostmail/blob/main/CODE_OF_CONDUCT.md">code of conduct</a> thoroughly to maintain a peaceful environment within our project.

## License
Distributed under the MIT License. See [LICENSE](https://github.com/prince2520/ghostmail/blob/main/LICENSE) for more information.

## Project Links
<p align="left">
<a href="https://ghostmail.vercel.app/home" target="_blank" rel="noreferrer"> <img src="https://github.com/prince2520/animesuper/assets/68547999/56ca3f30-2eb8-48fb-a669-2cadd5fc3297" alt="website" height="30"/> </a>
<a href="https://www.youtube.com/watch?v=rkjIEatycIw" target="_blank" rel="noreferrer"> <img src="https://github.com/prince2520/animesuper/assets/68547999/fc73f01d-9043-4756-a8fd-b9b029b20c39" alt="hou"  height="30"/> </a>
<a href="https://www.figma.com/design/EkxXdxsvDlXKSoGhVVzZiW/Ghostmail?node-id=5-3&t=ROMRg56hrnvNXxkj-1"  target="_blank" rel="noreferrer"/>
  <img src="https://github.com/prince2520/animesuper/assets/68547999/a973c973-0031-4712-a573-07189646f6d5" alt="figma" height="30"/>
</a>
