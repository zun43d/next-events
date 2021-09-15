import { useRouter } from 'next/router';
import EventList from '../../components/events/event-list';
import { getAllEvents } from '../../helpers/api-util';
import EventSearch from '../../components/events/event-search';

export default function Events(props) {
	const router = useRouter();
	const { events } = props;

	const findEventsHandler = (year, month) => {
		const fullPath = `/events/${year}/${month}`;

		router.push(fullPath);
	};

	return (
		<>
			<EventSearch onSearch={findEventsHandler} />
			<EventList items={events} />
		</>
	);
}

export async function getStaticProps() {
	const events = await getAllEvents();

	return {
		props: {
			events,
		},
		revalidate: 60,
	};
}
