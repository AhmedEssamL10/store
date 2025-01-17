import { db } from "../Config";
import {
  getDocs,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
// Get a list of cities from your database
async function getCities() {
  const citiesCol = collection(db, "products");
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return cityList;
}

async function editCity(city) {
  console.log("at editCity", city);
  await setDoc(doc(db, "products", city.id), city);
}

async function deleteCity(city) {
  try {
    await deleteDoc(doc(db, "products", city));
    console.log("Document deleted with ID: ", city);
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
}

async function addCity(city) {
  try {
    const docRef = await addDoc(collection(db, "products"), city);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

function subscribe(callback) {
  const unsubscribe = onSnapshot(
    query(collection(db, "products")),
    (snapshot) => {
      const source = snapshot.metadata.hasPendingWrites ? "Local" : "Server";
      snapshot.docChanges().forEach((change) => {
        // console.log("changes", change, snapshot.metadata);
        if (callback) callback({ change, snapshot });
      });
      // console.log(source, " data: ", snapshot.data());
    }
  );
  return unsubscribe;
}

export { getCities, addCity, editCity, deleteCity, subscribe };
