import { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const Index = () => {
  const [bills, setBills] = useState([]);
  const [msg, setMsg] = useState(null);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getBills = async () => {
    setMsg("");

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/user/bills?page=${page}&limit=10`,
        { headers: { authorization: localStorage.getItem("token") } }
      );

      const newBills = response.data.bills;

      if (!newBills || newBills.length === 0) {
        setHasMore(false);
        return;
      }

      console.log(response);

      setPage((prev) => prev + 1);
      setBills((prev) => [...prev, ...newBills]);
    } catch (error) {
      setMsg(error?.response?.data?.msg);
    }
  };

  useEffect(() => {
    getBills();
  }, []);

  return (
    <>
      <p className="h6 text-danger px-3">{msg}</p>
      <div className="d-flex flex-column mx-4 mt-5">
        <InfiniteScroll
          dataLength={bills.length}
          hasMore={hasMore}
          next={getBills}
          loader={<h4 className="text-center my-4">loading...</h4>}
          endMessage={<h4 className="text-center my-4">No more bills</h4>}
        >
          {bills.map((bill, index) => (
            <div
              className="bills d-flex align-items-center border-bottom px-3 my-4"
              key={index + bill._id}
            >
              <a href={`/bill/${bill._id}`}>
                <div>
                  <p className="h5 companyName">{bill.company.CompanyName}</p>
                  <p className="py-2">{bill.createdAt.slice(0, 10)}</p>
                </div>
              </a>
              <span className="ms-auto">{bill.company.Address}</span>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Index;
