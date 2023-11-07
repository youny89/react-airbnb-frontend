
const ListingCategory = ({
    icon:Icon,
    label,
    description
}) => {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-row items-center gap-4">
                <Icon size={48} className="text-neutral-700"/>

                <div className="flex flex-col">
                    <div className="text-lg font-semibold">{label}</div>
                    <div className="text-neutral-600 font-light">{description}</div>
                </div>
            </div>
        </div>
    )
}

export default ListingCategory