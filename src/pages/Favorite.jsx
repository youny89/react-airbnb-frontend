import EmptyContent from "../components/EmptyContent";
import FavoriteClient from "../components/favorite/FavoriteClient";
import useFetchData from "../hooks/useFetchData";
import useUserStore from "../hooks/useUserStore"



const Favorite = () => {
    const currentUser = useUserStore(state=> state.currentUser);
    const { data, loading, error } = useFetchData(`/api/users/favorites`);

    if(!currentUser) return <EmptyContent title="로그인 해주세요" subtitle="로그인 후 관심있는 숙소를 위시리스트에 담아보세요"/>
    if(!data || data.length === 0) return <EmptyContent title="데이터가 없습니다" subtitle="위시리스트에 관심있는 숙소를 담아보세요"/>

    return (
        <FavoriteClient
            currentUser={currentUser}
            favorites={data}
        />
    )
}

export default Favorite