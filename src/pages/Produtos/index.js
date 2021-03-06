
import React, { useState, useEffect } from 'react';
import Rodape from '../../components/Rodape';
import Navegador from '../../components/NavBar';
import background from '../../assets/imgs/capa1.png';
import Skeleton from '@material-ui/lab/Skeleton';
import api from '../../services/api';
import Grid from '@material-ui/core/Grid';
import './styles.css';
import { Button, TextField, InputAdornment, Select, MenuItem, InputLabel } from '@material-ui/core/';
import { styled } from '@material-ui/core/styles';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import Carousel from 'react-bootstrap/Carousel'
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import DeleteIcon from '@material-ui/icons/Delete';

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
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    opacity: 1,
    margin: 0,
  }



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

const CustomButtom = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 14,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#0063cc',
  borderColor: '#FFF',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: 'green',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});


const CustomButtom3 = styled(Button)({
  boxShadow: 'none',
  color: 'black',
  textTransform: 'none',
  fontSize: 14,
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: 'white',
  borderColor: '#000',

  '&:hover': {
    backgroundColor: 'red',
    borderColor: 'white',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: 'orange',
    borderColor: 'white',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});


const CustomButtom2 = styled(Button)({
  boxShadow: 'none',
  color: 'white',
  textTransform: 'none',
  fontSize: 14,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: 'orange',
  borderColor: '#FFF',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: 'orange',
    borderColor: 'white',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: 'orange',
    borderColor: 'white',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});



const Produtos = () => {


  const [loading, setLoading] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [num_itens_carrinho, setNumItensCarrinho] = useState(0);
  const [valor_total_carrinho, setValorTotalCarrinho] = useState(0.0);


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
      searchTerm: "",
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

        console.log("funcao chamada!")

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


    function recuperarCarrinhoInicial(carrinho) {
      try {
        try {
          if (localStorage.getItem('carrinho') !== "undefined" && localStorage.getItem('carrinho') != null) {
            console.log("cookie nao e indefinido");


            let json_str = localStorage.getItem('carrinho');
            let carrinho_atual = JSON.parse(json_str);

            setCarrinho(carrinho_atual);

            let valor_total = 0.0;
            let total_itens = 0;

            carrinho_atual.map((item) => {

              valor_total += (item.valor_produto * item.quantidade_a_vender);
              total_itens += parseInt(item.quantidade_a_vender)

              return item;
            });
            setNumItensCarrinho(total_itens)
            setValorTotalCarrinho(valor_total);

          } else {
            console.log("cookie e indefinido");

            var carrinho_para_json = JSON.stringify(carrinho);
            localStorage.setItem('carrinho', carrinho_para_json);

          }
        } catch (_err) {

          carrinho_para_json = JSON.stringify(carrinho);
          localStorage.setItem('carrinho', carrinho_para_json);

        }
      } catch (_err) {
        setCarrinho(carrinho)
      }
    }

    listarProdutos();

    recuperarCarrinhoInicial();

  }, [parametros]);

  const handleQuantidade = (id_produto, qnt) => {
    let arraybkp = produtos;

    let novaLista = arraybkp.map((produto) => {


      if (produto.id_produto === id_produto) {

        if (qnt <= 0) {
          alert("Quantidade m??nima: 1");
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

  const handleComprar = (id_produto) => {

    const produto_index = produtos.findIndex(produto => produto.id_produto === id_produto);

    let novo_array = carrinho;
    novo_array.push(produtos[produto_index]);

    setCarrinho(novo_array);


    let valor_total = 0.0;
    let total_itens = 0;
    novo_array.map((item) => {

      valor_total += (item.valor_produto * item.quantidade_a_vender);
      total_itens += parseInt(item.quantidade_a_vender)
      return item;
    });


    var carrinho_para_json = JSON.stringify(carrinho);
    localStorage.setItem('carrinho', carrinho_para_json);

    setNumItensCarrinho(total_itens)
    setValorTotalCarrinho(valor_total);
  }


  function recuperarCarrinho() {

    try {
      if (localStorage.getItem('carrinho') !== "undefined" && localStorage.getItem('carrinho') != null) {
        console.log("cookie nao e indefinido");


        let json_str = localStorage.getItem('carrinho');
        let carrinho_atual = JSON.parse(json_str);

        setCarrinho(carrinho_atual);

        let valor_total = 0.0;
        let total_itens = 0;

        carrinho_atual.map((item) => {

          valor_total += (item.valor_produto * item.quantidade_a_vender);
          total_itens += parseInt(item.quantidade_a_vender)

          return item;
        });
        setNumItensCarrinho(total_itens)
        setValorTotalCarrinho(valor_total);

      } else {
        console.log("cookie e indefinido");

        var carrinho_para_json = JSON.stringify(carrinho);
        localStorage.setItem('carrinho', carrinho_para_json);

      }
    } catch (_err) {

      carrinho_para_json = JSON.stringify(carrinho);
      localStorage.setItem('carrinho', carrinho_para_json);

    }

  }

  function handleLimparCarrinho() {
    var carrinho_para_json = JSON.stringify([]);
    localStorage.setItem('carrinho', carrinho_para_json);
    recuperarCarrinho();
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
              placeholder="Entre com nome, descri????o ou c??digo do produto"

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
              style={{ paddingLeft: 5 }}
            >
              <MenuItem value={0} default >Mais Vendidos</MenuItem>
              <MenuItem value={1}>Menor Pre??o</MenuItem>
              <MenuItem value={2}>Maior Pre??o</MenuItem>
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
              justifyContent="flex-start"
              alignItems="flex-start"
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
                        <p style={{ fontSize: 12, lineHeight: '1px', color: 'black' }}>C??digo: {produto.codigo_produto}</p>


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
                          <span style={{ fontSize: 12, color: 'black' }}>
                            Descri????o
                          </span>
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

                            <p style={{ margin: 0, fontSize: 12, color: 'black' }}> Descri????o: <p style={{ margin: 0, fontSize: 14, color: 'black', fontWeight: 'bold' }}>{produto.descricao_produto}</p>  </p>
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
                          startIcon={<LocalGroceryStoreIcon />}
                          onClick={() => {
                            handleComprar(produto.id_produto);
                          }}
                        >
                          Comprar</Button>
                      </Grid>

                    </Grid>

                  ))
                }
              </Grid>


              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{ paddingTop: 20, backgroundColor: 'green', margin: 10 }}
                item xs={12} sm={12} md={12} lg={2} xl={2}
              >
                <Grid
                  item xs={12} sm={12} md={12} lg={12} xl={12}
                >
                  <span style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Carrinho de Compras</span>
                </Grid>

                <Grid
                  item xs={12} sm={12} md={12} lg={12} xl={12}
                  style={{ padding: 20 }}
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >

                  <Grid
                    item xs={6} sm={6} md={6} lg={6} xl={6}
                    alignItems="flex-end"
                    container
                    justifyContent="flex-end"

                  >
                    <CustomButtom3
                      onClick={() => handleLimparCarrinho()}
                    >
                      <DeleteIcon />
                    </CustomButtom3>
                  </Grid>

                  <Grid
                    alignItems="flex-start"
                    container
                    justifyContent="flex-start"
                    item xs={6} sm={6} md={6} lg={6} xl={6}
                  >
                    <CustomButtom2
                    >
                      <a
                        style={{ fontWeight: 'bold', color: 'white' }}
                        href={"/carrinho"}>
                        {num_itens_carrinho} itens {formatter.format(valor_total_carrinho)} </a>
                    </CustomButtom2>
                  </Grid>

                </Grid>


                <Grid
                  item xs={12} sm={12} md={12} lg={12} xl={12}
                  style={{ padding: 20 }}
                >
                  <CustomButtom
                    variant="contained" color="primary" size="small"
                    startIcon={<LocalGroceryStoreIcon />} >

                    <a
                      style={{ fontWeight: 'bold' }}
                      href={"/carrinho"}>

                      Finalizar Pedido</a>

                  </CustomButtom>
                </Grid>
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
