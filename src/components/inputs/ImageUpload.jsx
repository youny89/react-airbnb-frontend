import { Cloudinary } from '@cloudinary/url-gen'
import { createRef, useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

const ImageUpload = ({
    onChange,
    value
}) => {

    return (
        <div className='relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-400'>
            <TbPhotoPlus size={50}/>
            <div className='font-semibold text-lg'>사진을 골라주세요</div>
            {value && (
                <div className='absolute inset-0 w-full h-full'>
                    <img 
                        src={value}
                        alt="사진"
                        style={{objectFit:'cover'}}
                    />
                </div>
            )}
        </div>
    )
}

export default ImageUpload