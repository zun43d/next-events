import {
	connectDatabase,
	getAllDocuments,
	insertDocument,
} from '../../../helpers/db-utils';

export default async function handler(req, res) {
	const eventId = req.query.eventId;

	let client;

	try {
		client = await connectDatabase();
	} catch (err) {
		res.status(500).json({ message: 'Connetion to database failed!' });
		return;
	}

	if (req.method === 'POST') {
		const { email, name, text } = req.body;

		if (
			!email.includes('@') ||
			!name ||
			name.trim() === '' ||
			!text ||
			text.trim() === ''
		) {
			res.status(422).json({ message: 'Invalid input!' });
			client.close();
			return;
		}

		const newComment = {
			email,
			name,
			text,
			eventId,
		};

		let result;

		try {
			result = insertDocument(client, 'comments', newComment);
			newComment._id = result.insertedId;

			res.status(201).json({ message: 'Added comment. ', comment: newComment });
		} catch (err) {
			res.status(500).json({ message: 'Inserting comment failed!' });
			return;
		}
	}

	if (req.method === 'GET') {
		try {
			const comments = await getAllDocuments(client, 'comments', { _id: -1 });
			res.status(200).json({ comments });
		} catch (err) {
			res.status(500).json({ message: 'Unable to fetch comments!' });
		}
	}

	client.close();
}
