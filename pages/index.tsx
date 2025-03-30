import Feedback from "@/components/Feedback/Feedback";
import { Artists } from "@/components/HomeSec/Artists";
import Banner from "@/components/HomeSec/Banner";
import ResponsiveDrawer from "@/components/ResponsiveDrawer/ResponsiveDrawer";
import { SongComp } from "@/components/SongComp/SongComp";

export default function Home() {
  return (
    <ResponsiveDrawer>
      <Banner />
      <SongComp title="Weekly Top" subTitle="Songs" />
      <SongComp title="New Release" subTitle="Songs" />
      <SongComp title="Trending" subTitle="Songs" />
      <Artists />

      {/* <Album /> */}
      <SongComp title="Top" subTitle="Albums" />
      <SongComp title="You also may" subTitle="Like" />
      <Feedback />
    </ResponsiveDrawer>
  );
}
