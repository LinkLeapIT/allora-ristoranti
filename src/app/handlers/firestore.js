import { setDoc, doc, serverTimestamp, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase.config';

const Firestore = {
    readDocs: (collection_name) => {
        let docs = [];
        const ref = collection(db, collection_name);
        return new Promise(async resolve => {
            try {
                const snapshots = await getDocs(ref);
                snapshots.forEach(doc => {
                    const d = { ...doc.data(), id: doc.id };
                    docs.push(d);
                });
                resolve(docs);
            } catch (e) {
                console.error('Error reading documents:', e);
                resolve([]);
            }
        });
    },
    writeDoc: (inputs, collection_name) => {
        return new Promise(async resolve => {
            const randomIndex = Math.floor(Math.random() * 1000000000).toString();
            try {
                const docRef = doc(db, collection_name, randomIndex);
                await setDoc(docRef, {
                    title: inputs.title,
                    path: inputs.path,
                    description: inputs.description,
                    withoutOptions: inputs.withoutOptions,
                    extraIngredients: inputs.extraIngredients,
                    sizes: inputs.sizes,
                    quantity: inputs.quantity,
                    createdAt: serverTimestamp()
                });
                resolve('New doc successfully inserted');
            } catch (e) {
                console.error('Error writing document:', e);
                resolve('Error writing document');
            }
        });
    }
}

export default Firestore;
