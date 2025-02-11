import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import "./vote.css";

const CandidatesList = ({
  candidates,
  setSelectedCandidate,
  checked,
  setChecked,
}) => {
  const handleSelect = (value) => () => {
    setChecked(value);
    setSelectedCandidate(value);
  };

  return (
    <List className="list">
      {candidates.map((c) => {
        const labelId = `${c.id}`;
        return (
          <ListItem
            key={c.id + c.name}
            className="list-item"
            secondaryAction={
              <Checkbox
                edge="end"
                className="check"
                onChange={handleSelect(c.id)}
                checked={checked === c.id}
                inputProps={{ "aria-labelledby": labelId }}
              />
            }
            disablePadding
          >
            <ListItemAvatar>
              <Avatar alt={`Avatar n°${c.id}`} className="avatar" />
            </ListItemAvatar>
            <ListItemText id={labelId} primary={c.name + " " + c.lastName} />
          </ListItem>
        );
      })}
    </List>
  );
};

export default CandidatesList;
