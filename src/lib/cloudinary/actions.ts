'use server';

import cloudinary from '@/lib/cloudinary/init';
import { delay } from '@/lib/utils';

type ServerActionResponse<T> = {
  error: string | null;
  result: T | null;
};

export async function getThumbnail(
  id: string
): Promise<ServerActionResponse<string[] | null>> {
  await delay(2000);
  try {
    const thumbnail = cloudinary.v2.url(id, {
      transformation: { width: 150, height: 150, crop: 'pad' },
      format: 'jpg',
    });

    return {
      error: null,
      result: [thumbnail, thumbnail, thumbnail, thumbnail],
    };
  } catch (e) {
    console.error(e);
    return { error: 'error', result: null };
  }
}

async function bufferedUpload(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const buffered = new Uint8Array(arrayBuffer);
  return new Promise(
    (
      resolve: (res: cloudinary.UploadApiResponse | undefined) => void,
      reject: (err: cloudinary.UploadApiErrorResponse) => void
    ) => {
      cloudinary.v2.uploader
        .upload_stream({}, function (err, res) {
          if (err) {
            reject(err);
            return;
          }
          resolve(res);
        })
        .end(buffered);
    }
  );
}

export async function removeFromCloudinary(
  publicId: string
): Promise<ServerActionResponse<{ message: string }>> {
  try {
    const res = await cloudinary.v2.uploader.destroy(publicId);
    if (res.result !== 'ok') {
      return { error: 'Error while deleting the image', result: null };
    }

    return { error: null, result: { message: 'ok' } };
  } catch (e) {
    console.error(e);
    return { error: 'Error while deleting the image', result: null };
  }
}

export async function uploadToCloudinary(
  f: FormData
): Promise<ServerActionResponse<cloudinary.UploadApiResponse>> {
  try {
    const image = f.get('image') as File;
    const res = await bufferedUpload(image);

    if (!res) {
      return { error: 'Unknown error.', result: null };
    }

    return { error: null, result: res };
  } catch (e) {
    console.error(e);
    return { error: 'Network error.', result: null };
  }
}
