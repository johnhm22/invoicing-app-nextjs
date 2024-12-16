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
Resend
Drizzle ORM
PostgreSQL

#### More details  
[Clerk](https://clerk.com/) is defined as a user management platform. It is used here for its authentication and authorisation features. Multi-factor authentication is enabled on the configuration to require use by an authentictor app such as Google Authenticator.  

[Stripe](https://stripe.com/gb/guides) is a well-used payment platform that can be integrated into apps and enables enterprises to take and manage payments.  

[Resend](https://resend.com/docs/introduction) is a useful email api for developers. It can be used, as in this example, to send an email to a customer with details of a newly created invoice.  

[Drizzle ORM](https://orm.drizzle.team/) is an Object Relational Mapping tool that makes database operations so much simpler than writing plain sql queries. Another similar product that I have widely used is [Prisma](https://www.prisma.io/) which I have found to be very good.  

PostgreSQL is a well known relational database. For this app I used an online serverless version from [Neon](https://neon.tech/) which was very straight forward to use.

### How to deploy and run  
* Set up your database either locally or with a provider such as Neon. The schema is shown in this repo.  
* Sign up for an account with Clerk and follow the docs to configue your project  
* Do similarly with Clerk and Resend. 
* In your code editor, create a folder for the app project  
* In the directory for the app in a terminal session, clone this repo and then run npm install  
* In the .env.local enter your env variables using the file .example.env as a template  
* Once done, run npm run dev and open [http://localhost:3000](http://localhost:3000) in your browser to see the running invoice app.

### Credit  
The app is based on one designed by the great [Colby Fayock](https://www.youtube.com/watch?v=Mcw8Mp8PYUE)  
