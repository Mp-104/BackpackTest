import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from "./Firebase";

const currentUser = () => {

    const [user, setUser] = useState<any>(null);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth , currentUser => {
            if(currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
            }
        })

        return () => unsubscribe();
    }, [])

    return user;

}

export default currentUser;