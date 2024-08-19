# LINK-IN-BIO
MERN stack link-in-bio, link shortener and social media links manager.

![screenshot](https://raw.githubusercontent.com/alibkm95/LINK-IN-BIO/main/Screenshot.png)

[Demo](https://link-in-bio-zg67.onrender.com)

[My account in LINK-In-BIO](https://link-in-bio-zg67.onrender.com/u/alibkm95)

## how to use ?
In order to make this project works in your local machine, you need some requirements :

- Node JS : [download and install nodeJS](https://nodejs.org/en)
- Mongo DB : [download and install MongoDB](https://www.mongodb.com/docs/manual/installation/)
- A text editor like [vsCode](https://code.visualstudio.com/)

### clone the project :
open your terminal and insert following commands:
```bash
git clone https://github.com/alibkm95/LINK-IN-BIO.git
```

### install dependencies :
```bash
cd LINK-IN-BIO
```
```bash
  npm install
```
```bash
  npm install nodemon --save-dev
```
```bash
  cd ./frontend
```
```bash
  npm install
```

### create .env file :
in your root directory, create a new file and name it `.env` then set the following variables in the file.

- `MONGO_URI`=your connection string
- `COOKIE_SECRET`=encryption key for cookies. you can get a random secret from [here](https://randomkeygen.com/)
- `JWT_SECRET`=encryption key for tokens. you can get a random secret from [here](https://randomkeygen.com/)
- `EMAIL_SERVICE`=`gmail` (you can use gmail accounts for sending email in nodemailer [here](https://medium.com/@y.mehnati_49486/how-to-send-an-email-from-your-gmail-account-with-nodemailer-837bf09a7628) is a guid for setup gmail account)
- `EMAIL_HOST`=`smtp.gmail.com`
- `EMAIL_HOST_PORT`=the port of email host (usualy its 587)
- `EMAIL_AUTH_USER`=the gmail accounts user name (example@gmail.com)
- `EMAIL_AUTH_PASSWORD`=the gmail app password that you got from your google account earlier
- `PORT`=`5000` the port of backend server works with.

### start backend server :
open new terminal and insert following commands:
```bash
  npm run dev
```

### start frontend :
open new terminal and insert following commands:
```bash
  cd ./frontend
```
```bash
  npm run dev
```

## Languages, technologies and packages:
<p align="center">
<img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="JavaScript" />
<img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens" alt="JWT" />
<img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
<img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="NodeJS" />
<img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="Express.js" />
<img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React Badge" />
<img src="https://img.shields.io/badge/daisyUI-%23345.svg?style=for-the-badge&logo=daisyui&logoColor=%23FFFFFF" alt="daisyUI Badge" />
<img src="https://img.shields.io/badge/vite-%23646.svg?style=for-the-badge&logo=vite&logoColor=%23FFFFFF" alt="Vite Badge" />
<img src="https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=%23FFFFFF" alt="Tailwind CSS Badge" />
<img src="https://img.shields.io/badge/React%20Hot%20Toast-%23FFC107.svg?style=for-the-badge&logo=reacthottoast&logoColor=%23FFFFFF" alt="React Hot Toast Badge" />
<img src="https://img.shields.io/badge/Recharts-%2320232.svg?style=for-the-badge&logo=recharts&logoColor=%23FFFFFF" alt="Recharts Badge" />
<img src="https://img.shields.io/badge/React%20QRCode-%23007bff.svg?style=for-the-badge&logo=reactqrcode&logoColor=%23FFFFFF" alt="React QRCode Badge" />
</p>