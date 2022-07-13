import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./App.css";

function App() {
  const [items, setitems] = useState([]);
  const [more, setmore] = useState(true);

  async function fetchData() {
    console.log("ADDED AT SCROLL");
    const data = await axios.get(
      `https://dummyjson.com/products?skip=10&limit=5` //ADDED 5 PRODUCTS AT THE END OF SCROLL
    );
    setitems([...items, ...data.data.products]);
    setmore(false);
  }

  useEffect(() => {
    async function calledit() {
      const res = await axios.get(`https://dummyjson.com/products?limit=10`);
      console.log(res.data.products);
      setitems(res.data.products);
    }
    calledit();
  }, []);

  //console.log(state[0].src.original);
  return (
    <div className="App">
      <header>HELLO WORLD</header>
      <InfiniteScroll
        dataLength={items.length} //This is important field to render the next data
        next={fetchData}
        hasMore={more}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="container">
          <div className="row">
            {items.map((e, i) => {
              return (
                <div className="col-4" key={e.id}>
                  <img
                    style={{
                      width: "100%",
                      height: "15vw",
                      objectfit: "cover",
                    }}
                    src={e.images[0]}
                  />
                  <h5>{e.title}</h5>
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default App;
