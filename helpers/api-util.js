export async function getAllEvents() {
	const response = await fetch(
		'https://next-events-2a211-default-rtdb.firebaseio.com/events.json'
	);
	const data = await response.json();

	const events = [];

	for (const key in data) {
		events.push({
			id: key,
			...data[key],
		});
	}

	return events;
}

export async function getFeaturedEvents() {
	const allEvents = await getAllEvents();
	return allEvents.filter((event) => event.isFeatured);
}

export async function getFilteredEvents(dateFilter) {
	const allEvents = await getAllEvents();

	const { year, month } = dateFilter;

	const filteredEvents = allEvents.filter((event) => {
		const eventDate = new Date(event.date);
		return (
			eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
		);
	});

	return filteredEvents;
}

export async function getEventById(id) {
	const allEvents = await getAllEvents();
	return allEvents.find((event) => event.id === id);
}
