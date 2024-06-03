import { mkdir, readdir, writeFile } from "fs/promises";
import path from "path";
import sharp from "sharp";

export const createFile = async (
  file: File,
  title: string,
  dir: string,
  isPhotos: boolean
) => {
  const bytes = await file.arrayBuffer();
  const buffer = await sharp(Buffer.from(bytes))
    .webp({ effort: 5, quality: 70 })
    .toBuffer();

  const pathen = path.join(process.cwd() + `/public/images/${dir}`);

  const nameFile = isPhotos
    ? `${Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000}.webp`
    : `${Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000}-${title
        .toLocaleLowerCase()
        .split(" ")
        .join("_")}.webp`;

  try {
    await readdir(pathen);
  } catch (error) {
    await mkdir(pathen);
  }

  await writeFile(`${pathen}/${nameFile}`, buffer);

  const pathname = `/images/${dir}/${nameFile}`;

  return pathname;
};
