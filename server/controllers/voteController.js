const pool = require('../db');

const newVote = async (req, res) => {
    try {
        const { document, candidate_id } = req.body;

        if (!document || !candidate_id) {
            return res.status(400).json({ error: "El documento y el candidato son obligatorios" });
        }

        // validar si el documento existe en la tabla voter
        const [voterRows] = await pool.query('SELECT * FROM voter WHERE document = ?', [document]);
        if (voterRows.length === 0) {
            return res.status(404).json({ error: "Documento no habilitado para votar" });
        }
        const voter = voterRows[0];

        //validar si el votante ya ha votado
        const [voteRows] = await pool.query('SELECT * FROM vote WHERE voter_id = ?', [voter.id]);
        if (voteRows.length > 0) {
            return res.status(400).json({ error: "El documento ingresado ya ha votado" });
        }

        //validar si el candidato es válido (existe y es candidato)
        const [candidateRows] = await pool.query('SELECT * FROM voter WHERE id = ? AND is_candidate = 1', [candidate_id]);
        if (candidateRows.length === 0) {
            return res.status(404).json({ error: "El candidato no existe o no es válido" });
        }

        //Registrar el voto
        await pool.query('INSERT INTO vote (voter_id, candidate_voted_id, date) VALUES (?, ?, NOW())', [voter.id, candidate_id]);

        res.status(201).json({ message: "Votación registrada correctamente" });

    } catch (error) {
        console.error("Error en newVote:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

const createVoter = async (req, res) => {
    try {
        const { name, lastName, document, dob, is_candidate, address, phone, gender } = req.body;

        if (!name || !lastName || !document || !dob || is_candidate === undefined || !address || !phone || !gender) {
            return res.status(400).json({ error: "Faltan datos necesarios para crear el votante" });
        }

        // validar si ya existe el votante
        const [existingVoterRows] = await pool.query('SELECT * FROM voter WHERE document = ?', [document]);
        if (existingVoterRows.length > 0) {
            return res.status(400).json({ error: "El documento ya está registrado" });
        }

        // crear el votante
        await pool.query('INSERT INTO voter (name, lastName, document, dob, is_candidate, address, phone, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [
            name,
            lastName,
            document,
            dob,
            is_candidate,
            address,
            phone,
            gender
        ]);

        res.status(201).json({ message: "Votante creado correctamente" });

    } catch (error) {
        console.error("Error en createVoter:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

const getCandidates = async (req, res) => {
    try {
        //consultar todos los candidatos
        const [rows] = await pool.query('SELECT * FROM voter WHERE is_candidate = 1');
        res.json(rows);
    } catch (error) {
        console.error("Error en getCandidates:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

const getVotes = async (req, res) => {
    try {
        //consultar todos los votos
        const [rows] = await pool.query('SELECT * FROM vote');
        res.json(rows);
    } catch (error) {
        console.error("Error en getVotes:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

const getVoteData = async (req, res) => {
    try {
        const { voter_id, candidate_id } = req.body;

        // consultar los datos del votante
        const [voterRows] = await pool.query('SELECT * FROM voter WHERE id = ?', [voter_id]);
        if (voterRows.length === 0) {
            return res.status(404).json({ error: "Votante no encontrado" });
        }
        const voter = voterRows[0];

        // consultar los datos del candidato
        const [candidateRows] = await pool.query('SELECT * FROM voter WHERE id = ? AND is_candidate = 1', [candidate_id]);
        if (candidateRows.length === 0) {
            return res.status(404).json({ error: "Candidato no encontrado o no es un candidato válido" });
        }
        const candidate = candidateRows[0];

        // agrupar ambos resultados en la respuesta
        res.json({ voter, candidate });

    } catch (error) {
        console.error("Error en getVoteData:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

const getTopVotedCandidates = async (req, res) => {
    try {
        //Candidatos con sus votos, haciendo conteo de votos con join de las tablas voter y vote y ordenarlos de mayor a menor
        const [rows] = await pool.query(`
            SELECT v.id, v.name, v.lastName, COUNT(vt.candidate_voted_id) AS total_votes
            FROM voter v
            JOIN vote vt ON v.id = vt.candidate_voted_id
            WHERE v.is_candidate = 1
            GROUP BY v.id
            ORDER BY total_votes DESC
        `);

        res.json(rows);

    } catch (error) {
        console.error("Error en getTopVotedCandidates:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
    
module.exports = {
    newVote,
    createVoter,
    getCandidates,
    getVotes,
    getVoteData,
    getTopVotedCandidates
};