import Container from "../Container"
import Heading from "../Heading"
import ListingCard from "../listings/ListingCard"

const FavoriteClient = ({currentUser, favorites}) => {
    return (
        <Container>
            <Heading title='위시 리스트' subtitle='내가 관심 있는 숙소 목록입니다'/>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
                {favorites?.map(favorite=>(
                    <ListingCard 
                        key={favorite._id}
                        data={favorite}
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    )
}

export default FavoriteClient