import React, { useEffect, useState } from 'react'
import Navbar from '../../Componenets/Navbar/Navbar'
import { fetchData2 } from '../../utilities/fetchData'
import Card from '../../Componenets/Card/Card'
import Loader from '../../Componenets/Loader/Loader';

function Upcoming() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setData([]);
        setLoading(true);
        let isCanclled = false;
        const getData = async () => {
            const res = await fetchData2('https://api.jikan.moe/v4/seasons/upcoming?limit=20');
            if (!isCanclled) {
                res?.data?.map(async (data1) => {
                    await fetchData2(`https://api.enime.moe/mapping/mal/${data1.mal_id}`).then((res) => {
                        let newData = {...res,trailer:data1.trailer};
                        // console.log(newData)
                        setLoading(false);
                        setData((prevState) => {
                            // console.log(newData)
                            return [...prevState, newData]
                        })
                    })
                    // setTimeout(()=>{
                })
            }

        }
        getData()
        return () => {
            isCanclled = true
        }
    }, [])
    return (
        <div>
            <Navbar />
            <div className="cards">

                {/* to map the card based on the data  */}
                {
                    loading ? (<Loader />) : (
                        <>
                            {
                                data != undefined ? (
                                    data.map((res) => {
                                        // console.log('render')
                                        return res?.statusCode != 404 && (
                                            <Card res={res} key={res.id} />
                                        )
                                    })
                                ) : (
                                    <Card res={data} key={data.id} />
                                )
                            }
                        </>
                    )
                }
                {/* <button onClick={handleData}>showData</button> */}
            </div>
        </div>
    )
}

export default Upcoming
