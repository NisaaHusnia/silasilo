import { ref, get, child, set } from "firebase/database";
import { database } from "./init";

export const getDataRealtime = async (path: string) => {
  try {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, `${path}`));

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const addDataRealtime = async (path: string, data: any) => {
  try {
    const dbRef = ref(database);
    await set(child(dbRef, `${path}`), data);
    return true;
  } catch (error) {
    return false;
  }
};
