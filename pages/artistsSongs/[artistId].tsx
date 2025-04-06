import { useGetArtistInfoHook } from "@/api/functions/artist.api";
import { ArtistSongSec } from "@/components/Artists/ArtistSongSec";
import { TopBanner } from "@/components/Artists/TopBanner";
import ResponsiveDrawer from "@/components/ResponsiveDrawer/ResponsiveDrawer";
import assest from "@/json/assest";
import { useRouter } from "next/router";

const ArtistsSongs = () => {
  const router = useRouter();
  const artistId = router.query.artistId as string;
  const { data: artistInfo, isPending: artistInfoPending } =
    useGetArtistInfoHook(artistId);

  console.log(artistInfo);

  return (
    <ResponsiveDrawer>
      <TopBanner
        name={artistInfo?.title ?? ""}
        desc={artistInfo?.description ?? ""}
        img={!!artistInfo?.file ? artistInfo?.file : assest?.singerBanner}
        isLoading={artistInfoPending}
      />
      <ArtistSongSec id={artistId} />

      {/* <SongsSec title="Songs by" subTitle="Arijit Singh" /> */}

      {/* <SongComp title="You also may" subTitle="Like" /> */}
    </ResponsiveDrawer>
  );
};

export default ArtistsSongs;
