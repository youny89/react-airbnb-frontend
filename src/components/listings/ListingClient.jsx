import { useMemo } from "react"

import { categories } from '../navbar/category/Categories';
import Container from "../Container";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";

const ListingClient = ({
    list,
    currentUser
}) => {

    const category = useMemo(()=>{
        return categories.find(item=> item.label === list.category);
    },[list.category])

    return (
        <Container>
            <div className="max-w-screen mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead 
                        title={list.title}
                        imageSrc={list.imageSrc}
                        locationValue={list.locationValue}
                        id={list._id}
                        currentUser={currentUser}

                    />

                    <div className="grid gird-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <ListingInfo 
                            user={list.user}
                            category={category}
                            description={list.description}
                            guestCount={list.guestCount}
                            roomCount={list.roomCount}
                            bathroomCount={list.bathroomCount}
                            locationValue={list.locationValue}
                        />
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ListingClient