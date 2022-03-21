import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown'
import './styles.css';
import Grid from '@material-ui/core/Grid';



const Navegador = (props) => {


  const [width, setWidth] = useState(0);


  function checkDimenssoes() {
    var largura = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;

    setWidth(largura);

  }

  window.addEventListener('resize', function (event) {
    checkDimenssoes();
  });

  useEffect(() => {

    checkDimenssoes();

  }, []);




  return (
    <div style={{ backgroundColor: 'rgba(3,0,15,0.6)', position: 'sticky', top: 0 }}>
      <div style={{ paddingTop: 20 }}>
        <Grid
          container
          direction={'row'}
        >
          <Grid item xs={12} sm={12} md={12} lg={2} xl={2}
            justifyContent="center"
            style={{ textAlign: "center" }}

          >
            <h1 >
              <span style={{ paddingLeft: 50, fontSize: 42, fontFamily: 'Verdana', color: 'white', fontWeight: 600 }}>titaniwm</span>
            </h1>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={10} xl={10}
          >
            <Navbar expand="lg" className={"color-nav"}>
              <Container  >
                <Navbar.Toggle style={{ marginBottom: 20, backgroundColor: 'rgba(255,255,255,0.8)' }} />
                <Navbar.Collapse
                  style={{
                    backgroundColor: width >= 1000 ? "rgba(0,0,0,0.0)" : "black",
                    padding: width >= 1000 ? '' : '5%',
                  }} >
                  <Nav className="ml-auto">


                    <NavDropdown
                      title="Produtos"
                      id="nav-dropdown"
                      style={{ textDecoration: props.servicos }}
                    >

                      <h2 >
                        <span style={{padding:10, fontSize: 22, fontFamily: 'Verdana', color: 'black', textAlign:'center' }}>Gestão</span>
                      </h2>
                      <NavDropdown.Item eventKey="1.0" id="nav-link-dropdown" href="/minhaconta">Contratos
                      </NavDropdown.Item>

                      <NavDropdown.Item eventKey="2.0" id="nav-link-dropdown" href="/patio">Finanças
                      </NavDropdown.Item>

                      <NavDropdown.Item eventKey="3.0" id="nav-link-dropdown" href="/cotacoes">RH
                      </NavDropdown.Item>


                    </NavDropdown>

                    <NavDropdown
                      title="Criação"
                      id="nav-dropdown"
                      style={{ textDecoration: props.servicos }}
                    >

                      <h2 >
                        <span style={{padding:10, fontSize: 22, fontFamily: 'Verdana', color: 'black', textAlign:'center' }}>Design e Inovação</span>
                      </h2>
                      <NavDropdown.Item eventKey="1.0" id="nav-link-dropdown" href="/minhaconta">WebSites
                      </NavDropdown.Item>

                      <NavDropdown.Item eventKey="2.0" id="nav-link-dropdown" href="/patio">Desktop
                      </NavDropdown.Item>

                      <NavDropdown.Item eventKey="3.0" id="nav-link-dropdown" href="/cotacoes">ChatBot
                      </NavDropdown.Item>


                    </NavDropdown>

                    <Nav.Item>
                      <Nav.Link id="nav-link" style={{ textDecoration: props.sobre }} href="/sobre">  a titaniwm</Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                      <Nav.Link id="nav-link" style={{ textDecoration: props.noticias }} href="/noticias">  BLog </Nav.Link>
                    </Nav.Item>





                    <Nav.Item>
                      <Nav.Link id="nav-link" style={{ textDecoration: props.contato }} href="/contato">Fale Conosco</Nav.Link>
                    </Nav.Item>
                  </Nav>

                </Navbar.Collapse>
              </Container>
            </Navbar>
          </Grid>
        </Grid>
      </div>



    </div>
  )
}
export default Navegador;
