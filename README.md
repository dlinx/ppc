# Employee Review system
[Requirements](https://github.com/Pay-Baymax/FullStackEngineerChallenge)
## Features

- Admin View
  - Can create/modify/delete employees
  - Can assign reviewers
  - Can modify reviews
- Employee View
  - Can submit review for other employees
  - Can see received reviews

## How to run

Application can be deploy using docker. The `Dockerfile` is available in the root directory of the project.
`docker-compose` can also be used to start application locally. The required environment variables are available in `docker-compose` file.

Docker compose will fill the fake data in database and start the application. It will create one admin account and 10 employees record.

## Access Credentials
- Admin account

> **email**: root@ppc.local

> **password**: toor

Create employee from admin account to login from employee account.
The prefilled 10 employees have default password `test`.

## Environment variables

> JWT_SECRET

JWT encryption key

> SESSION_SECRET

Expressjs session encryption key

## Directory Structure

> ppc-client

Frontend application in react

> ppc-server

Application server in ExpressJS

## Starting development server

> Start appication server

- Move to `ppc-server`

```
npm start
```

- In another terminal move to `ppc-client`

```
npm start
```

> Initialize fake values database
```
$ ts-node db/initDB.ts
```


## Bottom note
- Considering the timeframe, there can be some bugs in the application.
- Validations are not implemented
- Added some more features which are not listed in the requirements.
