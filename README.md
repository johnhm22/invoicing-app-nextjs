## Full Stack Invoicing App  
An exercise in building a fullstack app using Next.js v15.  

### What does it do?  
The user has to create an account and login. This is managed by Clerk.  
Upon successful login, the dashboard view shows a table view of invoices with columns of date, customer name and email, status and value.  
Each invoice is clickable and takes the user to a page for that specific invoice where more details are provided along with the possiblity to change the status or delete it.  
There is also a payment option which, when selected, takes the user to a test mode Stripe payment page.  

### Tech Stack  
tailwindcss
TypeScript/JavaScript
React v19
Next.js v15
Clerk
Stripe
Drizzle ORM
PostgreSQL

#### More details  
[Clerk](https://clerk.com/) is defined as a user management platform. It is used here for its authentication and authorisation features. Multi-factor authentication is enabled on the configuration to require use by an authentictor app such as Google Authenticator.  

[Stripe](https://stripe.com/gb/guides) is a well-used payment platform that can be integrated into apps and enables enterprises to take and manage payments.  

[Drizzle ORM](https://orm.drizzle.team/) is an Object Relational Mapping tool that makes database operations so much simpler than writing plain sql queries. Another similar product that I have widely used is [Prisma](https://www.prisma.io/) which I have found to be very good.  

PostgreSQL is a well known relational database. For this app I used an online serverless version from [Neon](https://neon.tech/) which was very straight forward to use.


### Credit  
The app is based on one designed by the great [Colby Fayock](https://www.youtube.com/watch?v=Mcw8Mp8PYUE)


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

