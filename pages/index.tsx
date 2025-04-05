import { useGetHomePageDetails } from "@/api/functions/home.api";
import Feedback from "@/components/Feedback/Feedback";
import { Album } from "@/components/HomeSec/Album";
import { Artists } from "@/components/HomeSec/Artists";
import Banner from "@/components/HomeSec/Banner";
import ResponsiveDrawer from "@/components/ResponsiveDrawer/ResponsiveDrawer";
import { SongComp } from "@/components/SongComp/SongComp";

export default function Home() {
  const { data: homeDetails, isPending: homeDetailsPending } =
    useGetHomePageDetails();

  return (
    <ResponsiveDrawer>
      <Banner />
      <SongComp
        title="Recomended"
        subTitle="Songs"
        details={homeDetails?.Allsongs ?? []}
        isPending={homeDetailsPending}
      />
      {!!homeDetails?.newReleases && homeDetails?.newReleases?.length > 0 && (
        <SongComp
          title="New Release"
          subTitle="Songs"
          details={homeDetails?.newReleases ?? []}
          isPending={homeDetailsPending}
        />
      )}
      {!!homeDetails?.newReleases && homeDetails?.newReleases?.length > 0 && (
        <SongComp
          title="Trending"
          subTitle="Songs"
          details={homeDetails?.newReleases ?? []}
          isPending={homeDetailsPending}
        />
      )}

      <Artists
        details={homeDetails?.limitedArtists ?? []}
        isPending={homeDetailsPending}
      />

      <Album
        details={homeDetails?.limitedAlbums ?? []}
        isPending={homeDetailsPending}
      />

      {!!homeDetails?.songslessthan90s &&
        homeDetails?.songslessthan90s?.length > 0 && (
          <SongComp
            title="90's"
            subTitle="Hits"
            details={homeDetails?.songslessthan90s ?? []}
            isPending={homeDetailsPending}
          />
        )}
      {!!homeDetails?.the2000ssongs &&
        homeDetails?.the2000ssongs?.length > 0 && (
          <SongComp
            title="Latest"
            subTitle="Songs"
            details={homeDetails?.the2000ssongs ?? []}
            isPending={homeDetailsPending}
          />
        )}

      <SongComp
        title="You also may"
        subTitle="Like"
        details={homeDetails?.randomSongs ?? []}
        isPending={homeDetailsPending}
      />
      <Feedback />
    </ResponsiveDrawer>
  );
}
