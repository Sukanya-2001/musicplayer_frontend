import { MayLike } from "@/components/HomeSec/MayLike";
import ResponsiveDrawer from "@/components/ResponsiveDrawer/ResponsiveDrawer";
import { SongsSec } from "@/components/Songs/SongsSec";
import { TopSec } from "@/components/Songs/TopSec";

const songs = () => {
  return (
    <ResponsiveDrawer>
      <TopSec />
      <SongsSec />
      <MayLike />
    </ResponsiveDrawer>
  );
};

export default songs;
