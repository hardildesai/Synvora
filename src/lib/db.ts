'use server';

import { db } from './firebase';
import { collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';

export interface Registration {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  foodType: string;
  passType: string;
  transactionId: string;
  paymentScreenshotDataUri: string; // In a real app, this should be a URL to a storage bucket
  eventCode: string;
  submittedAt: Timestamp;
}

export interface RegistrationData extends Omit<Registration, 'id' | 'submittedAt'> {}

// Save a new registration to Firestore
export async function saveRegistration(data: RegistrationData) {
  try {
    const registrationsCol = collection(db, 'registrations');
    const docRef = await addDoc(registrationsCol, {
      ...data,
      submittedAt: Timestamp.now(),
    });
    console.log('New registration saved with ID:', docRef.id);
    return { id: docRef.id, ...data };
  } catch (error) {
    console.error('Error saving registration to Firestore:', error);
    throw new Error('Could not save registration.');
  }
}

// Get all registrations from Firestore
export async function getRegistrations(): Promise<Registration[]> {
  try {
    const registrationsCol = collection(db, 'registrations');
    const q = query(registrationsCol, orderBy('submittedAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const registrations = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
      } as Registration;
    });

    return registrations;
  } catch (error) {
    console.error('Error fetching registrations from Firestore:', error);
    return [];
  }
}
