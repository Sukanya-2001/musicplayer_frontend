import ResponsiveDrawer from "@/components/ResponsiveDrawer/ResponsiveDrawer";
import { SongsSec } from "@/components/Songs/SongsSec";
import { TopSec } from "@/components/Songs/TopSec";
import { useSearchParams } from "next/navigation";

const Songs = () => {
  const searchParams = useSearchParams();
  const queryKey = Array.from(searchParams.keys())[0];
  console.log(queryKey);

  return (
    <ResponsiveDrawer>
      <TopSec />
      <SongsSec title="Popular" subTitle="Songs" songType={queryKey} />
      {/* <SongComp title="You also may" subTitle="Like" /> */}
    </ResponsiveDrawer>
  );
};

export default Songs;
