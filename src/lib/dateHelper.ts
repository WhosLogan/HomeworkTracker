// Seriously?
export function toUTCDateString(date: Date): string {
	const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
		'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	const day = days[date.getUTCDay()];
	const month = months[date.getUTCMonth()];
	const dayOfMonth = date.getUTCDate().toString().padStart(2, '0');
	const year = date.getUTCFullYear();

	return `${day} ${month} ${dayOfMonth} ${year}`;
}