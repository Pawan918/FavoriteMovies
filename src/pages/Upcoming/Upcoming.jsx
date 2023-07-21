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
            // console.log(res)
            if (!isCanclled) {
                res?.data?.map(async (data1) => {
                    const data2 = await fetchData2(`https://api.enime.moe/mapping/mal/${data1.mal_id}`).then((res) => {
                        setLoading(false);
                        setData((prevState) => {
                            return [...prevState, res]
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
    console.log(data)
    // console.log(data1)
    // const handleData = ()=>{
    //     console.log(data)
    // }
    // console.log(data)
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
                                        console.log('render')
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
