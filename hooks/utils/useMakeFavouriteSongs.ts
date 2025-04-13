// hooks/useMakeFavoriteSongs.ts
import { setWishList } from "@/reduxtoolkit/slices/wishlistSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

type Props = {
  getAllFavIds: any;
  favMutate: any;
  refetch?: any;
};

export const useMakeFavoriteSongs = ({
  getAllFavIds,
  favMutate,
  refetch
}: Props) => {
  const [disabledFavs, setDisabledFavs] = useState<{ [key: string]: boolean }>(
    {}
  );
  const dispatch = useDispatch();

  const handleFavourite = async (
    e: React.MouseEvent,
    songId: string,
    albumId: string,
    artistIds: string[]
  ) => {
    e.stopPropagation();
    setDisabledFavs((prev) => ({ ...prev, [songId]: true }));

    const payload = {
      song_id: songId,
      artist_id: artistIds,
      album_id: albumId
    };

    try {
      const res = await favMutate(payload);

      if (res?.status === 200) {
        const response = await getAllFavIds();
        if (response?.status === 200) {
          dispatch(setWishList(response.wishListIds));
          if (refetch) {
            refetch();
          }
        }
      }
    } catch (error) {
      console.error("Favorite toggle failed:", error);
    } finally {
      setDisabledFavs((prev) => ({ ...prev, [songId]: false }));
    }
  };

  return {
    handleFavourite,
    disabledFavs
  };
};
