import { createContext, useState } from 'react';

export const NotificationContext = createContext({
	notification: null, // {title, message, status}
	showNotification: (notificationData) => {},
	hideNotification: () => {},
});

export const NotificationContextProvider = (props) => {
	const [activeNotification, setActiveNotification] = useState(null);

	const showNotificationHandler = (notificationData) => {
		setActiveNotification(notificationData);
	};

	const hideNotificationHandler = () => {
		setActiveNotification(null);
	};

	const context = {
		notification: activeNotification,
		showNotification: showNotificationHandler,
		hideNotification: hideNotificationHandler,
	};

	return (
		<NotificationContext.Provider value={context}>
			{props.children}
		</NotificationContext.Provider>
	);
};

export default NotificationContext;
