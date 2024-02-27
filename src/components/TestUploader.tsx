'use client';

import React, { useState } from 'react';

function TestImagePreviewer({
  imageId,
  onRemove,
}: {
  imageId: string;
  onRemove: () => void;
}) {
  function onRemoveHandler() {
    onRemove();
  }

  return <p>{imageId}</p>;
}

function TestImageUploader({ onUpload }: { onUpload: () => void }) {
  const [file, setFile] = useState(undefined);
  const [isUploading, setIsUploading] = useState(false);

  return (
    <form>
      <input />
    </form>
  );
}

type Props = {
  images: {
    id: string;
    url: string;
  };
};

function ImageUploadManager({ images }: Props) {
  const [images, setImages] = useState<string[]>(ids || []);

  function handleOnUpload() {}
  function handleOnRemove() {}

  return (
    <div>
      {images.map((img, index) => (
        <TestImagePreviewer imageId={img} onRemove={handleOnRemove} />
      ))}
      <TestImageUploader onUpload={handleOnUpload} />
    </div>
  );
}

export default ImageUploadManager;
