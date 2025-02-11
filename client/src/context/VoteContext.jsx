import React, { createContext, useState, useEffect, useContext } from "react";
import voteAPI from "../api/voteAPI";
import { useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const VoteContext = createContext();

export const VoteProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [candidates, setCandidates] = useState([]);
  const [votes, setVotes] = useState([]);
  const [topCandidates, setTopCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // cargar candidatos
    fetchCandidates();
    if (user) {
      //candidatos más votados
      fetchTopCandidates();
      //cargar votos
      fetchVotes();
    }
  }, [location]);

  const fetchTopCandidates = async () => {
    setLoading(true);
    try {
      const data = await voteAPI.getTopVotedCandidates();
      setTopCandidates(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const data = await voteAPI.getCandidates();
      setCandidates(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchVotes = async (page = 1, limit = 5) => {
    setLoading(true);
    try {
      const data = await voteAPI.getVotes(page, limit);
      setVotes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <VoteContext.Provider
      value={{
        candidates,
        votes,
        fetchVotes,
        fetchTopCandidates,
        topCandidates,
        loading,
        error,
      }}
    >
      {children}
    </VoteContext.Provider>
  );
};
