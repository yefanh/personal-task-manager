# Personal Task Manager (Expo + React Native + TypeScript)

A simple personal task manager mobile app built with **Expo**, **React Native**, **TypeScript**, and **Expo Router**.

## Features (assignment)

- Task list with mock data (title, description, status)
- Add new tasks (updates local state)
- Edit tasks (title + description)
- Delete tasks
- Toggle status (pending/completed)
- Task details screen (via Expo Router navigation)
- Search by title (optional)

## Requirements

- Node.js (already installed)
- Xcode (for iOS Simulator) and/or Android Studio (for Android Emulator), or a physical device
- Expo Go app (optional, for running on a phone)

## Setup

```bash
cd personal-task-manager
npm install
```

## Run

```bash
npm run ios
# or
npm run android
# or
npm run web
```

## Project Structure (high level)

- `app/` — Expo Router screens
- `components/` — reusable UI components
- `constants/` — app constants

## Notes

This project intentionally uses **hard-coded mock data** and **React hooks** (no Redux, no backend) to match the take-home requirements.
