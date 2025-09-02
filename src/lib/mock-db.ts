'use server';

// In a real application, this would be a database like Firestore.
// For this demo, we'll use an in-memory array to store data.
// This data will be reset every time the server restarts.

export interface Registration {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  foodType: string;
  passType: string;
  transactionId: string;
  paymentScreenshotDataUri: string;
  eventCode: string;
  submittedAt: Date;
}

const registrations: Registration[] = [];

// Simulate a database write
export async function saveRegistration(data: Omit<Registration, 'id' | 'submittedAt'>) {
  const newRegistration: Registration = {
    ...data,
    id: (registrations.length + 1).toString(),
    submittedAt: new Date(),
  };
  registrations.push(newRegistration);
  console.log('New registration saved:', newRegistration);
  return newRegistration;
}

// Simulate a database read
export async function getRegistrations() {
  // Return a sorted copy
  return [...registrations].sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime());
}
