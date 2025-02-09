# 🏡  Real Estate Full-Stack Application

A **full-stack real estate application** built with **Next.js**, to deeper my understanding of **Next.js** and to explore **server-side rendering (SSR), static site generation (SSG), authentication, and database integration**. Features include **Google authentication (NextAuth), property listing CRUD, Cloudinary image uploads, Mapbox integration, internal messaging, bookmarking, and social media sharing**. Designed with **Tailwind for responsive UI**, this project deepened my expertise in **Next.js, MongoDB, and modern web development**. 


## Features
- **User authentication** with Google & NextAuth
- **User authorization** with protected routes
- **Server actions** & database interactions
- **User profile** with user listings
- **Property listing CRUD** operations
- **Multiple property image uploads**
- **Cloudinary integration** for media storage
- **Property search** functionality
- **Internal messaging** with unread notifications
- **Photoswipe image gallery**
- **Mapbox integration** for interactive maps
- **Toast notifications** for user feedback
- **Property bookmarking** (saved properties)
- **Property sharing** to social media
- **Loading spinners** for better UX
- **Responsive design** using Tailwind CSS
- **Custom 404 page** for enhanced user experience


## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js (latest LTS recommended)
- MongoDB
- Cloudinary account (for image storage)
- Mapbox API key

### Setup & Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/salahmander/properties-project.git
   cd properties-project
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env.local` file and configure your environment variables:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key
   MONGODB_URI=your-mongodb-uri
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   MAPBOX_ACCESS_TOKEN=your-mapbox-access-token
   ```

4. Start the development server:
   ```sh
   npm run dev
   ```

5. Open `http://localhost:3000` in your browser.


## Scripts
- **Start development server:** `npm run dev`
- **Build for production:** `npm run build`
- **Start production server:** `npm run start`
- **Run linter:** `npm run lint`
