import { BiSearch } from 'react-icons/bi'

const Search = () => {
  return (
    <div className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
        <div className="flex flex-row items-center justify-between">
            <div className="text-sm font-semibold px-6">
                어디든지
            </div>
            <div className="hidden sm:block border-x-[1px] text-center flex-1 text-sm font-semibold px-6">
                언제나
            </div>
            <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
                <div className="hidden sm:block">
                    게스트 추카
                </div>
                <div className="p-2 bg-rose-500 rounded-full text-white">
                    <BiSearch />
                </div>
            </div>
        </div>        
    </div>
  )
}

export default Search