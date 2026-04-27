import React, { useMemo, useState } from 'react';
import { extractMediaVariants } from '../utils/strapi';

const ProgressiveImage = ({
  media,
  src,
  alt,
  className = '',
  lowClassName = '',
  highClassName = '',
  loading = 'lazy',
  decoding = 'async',
  width,
  height,
}) => {
  const [highLoaded, setHighLoaded] = useState(false);

  const variants = useMemo(() => {
    if (media) return extractMediaVariants(media);
    return extractMediaVariants(src || '');
  }, [media, src]);

  const lowSrc = variants.low || variants.high;
  const highSrc = variants.high || variants.low;

  if (!highSrc && !lowSrc) return null;

  return (
    <>
      {lowSrc && (
        <img
          src={lowSrc}
          alt={alt}
          className={`absolute inset-0 h-full w-full object-cover blur-sm scale-[1.03] transition-opacity duration-500 ${highLoaded ? 'opacity-0' : 'opacity-100'} ${className} ${lowClassName}`}
          loading={loading}
          decoding={decoding}
          width={width}
          height={height}
          aria-hidden="true"
        />
      )}
      {highSrc && (
        <img
          src={highSrc}
          alt={alt}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${highLoaded ? 'opacity-100' : 'opacity-0'} ${className} ${highClassName}`}
          loading={loading}
          decoding={decoding}
          width={width}
          height={height}
          onLoad={() => setHighLoaded(true)}
        />
      )}
    </>
  );
};

export default ProgressiveImage;
