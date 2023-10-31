
const Avatar = ({ src }) => {
    return (
        <img
            className="rounded-full "
            alt="아바타"
            src={src ? src :"/images/placeholder.jpg"}
            height={30}
            width={30}/>
    )
}

export default Avatar