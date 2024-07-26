# JourneyFy

Journey booking app to plan and complete your journeys

![JourneyFy](./assets/journeyfy_logo.png)

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Introduction
JourneyFy is a mobile application designed to help users plan, book, and complete journeys. Whether you are traveling for leisure or business, JourneyFy allows you to create journeys that other users can join, making your travel planning social and interactive.

## Features
- Create and manage journeys
- Join journeys created by other users
- View journey details and itinerary
- Chat with journey participants
- Receive notifications for journey updates
- User authentication and profile management

## Installation
To get started with JourneyFy, follow these steps:

1. Clone the repository:
git clone https://github.com/yourusername/journeyfy.git

2. Navigate to the project directory:
cd journeyfy

3. Install the dependencies:
npm install

4. Set up Firebase:
- Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
- Add an Android and/or iOS app to your Firebase project.
- Download the `google-services.json` (for Android) or `GoogleService-Info.plist` (for iOS) file and place it in the appropriate directory of your React Native project.
- Update the Firebase configuration in your project.

5. Run the app on your emulator or device:
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
