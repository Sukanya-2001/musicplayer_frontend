import { TopBanner } from "@/components/Artists/TopBanner";
import ResponsiveDrawer from "@/components/ResponsiveDrawer/ResponsiveDrawer";
import { SongComp } from "@/components/SongComp/SongComp";
import { SongsSec } from "@/components/Songs/SongsSec";
import assest from "@/json/assest";

const artistsSongs = () => {
  return (
    <ResponsiveDrawer>
      <TopBanner name="Arijit Singh" desc="On our website, you can access an amazing collection of popular and new songs. Stream your favorite tracks in high quality." img={assest?.singerBanner}/>
      <SongsSec title="Songs by" subTitle="Arijit Singh" />
      <SongComp title="You also may" subTitle="Like" />
    </ResponsiveDrawer>
  );
};

export default artistsSongs;
