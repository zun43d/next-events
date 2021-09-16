import Head from 'next/head';

import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/event-list';

export default function Home(props) {
	return (
		<div>
			<Head>
				<title>NextEvents</title>
				<meta name="description" content="Find the worlds best events here!" />
			</Head>
			<EventList items={props.events} />
		</div>
	);
}

export async function getStaticProps() {
	const featuredEvents = await getFeaturedEvents();

	return {
		props: {
			events: featuredEvents,
		},
		revalidate: 1800,
	};
}
