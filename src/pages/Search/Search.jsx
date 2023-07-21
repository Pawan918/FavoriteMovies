import React, { useEffect, useState } from 'react'
import Navbar from '../../Componenets/Navbar/Navbar'
import { useParams } from 'react-router-dom';
import Card from '../../Componenets/Card/Card';
import PageNav from '../../Componenets/PageNav/PageNav';
import { fetchData } from '../../utilities/fetchData';
import Loader from '../../Componenets/Loader/Loader';

function Search() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageNumber,setPageNumber] = useState(1)
    const params = useParams();
    console.log(params)
    // console.log(params)
    const url = `https://api.enime.moe/search/${params.name}` 
    useEffect(() => {
        let isCancelled = false;
        setLoading(true);
        const getData = async () => {
           await fetchData(url, pageNumber).then((res) => {
            setLoading(false);
            setData(res);
          });}

          getData();
          return () => {
            isCancelled = true;
          }
    },[pageNumber])
    return (
        <div>
            <Navbar />
            {
                loading ? (
                    <Loader />
                ) : (
                    <>
                        <div className="cards">
                            {/* to map the card based on the data  */}
                            {
                                data.data != undefined ? (
                                    data?.data.map((res) => {
                                        return <Card res={res} key={res.id} />;
                                    })
                                ) : (
                                    <Card res={data} key={data.id}/>
                                )
                            }
                        </div>
                        <div>
                            <PageNav setPageNumber={setPageNumber} pageNumber={pageNumber} />
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default Search
