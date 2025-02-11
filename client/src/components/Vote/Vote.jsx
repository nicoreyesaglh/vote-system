import React, { useContext, useState } from "react";
import {
  Alert,
  Button,
  Grid2,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import "./vote.css";
import CandidatesList from "./CandidatesList";
import { VoteContext } from "../../context/VoteContext";
import voteAPI from "../../api/voteAPI";

const Vote = () => {
  const { candidates } = useContext(VoteContext);
  const [document, setDocument] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [checked, setChecked] = useState(null);
  const [error, setError] = useState(null);
  const [confirm, setConfirm] = useState(null);

  const handleVote = async (e) => {
    setError(null);
    setConfirm(null);
    e.preventDefault();

    if (!selectedCandidate) {
      setError("Debes seleccionar un candidato");
      return;
    }
    if (!document) {
      setError("Debes ingresar tu documento");
      return;
    }

    try {
      const voteData = {
        document,
        candidate_id: selectedCandidate,
      };
      const data = await voteAPI.newVote(voteData);
      if (data.error) {
        setError(data.error);
        return;
      }
      setConfirm(data.message);
      setChecked(null);
      setDocument("");
      setSelectedCandidate(null);
    } catch (err) {
      setError(err.error);
    }
  };

  return (
    <Grid2 className="vote-container">
      <Typography variant="h2" className="title">
        ¿Estás listo para votar?
      </Typography>
      <form onSubmit={handleVote} className="form">
        <div className="input-container">
          <InputLabel className="label">
            Primero ingresa tu documento
          </InputLabel>
          <TextField
            id="outlined-basic"
            className="input"
            variant="outlined"
            type="text"
            value={document}
            onChange={(e) => setDocument(e.target.value)}
            placeholder="Ej. 51234568"
            slotProps={{
              input: { style: { color: "whitesmoke" } },
            }}
          />
        </div>
        {candidates && candidates.length > 0 && (
          <CandidatesList
            candidates={candidates}
            setSelectedCandidate={setSelectedCandidate}
            checked={checked}
            setChecked={setChecked}
          />
        )}
        <Button type="submit" className="button">
          Enviar Voto
        </Button>
      </form>
      {error && (
        <Alert
          severity="error"
          sx={{ marginTop: "30px", width: "80%", fontFamily: "Poppins" }}
        >
          {error}
        </Alert>
      )}
      {confirm && (
        <Alert
          severity="success"
          sx={{ marginTop: "10px", width: "80%", fontFamily: "Poppins" }}
        >
          {confirm}
        </Alert>
      )}
    </Grid2>
  );
};

export default Vote;
