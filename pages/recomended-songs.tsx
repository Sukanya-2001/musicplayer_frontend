import ResponsiveDrawer from "@/components/ResponsiveDrawer/ResponsiveDrawer";
import { RecomendedSec } from "@/components/Songs/RecomendedSec";
import { TopSec } from "@/components/Songs/TopSec";

const RecomendedSongs = () => {
  return (
    <ResponsiveDrawer>
      <TopSec />

      <RecomendedSec title="Recomended" subTitle="songs" />
      {/* <SongComp title="You also may" subTitle="Like" /> */}
    </ResponsiveDrawer>
  );
};

export default RecomendedSongs;
