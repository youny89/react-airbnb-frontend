import { useSearchParams } from "react-router-dom";
import qs from 'query-string';

import Container from "../components/Container"
import EmptyContent from "../components/EmptyContent";
import ListingCard from "../components/listings/ListingCard";
import Loader from '../components/Loader'

import useFetchData from '../hooks/useFetchData';

const Home = () => {
    const [searchParams,setSearchParams] = useSearchParams()

    const query = qs.parse(searchParams.toString());
    const urlWithQuery = qs.stringifyUrl({
        url:'/api/listings',
        query
    })

    const { data, loading, error } = useFetchData(urlWithQuery);
    console.log('loading : ',loading);
    if(loading) return <Loader />

    if(data?.length === 0) {
        return (
            <EmptyContent showReset/>
        )
    }


    return (
        <Container>
            <div className="
                pt-24
                grid gap-8
                gird-cols-1
                sm:grid-cols-2    
                md:grid-cols-3    
                lg:grid-cols-4    
                xl:grid-cols-5    
                2xl:grid-cols-6    
            ">
                {data?.map(listing => (
                    <ListingCard 
                        key={listing._id}
                        data={listing}
                    />
                ))}
            </div>
        </Container>
    )
}

export default Home