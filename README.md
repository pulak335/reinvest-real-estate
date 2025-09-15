# Real Estate Investment Management Application

A modern, responsive web application built with Next.js for managing real estate investments. This application provides tools for property analysis, portfolio management, and investment tracking.

## 🚀 Features

- **Property Management**: Add, edit, and manage real estate properties
- **Investment Analytics**: Track ROI, cap rates, and cash flow
- **Market Data**: View market trends and city-specific metrics
- **Portfolio Overview**: Comprehensive dashboard for investment portfolio
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **State Management**: Redux Toolkit for efficient state management

## 🛠️ Technology Stack

- **Frontend**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Language**: JavaScript (ES6+)
- **Package Manager**: npm

## 📁 Project Structure

```
real-estate-investment/
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # Reusable React components
│   ├── hooks/              # Custom React hooks
│   ├── store/              # Redux store and slices
│   │   └── slices/         # Redux slices
│   ├── styles/             # Additional CSS files
│   └── utils/              # Utility functions
├── data/                   # Dummy JSON data
├── public/                 # Static assets
├── .env.local             # Environment variables
├── .env.example           # Environment variables example
└── package.json           # Dependencies and scripts
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd real-estate-investment
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```
Edit `.env.local` with your specific configuration.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📊 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🗂️ Data Structure

The application uses dummy JSON data located in the `data/` folder:

- `properties.json` - Property listings with investment metrics
- `market-data.json` - Market analytics and trends

## 🔧 Configuration

### Environment Variables

Key environment variables (see `.env.example`):

- `NEXT_PUBLIC_APP_NAME` - Application name
- `NEXT_PUBLIC_API_URL` - API base URL
- `NEXT_PUBLIC_MAX_FILE_SIZE` - Maximum file upload size

### Redux Store

The application uses Redux Toolkit for state management:

- **Properties Slice**: Manages property data and operations
- **Store Configuration**: Located in `src/store/index.js`

## 🎨 Styling Guidelines

- **Framework**: Tailwind CSS for utility-first styling
- **Components**: PascalCase naming (e.g., `PropertyCard.js`)
- **Files/Folders**: kebab-case naming (e.g., `property-list/`)
- **Functions/Hooks**: camelCase naming (e.g., `usePropertyData`)

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy automatically on push to main branch

### Other Platforms

```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 Development Guidelines

- Follow the established folder structure
- Use Redux Toolkit for state management
- Keep components modular and reusable
- Write clean, documented code
- Test before committing
- Use meaningful commit messages

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the repository.

---

**Built with ❤️ using Next.js and modern web technologies**
