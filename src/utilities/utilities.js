import { collection, getDocs, query, where } from "firebase/firestore";
import { useCallback, useState, useEffect } from "react";
import { useAuth } from "./contexts/authContext";
import { db } from "./Firebase";

//  export const getUser = async () => {
//      const [profile, setProfile] = useState(null);
//     const currentUser = useAuth();

//     const profilesRef = collection(db, "profiles");
//     const profileQuery = query(profilesRef, where('loginUid', '==', currentUser.uid));
//     // console.log("profile query", profileQuery);
//     const profileQuerySnapshot = await getDocs(profileQuery);
//     profileQuerySnapshot.forEach((profileFound) => {
//       // console.log("query data", profile.data());
//       setProfile(profileFound.data());
//     });
//   }