import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../dummy-data';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

export default function FilteredEvents() {
	const router = useRouter();

	const filterData = router.query.slug;

	if (!filterData) {
		return <p className="center">Loading...</p>;
	}

	const filteredYear = +filterData[0];
	const filteredMonth = +filterData[1];

	if (
		isNaN(filteredYear) ||
		isNaN(filteredMonth) ||
		filteredYear < 2021 ||
		filteredYear > 2030 ||
		filteredMonth < 1 ||
		filteredMonth > 12
	) {
		return (
			<>
				<ErrorAlert>
					<p className="center">Invalid filter. Please adjust your values!</p>
				</ErrorAlert>
				<div className="center">
					<Button link="/events">Show all events</Button>
				</div>
			</>
		);
	}

	const filteredEvents = getFilteredEvents({
		year: filteredYear,
		month: filteredMonth,
	});

	if (!filteredEvents || filteredEvents.length === 0) {
		return (
			<>
				<ErrorAlert>
					<p className="center">No events found for the choosen filter!</p>
				</ErrorAlert>
				<div className="center">
					<Button link="/events">Show all events</Button>
				</div>
			</>
		);
	}

	const date = new Date(filteredYear, filteredMonth - 1);

	return (
		<>
			<ResultsTitle date={date} />
			<EventList items={filteredEvents} />
		</>
	);
}
