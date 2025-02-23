import ResponsiveDrawer from "@/components/ResponsiveDrawer/ResponsiveDrawer";
import { SongsSec } from "@/components/Songs/SongsSec";

const mostPlayed = () => {
  return (
    <ResponsiveDrawer>
      <SongsSec title="Mostly" subTitle="Played" />
    </ResponsiveDrawer>
  );
};

export default mostPlayed;
