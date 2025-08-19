# Online Code Editor

A modern, feature-rich online code editor built with Next.js, React, and Material-UI. Write, edit, and preview HTML, CSS, and JavaScript code in real-time with a beautiful and intuitive interface.

## ✨ Features

### 🎨 **Modern UI Design**
- **Dark/Light Theme Toggle** - Switch between themes for comfortable coding
- **Responsive Layout** - Works seamlessly on desktop and mobile devices
- **Material Design** - Beautiful Material-UI components throughout
- **Gradient Accents** - Modern gradient color scheme for visual appeal

### 📁 **File Management System**
- **Multi-file Support** - Create, edit, and manage multiple files
- **File Types** - Support for HTML, CSS, and JavaScript files
- **File Operations** - Create, rename, delete, and save files
- **File Explorer Sidebar** - Organized file management with visual indicators

### 💻 **Enhanced Code Editor**
- **Tabbed Interface** - Switch between HTML, CSS, and JavaScript with tabs
- **CodeMirror Integration** - Professional code editing with syntax highlighting
- **Advanced Features**:
  - Line numbers and line wrapping
  - Code folding and bracket matching
  - Auto-close tags and brackets
  - Customizable font size
  - Multiple themes (Material, Dracula, Monokai, Solarized)

### 🔍 **Live Preview**
- **Real-time Updates** - See changes instantly as you type
- **Interactive Controls** - Refresh, fullscreen, and open in new tab
- **Responsive Preview** - Test your code across different screen sizes
- **Enhanced Sandbox** - Secure iframe with expanded permissions

### 📊 **Console Output**
- **JavaScript Console** - Capture and display console.log, console.error, and console.warn
- **Advanced Filtering** - Filter by log level (log, warn, error)
- **Search Functionality** - Search through console output
- **Real-time Updates** - Live console output as code runs
- **Message Counters** - Track different types of console messages

### 📚 **Code Snippets Library**
- **Pre-built Examples** - Ready-to-use code snippets
- **Responsive Card** - Complete card component with styling
- **Animated Button** - CSS animation examples
- **Todo List** - Interactive JavaScript functionality
- **One-click Apply** - Apply snippets directly to your editor

### 🛠️ **Developer Tools**
- **Export Options** - Download code as separate HTML, CSS, and JS files
- **Share Functionality** - Generate shareable links for your code
- **Settings Panel** - Customize font size and editor preferences
- **Keyboard Shortcuts** - Enhanced editing with keyboard navigation

### 📱 **Responsive Design**
- **Mobile-First Approach** - Optimized for all screen sizes
- **Adaptive Layout** - Panels adjust based on available space
- **Touch-Friendly** - Optimized for touch devices
- **Cross-Platform** - Works on Windows, macOS, Linux, and mobile

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd online-code-editor
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Basic Code Editing
1. **Select a file** from the file manager sidebar
2. **Write your code** in the appropriate tab (HTML, CSS, or JavaScript)
3. **See live preview** in the right panel
4. **Check console output** for JavaScript logs and errors

### File Management
- **Create new files** using the "New File" button
- **Rename files** by clicking the edit icon
- **Delete files** (minimum 1 file required)
- **Switch between files** by clicking on them in the sidebar

### Code Snippets
1. **Open snippets** using the code icon in the toolbar
2. **Browse available snippets** in the dialog
3. **Apply snippets** with one click
4. **Customize** the applied code as needed

### Exporting and Sharing
- **Export code** as separate files using the Export button
- **Share code** by copying the generated share link
- **Download files** individually or as a complete project

## 🏗️ Architecture

### Components Structure
```
components/
├── CodeEditor.js      # Main code editing interface
├── LivePreview.js     # Live preview iframe
├── FileManager.js     # File management sidebar
└── Console.js         # Console output display

src/app/
├── page.js           # Main application page
├── layout.js         # App layout wrapper
└── globals.css       # Global styles
```

### Key Technologies
- **Next.js 15** - React framework with App Router
- **React 18** - Modern React with hooks
- **Material-UI** - Component library for consistent design
- **CodeMirror 5** - Professional code editor
- **Emotion** - CSS-in-JS styling solution

## 🎨 Customization

### Themes
The editor supports both dark and light themes with customizable color schemes.

### Font Sizes
Adjust editor font size from 10px to 24px through the settings panel.

### CodeMirror Themes
Multiple built-in themes available:
- Material (default)
- Dracula
- Monokai
- Solarized

## 🔧 Configuration

### Environment Variables
No environment variables required for basic functionality.

### Build Configuration
- **Next.js Config** - Optimized for production builds
- **ESLint** - Code quality and consistency
- **TypeScript Ready** - Can be easily converted to TypeScript

## 📱 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **CodeMirror** for the excellent code editing experience
- **Material-UI** for the beautiful component library
- **Next.js** for the robust React framework
- **React** for the amazing user interface library

---

**Happy Coding! 🎉**

Built with ❤️ using modern web technologies.
