# News App Mobile

A mobile application that allows users to search and read news articles using the NewsAPI.

## Tech Stack

- **React Native** - Mobile app framework
- **Expo** - Development platform for React Native
- **NativeWind** - Tailwind CSS for React Native
- **React Query** - Data fetching and state management
- **Moment.js** - Date formatting
- **AsyncStorage** - Local storage for search history

## Features

- Search news articles by keyword
- Pull-to-refresh functionality
- Search history management
- Dark mode support
- Error handling with retry option
- Loading states
- Image support for articles

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Emulator

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd news-app-mobile
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a .env file in the root directory and add your NewsAPI key:

```bash
EXPO_PUBLIC_NEWS_API_KEY=your_api_key_here
```
4. Start the development server:
```bash
npx expo start
```
