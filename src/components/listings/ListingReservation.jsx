import Button from '../Button';

import Calendar from '../inputs/Calendar'

const ListingReservation = ({
    price,
    totalPrice,
    onChangeDate,
    dateRange,
    onSubmit,
    disabled,
    disabledDates
}) => {
    return (
        <div className='bg-white rounded-xl border-[1px] border-neutral-200 overflow=hidden'>
            <div className="flex flex-row items-center gap-1 p-4">
                <div className='text-2xl font-semibold'>
                    {price}원
                </div>
                <div className='font-light text-neutral-600'>1박</div>
            </div>
            <hr />
            <Calendar 
                value={dateRange}
                disabledDates={disabledDates}
                onChange={value=> onChangeDate(value.selection)}
            />
            <hr />
            <div className='p-4'>
                <Button disabled={disabled} label="예약하기" onClick={onSubmit}/>
            </div>
            <div className='p-4 flex flex-row items-center justify-between font-semibold text-lg'>
                <div>총 가격</div>
                <div>{totalPrice}원</div>
            </div>
        </div>
    )
}

export default ListingReservation