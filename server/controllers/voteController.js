const pool = require("../db");

const newVote = async (req, res) => {
  try {
    const { document, candidate_id } = req.body;

    if (!document || !candidate_id) {
      return res
        .status(400)
        .json({ error: "El documento y el candidato son obligatorios" });
    }

    // validar si el documento existe en la tabla voter
    const [voterRows] = await pool.query(
      "SELECT * FROM voter WHERE document = ?",
      [document]
    );
    if (voterRows.length === 0) {
      return res
        .status(404)
        .json({ error: "Documento no habilitado para votar" });
    }
    const voter = voterRows[0];

    //validar si el votante ya ha votado
    const [voteRows] = await pool.query(
      "SELECT * FROM vote WHERE voter_id = ?",
      [voter.id]
    );
    if (voteRows.length > 0) {
      return res
        .status(400)
        .json({ error: "El documento ingresado ya ha votado" });
    }

    //validar si el candidato es válido (existe y es candidato)
    const [candidateRows] = await pool.query(
      "SELECT * FROM voter WHERE id = ? AND is_candidate = 1",
      [candidate_id]
    );
    if (candidateRows.length === 0) {
      return res
        .status(404)
        .json({ error: "El candidato no existe o no es válido" });
    }

    //Registrar el voto
    await pool.query(
      "INSERT INTO vote (voter_id, candidate_voted_id, date) VALUES (?, ?, NOW())",
      [voter.id, candidate_id]
    );

    res.status(201).json({ message: "Votación registrada correctamente" });
  } catch (error) {
    console.error("Error en newVote:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const createVoter = async (req, res) => {
  try {
    const {
      name,
      lastName,
      document,
      dob,
      is_candidate,
      address,
      phone,
      gender,
    } = req.body;

    if (
      !name ||
      !lastName ||
      !document ||
      !dob ||
      is_candidate === undefined ||
      !address ||
      !phone ||
      !gender
    ) {
      return res
        .status(400)
        .json({ error: "Faltan datos necesarios para crear el votante" });
    }

    // validar si ya existe el votante
    const [existingVoterRows] = await pool.query(
      "SELECT * FROM voter WHERE document = ?",
      [document]
    );
    if (existingVoterRows.length > 0) {
      return res.status(400).json({ error: "El documento ya está registrado" });
    }

    // crear el votante
    await pool.query(
      "INSERT INTO voter (name, lastName, document, dob, is_candidate, address, phone, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [name, lastName, document, dob, is_candidate, address, phone, gender]
    );

    res.status(201).json({ message: "Votante creado correctamente" });
  } catch (error) {
    console.error("Error en createVoter:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const getCandidates = async (req, res) => {
  try {
    //consultar todos los candidatos
    const [rows] = await pool.query(
      "SELECT * FROM voter WHERE is_candidate = 1"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error en getCandidates:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const getVotes = async (req, res) => {
  try {
    //opciones de paginado obtenidas del query
    const { page = 1, limit = 5 } = req.query;
    const offset = (page - 1) * limit;

    //consultar los votos y obtener datos del votante y candidato
    const [rows] = await pool.query(
      `
            SELECT v.id, v.voter_id, v.candidate_voted_id, v.date,
            CONCAT(voter.name, ' ', voter.lastName) AS voter,
            CONCAT(candidate.name, ' ', candidate.lastName) AS candidate
            FROM vote v
            JOIN voter AS voter ON v.voter_id = voter.id
            JOIN voter AS candidate ON v.candidate_voted_id = candidate.id
            LIMIT ? OFFSET ?
            `,
      [Number(limit), offset]
    );

    //calculo de paginas
    const [countRows] = await pool.query("SELECT COUNT(*) AS total FROM vote");
    const totalVotes = countRows[0].total;
    const totalPages = Math.ceil(totalVotes / limit);

    res.json({
      data: rows,
      totalVotes,
      totalPages,
      currentPage: page,
      votesPerPage: limit,
    });
  } catch (error) {
    console.error("Error en getVotes:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const getVoteData = async (req, res) => {
  try {
    const { vote_id } = req.body;

    const [rows] = await pool.query(
      `
            SELECT 
            v.id, 
            v.voter_id, 
            v.candidate_voted_id, 
            v.date,
            voter.*,  -- Trae todos los campos del votante
            CONCAT(candidate.name, ' ', candidate.lastName) AS candidate
            FROM vote v
            JOIN voter AS voter ON v.voter_id = voter.id
            JOIN voter AS candidate ON v.candidate_voted_id = candidate.id AND candidate.is_candidate = 1
            WHERE v.id = ?
        `,
      [vote_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Voto no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error en getVoteData:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const getTopVotedCandidates = async (req, res) => {
  try {
    //Candidatos con sus votos, haciendo conteo de votos con join de las tablas voter y vote y ordenarlos de mayor a menor
    const [rows] = await pool.query(`
            SELECT v.id, CONCAT(v.name, ' ', v.lastName) AS candidate,
            COUNT(vt.candidate_voted_id) AS total_votes
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
  getTopVotedCandidates,
};
