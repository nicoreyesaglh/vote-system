import React, { useState, useContext } from "react";
import voteAPI from "../../../api/voteAPI";
import { Alert, Button, FormControl, FormControlLabel, FormLabel, Grid2, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material";
import './addVoter.css';

const AddVoter = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [document, setDocument] = useState("");
  const [dob, setDob] = useState("");
  const [is_candidate, setIsCandidate] = useState(0);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("M");
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    setConfirm("");

    //validar edad
    const today = new Date();
    const date = new Date(dob);
    let age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();
    const dayDiff = today.getDate() - date.getDate();
    // resta 1 a la edad si aún no ha cumplido los 18 años en este año
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }
    console.log(age)
    if (age < 18) {
      setError("Debes tener al menos 18 años.");
      return;
    }

    try {
      const voterData = {
        name,
        lastName,
        document,
        dob,
        is_candidate,
        address,
        phone,
        gender
      }; 
      const data = await voteAPI.createVoter(voterData);
      setConfirm("Votante creado con éxito");
      cleanStates();
    } catch (err) {
      setError("Ocurrió un error al crear al votante");
    }
  };

  const cleanStates = () => {
    setName("");
    setLastName("");
    setDocument("");
    setDob("");
    setIsCandidate(0);
    setAddress("");
    setPhone("");
    setGender("M");
  };
  
  return (
    <Grid2 className='container'>
      <h2 className="title">Añadir un nuevo votante</h2>
      {error && <Alert severity="error" sx={{marginBottom:'10px', width:'60%' }}>{error}</Alert>}
      {confirm && <Alert severity="success" sx={{marginBottom:'10px', width:'60%'}}>{confirm}</Alert>}
      <form onSubmit={handleCreate} className="form">
          <TextField
            type="text"
            variant='outlined'
            className="input"
            value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
            required
            slotProps={{
              input: {style:{ color: 'whitesmoke'}}
            }}
          />
        <TextField
          type="text"
          variant="outlined"
          className="input"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Apellido"
          required
          slotProps={{
            input: { style: { color: 'whitesmoke' } }
          }}
        />
        <TextField
          type="text"
          variant="outlined"
          className="input"
          value={document}
          onChange={(e) => setDocument(e.target.value)}
          placeholder="Documento"
          required
          slotProps={{
            input: { style: { color: 'whitesmoke' } }
          }}
        />
        <TextField
          type="date"
          variant="outlined"
          className="input"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
          placeholder="Fecha de Nacimiento: dd/mm/aaaa"
          slotProps={{
            input: { style: { color: 'whitesmoke' } }
          }}
        />
        <TextField
          type="text"
          variant="outlined"
          className="input"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Dirección"
          required
          slotProps={{
            input: { style: { color: 'whitesmoke' } }
          }}
        />
        <TextField
          type="tel"
          variant="outlined"
          className="input"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Teléfono"
          required
          slotProps={{
            input: { style: { color: 'whitesmoke' } }
          }}
        />
        <div className='div-radios' >
        <InputLabel className='label'>Género:</InputLabel>
        <RadioGroup
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          row
         sx={{width:'100%'}}
        >
          <FormControlLabel
            value={"M"}
            control={<Radio />}
            label="Masculino"
          />
          <FormControlLabel
            value={"F"}
            control={<Radio />}
            label="Femenino"
          />
           <FormControlLabel
            value={"O"}
            control={<Radio />}
            label="Otro"
          />
          </RadioGroup>
          </div>
        <div className='div-radios'>
        <InputLabel className='iscandidate'>¿Es Candidato?</InputLabel>
        <RadioGroup
          value={is_candidate}
          onChange={(e) => setIsCandidate(Number(e.target.value))}
          row
         sx={{width:'60%'}}
        >
          <FormControlLabel
            value={0}
            control={<Radio />}
            label="No"
            style={{ color: 'whitesmoke' }}
          />
          <FormControlLabel
            value={1}
            control={<Radio />}
            label="Sí"
            style={{ color: 'whitesmoke' }}
          />
          </RadioGroup>
          </div>
        <Button type="submit" className="button">Añadir votante</Button>
      </form>
     
    </Grid2>
  );
};

export default AddVoter;