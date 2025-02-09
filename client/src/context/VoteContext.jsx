import React, { createContext, useState, useEffect } from 'react';
import voteAPI from '../api/voteAPI';

export const VoteContext = createContext();

export const VoteProvider = ({ children }) => {
  const [candidates, setCandidates] = useState([]);
  const [votes, setVotes] = useState([]);
  const [topCandidates, setTopCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // cargar candidatos
  useEffect(() => {
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
    fetchCandidates();
  }, []);

  //candidatos más votados
  useEffect(() => {
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
    fetchTopCandidates();
  }, []);

  return (
    <VoteContext.Provider value={{ candidates, votes, topCandidates, loading, error }}>
      {children}
    </VoteContext.Provider>
  );
};