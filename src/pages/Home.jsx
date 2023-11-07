import Container from "../components/Container"
import EmptyContent from "../components/EmptyContent";
import ListingCard from "../components/listings/ListingCard";

import useFetchData from '../hooks/useFetchData';

const Home = () => {

    const { data, loading, error } = useFetchData('/api/listings');

    if(!loading && data?.length === 0) {
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