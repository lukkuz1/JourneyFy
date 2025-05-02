// __tests__/firebaseUserService.test.js

import { Alert } from 'react-native';
import {
  fetchUserProfile,
  initializeUserProfile,
  updateProfileInFirestore,
} from '../../src/services/firebaseUserService';

import firebaseServices from '../../src/services/firebase';
import * as firestore from 'firebase/firestore';

jest.mock('firebase/firestore');
jest.spyOn(Alert, 'alert').mockImplementation(() => {});

describe("firebaseUserService", () => {
  const userId = 'user123';
  const userRef = ['db', 'users', userId];

  beforeEach(() => {
    jest.clearAllMocks();
    firestore.doc.mockImplementation((db, col, id) => [db, col, id]);
  });

  describe("fetchUserProfile", () => {
    it("calls populateUserData if document exists", async () => {
      const fakeData = { firstName: 'Alice' };
      firestore.getDoc.mockResolvedValue({ exists: () => true, data: () => fakeData });

      const populate = jest.fn();
      const init = jest.fn();

      await fetchUserProfile(userId, populate, init);

      expect(firestore.getDoc).toHaveBeenCalledWith(userRef);
      expect(populate).toHaveBeenCalledWith(fakeData);
      expect(init).not.toHaveBeenCalled();
    });

    it("calls initializeUserProfile if no document", async () => {
      firestore.getDoc.mockResolvedValue({ exists: () => false });

      const populate = jest.fn();
      const init = jest.fn();

      await fetchUserProfile(userId, populate, init);

      expect(firestore.getDoc).toHaveBeenCalledWith(userRef);
      expect(init).toHaveBeenCalledWith(userRef);
      expect(populate).not.toHaveBeenCalled();
    });

    it("silently catches errors", async () => {
      firestore.getDoc.mockRejectedValue(new Error("fail"));
      await expect(fetchUserProfile(userId, () => {}, () => {})).resolves.toBeUndefined();
    });
  });

  describe("initializeUserProfile", () => {
    it("sets a new document with empty fields", async () => {
      await initializeUserProfile(userRef);
      expect(firestore.setDoc).toHaveBeenCalledWith(userRef, {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        dateOfBirth: null,
      });
    });
  });

  describe("updateProfileInFirestore", () => {
    const profileData = { firstName: 'Bob' };
    it("creates document if none exists", async () => {
      firestore.getDoc.mockResolvedValue({ exists: () => false });
      await updateProfileInFirestore(userId, profileData);
      expect(firestore.setDoc).toHaveBeenCalledWith(userRef, profileData);
      expect(firestore.updateDoc).not.toHaveBeenCalled();
    });

    it("updates existing document", async () => {
      firestore.getDoc.mockResolvedValue({ exists: () => true });
      await updateProfileInFirestore(userId, profileData);
      expect(firestore.updateDoc).toHaveBeenCalledWith(userRef, profileData);
      expect(firestore.setDoc).not.toHaveBeenCalled();
    });
  });
});
