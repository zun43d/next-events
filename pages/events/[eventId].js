import { useRouter } from 'next/router';
import { getEventById } from '../../dummy-data';
import EventSummery from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';

export default function SelectedEvent() {
	const router = useRouter();
	const id = router.query.eventId;
	const event = getEventById(id);

	if (!event) {
		return (
			<ErrorAlert>
				<p>No event was found!</p>
			</ErrorAlert>
		);
	}

	return (
		<>
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
		</>
	);
}
