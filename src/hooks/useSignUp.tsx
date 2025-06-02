import { useState } from 'react';
import { ref, set, get, child, push } from "firebase/database";
import { database } from "../firebase/firebase";
import { useNotification } from '../components/dashboard/NotificationContext';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  company: string;
  role: string;
}

const useSignup = () => {
  const [loading, setLoading] = useState(false);
 const { showNotification } = useNotification();
  const handleSignup = async (formData: FormData, navigate: (path: string) => void) => {
    setLoading(true);

    try {
      const { firstName, lastName, email, password, confirmPassword, company, role } = formData;

      // Validation
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match!");
        
      }

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        throw new Error("Invalid email address!");
      }

      const nameRegex = /^[A-Za-z\s]+$/;
      if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
        throw new Error("First and Last names can only contain letters and spaces!");
      }

      if (!company || !nameRegex.test(company)) {
        throw new Error("Company name is required and must contain only letters and spaces!");
      }

      // Check if email already exists
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, 'crm_table'));

      if (snapshot.exists()) {
        const users = snapshot.val();
        interface User {
          email: string;
          [key: string]: unknown;
        }
        const userExists = Object.values(users).some(
          (user) => (user as User).email.toLowerCase() === email.toLowerCase()
        );
        if (userExists) {
          throw new Error("Email already exists!");
        }
      }

      // Create user object
      const newUser = {
        firstName,
        lastName,
        email,
        password,
        company,
        role,
        createdAt: new Date().toISOString(),
      };

      // Save user to database
      const newUserRef = push(ref(database, 'crm_table'));
      await set(newUserRef, newUser);
      localStorage.setItem("userId", newUserRef.key || "");

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error: unknown) {
      if (error instanceof Error) {
        showNotification({ type: 'error', message: error.message || "Signup failed" });
        console.error("Signup error:", error);
      } else {
        showNotification({ type: 'error', message: "An unexpected error occurred during signup." });
        console.error("Signup error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return { handleSignup, loading };
};

export default useSignup;
