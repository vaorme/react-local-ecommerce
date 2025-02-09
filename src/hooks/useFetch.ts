import { useEffect, useState } from "react";

export const useFetch = (url: string, config: object) => {
	const [data, setData] = useState<[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<{message: string}>({
		message: '',
	});
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
				if (error instanceof Error && error.name !== 'AbortError') {
					setError({
						message: "An error occurred while fetching the data."
					});
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