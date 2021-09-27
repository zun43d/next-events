import { connectDatabase, insertDocument } from '../../helpers/db-utils';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const userEmail = req.body.email;

		if (!userEmail || !userEmail.includes('@')) {
			res.status(422).json({ message: 'Invalid Email address' });
			return;
		}

		let client;

		try {
			client = await connectDatabase();
		} catch (err) {
			res.status(500).json({ message: 'Connecting to database failed!' });
			return;
		}

		try {
			await insertDocument(client, 'newsletter', {
				email: userEmail,
			});
			client.close();
		} catch (err) {
			res.status(500).json({ message: 'Failed to insert data into database!' });
			return;
		}

		res.status(201).json({ message: 'Signed Up!' });
	} else {
		res.status(200).json({ message: 'Your GET req was succesfull' });
	}
}
