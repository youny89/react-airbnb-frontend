import { useNavigate } from "react-router-dom"
import Heading from "./Heading";
import Button from "./Button";


const EmptyContent = ({
    title='데이터가 존재 하지 않습니다',
    subtitle='필터 설정을 다시 해보세요',
    showReset
}) => {
    const naviagte = useNavigate();

    return (
        <div className="h-[50vh] flex flex-col gap-2 justify-center items-center">
            <Heading title={title} subtitle={subtitle} center/>
            <div className="w-48 mt-4">
                {showReset && (
                    <Button 
                        outline
                        label="모든 필터링 제거"
                        onClick={()=> naviagte('/')}
                    />
                )}
            </div>
        </div>
    )
}

export default EmptyContent