import React from "react";
import { DiscoverSongSec } from "./DiscoverSongSec";

const discoverList = ["Popular", "Pop", "Sad", "Happy", "Rock"];

const DiscoverSongList: React.FC = () => {

  return discoverList?.map((item, index) => (
    <DiscoverSongSec key={index} type={item} />
  ));
};

export default DiscoverSongList;
