# ChatMate 💬

<div align="center">


**Real-Time Messaging and Video Call App**

Connect with language partners worldwide through seamless real-time messaging and video calls

[Live Demo](https://chatmate-wfdy.onrender.com/) • [Report Bug](https://github.com/Ankita2629/ChatMate/issues) • [Request Feature](https://github.com/Ankita2629/ChatMate/issues)

</div>

---

## 📋 Table of Contents

- [About The Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

---

## 🌟 About The Project

ChatMate is a powerful full-stack application designed to connect people through seamless real-time messaging and video calls. Built with cutting-edge technologies, ChatMate allows users to engage in secure conversations, send friend requests, and communicate through video chat — all with a modern, responsive UI.

Whether you're learning a language, collaborating on a project, or just connecting with friends, **ChatMate is your all-in-one communication hub**.

### ✨ Key Highlights

- 🔐 **Secure Authentication** - User registration and login with JWT & cookies
- 💬 **Real-Time Messaging** - Instant messaging via Stream Chat API
- 📹 **Video Calls** - Secure video calls with screen sharing & camera control
- 🎥 **Call Recording** - Option to record calls (stream-compatible)
- 🧑‍🤝‍🧑 **Friend System** - Send and accept friend requests
- 🧠 **Smart Matching** - Profile-based language learner matching
- 🌍 **Discovery** - Find users by native & learning language preferences
- 🖼️ **Auto Avatars** - Automatically generated profile avatars
- 🔔 **Notifications** - Real-time notifications and updates
- 📱 **Responsive Design** - Fully responsive modern UI

---

## 🚀 Features

| Feature | Description |
|---------|-------------|
| 👤 **Authentication** | Secure signup, login, and logout using JWT tokens |
| 📩 **Friend System** | Send, receive, and accept friend requests |
| 🔔 **Notifications** | Get notified when you receive requests or messages |
| 🧱 **Discover Page** | Explore other users by language and location |
| 📞 **Video Calls** | One-on-one video calls using Stream Video with room ID routing |
| 🖥️ **Screen Sharing** | Share your screen during video calls (host-enabled) |
| 🎧 **Media Controls** | Easily toggle camera/microphone in calls |
| 🎥 **Call Recording** | Optional feature to record video call sessions |
| 🌐 **Real-Time Chat** | Chat with friends using Stream's secure messaging SDK |
| 🖼️ **Avatar Generation** | Random avatar assigned if no profile picture is uploaded |

---

## 🛠️ Tech Stack

### Frontend
- **React.js** - JavaScript library for building user interfaces
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library for Tailwind CSS
- **Axios** - Promise-based HTTP client
- **React Router DOM** - Declarative routing for React

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **jsonwebtoken** - JWT authentication
- **cookie-parser** - Parse HTTP cookies

### Third-Party Services
- **Stream Chat API** - Real-time messaging infrastructure
- **Stream Video API** - Video calling and streaming

---

## 🎯 Getting Started

Follow these instructions to set up ChatMate locally on your machine.

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (Local installation or MongoDB Atlas account)
- **Stream Account** (for API keys)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Ankita2629/ChatMate.git
cd ChatMate
```

2. **Install Backend Dependencies**

```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**

```bash
cd ../frontend
npm install
```

### Environment Variables

Create a `.env` file in the `backend/` directory and add the following:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
STEAM_API_KEY=your_stream_api_key
STEAM_API_SECRET=your_stream_api_secret
JWT_SECRET_KEY=your_jwt_secret_key
NODE_ENV=development
```

#### Getting Stream API Credentials

1. Visit [Stream.io](https://getstream.io/)
2. Create a free account
3. Create a new app
4. Copy your API Key and Secret from the dashboard

---

## 💻 Usage

### Running the Application Locally

1. **Start the Backend Server**

```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:5001`

2. **Start the Frontend Development Server**

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`

3. **Access the Application**

Open your browser and navigate to `http://localhost:5173`

### Creating Your First Account

1. Click on "Create one" on the login page
2. Fill in your details (name, email, password)
3. Set your native and learning languages
4. Click "Sign Up"
5. You'll be automatically logged in

### Making Friends

1. Navigate to the "Discover" section
2. Browse users with matching language interests
3. Send friend requests
4. Once accepted, start chatting!

### Starting a Video Call

1. Open a chat with a friend
2. Click the video call icon
3. Share the call link with your friend
4. Enjoy your video conversation with screen sharing options

---

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)

#### Vercel
```bash
cd frontend
vercel --prod
```

#### Netlify
```bash
cd frontend
npm run build
# Upload the 'dist' folder to Netlify
```

### Backend Deployment (Render/Railway)

#### Render
1. Connect your GitHub repository
2. Select the `backend` folder
3. Add environment variables
4. Deploy

#### Railway
```bash
cd backend
railway login
railway init
railway up
```

### Database (MongoDB Atlas)

1. Create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Whitelist your IP or allow access from anywhere
3. Create a database user
4. Get your connection string and add it to `.env`

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📧 Contact

**Ankita Kumari Singh**

- GitHub: [@Ankita2629](https://github.com/Ankita2629)
- Project Link: [https://github.com/Ankita2629/ChatMate](https://github.com/Ankita2629/ChatMate)
- Live Demo: [https://chatmate-wfdy.onrender.com/](https://chatmate-wfdy.onrender.com/)

---

## 🙏 Acknowledgments

- [Stream.io](https://getstream.io/) - For their amazing Chat and Video APIs
- [React](https://reactjs.org/) - For the awesome frontend framework
- [Tailwind CSS](https://tailwindcss.com/) - For the utility-first CSS framework
- [DaisyUI](https://daisyui.com/) - For beautiful UI components
- [MongoDB](https://www.mongodb.com/) - For the flexible database solution

---

<div align="center">

**Made with ❤️ by Ankita Kumari Singh**

⭐ Star this repo if you find it helpful!

</div>
