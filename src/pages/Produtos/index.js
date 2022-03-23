import React, { useState, useEffect } from 'react';
import Rodape from '../../components/Rodape';
import Navegador from '../../components/NavBar';
import background from '../../assets/imgs/capa1.png';
import Skeleton from '@material-ui/lab/Skeleton';
import api from '../../services/api';
import Grid from '@material-ui/core/Grid';
import './styles.css';
import { Button, TextField } from '@material-ui/core/';
import { styled } from '@material-ui/core/styles';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'green',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'orange',
    },
    '&:hover fieldset': {
      borderColor: 'orange',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'green',
    },
  },
});
const Produtos = () => {


  const [loading, setLoading] = useState(true);
  const [produtos, setProdutos] = useState([]);

  var formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  const [parametros] = useState(
    {
      page: 0,
      size: 20,

    }
  );

  useEffect(() => {

    async function listarProdutos() {
      try {

        const response = await api.get('/v1/protected/produtos/listar', {
          params: {
            page: parametros.page,
            size: parametros.size
          }
        });
        setProdutos(response.data.content)
        setLoading(false);

      } catch (_err) {
        // avisar('Houve um problema com o login, verifique suas credenciais! ' + cpf + " " + senha );
        console.log("Erro ao listar produtos: " + _err)

      }

    }

    listarProdutos();


  }, [parametros]);


  return (
    <div >
      <div style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",


      }} >

        <Navegador noticias={'underline'} />

        <div style={{ height: 5, backgroundColor: '#808080' }}>
        </div>
      </div>



      <div>
        {loading ?
          <Skeleton animation={"wave"} width={'100%'} style={{ backgroundColor: '#48D1CC' }}>
          </Skeleton>
          :
          <div>


            <Grid
              container
              direction="row"
              item xs={12} sm={12} md={12} lg={12} xl={12}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={1} sm={1} md={1} lg={1} xl={1} >
              </Grid>

              <Grid item xs={12} sm={10} md={9} lg={9} xl={9}
                container
                spacing={3}
              >

                {
                  produtos.map((produto) => (
                    <Grid
                      key={produto.id_produto}
                      container
                      direction="row"
                      item xs={12} sm={6} md={4} lg={3} xl={3}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Grid
                        item xs={12} sm={12} md={12} lg={12} xl={12}
                        justifyContent="flex-start"
                        alignItems="flex-start"
                      >
                        <img alt="img1" style={{ width: 250, height: 250 }}
                          src={produto.url_imagem}
                        />
                      </Grid>

                      <Grid
                        item xs={12} sm={12} md={12} lg={12} xl={12}
                        justifyContent="flex-start"
                        alignItems="flex-start"
                      >
                        <p style={{ fontSize: 12, lineHeight: '6px', color: 'black' }}> Por apenas</p>
                        <p style={{ fontSize: 20, lineHeight: '6px', color: 'black', fontWeight: 'bold' }}>{formatter.format(produto.valor_produto)}</p>

                        <p style={{ fontSize: 16, lineHeight: '20px', color: 'black' }}>{produto.nome_produto} {produto.peso} {produto.pesagem.simbolo}</p>


                      </Grid>


                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        style={{ padding: 10 }}
                        spacing={3}
                      >

                       
                          <CssTextField
                            id={produto.id_produto}
                            label=""
                            type="number"
                            variant="outlined"
                            size="small"
                            helperText="quantidade"
                            style={{width: 90, paddingRight: 10}}
                          />
                      
                          <Button
                            variant="contained" color="primary" size="small" 
                            startIcon={<LocalGroceryStoreIcon />} >
                              Comprar</Button>
                      </Grid>


                    </Grid>

                  ))
                }
              </Grid>


              <Grid item xs={12} sm={12} md={12} lg={2} xl={2} style={{ top: 0, backgroundColor: 'red' }}
                justifyContent="flex-start"
                alignItems="flex-start">
                <span >Carrinho de Compras</span>
              </Grid>

            </Grid>
          </div>

        }


      </div>

      <div >
        <Rodape />
      </div>
    </div>
  );
}

export default Produtos;