import ImageKit from "imagekit";

export const imagekit = new ImageKit({
  publicKey:
    process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY ||
    "public_3X796Ezml27ECLB8gXYmylQ++bs=",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint:
    process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT ||
    "https://ik.imagekit.io/yq07kcchh",
});

export default imagekit;

