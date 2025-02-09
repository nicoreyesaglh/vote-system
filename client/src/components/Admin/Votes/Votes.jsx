import { useContext, useState } from 'react';
import { VoteContext } from '../../../context/VoteContext';
import './votes.css';
import { Grid2, Typography, Modal, ListItemText, ListItem, List, Box, Pagination, Divider } from '@mui/material';
import voteAPI from '../../../api/voteAPI';

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "#282c34",
  border: "1px solid #7000c6",
  borderRadius: "5px",
  boxShadow: 24,
  textAlign: "center",
  p: 4,
};

const Votes = () => {
  const { votes, topCandidates, fetchVotes } = useContext(VoteContext);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(votes.totalPages);
  const [loading, setLoading] = useState(false);
  const [voteInfo, setVoteInfo] = useState(null);
  const [openVoteInfo, setOpenVoteInfo] = useState(false);
  let limit = 10;
  
  const getTopVotedCandidate = (topCandidates) => {
    if (!topCandidates || topCandidates.length === 0) {
        return "No hay votos registrados.";
    }

    const maxVotes = topCandidates[0].total_votes;
    const topVoted = topCandidates.filter(c => c.total_votes === maxVotes);
    const voteWord = maxVotes === 1 ? "voto" : "votos";

    if (topVoted.length === 1) {
        return `El candidato más votado es ${topVoted[0].candidate} con ${maxVotes} ${voteWord}.`;
    } else {
        const names = topVoted.map(c => `${c.candidate}`).join(", ");
        return `Los candidatos más votados son: ${names}, con ${maxVotes} ${voteWord} cada uno.`;
    }
  };
  
  const getVoteInfo = async (vote_id) => {
    try {
      const response = await voteAPI.getVoteData({vote_id});
      setVoteInfo(response);
      setOpenVoteInfo(true);
    } catch (error) {
      console.error("Error al obtener datos del voto:", error);
    }
  };

  const handlePage = async (newPage) => {
      setPage(newPage)
    await fetchVotes(newPage, limit);
};



  return (
    <Grid2 className='votes-container'>
      <Typography variant='h1' className='title'>Todos los votos</Typography>
      {topCandidates && topCandidates.length > 0 && <Typography variant='h1' className='subtitle'>{getTopVotedCandidate(topCandidates)}</Typography>}
        <List className='list'>
            {votes?.data?.map((v) => {
              const labelId = `${v.id}`;
              const formattedDate = new Date(v.date).toLocaleDateString();
                return (
                    <ListItem
                        key={v.id + v.voter}
                        className='list-item'
                    disablePadding
                    onClick={() => getVoteInfo(v.id)}
                    >
                        <ListItemText
                            id={labelId}
                            primary={v.voter + ' votó por ' + v.candidate}
                           
                    />
                     <Typography
                                  component="span"
                                  variant="body2"
                                  sx={{padingLeft:'20px', color:'whitesmoke', fontFamily:'Poppins !important'}}
                                >
                                  { formattedDate}
                                </Typography>
                    </ListItem>
                );
            })}
      </List>
      <div style={{marginTop:'20px'}}>
        <Pagination count={totalPages} color='secondary' page={page} onChange={(e, value) => handlePage(value)} />
      </div>
      <Modal
          open={openVoteInfo}
          onClose={() => setOpenVoteInfo(false)}
          className='modal'
          >
        <Box sx={modalStyle}>
          <Typography variant='h4'>Datos del voto</Typography>
          <Divider color='#fff'/>
          {voteInfo && (
            <div style={{marginTop:'20px'}}>
            <Typography variant='h6' className='modal-subtitle'>{voteInfo.name} {voteInfo.lastName} votó por {voteInfo.candidate}</Typography>
            <Typography variant='body1' className='modal-body'>Fecha del voto: {new Date(voteInfo.date).toLocaleDateString()}</Typography>
            <Typography variant='body1' className='modal-body'>Documento: {voteInfo.document}</Typography>
            <Typography variant='body1' className='modal-body'>Fecha de Nacimiento: {new Date(voteInfo.dob).toLocaleDateString()}</Typography>
              {voteInfo.gender?.length > 0 && <Typography variant='body1' className='modal-body'>Género: {voteInfo.gender}</Typography>}
              {voteInfo.address?.length > 0 && <Typography variant='body1' className='modal-body'>Dirección: {voteInfo.address}</Typography>}
              {voteInfo.phone?.length > 0 && <Typography variant='body1' className='modal-body'>Teléfono: {voteInfo.phone}</Typography>}
            </div>
        )}
      </Box>
    </Modal>
    </Grid2>
    );
};

export default Votes;