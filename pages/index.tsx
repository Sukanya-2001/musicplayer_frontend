import { Album } from "@/components/HomeSec/Album";
import { Artists } from "@/components/HomeSec/Artists";
import Banner from "@/components/HomeSec/Banner";
import { MayLike } from "@/components/HomeSec/MayLike";
import { NewRelease } from "@/components/HomeSec/NewRelease";
import { Trending } from "@/components/HomeSec/Trending";
import { Weekly } from "@/components/HomeSec/Weekly";
import ResponsiveDrawer from "@/components/ResponsiveDrawer/ResponsiveDrawer";
import toast from "react-hot-toast";

export default function Home() {
  const notify = () => toast("Here is your toast.");

  return (
    <ResponsiveDrawer>
      <Banner />
      <Weekly />
      <NewRelease />
      <Trending />
      <Artists />
      <Album />
      <MayLike />
    </ResponsiveDrawer>
  );
}
