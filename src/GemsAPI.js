const api = 'http://localhost:5000';

export const search = (query) => {
	return fetch(`${api}/api/v1/search.json?query=${query}`, {
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
		.catch((error) => console.error(error));
};

export const get = () => {
	if (storageAvailable('localStorage')) {
		return JSON.parse(localStorage.getItem('myGems'));
	} else {
		throw new Error('Local Storage is Unavailable');
	}
};

export const save = (savedGems) => {
	if (storageAvailable('localStorage')) {
		localStorage.setItem('myGems', JSON.stringify(savedGems));
	} else {
		throw new Error('Unavailable');
	}
};

const storageAvailable = (type) => {
	// To be able to use localStorage,
	//we should first verify that it is supported and available in the current browsing session.
	// source: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#Feature-detecting_localStorage
	var storage;
	try {
		storage = window[type];
		var x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	} catch (e) {
		return (
			e instanceof DOMException &&
			// everything except Firefox
			(e.code === 22 ||
				// Firefox
				e.code === 1014 ||
				// test name field too, because code might not be present
				// everything except Firefox
				e.name === 'QuotaExceededError' ||
				// Firefox
				e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
			// acknowledge QuotaExceededError only if there's something already stored
			(storage && storage.length !== 0)
		);
	}
};
