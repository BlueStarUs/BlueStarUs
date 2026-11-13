"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";

interface BlogImageWithFallbackProps extends Omit<ImageProps, "onError"> {
  fallbackSrc: string;
}

export function BlogImageWithFallback({
  src,
  fallbackSrc,
  alt,
  className,
  ...rest
}: BlogImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);
  const [hasError, setHasError] = useState(false);

  return (
    <Image
      {...rest}
      src={hasError ? fallbackSrc : imgSrc || fallbackSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (!hasError) {
          setHasError(true);
          setImgSrc(fallbackSrc);
        }
      }}
    />
  );
}

