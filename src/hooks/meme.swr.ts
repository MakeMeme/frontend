import SWR_CONSTANTS from "@/utils/swrConstants";
import useSWR, { mutate } from "swr";
import memeServices from "@/services/meme.services";

export function useMeme() {
  const { data, error, isLoading } = useSWR(
    SWR_CONSTANTS.GET_MEME,
    memeServices.getAllMemes
  );
  return {
    memeData: data,
    errorFetchingMemeData: error,
    isMemeDataLoading: isLoading,
  };
}

export async function createMemeFetcher() {
  const { data, error } = await memeServices.addMeme({
    
  });
  await mutate(SWR_CONSTANTS.MAKE_MEME);

  return {
    memeData: data,
    errorFetchingMemeData: error,
  };
}
