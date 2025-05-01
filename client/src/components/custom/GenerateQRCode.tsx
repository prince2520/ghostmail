import QRCode from 'qrcode';
import { RootState } from '@/redux/store';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const GenerateQRCode = () => {
    const [imgSrc, setImgSrc] = useState<string>();
    const {currMailId, mails} = useSelector((state:RootState) => state.mail);
   
    const mailAddress =  mails.find((mail) => mail.id === currMailId)?.address;

    useEffect(() => {
        const mailLink = `mailto:${mailAddress}`
        QRCode.toDataURL(mailLink)
            .then((url:string) => {
                setImgSrc(url);
            })
            .catch(err => {
                console.error(err)
            })

    }, []);

    return (
        <div className='flex flex-col gap-y-2 justify-center items-center'>
            <img src={imgSrc}/>
            <p className='text-center text-xs font-bold flex-col text-neutral-600 dark:text-neutral-400'>Scan QR and Compose an Email</p>
        </div>
    );
};

export default GenerateQRCode;