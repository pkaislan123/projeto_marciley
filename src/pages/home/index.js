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