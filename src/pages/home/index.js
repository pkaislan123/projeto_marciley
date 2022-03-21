import React from 'react';
import Rodape from '../../components/Rodape';
import Navegador from '../../components/NavBar';
import capa from '../../assets/imgs/capa.jpg';
import './styles.scss';

const Home = () => {







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