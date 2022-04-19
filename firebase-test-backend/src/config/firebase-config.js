// import admin from 'firebase-admin';
// // import serviceAccount from './serviceAccount.json';

// // admin.initializeApp({
// // 	credential: admin.credential.cert(serviceAccount)
// // });

// export default admin;

import admin from 'firebase-admin';

admin.initializeApp({
	credential: admin.credential.cert(JSON.parse(process.env.serviceAccountKey))
});

export default admin;
