import {useEffect,useState} from 'react'
import Navbar from '../../Componenets/Navbar/Navbar'
import { fetchData } from '../../utilities/fetchData';
import Card from '../../Componenets/Card/Card';
import PageNav from '../../Componenets/PageNav/PageNav';
function Popular() {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [url, setUrl] = useState('https://api.enime.moe/popular');
  const prevPage = () => {
    if (pageNumber === 1) return;
    setPageNumber(pageNumber - 1);
    console.log(pageNumber);
  };

  // to move to the NextPage
  const nextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  // to move to any page number
  const skipPage = (val) => {
    if (val !== NaN) setPageNumber(val);
  };

  const urlHandler = (url) => {
    if (url !== '') setUrl(url)
  }
  useEffect(() => {
    let isCancelled = false;
    const getData = async ()=>{
      const res = await fetchData(url,pageNumber);
      if(!isCancelled){
        setData(res);
      }
    }
    if(!isCancelled){

      getData();
    }
    return()=>{
      isCancelled = true;
    }
    // console.log(pageNumber);
  }, [pageNumber, url]);

  return (
    <div>
      <Navbar/>
      <div className="cards">

        {/* to map the card based on the data  */}
        {
          data.data != undefined ? (
            data?.data.map((res) => {
              return <Card res={res} key={res.id} url={urlHandler} />;
            })
          ) : (
            <Card res={data} key={data.id} url={urlHandler} />
          )
        }
      </div>
      {/* pageNavigation   */}
      <div>
        <PageNav page={{ prevPage, nextPage, skipPage, pageNumber }} />
      </div>
    </div>
  )
}

export default Popular
