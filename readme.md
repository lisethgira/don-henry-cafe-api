<div align='center'>

![alt text](./public/icon.png "Don Henry Café")

[![Tech Stack](https://skillicons.dev/icons?i=nodejs,express,postgres,vercel,firebase)](#tech-stack)

<h2>Don Henry Café.</h2>
<h3 align="center">Rest API for Don Henry Café app!</h3>

[Demo](https://donhenrycafe.vercel.app) · [Related Projects](#related-projects)

<h3 align="center">Powered by Vercel ⚡</h3>
</div><br>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
  - [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Instalation \& Environments](#instalation--environments)
- [Postman Documentation](#postman-documentation)
- [Table Structure](#table-structure)
- [Related Projects](#related-projects)
- [Contributors](#contributors)
- [License](#license)
- [Report](#report)

## Overview

Don Henry Café REST API is a backend server implementation designed for a coffee shop using the Express framework. It provides a robust and scalable solution for managing various aspects of a coffee shop's operations, such as menu items, orders, customer information, and more.

The REST API follows the principles of Representational State Transfer (REST), which enables easy integration with various clients, including web and mobile applications. It utilizes the HTTP protocol for communication, allowing clients to perform operations such as retrieving, creating, updating, and deleting resources.

### Features

- Authorization & Authentication
- Upload Images
- CRUD (Products, User, Transactions, Promo)
- Whitelisting JWT
- Error Handling & Validation

## Tech Stack

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/) (for storing data)
- [Cloudinary](https://cloudinary.com/) (for storing images)
- [JSON Web Token](https://jwt.io/) (authorization)
- [Vercel](https://vercel.com/) (for deploying)
- [Nodemailer](https://nodemailer.com/about/) (email sender)
- [Firebase Admin](https://github.com/firebase/firebase-admin-node) (for sending remote notification)
- and other packages (you can see in package.json)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Cloudinary](https://cloudinary.com/)
- [SMTP](https://nodemailer.com/usage/why-smtp/)
- [Firebase Account](https://firebase.google.com/)

### Instalation & Environments

1. Clone this repository to your local

   ```bash
   git clone https://github.com/lisethgira/don-henry-cafe-api.git
   ```

2. Install dependencies

   ```bash
   cd don-henry-cafe-api && npm install
   ```

3. Setup environments (you can see in `.env.development`)

   - Database server using postgreSQL

     ```env
     DB_HOST = (put your db host)
     DB_PORT = (put your port of db host)
     DB_USER = (put your db username)
     DB_PASS = (put your db password)
     DB_NAME = (put your db  name)
     ```

   - JSON Web Token Secret Key (prefer using random string) [[see more information]](<https://jwt.io/introduction>)

     ```env
     JWT_SECRET_KEY = (put your secret key)
     ```

   - Image server using Cloudinary [[you can create account in here]](<https://cloudinary.com/>)

     ```env
     CLOUDINARY_NAME = (put your cloudinary name)
     CLOUDINARY_KEY = (put your cloudinary key)
     CLOUDINARY_SECRET = (put your cloudinary secret)
     ```

   - SMTP Authentication for sending email (use gmail for free) [[more info]](<https://sendgrid.com/blog/what-is-an-smtp-server/>)

     ```env
     SMTP_HOST = (put your smtp host)
     SMTP_EMAIL = (put your smtp email/username)
     SMTP_PASS = (put your smtp password)
     ```

   - Firebase Admin (generate service-account json and encode base64) [[see more]](<https://firebase.google.com/docs/admin/setup#initialize_the_sdk_in_non-google_environments>)

     ```env
     GOOGLE_APPLICATION_CREDENTIALS = (your encoded service-account.json content)
     ```

4. Last, run the app

   ```bash
   npm run app
   ```

## Postman Documentation

You can see the documentation from [Postman](https://www.postman.com/maintenance-physicist-69747530/workspace/don-henry-cafe/collection/13731149-6e16a1f0-563e-481d-84bc-ab78933921f7?action=share&creator=13731149) or import it with [json file](/postman.json).

If you using json file, just open your postman and click import.

## Table Structure

For PostgreSQL, You can download table structure (ddl) from [this link](https://github.com/lisethgira/don-henry-cafe-api/blob/main/documentation/ddl.sql).

## Related Projects

- [don Henry Cafe](https://github.com/lisethgira/donHenryCafe) - React App

## Contributors

- [Liseth Arelis Giraldo Morales](https://github.com/lisethgira)
- [José Antonio Ortiz](https://github.com/Josed1804)
- [Maria Carolina Escudero](https://github.com/ESCUDERO457)
- [Francisco Abraham](https://github.com/frankc2812)
  
## License

Apache License 2.0

## Report

Any error report you can pull request
or contact:

- Liseth Arelis Giraldo Morales <lisethgiraldo628@gmail.com>
- Maria Carolina Escudero <27052018estudio@gmail.com>
- José Antonio Ortiz <josed_1804@hotmail.com>
- Francisco Abraham <lesgopa12@gmail.com>
