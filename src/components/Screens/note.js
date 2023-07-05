useEffect(() => {
	const timeout = setTimeout(() => {
	  // 👇️ redirects to an external URL
	  window.location.replace('http://localhost:3000/');
	}, 3000);

	return () => clearTimeout(timeout);
}, []);

return <>Will redirect in 3 seconds...</>;