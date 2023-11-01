import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { GiBarn, GiBoatFishing, GiCactus, GiCampingTent, GiCastle, GiCaveEntrance, GiIsland, GiWindmill } from 'react-icons/gi';
import { MdOutlineVilla } from 'react-icons/md'
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';


import Container from '../../Container';
import CategoryBox from './CategoryBox';
import { useLocation, useSearchParams } from 'react-router-dom';

export const categories = [
    {
        label:'Beach',
        icon:TbBeach,
        description:'This property is close to the beach'
    },
    {
        label:'Windmills',
        icon:GiWindmill,
        description:'This property has windmills'
    },
    {
        label:'Modern',
        icon:MdOutlineVilla,
        description:'This property is modern'
    },
    {
        label:'Countryside',
        icon:TbMountain,
        description:'This property is in the countryside'
    },
    {
        label:'Pools',
        icon:TbPool,
        description:'This property has a pool'
    },
    {
        label:'Islands',
        icon:GiIsland,
        description:'This property is on an island'
    },
    {
        label:'Lake',
        icon:GiBoatFishing,
        description:'This property is close to a lake'
    },
    {
        label:'Skiing',
        icon:FaSkiing,
        description:'This property has skiing activities'
    },
    {
        label:'Castle',
        icon:GiCastle,
        description:'This property is in a castle'
    },
    {
        label:'Camping',
        icon:GiCampingTent,
        description:'This property has camping activites'
    },
    {
        label:'Arctic',
        icon:BsSnow,
        description:'This property '
    },
    {
        label:'Cave',
        icon:GiCaveEntrance,
        description:'This property is in a cave'
    },
    {
        label:'Desert',
        icon:GiCactus,
        description:'This property is in the desert'
    },
    {
        label:'Barns',
        icon:GiBarn,
        description:'This property is in the barn'
    },
    {
        label:'Lux',
        icon:IoDiamond,
        description:'This property is luxurious'
    },
]

const Categories = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const category = searchParams.get('category')
    const isMainPage = location.pathname === '/';
    if(!isMainPage) return null;

    return (
        <Container>
            <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
                {categories.map(item=> (
                    <CategoryBox 
                        key={item.label}
                        label={item.label}
                        selected={item.label === category}
                        icon={item.icon}
                    />
                ))}
            </div>
        </Container>
    )
}

export default Categories