import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Head from 'next/head';

import { getFilteredEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

export default function FilteredEvents(props) {
	const [loadedEvents, setLoadedEvents] = useState();
	const router = useRouter();

	const filterData = router.query.slug;

	const fetcher = (...args) => fetch(...args).then((res) => res.json());

	const { data, error } = useSWR(
		'https://next-events-2a211-default-rtdb.firebaseio.com/events.json',
		fetcher
	);

	useEffect(() => {
		if (data) {
			const events = [];

			for (const key in data) {
				events.push({
					id: key,
					...data[key],
				});
			}

			setLoadedEvents(events);
		}
	}, [data]);

	if (!loadedEvents) {
		return <p className="center">Loading...</p>;
	}

	const filteredYear = filterData[0];
	const filteredMonth = filterData[1];

	const numYear = +filteredYear;
	const numMonth = +filteredMonth;

	if (
		isNaN(numYear) ||
		isNaN(numMonth) ||
		numYear > 2030 ||
		numYear < 2021 ||
		numMonth < 1 ||
		numMonth > 12 ||
		error
	) {
		return (
			<>
				<ErrorAlert>
					<p>Invalid filter. Please adjust your values!</p>
				</ErrorAlert>
				<div className="center">
					<Button link="/events">Show All Events</Button>
				</div>
			</>
		);
	}

	const filteredEvents = loadedEvents.filter((event) => {
		const eventDate = new Date(event.date);
		return (
			eventDate.getFullYear() === numYear &&
			eventDate.getMonth() === numMonth - 1
		);
	});

	if (!filteredEvents || filteredEvents.length === 0) {
		return (
			<>
				<ErrorAlert>
					<p>No events found for the chosen filter!</p>
				</ErrorAlert>
				<div className="center">
					<Button link="/events">Show All Events</Button>
				</div>
			</>
		);
	}

	const date = new Date(numYear, numMonth - 1);

	return (
		<>
			<Head>
				<title>Filtered Events</title>
				<meta
					name="description"
					content={`All events for ${filteredMonth}/${filteredYear}.`}
				/>
			</Head>
			<ResultsTitle date={date} />
			<EventList items={filteredEvents} />
		</>
	);
}

// export async function getServerSideProps(context) {
// 	const { params } = context;

// 	const filterData = params.slug;

// 	const filteredYear = +filterData[0];
// 	const filteredMonth = +filterData[1];

// 	if (
// 		isNaN(filteredYear) ||
// 		isNaN(filteredMonth) ||
// 		filteredYear < 2021 ||
// 		filteredYear > 2030 ||
// 		filteredMonth < 1 ||
// 		filteredMonth > 12
// 	) {
// 		return {
// 			props: { hasError: true },
// 		};
// 	}

// 	const filteredEvents = await getFilteredEvents({
// 		year: filteredYear,
// 		month: filteredMonth,
// 	});

// 	return {
// 		props: {
// 			filteredEvents,
// 			date: {
// 				year: filteredYear,
// 				month: filteredMonth,
// 			},
// 		},
// 	};
// }
