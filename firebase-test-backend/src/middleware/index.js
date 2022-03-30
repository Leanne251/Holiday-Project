import admin from '../config/firebase-config.js';

async function firebaseAuth(req, res, next) {
	if (req.headers.authorization) {
		const token = req.headers.authorization.split(' ')[1];
		try {
			const decodedToken = await admin.auth().verifyIdToken(token);
			if (decodedToken) {
				req.user = decodedToken;
				return next();
			}

			return res.json({ message: 'Unauthorized' });
		} catch (e) {
			return res.json({ message: 'Internal Error', error: e });
		}
	} else {
		return res.json({ message: 'Request contains no authorization header' });
	}
}

export default firebaseAuth;
