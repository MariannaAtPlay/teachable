const api = 'http://localhost:5000';

export const search = (query) =>
	fetch(`${api}/api/v1/search.json?query=${query}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		}
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error('HTTP error, status = ' + response.status);
			} else {
				return response.json();
			}
		})
		.catch((error) => console.error('fetch error', error));
