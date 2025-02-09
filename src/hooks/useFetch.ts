import { useEffect, useState } from "react";

export const useFetch = (url, config) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	useEffect(() => {
		const controller = new AbortController();
		const fetchData = async () => {
			try {
				const response = await fetch(url, { ...config, signal: controller.signal });
				if (!controller.signal.aborted) {
					const data = await response.json();
					setData(data);
					setLoading(false);
				}
			} catch (error) {
				if (error.name !== 'AbortError') {
					setError(error);
					setLoading(false);
				}
			}
		};
		fetchData();
		return () => {
			controller.abort();
		};
	}, []);

	return { data, loading, error };
};