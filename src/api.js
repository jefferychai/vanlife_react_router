import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
  limit,
  addDoc,
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyCEWFsHpsaQYffS1VisQH1meMI9yXo-3TA",
  authDomain: "vanlife-ae493.firebaseapp.com",
  projectId: "vanlife-ae493",
  storageBucket: "vanlife-ae493.appspot.com",
  messagingSenderId: "750178459404",
  appId: "1:750178459404:web:a5cb58e2bbf13419b5b329",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const vansCollectionRef = collection(db, "vans");
const userCollectionRef = collection(db, "user");

export async function getVans() {
  try {
    const querySnapshot = await getDocs(vansCollectionRef);

    if (querySnapshot.empty) {
      throw new Error("Vans not found");
    }

    const vansData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return vansData;
  } catch (err) {
    throw new Error(err.message || "Error fetching vans");
  }
}

export async function getVan(id) {
  try {
    const docRef = doc(db, "vans", id);
    const vanSnapshot = await getDoc(docRef);

    if (!vanSnapshot.exists()) {
      throw new Error("Van details not found");
    }

    return {
      ...vanSnapshot.data(),
      id: vanSnapshot.id,
    };
  } catch (err) {
    throw new Error(err.message || "Error fetching van details");
  }
}

export async function getHostVans() {
  try {
    const q = query(vansCollectionRef, where("hostId", "==", "123"));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("Vans not found");
    }

    const hostVansData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return hostVansData;
  } catch (err) {
    throw new Error(err.message || "Error fetching vans");
  }
}

export async function loginUser(creds) {
  const { email, password } = creds;

  if (!(email && password)) {
    throw new Error("Please enter all the details");
  }

  const q = query(userCollectionRef, where("email", "==", email), limit(1));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    throw new Error("Email not registered");
  }

  const user = {
    id: querySnapshot.docs[0].id,
    ...querySnapshot.docs[0].data(),
  };

  if (password !== user.password) {
    throw new Error("Incorrect password");
  }

  user.password = undefined;

  return {
    message: "Login successful",
    user,
  };
}

export async function signupUser(creds) {
  const { name, email, password, confirmPassword } = creds;

  if (!(name, email, password, confirmPassword)) {
    throw new Error("Please enter all the details");
  }

  if (password !== confirmPassword) {
    throw new Error("Password and confirmed passowrd don't match");
  }

  if (password.length < 6) {
    throw new Error("Password must be atleast 6 characters long");
  }

  const q = query(userCollectionRef, where("email", "==", email), limit(1));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    throw new Error("Email already registered");
  }

  const docRef = await addDoc(userCollectionRef, { name, email, password });
  const userSnapshot = await getDoc(docRef);
  const user = { ...userSnapshot.data(), id: userSnapshot.id };

  user.password = undefined;

  return {
    message: "Signup successful",
    user,
  };
}
