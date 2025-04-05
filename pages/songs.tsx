import ResponsiveDrawer from "@/components/ResponsiveDrawer/ResponsiveDrawer";
import { SongsSec } from "@/components/Songs/SongsSec";
import { TopSec } from "@/components/Songs/TopSec";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Songs = () => {
  const searchParams = useSearchParams();
  const queryKey = Array.from(searchParams.keys())[0];
  const router = useRouter();
  const songTypeMap: Record<string, string> = {
    Recomended: "all",
    "New Release": "nrs",
    Trending: "treanding",
    "90's": "90s",
    Latest: "the2000ssongs"
  };

  const songType = songTypeMap[queryKey] as "the2000ssongs" | "90s" | "nrs";

  useEffect(() => {
    if (!songTypeMap[queryKey] || !songType) {
      router.push("/");
    }
  }, [queryKey, songType]);

  return (
    <ResponsiveDrawer>
      <TopSec />
      <SongsSec
        title={queryKey}
        subTitle={
          queryKey === "90's" || queryKey === "the2000ssongs" ? "Hits" : "Songs"
        }
        songType={songType}
      />
      {/* <SongComp title="You also may" subTitle="Like" /> */}
    </ResponsiveDrawer>
  );
};

export default Songs;
