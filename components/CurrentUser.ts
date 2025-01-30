import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, getDoc, doc } from 'firebase/firestore/lite';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth, db } from "./Firebase";


interface User {
    uid: string,
    email: string
}

const currentUser = () => {

    const [user, setUser] = useState<any>(null);
    const [userData, setUserData] = useState<any>(null);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth , async (currentUser) => {
            if(currentUser) {
                setUser(currentUser);

                try {
                    const userDoc = await getDoc(doc(db, "users", currentUser.uid));
                    
                    if(userDoc.exists()) {
                        setUserData(userDoc.data())
                    }
                } catch (error) {
                    console.error("error fetching user data: ", error)
                }
            } else {
                setUser(null);
                setUserData(null);
            }
        })

        return () => unsubscribe();
    }, [user])

    return {user, userData} ;

}


export default currentUser;