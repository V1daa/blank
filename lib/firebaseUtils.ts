import { db, storage } from "@/firebase/db";
import { deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";


export const getFirebaseStorageUrl = (relativePath: string): string => {
    const baseUrl = `https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o`;
    const encodedPath = encodeURIComponent(relativePath);
    return `${baseUrl}/${encodedPath}?alt=media`;
  };
  
  export const extractFilePathFromUrl = (url: string): string => {
    const decodedUrl = decodeURIComponent(url);
    const path = decodedUrl.split('/o/')[1].split('?alt=media')[0];
    return path;
  };

  export const deleteFileFromStorage = async (url: string): Promise<void> => {
    const filePath = extractFilePathFromUrl(url);
    const fileRef = ref(storage, filePath);
  
    await deleteObject(fileRef);
  };

  export const deleteDocumentFromFirestore = async (collection: string, documentId: string): Promise<void> => {
    const docRef = doc(db, collection, documentId);
    await deleteDoc(docRef);
  };