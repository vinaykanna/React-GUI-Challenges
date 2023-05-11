import { useEffect, useState } from "react";

function InfiniteScroll() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://api.github.com/users")
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setData(result);
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return <div>{JSON.stringify(data)}</div>;
}

export default InfiniteScroll;
