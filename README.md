Links MySQL:
Windows: [https://dev.mysql.com/downloads/installer/] (ya instala todo)
Otros: [https://dev.mysql.com/downloads/] (se necesita el workbench y el server)

Para correr la aplicacion con la DB, es necesario montar la base de datos.
Instrucciones:
1) DB: instalar DB y correr el script ubicado en /app/data/script_db_mysql.sql
para mayor facilidad, respetar los datos colocados en env: user root: "root" // password: "myroot.345"
dado que la URL en env es la siguiente:
DATABASE_URL="mysql://root:myroot.345@localhost:3306/smaa"
2) prisma (ORM)
    si no se instala con el npm, correr el comando 
```bash
npm install prisma --save-dev
npx prisma init
npx prisma db pull
npx prisma generate
```
prisma init -> crea la carpeta prisma con el archivo schema.prisma
prisma db pull -> crea los modelos basado en la base de datos
prisma generate -> genera los objetos y metodos para utilizar la base de datos basado en los modelos

por eso, tras cada modificacion en la estructura de la DB, se debe:
1) detener el entorno local de la app (CTRL+C en la consola en la que se corrio npm run dev) sino se detiene no funcionará el prisma generate
2) ejecutar:
```bash
npx prisma db pull
npx prisma generate
```
3) volver a ejecutar el entorno local de la app:
```bash
npm run dev
```



This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# tp-dds-decorator
