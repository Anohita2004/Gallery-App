#  Image Postcard Gallery

A full-stack web application for creating and sharing beautiful image postcards. Users can create posts with images, titles, and captions, then view all posts in a gallery.

## 🌟 Features

- **Create Posts** - Upload images with titles and captions
- **Image Management** - Automatic image optimization and hosting via ImageKit
- **Gallery View** - Browse all created postcards
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Fast & Modern** - Built with React and Vite for optimal performance

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Lightning-fast build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **ESLint** - Code quality and linting

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **ImageKit** - Image hosting and optimization service
- **Multer** - File upload handling

## 📁 Project Structure

```
application/
├── Frontend/                 # React application
│   ├── src/
│   │   ├── pages/           # Page components (CreatePost, Posts)
│   │   ├── styles/          # CSS stylesheets
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── package.json         # Frontend dependencies
│   ├── vite.config.js       # Vite configuration
│   └── eslint.config.js     # ESLint rules
│
├── Backend/                  # Node.js/Express API
│   ├── src/
│   │   ├── app.js           # Express app setup and routes
│   │   ├── db/
│   │   │   └── db.js        # MongoDB connection
│   │   ├── models/
│   │   │   └── post.model.js  # Post schema
│   │   └── services/
│   │       └── ImageKit.service.js  # Image upload service
│   ├── server.js            # Server entry point
│   └── package.json         # Backend dependencies
│
└── package.json             # Root package configuration
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (local or cloud instance via MongoDB Atlas)
- **ImageKit Account** (free tier available at [imagekit.io](https://imagekit.io))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd application
   ```

2. **Install Backend Dependencies**
   ```bash
   cd Backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../Frontend
   npm install
   ```

### Environment Setup

**Backend (.env)**
Create a `.env` file in the `Backend/` directory:
```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/postcard-gallery
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_endpoint/
```

Get your ImageKit credentials from the [ImageKit Dashboard](https://imagekit.io/dashboard).

## 📝 Available Scripts

### Backend
```bash
cd Backend
node server.js           # Start the server
npx nodemon server.js    # Start with auto-reload (if nodemon is installed)
```

### Frontend
```bash
cd Frontend
npm run dev              # Start dev server (http://localhost:5173)
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint
```

## 🔗 API Endpoints

### Create Post
- **POST** `/create-post`
- **Body:** `FormData` with:
  - `image` (file) - Image file
  - `title` (string) - Post title
  - `caption` (string) - Post description
- **Response:** `{ message: string, post: object }`

### Get All Posts
- **GET** `/posts`
- **Response:** `{ posts: array }`

## 🎨 Usage

1. **Start the Backend**
   ```bash
   cd Backend
   node server.js
   ```
   Server runs on `http://localhost:3000`

2. **Start the Frontend**
   ```bash
   cd Frontend
   npm run dev
   ```
   App runs on `http://localhost:5173`

3. **Create a Post**
   - Navigate to "Create Post"
   - Upload an image
   - Add a title and caption
   - Click "Create Post"

4. **View Posts**
   - Navigate to "View Posts" to see all gallery items

## 🔒 Security & Best Practices

- Image uploads are validated and processed through ImageKit
- MongoDB connection uses connection pooling
- File upload size limited to 10MB
- Input validation on backend
- Environment variables protect sensitive credentials

## 📦 Dependencies at a Glance

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^5.2.1 | Web framework |
| mongoose | ^9.2.4 | MongoDB ODM |
| multer | ^2.1.1 | File uploads |
| @imagekit/nodejs | ^7.3.0 | Image hosting |
| react | ^19.2.0 | UI library |
| vite | ^7.3.1 | Build tool |
| axios | ^1.13.6 | HTTP client |

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Cannot connect to MongoDB | Verify connection string and IP whitelist in MongoDB Atlas |
| Images not uploading | Check ImageKit credentials and URL endpoint |
| Frontend can't reach backend | Ensure backend is running on port 3000 |
| Port already in use | Kill the process or change the port in `server.js` |

## 📚 Learn More

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [ImageKit Documentation](https://docs.imagekit.io)

## 📄 License

ISC License

## 👥 Contributing

Pull requests are welcome! Please follow the existing code style and ensure tests pass.

## 📧 Support

For issues or questions, please open an issue on the repository.

---

**Made with ❤️ for sharing beautiful memories through postcards**
