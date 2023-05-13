import { useEffect, useRef, useState, useCallback } from "react";

function InfiniteScroll() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const lastElement = useRef(null);

  const hasNext = useRef(false);
  const nextLink = useRef("https://api.github.com/users?per_page=10");

  const getData = useCallback(() => {
    setIsLoading(true);
    fetch(nextLink.current)
      .then((res) => {
        const link = res.headers.get("link")?.split(";")[0] || "";
        const trimmed = link.slice(1, link?.length - 1);

        if (trimmed) {
          hasNext.current = true;
          nextLink.current = trimmed;
        }

        return res.json();
      })
      .then((result) => {
        setTimeout(() => {
          setIsLoading(false);
          setData((data) => [...data, ...result]);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (isLoading) return;

    const element = lastElement.current;

    const observer = new IntersectionObserver(
      (entries) => {
        console.log(entries);
        if (entries[0].isIntersecting && hasNext) {
          getData();
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [isLoading, getData]);

  return (
    <div className="github_users">
      <h1>Infinite Scroll</h1>
      {data.map((item: any, index) => (
        <div
          className="github_user_card"
          key={item?.id}
          {...(index === data?.length - 1 && {
            ref: lastElement,
          })}
        >
          <img src={item?.avatar_url} alt="" />
          <h2>{item?.login}</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed eum
            maiores libero! Reiciendis perspiciatis dolores illum sit enim vero
            autem numquam, rerum nostrum fugit. Cum voluptate delectus molestias
            expedita ex?
          </p>
        </div>
      ))}
      {isLoading && <div className="loader"></div>}
    </div>
  );
}

export default InfiniteScroll;
