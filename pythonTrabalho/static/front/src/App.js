import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [cidades, setCidades] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    idCidade: null,
    nomeCidade: '',
    uf: '',
    populacao: '',
    anoFundacao: '',
    area: ''
  });
  const [loading, setLoading] = useState(false);

  const apiUrl = 'http://127.0.0.1:5000/cidade';

  const fetchCidades = async () => {
    setLoading(true);
    try {
      const res = await axios.get(apiUrl);
      setCidades(res.data);
    } catch (err) {
      alert('Erro ao buscar cidades');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCidades();
  }, []);

  const openModal = (cidade = null) => {
  if (cidade) {
    setForm({
      idCidade: cidade.idCidade ?? null,
      nomeCidade: cidade.nomeCidade ?? '',
      uf: cidade.uf ?? '',
      populacao: cidade.populacao ?? '',
      anoFundacao: cidade.anoFundacao ?? '',
      area: cidade.area ?? ''
    });
  } else {
    setForm({
      idCidade: null,
      nomeCidade: '',
      uf: '',
      populacao: '',
      anoFundacao: '',
      area: ''
    });
  }
  setModalOpen(true);
};

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('Dados enviados:', form); // 👈
  try {
    if (form.idCidade) {
      await axios.put(`${apiUrl}/${form.idCidade}/`, form);
    } else {
      await axios.post(apiUrl, form);
    }
    fetchCidades();
    closeModal();
  } catch (err) {
    alert('Erro ao salvar cidade');
  }
};
  const handleDelete = async (id) => {
    if (window.confirm('Deseja excluir esta cidade?')) {
      try {
        await axios.delete(`${apiUrl}/${id}/`);
        fetchCidades();
      } catch (err) {
        alert('Erro ao excluir cidade');
      }
    }
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Cadastro de Cidades</h1>
      <button className="btn btn-primary mb-3" onClick={() => openModal()}>Novo</button>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>id</th>
              <th>Nome da Cidade</th>
              <th>UF</th>
              <th>População</th>
              <th>Ano de Fundação</th>
              <th>Área</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7">Carregando...</td></tr>
            ) : cidades.length === 0 ? (
              <tr><td colSpan="7">Nenhuma cidade cadastrada.</td></tr>
            ) : (
              cidades.map((cidade) => (
                <tr key={cidade.idCidade}>
                  <td>{cidade.idCidade}</td>
                  <td>{cidade.nomeCidade}</td>
                  <td>{cidade.uf}</td>
                  <td>{cidade.populacao}</td>
                  <td>{cidade.anoFundacao}</td>
                  <td>{cidade.area}</td>
                  <td>
                    <button className="btn btn-sm btn-secondary me-2" onClick={() => openModal(cidade)}>Editar</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(cidade.idCidade)}>Excluir</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal show fade d-block" tabIndex="-1" role="dialog" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">{form.idCidade ? 'Editar Cidade' : 'Nova Cidade'}</h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Nome da Cidade</label>
                    <input type="text" className="form-control" name="nomeCidade" value={form.nomeCidade} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">UF</label>
                    <input type="text" className="form-control" name="uf" value={form.uf} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">População</label>
                    <input type="number" className="form-control" name="populacao" value={form.populacao} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Ano de Fundação</label>
                    <input type="number" className="form-control" name="anoFundacao" value={form.anoFundacao} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Área</label>
                    <input type="number" className="form-control" name="area" value={form.area} onChange={handleChange} required />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancelar</button>
                  <button type="submit" className="btn btn-primary">Salvar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
