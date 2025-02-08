const newVote = async (req, res) => {
    const { voteData } = req.body;

    res.send('newVote');
    // const { candidate_id, voter_id } = req.body;
    // const query = `INSERT INTO votes (candidate_id, voter_id) VALUES (${candidateId}, ${voterId})`;
    // try {
    //     await pool.query(query);
    //     res.status(201).send('Voto registrado');
    // } catch (error) {
    //     res.status(500).send('Error al registrar el voto');
    // }
};
    
module.exports = {
    newVote
};