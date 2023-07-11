<<<<<<< HEAD
useEffect(() => {
	const timeout = setTimeout(() => {
	  // 👇️ redirects to an external URL
	  window.location.replace('http://localhost:3000/');
	}, 3000);

	return () => clearTimeout(timeout);
}, []);

=======
useEffect(() => {
	const timeout = setTimeout(() => {
	  // 👇️ redirects to an external URL
	  window.location.replace('http://localhost:3000/');
	}, 3000);

	return () => clearTimeout(timeout);
}, []);

>>>>>>> cc381b892c93892bec67ebf8aef4d74c2bee83ad
return <>Will redirect in 3 seconds...</>;