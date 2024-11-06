import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-wvBGzlYI9NHjVZBq7wbUHtEWrN3AFI8",
  authDomain: "pasarbarokah-56d6c.firebaseapp.com",
  projectId: "pasarbarokah-56d6c",
  storageBucket: "pasarbarokah-56d6c.appspot.com",
  messagingSenderId: "316348641371",
  appId: "1:316348641371:web:5ad38a561e7d73744acf7e",
  measurementId: "G-NKKFY4X1ZC"
};
// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilDaftarmenu() {
  const refDokumen = collection(db, "menu sawah segar");
  const kueri = query(refDokumen, orderBy("makanan"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      makanan: dok.data().makanan,
      harga: dok.data().harga,
    });
  });



  return hasil;
}

export function formatAngka(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function tambahmenu(makanan, harga,) {
  try {
    const dokRef = await addDoc(collection(db, 'menu sawah segar'), {
      makanan: makanan,
      harga: harga
    });
    console.log('berhasil menembah menu sawah segar ' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah menu sawah segar' + e);
  }
}

export async function hapusmenu(docId) {
  await deleteDoc(doc(db, "menu sawah segar", docId));
}

export async function ubahmenu(docId,makanan, harga,) {
  await updateDoc(doc(db, "menu sawah segar", docId), {
    makanan: makanan,
    harga: harga
  });
}

export async function ambilmenu(docId) {
  const docRef = await doc(db, "menu sawah segar", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}