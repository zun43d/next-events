import { useState } from 'react';
import classes from './newsletter-registration.module.css';

export default function NewsletterRegistration() {
	const [newsletterInput, setNewsletterInput] = useState('');

	function registrationHandler(event) {
		event.preventDefault();

		const newEmail = {
			email: newsletterInput,
		};

		fetch('/api/newsletter', {
			method: 'POST',
			body: JSON.stringify(newEmail),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => console.log(data.message));
	}

	return (
		<section className={classes.newsletter}>
			<h2>Sign up to stay updated!</h2>
			<form onSubmit={registrationHandler}>
				<div className={classes.control}>
					<input
						type="email"
						id="email"
						placeholder="Your email"
						aria-label="Your email"
						onChange={(e) => setNewsletterInput(e.target.value)}
					/>
					<button>Register</button>
				</div>
			</form>
		</section>
	);
}
