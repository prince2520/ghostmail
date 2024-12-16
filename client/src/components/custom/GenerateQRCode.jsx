import QRCode from 'qrcode';

import { useEffect, useState } from 'react';

const GenerateQRCode = ({ mailAddress }) => {
    const [imgSrc, setImgSrc] = useState(null);

    useEffect(() => {
        const mailLink = `mailto:${mailAddress}`
        QRCode.toDataURL(mailLink)
            .then(url => {
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