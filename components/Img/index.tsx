import { useEffect, useState } from 'react';
import { ImageProps } from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

interface IImageProps extends Omit<ImageProps, 'src'> {
    file?: StaticImport | any;
    url?: string;
    src?: any;
    validateURL?: boolean;
}

export const Img: React.FC<IImageProps> = ({ file, url, validateURL = true, src, ...props }) => {
    const [source, setSource] = useState<string | undefined>(file);

    useEffect(() => {
        if (!url && !file) {
            setSource('');
        } else if (url && validateURL) {
            setSource(url);
        } else {
            setSource(file.src);
        }
    }, [file, url]);

    return <img {...props} src={source} style={{ objectFit: 'cover'}} />;
}
