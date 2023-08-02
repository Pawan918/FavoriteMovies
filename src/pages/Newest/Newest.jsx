import { useEffect, useRef, useState } from 'react'
import Navbar from '../../Componenets/Navbar/Navbar'
import { fetchData } from '../../utilities/fetchData';
import Card from '../../Componenets/Card/Card';
import PageNav from '../../Componenets/PageNav/PageNav';
import Loader from '../../Componenets/Loader/Loader';
function Newest() {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const url = 'https://api.enime.moe/recent';

  const isCancelled = useRef(false);
  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      await fetchData(url, pageNumber).then((res) => {
        setLoading(false);
        setData(res);
        console.log('newest render')
      });
    }
    if (!isCancelled.current) {
      getData();
    }
    return () => {
      isCancelled.current = true;
    }
    // console.log(pageNumber);
  }, [pageNumber]);

  return (
    <div>
      <Navbar />
      {
        loading ? (<Loader />) : (
          <>
            <div className="cards">

              {/* to map the card based on the data  */}
              {
                data.data != undefined ? (
                  data?.data.map((res) => {
                    return <Card res={res} key={res.id} />;
                  })
                ) : (
                  <Card res={data} key={data.id} />
                )
              }
            </div>
            {/* pageNavigation   */}
            <div>
              <PageNav setPageNumber={setPageNumber} pageNumber={pageNumber} />
            </div>
          </>
        )
      }
    </div>
  )
}

export default Newest
