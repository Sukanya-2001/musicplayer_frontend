import { Popover, List, ListItemButton, ListItemText } from "@mui/material";
import { Isongs } from "../Songs/SongsSec";

type PopoverProps = {
    anchorEl: any
    handleClose: () => void;
    selectedSong: Isongs
}

export const SongsPopover = ({anchorEl, handleClose, selectedSong}: PopoverProps) => {
  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{ vertical: "center", horizontal: "left" }}
      transformOrigin={{ vertical: "center", horizontal: "right" }}
      sx={{ mt: 1 }}
    >
      <List>
        <ListItemButton
          onClick={() => alert(`Added to Favourite: ${selectedSong?.title}`)}
        >
          <ListItemText primary="Add to Favourite" />
        </ListItemButton>
        <ListItemButton
          onClick={() => alert(`Bookmarked: ${selectedSong?.title}`)}
        >
          <ListItemText primary="Bookmark" />
        </ListItemButton>
        <ListItemButton
          onClick={() => alert(`Playing: ${selectedSong?.title}`)}
        >
          <ListItemText primary="Play" />
        </ListItemButton>
      </List>
    </Popover>
  );
};
