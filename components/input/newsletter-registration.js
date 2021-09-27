import { useState, useContext } from 'react';
import classes from './newsletter-registration.module.css';
import NotificationContext from '../../store/notification-context';

export default function NewsletterRegistration() {
	const [newsletterInput, setNewsletterInput] = useState('');
	const notificationCtx = useContext(NotificationContext);

	function registrationHandler(event) {
		event.preventDefault();

		const newEmail = {
			email: newsletterInput,
		};

		notificationCtx.showNotification({
			title: 'Signing up...',
			message: 'Registering for newsletter.',
			status: 'pending',
		});

		fetch('/api/newsletter', {
			method: 'POST',
			body: JSON.stringify(newEmail),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(async (res) => {
				if (res.ok) {
					return res.json();
				}
				return res.json().then((data) => {
					throw new Error(data?.message || 'Something went wrong!');
				});
			})
			.then((data) => {
				notificationCtx.showNotification({
					title: 'Success',
					message: 'Successfully registered for the newsletter!',
					status: 'success',
				});
			})
			.catch((err) => {
				notificationCtx.showNotification({
					title: 'Error!',
					message: err.message || 'Something went wrong, please try again!',
					status: 'error',
				});
				console.log(err);
			});
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
