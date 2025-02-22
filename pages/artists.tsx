import { TopBanner } from "@/components/Artists/TopBanner";
import ResponsiveDrawer from "@/components/ResponsiveDrawer/ResponsiveDrawer";
import { SongComp } from "@/components/SongComp/SongComp";
import assest from "@/json/assest";

const artistList = [
  {
    name: "Arijit Singh",
    desc: "On our website, you can access an amazing collection of popular and new songs. Stream your favorite tracks in high quality.",
    img: assest?.singerBanner
  },
  {
    name: "Shreya Ghosal",
    desc: "On our website, you can access an amazing collection of popular and new songs. Stream your favorite tracks in high quality.",
    img: assest?.singerBanner
  },
  {
    name: "Arman Malik",
    desc: "On our website, you can access an amazing collection of popular and new songs. Stream your favorite tracks in high quality.",
    img: assest?.singerBanner
  },
  {
    name: "Neha Kakkar",
    desc: "On our website, you can access an amazing collection of popular and new songs. Stream your favorite tracks in high quality.",
    img: assest?.singerBanner
  }
];
const artists = () => {
  return (
    <ResponsiveDrawer>
      {artistList.map((item, index) => (
        <TopBanner key={index} name={item?.name} desc={item?.desc} img={item?.img} />
      ))}
      <SongComp title="You also may" subTitle="Like" />
    </ResponsiveDrawer>
  );
};

export default artists;
