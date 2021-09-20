import Head from 'next/head';

import { getEventById, getAllEvents } from '../../helpers/api-util';
import EventSummery from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';
import Comments from '../../components/input/comments';

export default function SelectedEvent(props) {
	const event = props.selectedEvent;

	if (!event) {
		return (
			<ErrorAlert>
				<p>No event was found!</p>
			</ErrorAlert>
		);
	}

	return (
		<>
			<Head>
				<title>{event.title}</title>
				<meta name="description" content={event.description} />
			</Head>
			<EventSummery title={event.title} />
			<EventLogistics
				date={event.date}
				address={event.location}
				image={event.image}
				imageAlt={event.title}
			/>
			<EventContent>
				<p>{event.description}</p>
			</EventContent>
			<Comments eventId={event.id} />
		</>
	);
}

export async function getStaticProps(context) {
	const eventId = context.params.eventId;
	const event = await getEventById(eventId);

	return {
		props: {
			selectedEvent: event,
		},
		revalidate: 30,
	};
}

export async function getStaticPaths() {
	const events = await getAllEvents();
	const paths = events.map((event) => ({ params: { eventId: event.id } }));

	return {
		paths: paths,
		fallback: 'blocking',
	};
}
