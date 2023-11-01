import { useCallback } from 'react';
import  { useSearchParams, useNavigate } from 'react-router-dom'
import qs from 'query-string';

const CategoryBox = ({
    icon: Icon,
    label,
    selected
}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigatee = useNavigate();

    const handleClick = useCallback(()=>{
        let currentQuery = {};

        if(searchParams) {
            currentQuery = qs.parse(searchParams.toString());
        }

        const updatedQuery = {
            ...currentQuery,
            category: label
        }
        
        if(currentQuery.category === label) {
            console.log('delete category')
            delete updatedQuery.category;
        }

        const url = qs.stringifyUrl({
            url:"/",
            query: updatedQuery
        },{skipNull:true })

        navigatee(url);

    },[label, searchParams])
    return (
        <div onClick={handleClick} className={`
            flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer
            ${selected ? 'border-b-neutral-800':'border-transparent'}        
            ${selected ? 'text-neutral-800':'text-neutral-400'}        

        `}>
          <Icon size={26}/>  
          <div className="font-medium text-sm">{label}</div>
        </div>
    )
}

export default CategoryBox