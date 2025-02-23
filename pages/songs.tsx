import ResponsiveDrawer from "@/components/ResponsiveDrawer/ResponsiveDrawer";
import { SongComp } from "@/components/SongComp/SongComp";
import { SongsSec } from "@/components/Songs/SongsSec";
import { TopSec } from "@/components/Songs/TopSec";

const songs = () => {
  return (
    <ResponsiveDrawer>
      <TopSec />
      <SongsSec title="Popular" subTitle="Songs"/>
      <SongComp title="You also may" subTitle="Like" />
    </ResponsiveDrawer>
  );
};

export default songs;
