// __tests__/firebaseServices.test.js

// Mock environment variables
jest.mock('@env', () => ({
    FIREBASE_API_KEY: 'APIKEY',
    FIREBASE_AUTH_DOMAIN: 'AUTH_DOMAIN',
    FIREBASE_DATABASE_URL: 'DB_URL',
    FIREBASE_PROJECT_ID: 'PROJECT_ID',
    FIREBASE_STORAGE_BUCKET: 'STORAGE_BUCKET',
    FIREBASE_MESSAGING_SENDER_ID: 'MSG_SENDER',
    FIREBASE_APP_ID: 'APP_ID',
    FIREBASE_MEASUREMENT_ID: 'MEAS_ID',
    SECONDARY_API_KEY: 'SECONDARY_KEY',
  }));
  
  // Mock all Firebase modules
  jest.mock('firebase/app', () => ({
    initializeApp: jest.fn((cfg) => ({ _initialized: true, cfg })),
  }));
  jest.mock('firebase/auth', () => ({
    initializeAuth: jest.fn((app, opts) => ({ _auth: true, app, opts })),
    getReactNativePersistence: jest.fn(() => 'RN_PERSIST'),
  }));
  jest.mock('firebase/firestore', () => ({
    getFirestore: jest.fn((app) => ({ _db: true, app })),
  }));
  jest.mock('firebase/database', () => ({
    getDatabase: jest.fn((app) => ({ _rtdb: true, app })),
  }));
  jest.mock('@react-native-async-storage/async-storage', () => ({
    __esModule: true,
    default: { /* stub AsyncStorage */ },
  }));
  
  import { initializeApp } from 'firebase/app';
  import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
  import { getFirestore } from 'firebase/firestore';
  import { getDatabase } from 'firebase/database';
  import asyncStorage from '@react-native-async-storage/async-storage';
  
  import firebaseServices, { app, db, rtdb } from '../../src/services/firebase';
  
  describe("Firebase service initialization", () => {
    it("calls initializeApp with the env config", () => {
      expect(initializeApp).toHaveBeenCalledWith({
        apiKey: 'APIKEY',
        authDomain: 'AUTH_DOMAIN',
        databaseURL: 'DB_URL',
        projectId: 'PROJECT_ID',
        storageBucket: 'STORAGE_BUCKET',
        messagingSenderId: 'MSG_SENDER',
        appId: 'APP_ID',
        measurementId: 'MEAS_ID',
      });
      // The named export `app` is the return value of initializeApp
      expect(app).toEqual({ _initialized: true, cfg: expect.any(Object) });
    });
  
    it("initializes auth with React Native persistence", () => {
      expect(getReactNativePersistence).toHaveBeenCalledWith(asyncStorage);
      expect(initializeAuth).toHaveBeenCalledWith(app, {
        persistence: 'RN_PERSIST',
      });
      // default export contains auth
      expect(firebaseServices.auth).toEqual({ _auth: true, app, opts: { persistence: 'RN_PERSIST' } });
    });
  
    it("initializes Firestore and RTDB", () => {
      expect(getFirestore).toHaveBeenCalledWith(app);
      expect(db).toEqual({ _db: true, app });
      expect(firebaseServices.db).toBe(db);
  
      expect(getDatabase).toHaveBeenCalledWith(app);
      expect(rtdb).toEqual({ _rtdb: true, app });
      expect(firebaseServices.rtdb).toBe(rtdb);
    });
  });
  