import { useContext, useState } from "react";
import { VoteContext } from "../../../context/VoteContext";
import "./mostVoted.css";
import {
  Grid2,
  Typography,
  ListItemText,
  ListItem,
  List,
  Box,
  Pagination,
  Divider,
} from "@mui/material";

const MostVoted = () => {
  const { topCandidates } = useContext(VoteContext);

  return (
    <Grid2 className="mostVoted-container">
      <Typography variant="h1" className="title">
        Candidatos
      </Typography>
      <List className="list">
        {topCandidates.map((c) => {
          const labelId = `${c.id}`;
          return (
            <ListItem key={c.id + c.name} className="list-item" disablePadding>
              <ListItemText id={labelId} primary={c.candidate} />
              <h2
                style={{
                  color: "whitesmoke",
                  fontFamily: "Poppins !important",
                  width: "30%",
                }}
              >
                {`${c.total_votes} ${c.total_votes === 1 ? "voto" : "votos"}`}
              </h2>
            </ListItem>
          );
        })}
      </List>
    </Grid2>
  );
};

export default MostVoted;
