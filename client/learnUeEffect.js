useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await MyAPI.getData(someId);
      // ...
    }
    fetchData();
  }, [someId]); // Or [] if effect doesn't need props or state