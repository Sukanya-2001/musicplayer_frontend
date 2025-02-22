import { TopBanner } from "@/components/Artists/TopBanner";
import { MayLike } from "@/components/HomeSec/MayLike";
import ResponsiveDrawer from "@/components/ResponsiveDrawer/ResponsiveDrawer";
import { SongsSec } from "@/components/Songs/SongsSec";

const artist = () => {
  return (
    <ResponsiveDrawer>
      <TopBanner />
      <SongsSec />
      <MayLike />
    </ResponsiveDrawer>
  );
};

export default artist;
