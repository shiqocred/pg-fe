import { unlink } from "fs/promises";
import path from "path";

export const deleteFile = async (data: string) => {
  const currentPath = path.join(process.cwd() + "/public" + data);

  await unlink(currentPath);
};
