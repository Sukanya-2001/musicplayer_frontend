import { useGetAlbumInfoHook } from "@/api/functions/album.api";
import { AlbumSongSec } from "@/components/Album/AlbumSongSec";
import { AlbumTopSec } from "@/components/Album/AlbumTopSec";
import ResponsiveDrawer from "@/components/ResponsiveDrawer/ResponsiveDrawer";
import assest from "@/json/assest";
import { useRouter } from "next/router";

const AlbumSongs = () => {
  const router = useRouter();
  const albumId = router.query.albumId as string;
  const { data: albumInfo, isPending: albumInfoPending } =
    useGetAlbumInfoHook(albumId);

  console.log(albumInfo);

  return (
    <ResponsiveDrawer>
      <AlbumTopSec
        name={albumInfo?.title ?? ""}
        desc={albumInfo?.description ?? ""}
        img={!!albumInfo?.file ? albumInfo?.file : assest?.singerBanner}
        isLoading={albumInfoPending}
      />

      <AlbumSongSec id={albumId} />

      {/* <SongComp title="You also may" subTitle="Like" /> */}
    </ResponsiveDrawer>
  );
};

export default AlbumSongs;
