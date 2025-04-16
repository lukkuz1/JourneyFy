# JourneyFy
![JourneyFy](./assets/app_color_icon.png)

Journey booking app to plan and complete your journeys



## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Introduction
JourneyFy is a mobile application designed to help users plan, book, and complete journeys. Whether you are traveling for leisure or business, JourneyFy allows you to create journeys that other users can join, making your travel planning social and interactive. Same as BlaBlaCar.

## Features
- Create and manage journeys
- Join journeys created by other users
- View journey details and itinerary
- Chat with journey participants
- Receive notifications for journey updates
- User authentication and profile management


## Environment Variables

Before running the app, create a `.env` file in the project root and add the following environment variables:

```bash
FIREBASE_API_KEY=AIzaSyAcN-kGs1M22h3qiCNByFqmqEBr_trftqE
FIREBASE_AUTH_DOMAIN=journeyfy-a90b4.firebaseapp.com
FIREBASE_DATABASE_URL=https://journeyfy-a90b4-default-rtdb.europe-west1.firebasedatabase.app
FIREBASE_PROJECT_ID=journeyfy-a90b4
FIREBASE_STORAGE_BUCKET=journeyfy-a90b4.appspot.com
FIREBASE_MESSAGING_SENDER_ID=1075210035793
FIREBASE_APP_ID=1:1075210035793:web:353fa19466ab353476ce70
FIREBASE_MEASUREMENT_ID=G-3VKT0EZKKJ
SECONDARY_API_KEY=AIzaSyA4i52VuHKrwu3mhPbECdltqmCFi07sy_A (Google Maps API KEY)
```

## Installation
To get started with JourneyFy, follow these steps:

1. Clone the repository:
git clone https://github.com/yourusername/journeyfy.git

2. Navigate to the project directory:
cd journeyfy

3. Install the dependencies:
npm install

4. Run the app on your emulator or device:
npx react-native run-android
# or
npx react-native run-ios

## Usage
- **Create a Journey**: Navigate to the "Create Journey" section, fill in the journey details, and publish it.
- **Join a Journey**: Browse available journeys and join any that interest you.
- **View Journey Details**: Check the details and itinerary of your journeys.
- **Chat with Participants**: Use the in-app chat feature to communicate with other journey participants.
- **Receive Notifications**: Stay updated with notifications about journey changes and updates.

## Technologies Used
- **React Native**: For building the mobile application.
- **Firebase**: For backend services including authentication, real-time database, and notifications.

## Contributing
We welcome contributions to JourneyFy! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
