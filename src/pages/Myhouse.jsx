import EmptyContent from "../components/EmptyContent";
import MyHouseClient from "../components/my-house/MyHouseClient";
import useFetchData from "../hooks/useFetchData";
import useUserStore from "../hooks/useUserStore"

const Myhouse = () => {
  const currentUser = useUserStore(state=>state.currentUser);
  const {data, loading, error } = useFetchData('/api/users/listings');

  if(!currentUser) return <EmptyContent title="로그인 해주세요"/>
  if(!data || data.length === 0 ) return <EmptyContent title="데이터가 없습니다" subtitle="숙소 등록을 완료 해주세요"/>

  return <MyHouseClient listings={data} currentUser={currentUser}/>
}

export default Myhouse