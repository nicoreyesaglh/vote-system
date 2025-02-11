const API_URL = import.meta.env.VITE_API_BASE_ENDPOINT;
const token = localStorage.getItem("token");


const newVote = async (voteData) => {
    try {
        const response = await fetch(`${API_URL}/vote`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(voteData),
        });
   
        
        return response.json();
    } catch (error) {
        return { error: error.message };
    }
};

const createVoter = async (voterData) => {
    try {
        const response = await fetch(`${API_URL}/createVoter`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(voterData),
        });


        return response.json();

    } catch (error) {
        return { error: error.message };
    }
};

const getVotes = async (page = 1, limit = 10) => {
    try {
        const response = await fetch(`${API_URL}/getVotes?page=${page}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`, 
            },
        });
        return response.json();
    } catch (error) {
        return { error: error.message };
    }
};

const getCandidates = async () => {
    try {
        const response = await fetch(`${API_URL}/getCandidates`);
        return response.json();
    } catch (error) {
        return { error: error.message };
    }
};

const getVoteData = async (voteData) => {
   try{
        const response = await fetch(`${API_URL}/getVoteData`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(voteData),
        });
        return response.json();
    } catch (error) {
        return { error: error.message };
    }
};

const getTopVotedCandidates = async () => {
    try{
        const response = await fetch(`${API_URL}/getTopVotedCandidates`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        return response.json();
    } catch (error) {
        return { error: error.message };
    }
};





const voteAPI = {
    newVote,
    createVoter,
    getVotes,
    getCandidates,
    getVoteData,
    getTopVotedCandidates,
};

export default voteAPI;

