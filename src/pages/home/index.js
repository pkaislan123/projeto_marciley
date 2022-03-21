import React, { useState, useEffect } from 'react';
import Rodape from '../../components/Rodape';
import Navegador from '../../components/NavBar';
import capa from '../../assets/imgs/capa.jpg';
import Grid from '@material-ui/core/Grid';
import './styles.scss';
import api from '../../services/api';

import contrato from '../../assets/imgs/contrato.jpeg'

const Home = () => {


  const [dadosStatus, setDadosStatus] = useState([]);

  const [loading, setLoading] = useState(true);


  useEffect(() => {




    async function listarStatus() {
      try {

        const response = await api.get('/v1/protected/statusarmazem/listar');
        setDadosStatus(response.data)

        setLoading(false);

      } catch (_err) {
        // avisar('Houve um problema com o login, verifique suas credenciais! ' + cpf + " " + senha );
        console.log("Erro ao listar seus dados: " + _err)

      }

    }

    listarStatus();

  }, []);



  return (
    <div >
      <div style={{
        backgroundImage: `url(${capa})`,
        backgroundSize: "cover",
        height:1000

      }} >

        <Navegador inicio={'underline'} />


      </div>
      <div >
        <Rodape />
      </div>
    </div >
  );
}

export default Home;