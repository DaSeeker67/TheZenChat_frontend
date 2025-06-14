#🧘 Zen Chat Frontend

#images

![Screenshot 2025-06-07 014004](https://github.com/user-attachments/assets/3bf092ae-69be-430d-af56-593b62101c8e)
![Screenshot 2025-06-07 014112](https://github.com/user-attachments/assets/d7d6212a-bc62-4b21-b1d6-fd36eb22d2b8)
![Screenshot 2025-06-07 014313](https://github.com/user-attachments/assets/0e94ddae-074d-4754-87a8-82904baef52d)

A modern, minimalist chat application frontend that brings peace and clarity to your conversations. Built with a focus on user experience and clean design principles.


## The project is still under development so there are many features we are still working on 
## 🌟 Features

- **Real-time Messaging**: Instant message delivery and reception
- **Clean UI/UX**: Minimalist design inspired by zen philosophy
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **User Authentication**: Secure login and registration system
- **Chat Rooms**: Create and join different private chat rooms
- **Message History**: Persistent chat history/ which vanishes after you leave as no message is stored in database
- **Online Status**: See who's currently online
- **Typing Indicators**: Real-time typing status
- **Emoji Support**: Express yourself with emojis

## 🚀 Live Demo

Check out the live application: [Zen Chat](https://the-zen-chat-frontend-63xo.vercel.app/)

## 🛠️ Tech Stack

- **Frontend Framework**: React.js
- **Styling**: Tailwind CSS
- **State Management**: Context API / Redux
- **Real-time Communication**: websockets
- **HTTP Client**: Axios
- **Routing**: React Router
- **Build Tool**: Vite 
- **Deployment**: Vercel

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v14.0.0 or higher)
- npm or yarn package manager
- Git

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/DaSeeker67/TheZenChat_frontend.git
   cd TheZenChat_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:3000` to view the application.

## 📁 Project Structure

```
zen-chat-frontend/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Chat/
│   │   ├── Auth/
│   │   ├── UI/
│   │   └── Common/
│   ├── pages/
│   │   ├── Home/
│   │   ├── Login/
│   │   └── Register/
│   ├── hooks/
│   ├── context/
│   ├── services/
│   ├── utils/
│   ├── styles/
│   ├── App.js
│   └── index.js
├── package.json
├── README.md
└── .env
```

## 🎨 Key Components

### Authentication
- Login/Register forms with validation
- JWT token management
- Protected routes

### Chat Interface
- Message input with emoji picker
- Message bubbles with timestamps
- User list sidebar
- Chat room selection

### Real-time Features
- WebSocket connection management
- Live message updates
- Typing indicators
- Online/offline status

## 🔗 API Integration

This frontend connects to a backend API for:
- User authentication
- Message storage and retrieval
- User management
- Chat room management

Make sure your backend server is running and properly configured.

## 🚀 Build & Deployment

### Build for Production
```bash
npm run build
# or
yarn build
```

## 🎯 Usage

1. **Register/Login**: Create an account or sign in with existing credentials
2. **Join Rooms**: Browse and join available chat rooms
3. **Start Chatting**: Send messages in real-time

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Development Guidelines

- Follow React best practices
- Use meaningful component and variable names
- Write clean, readable code
- Add comments for complex logic
- Ensure responsive design
- Test across different browsers

## 🐛 Known Issues

- List any known bugs or limitations
- Provide workarounds if available

## 🔮 Roadmap

- [ ] File sharing capabilities
- [ ] Voice messages
- [ ] Video chat integration
- [ ] Message reactions
- [ ] Advanced search functionality
- [ ] Push notifications
- [ ] Multi-language support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**DaSeeker67**
- GitHub: [@DaSeeker67](https://github.com/DaSeeker67)
- Project Link: [TheZenChat_frontend](https://github.com/DaSeeker67/TheZenChat_frontend/)

## 🙏 Acknowledgments

- Thanks to all contributors who helped build this project
- Inspired by modern chat applications and zen design principles
- Built with ❤️ for the developer community

## 📞 Support

If you have any questions or need help with setup, please:
- Open an issue on GitHub
- Check the documentation
- Contact the maintainer

---

*May your conversations be as peaceful as a zen garden* 🌸
