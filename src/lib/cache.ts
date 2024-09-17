import { unstable_cache as nextCache } from "next/cache";
import { cache as reactCache } from "react";

/* eslint-disable */

type Callback = (...args: any[]) => Promise<any>;
type Options = {
  revalidate?: number | false;
  tags?: string[];
};

/* eslint-enable */

export const cache = <T extends Callback>(
  cb: T,
  keyParts: string[],
  options: Options = {}
) => {
  return nextCache(reactCache(cb), keyParts, options);
};
