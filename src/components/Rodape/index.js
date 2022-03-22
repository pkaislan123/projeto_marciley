import React from 'react'
import './styles.scss';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import logo from '../../assets/imgs/thanos_cartum.jpg';

const Rodape = () => {

    const date = new Date();


    return (
        <div>
            <div className="footer-top-area">
                <div className="zigzag-bottom"></div>
                <div className="container">
                    <div className="row">


                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                                <div className="footer-about-us">
                                    <img alt="img1" height={200} width={200}

                                        src={logo}
                                    />
                                    <h2>
                                        <span style={{ paddingTop: 20, fontSize: 42, fontWeight: 600 }} >
                                            projeto marciley
                                        </span>
                                    </h2>


                                </div>
                            </Grid>



                            <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                                <div className="footer-menu">
                                    <h2 className="footer-wid-title">Produtos</h2>
                                   
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                                <div className="footer-menu">
                                    <h2 className="footer-wid-title">Acesso Rápido</h2>
                                    <ul>
                                        <li><a href="/patio">Central de Ajuda</a></li>
                                    </ul>
                                </div>
                            </Grid>


                        </Grid>


                    </div>
                </div>
            </div>

            <div className="footer-bottom-area">
                <div className="container">
                    <Grid item xs={12} >
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ paddingTop: 20, fontSize: 20 }} >  &copy; titaniwm {moment(date).format("yyyy")} <br></br>  Todos os Direitos Reservados</p>
                        </div>
                    </Grid>

                </div>
            </div>

        </div>

    )
}
export default Rodape;