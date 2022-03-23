import React, { useState, useEffect } from 'react';
import Rodape from '../../components/Rodape';
import Navegador from '../../components/NavBar';
import background from '../../assets/imgs/capa1.png';
import Skeleton from '@material-ui/lab/Skeleton';
import api from '../../services/api';
import Grid from '@material-ui/core/Grid';
import './styles.css';
import { Button, TextField, InputAdornment, Select, MenuItem,InputLabel } from '@material-ui/core/';
import { styled } from '@material-ui/core/styles';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import Carousel from 'react-bootstrap/Carousel'
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';



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

const SearchTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'green',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'green',
    },
    '&:hover fieldset': {
      borderColor: 'green',
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

  const [parametros, setParametros] = useState(
    {
      page: 0,
      size: 20,
      searchTerm: "%",
      ordem: 0,

    }
  );

  useEffect(() => {

    async function listarProdutos() {
      try {

        const response = await api.get('/v1/protected/produtos/listar', {
          params: {
            page: parametros.page,
            size: parametros.size,
            searchTerm: parametros.searchTerm,
            ordem: parametros.ordem,
          }
        });


        let dados = response.data.content.map((produto) => {

          produto['quantidade_a_vender'] = 1
          produto['isChecked'] = false;
          return produto;
        })

        setProdutos(dados);
        setLoading(false);

      } catch (_err) {
        // avisar('Houve um problema com o login, verifique suas credenciais! ' + cpf + " " + senha );
        console.log("Erro ao listar produtos: " + _err)

      }

    }

    listarProdutos();


  }, [parametros]);

  const handleQuantidade = (id_produto, qnt) => {
    let arraybkp = produtos;

    let novaLista = arraybkp.map((produto) => {


      if (produto.id_produto === id_produto) {

        if (qnt <= 0) {
          alert("Quantidade mínima: 1");
          produto['quantidade_a_vender'] = 1

        } else {
          if (qnt > produto.quantidade_produto) {
            alert("Quantidade em estoque: " + produto.quantidade_produto);
            produto['quantidade_a_vender'] = produto.quantidade_produto
          } else {
            produto['quantidade_a_vender'] = qnt
          }
        }
      }



      return produto;
    })

    setProdutos(novaLista);
  }



  const handleChecked = (id_produto) => {
    let arraybkp = produtos;

    let novaLista = arraybkp.map((produto) => {


      if (produto.id_produto === id_produto) {

        produto['isChecked'] = !produto.isChecked

      }


      return produto;
    })

    setProdutos(novaLista);
  }



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

      <Carousel interval={5000} fade style={{ width: '100%' }}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://s3.amazonaws.com/delivery.bretas.com.br/files/banner_imagens/8a025b5d364b88ae6b69d189509930f3.png"
            alt="First slide"
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://s3.amazonaws.com/delivery.bretas.com.br/files/banner_imagens/a3629d300be02b6193ccb9ed4aa9e70f.jpg"
            alt="Milho"
          />

          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://s3.amazonaws.com/delivery.bretas.com.br/files/banner_imagens/BANNER-DELIVERY-100x100px.png"
            alt="Third slide"
          />

          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>



      <div style={{ paddingTop: 10 }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          item xs={12} sm={12} md={12} lg={12} xl={12}
        >
          <Grid item xs={1} sm={1} md={1} lg={1} xl={1} >
          </Grid>
          <Grid item xs={10} sm={10} md={10} lg={10} xl={10} >
            <SearchTextField size="small" fullWidth id="searchTerm" name="searchTerm"
              onChange={e => setParametros(prevState => ({ ...prevState, [e.target.name]: e.target.value }))}
              label="" variant="outlined"
              InputProps={{
                startAdornment: <InputAdornment position="start">Pesquisa</InputAdornment>,
              }}
              placeholder="Entre com nome, descrição ou código do produto"

            />

          </Grid>
          <Grid item xs={1} sm={1} md={1} lg={1} xl={1} >
          </Grid>
        </Grid>
      </div>


      <div style={{ paddingTop: 10 }}>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
          spacing={1}
          item xs={12} sm={12} md={12} lg={12} xl={12}
        >
          <Grid item xs={1} sm={1} md={1} lg={1} xl={1} >
          </Grid>
          <Grid item xs={10} sm={10} md={10} lg={10} xl={10}
            container
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <InputLabel id="ordem">Ordenar por:</InputLabel>

            <Select
              labelId="ordem"
              id="ordem"
              value={parametros.ordem}
              name="ordem"
              onChange={e => setParametros(prevState => ({ ...prevState, [e.target.name]: e.target.value }))}
              label="ordem"
              style={{paddingLeft: 5}}
            >
              <MenuItem value={0} default >Mais Vendidos</MenuItem>
              <MenuItem value={1}>Menor Preço</MenuItem>
              <MenuItem value={2}>Maior Preço</MenuItem>
            </Select>

          </Grid>
          <Grid item xs={1} sm={1} md={1} lg={1} xl={1} >
          </Grid>
        </Grid>
      </div>


      <div >
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
                style={{ paddingTop: 20 }}
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

                      >
                        <img alt="img1" style={{ width: 200, height: 200 }}
                          src={produto.url_imagem}
                        />
                      </Grid>

                      <Grid
                        item xs={12} sm={12} md={12} lg={12} xl={12}

                      >
                        <p style={{ fontSize: 12, lineHeight: '6px', color: 'black' }}> Por apenas</p>
                        <p style={{ fontSize: 20, lineHeight: '6px', color: 'black', fontWeight: 'bold' }}>{formatter.format(produto.valor_produto)}</p>

                        <p style={{ fontSize: 16, lineHeight: '20px', color: 'black' }}>{produto.nome_produto} {produto.peso} {produto.pesagem.simbolo}</p>
                        <p style={{ fontSize: 12, lineHeight: '1px', color: 'black' }}>Código: {produto.codigo_produto}</p>


                      </Grid>



                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        item xs={12} sm={12} md={12} lg={12} xl={12}
                        style={{ paddingTop: 10, paddingBottom: 10 }}
                      >


                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => handleChecked(produto.id_produto)}
                        >
                          {produto.isChecked ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                        <Collapse in={produto.isChecked}>
                          <Grid
                            container
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            item xs={12} sm={12} md={12} lg={12} xl={12}
                            style={{ padding: 10 }}
                          >

                            <p style={{ margin: 0, fontSize: 12, color: 'black' }}> Descrição: <p style={{ margin: 0, fontSize: 14, color: 'black', fontWeight: 'bold' }}>{produto.descricao_produto}</p>  </p>
                            <p style={{ margin: 0, fontSize: 12, color: 'black' }}>Estoque: <p style={{ margin: 0, fontSize: 14, color: 'black', fontWeight: 'bold' }}> {produto.quantidade_produto}  </p>  </p>
                            <p style={{ margin: 0, fontSize: 12, color: 'black' }}> Quantidade Vendida: <p style={{ margin: 0, fontSize: 14, color: 'black', fontWeight: 'bold' }}>{produto.quantidade_produto_vendida}</p></p>

                          </Grid>
                        </Collapse>
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
                          label=""
                          type="number"
                          variant="outlined"
                          size="small"
                          helperText="quantidade"
                          value={produto.quantidade_a_vender}
                          style={{ width: 90, paddingRight: 10 }}
                          onChange={e => handleQuantidade(produto.id_produto, e.target.value)}
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
              >
                <span >Carrinho de Compras</span>
              </Grid>

            </Grid>
          </div>

        }


      </div>

      <div >
        <Rodape />
      </div>
    </div >
  );
}

export default Produtos;