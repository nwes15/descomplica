import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import CriarTarefa from './CriarTarefa';
import EditarTarefa from './EditarTarefa';

// Função para criar dados
function createData(
  idTarefa: number,
  tituloTarefa: string,
  descricaoTarefa: string,
  inicioTarefa: string,
  fimTarefa: string,
  statusTarefa: string,
  recursoTarefa: string
) {
  return { idTarefa, tituloTarefa, descricaoTarefa, inicioTarefa, fimTarefa, statusTarefa, recursoTarefa };
}

// Array inicial de tarefas
const initialRows = [
  createData(1, 'Tarefa 1', 'Descrição da Tarefa 1', '2024-01-01', '2024-01-02', 'Concluída', 'Recurso 1'),
  createData(2, 'Tarefa 2', 'Descrição da Tarefa 2', '2024-01-03', '2024-01-04', 'Em Andamento', 'Recurso 2'),
  createData(3, 'Tarefa 3', 'Descrição da Tarefa 3', '2024-01-04', '2024-01-05', 'Aguardando', 'Recurso 3'),
  createData(4, 'Tarefa 4', 'Descrição da Tarefa 4', '2024-01-05', '2024-01-06', 'Em Andamento', 'Recurso 4'),
  createData(5, 'Tarefa 5', 'Descrição da Tarefa 5', '2024-01-06', '2024-01-07', 'Concluída', 'Recurso 5'),
];

const ListarTarefa = () => {
  const [open, setOpen] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [tarefas, setTarefas] = useState(initialRows);
  const [tarefa, setTarefa] = useState();
  const [idTarefaSelecionada, setIdTarefaSelecionada] = useState();
  const [filtroStatus, setFiltroStatus] = useState(''); // Novo estado para filtro

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenEditar = () => setOpenEditar(true);
  const handleCloseEditar = () => setOpenEditar(false);

  const handleEditar = (id) => {
    setIdTarefaSelecionada(id);
    const tarefaParaEditar = tarefas.find((obj) => obj.idTarefa === id);
    setTarefa(tarefaParaEditar);
    setOpenEditar(true);
  };

  const handleDeletar = (id) => {
    setTarefas((current) => current.filter((tarefa) => tarefa.idTarefa !== id));
  };

  // Filtrar tarefas com base no status
  const tarefasFiltradas = filtroStatus
    ? tarefas.filter((tarefa) => tarefa.statusTarefa === filtroStatus)
    : tarefas;

  return (
    <>
      <Card>
        <CardHeader title="Tarefas" subheader="Listagem de Tarefas" />
        <CardContent>
          {/* Filtro por status */}
          <TextField
            label="Filtrar por Status"
            select
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="Concluída">Concluída</MenuItem>
            <MenuItem value="Em Andamento">Em Andamento</MenuItem>
            <MenuItem value="Aguardando">Aguardando</MenuItem>
          </TextField>

          {/* Tabela de tarefas */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Título</TableCell>
                  <TableCell align="right">Descrição</TableCell>
                  <TableCell align="right">Data de Início</TableCell>
                  <TableCell align="right">Data de Finalização</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Recurso</TableCell>
                  <TableCell align="center">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tarefasFiltradas.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.idTarefa}</TableCell>
                    <TableCell>{row.tituloTarefa}</TableCell>
                    <TableCell align="right">{row.descricaoTarefa}</TableCell>
                    <TableCell align="right">{row.inicioTarefa}</TableCell>
                    <TableCell align="right">{row.fimTarefa}</TableCell>
                    <TableCell align="right">{row.statusTarefa}</TableCell>
                    <TableCell align="right">{row.recursoTarefa}</TableCell>
                    <TableCell align="center">
                      <Button variant="contained" color="success" onClick={() => handleEditar(row.idTarefa)}>
                        <EditIcon fontSize="small" />
                      </Button>
                      <Button variant="contained" color="error" onClick={() => handleDeletar(row.idTarefa)}>
                        <DeleteIcon fontSize="small" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        <CardActions>
          <Button size="small" variant="contained" onClick={handleOpen}>
            Criar Tarefa
          </Button>
        </CardActions>
      </Card>

      {/* Modais */}
      <Modal open={open} onClose={handleClose}>
        <CriarTarefa handleClose={handleClose} tarefas={tarefas} setTarefas={setTarefas} />
      </Modal>

      <Modal open={openEditar} onClose={handleCloseEditar}>
        <EditarTarefa
          handleCloseEditar={handleCloseEditar}
          idTarefaSelecionada={idTarefaSelecionada}
          tarefas={tarefas}
          tarefa={tarefa}
          setTarefas={setTarefas}
        />
      </Modal>
    </>
  );
};

export default ListarTarefa;
