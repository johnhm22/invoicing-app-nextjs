## Full Stack Invoicing App  
An exercise in building a fullstack app using Next.js v15.

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
[Clerk](https://clerk.com/) is defined as a user management platform. It is used here for its authentication and authorisation features. Multi-factor authentication is enabled on the configuration to require use by an authentictor app such as Google Authenticator or 


### What does it do?  
The user has to create an account and login. This is managed by Clerk.  
Upon successful login, the dashboard view shows a table view of invoices with columns of date, customer name and email, status and value.  
Each invoice is clickable and takes the user to a page for that specific invoice where more details are provided along with the possiblity to change the status or delete it.  
There is also a payment option which, when selected, takes the user to a test mode Stripe payment page.  





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
