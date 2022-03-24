
import React, { useState, useEffect } from 'react';
import Rodape from '../../components/Rodape';
import Navegador from '../../components/NavBar';
import background from '../../assets/imgs/capa1.png';
import './styles.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { styled } from '@material-ui/core/styles';
import { TextField, Button, Select, MenuItem } from '@material-ui/core/';



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

const Carrinho = () => {


    const [carrinho, setCarrinho] = useState([]);
    const [valorTotal, setValorTotal] = useState(0.0);
    const [formaPagamento, setFormaPagamento] = useState(0);


    var formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });


    useEffect(() => {

        function recuperarCarrinho(carrinho) {

            try {
                if (localStorage.getItem('carrinho') !== "undefined" && localStorage.getItem('carrinho') != null) {
                    console.log("cookie nao e indefinido");

                    let json_str = localStorage.getItem('carrinho');
                    let carrinho_atual = JSON.parse(json_str);



                    let carrinho_configurado = []

                    carrinho_atual.map((produto) => {
                        let index = carrinho_configurado.findIndex(produto_na_lista => produto_na_lista.codigo_produto === produto.codigo_produto);
                        produto['isChecked'] = false


                        if (index < 0) {
                            console.log("produto cod " + produto.codigo_produto + " nao existe na lista, adicionando")
                            carrinho_configurado.push(produto);
                        } else {
                            console.log("produto cod " + produto.codigo_produto + " existe na lista, somando quantidades")
                            let quantidade_atual = parseInt(carrinho_configurado[index].quantidade_a_vender)
                            carrinho_configurado[index].quantidade_a_vender = quantidade_atual + parseInt(produto.quantidade_a_vender);
                        }

                        return produto;
                    })

                    let valor_total = 0.0;


                    carrinho_configurado.map((item) => {

                        valor_total += (item.valor_produto * item.quantidade_a_vender);

                        return item;
                    });
                    setValorTotal(valor_total);

                    setCarrinho(carrinho_configurado);

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


        recuperarCarrinho();

    }, []);



    const handleChecked = (id_produto) => {
        let arraybkp = carrinho;

        let novaLista = arraybkp.map((produto) => {


            if (produto.id_produto === id_produto) {

                produto['isChecked'] = !produto.isChecked

            }


            return produto;
        })

        setCarrinho(novaLista);
    }


    function gerarPedido(){
        let texto_inicial = " \n\n Projeto Marciley - Pedido  #0041 \nAcesse: https://projeto-marciley.netlify.app/\n\n--------------------------------\n\n\n*Itens* *do* *seu* *Pedido* \n\n" ;

        let texto_itens = "";


        carrinho.map((produto) =>{


            let valor_produto = formatter.format(produto.valor_produto);

            let texto_item =  "*" + produto.quantidade_a_vender + "* *x* " + produto.nome_produto + " - *"   + valor_produto + "*\n->Cod: *" + produto.codigo_produto +"*\n";
            texto_itens += texto_item;

            return produto;

        })


        texto_itens += ("\n-----------------------------------\n");


        let texto_valor_total = "\n\nValor Total: *" + formatter.format(valorTotal) + "*\n";

        let forma_pagamento = "";

        if(formaPagamento === 0){
            forma_pagamento = "Pix";
        }else if(formaPagamento === 1){
            forma_pagamento = "Crédito";
        }else if(formaPagamento === 2){
            forma_pagamento = "Débito";
        }else if(formaPagamento === 3){
            forma_pagamento = "Dinheiro";
        }

        let texto_forma_pagamento = "\n Forma Pagamento: *" + forma_pagamento + "*"; 

        return encodeURIComponent(texto_inicial) + encodeURIComponent(texto_itens) +  encodeURIComponent(texto_valor_total) +   encodeURIComponent(texto_forma_pagamento);
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

            <div style={{ backgroundColor: '#C0C0C0' }} >

                <Grid container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    item xs={12} sm={12} md={12} lg={12} xl={12}
                    style={{ padding: 10 }}

                >

                    <Grid item xs={12} sm={12} md={12} lg={1} xl={1}
                    >
                    </Grid>

                    <Grid container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        item xs={12} sm={12} md={12} lg={10} xl={10}
                        style={{ padding: 10, backgroundColor: 'white' }}
                        component={Paper}
                        elevation={10}
                    >
                        <Grid item xs={12} sm={12} md={12} lg={1} xl={1}
                        >
                        </Grid>

                        <span style={{ textAlign: 'left', fontWeight: 'bold', fontSize: 28, textDecoration: 'underline', paddingBottom: 40 }}> Meu Carrinho</span>
                        {carrinho.map((produto) =>

                            <Grid
                                key={produto.id_produto}
                                container
                                direction="row"
                                item xs={12} sm={12} md={12} lg={12} xl={12}
                                justifyContent="flex-start"
                                alignItems="flex-start"
                            >
                                <Grid
                                    item xs={3} sm={3} md={2} lg={2} xl={2}

                                >
                                    <img alt="img1" style={{ width: 150, height: 150, padding: 30 }}
                                        src={produto.url_imagem}
                                    />
                                </Grid>

                                <Grid
                                    item xs={4} sm={4} md={4} lg={4} xl={4}

                                >
                                    <p style={{ fontSize: 16, lineHeight: '20px', color: 'black' }}>{produto.nome_produto} {produto.peso} {produto.pesagem.simbolo}</p>
                                    <p style={{ fontSize: 12, lineHeight: '1px', color: 'black' }}>Código: {produto.codigo_produto}</p>


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
                                                Descrição
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

                                                <p style={{ margin: 0, fontSize: 12, color: 'black' }}> Descrição: <p style={{ margin: 0, fontSize: 14, color: 'black', fontWeight: 'bold' }}>{produto.descricao_produto}</p>  </p>
                                                <p style={{ margin: 0, fontSize: 12, color: 'black' }}>Estoque: <p style={{ margin: 0, fontSize: 14, color: 'black', fontWeight: 'bold' }}> {produto.quantidade_produto}  </p>  </p>
                                                <p style={{ margin: 0, fontSize: 12, color: 'black' }}> Quantidade Vendida: <p style={{ margin: 0, fontSize: 14, color: 'black', fontWeight: 'bold' }}>{produto.quantidade_produto_vendida}</p></p>

                                            </Grid>
                                        </Collapse>
                                    </Grid>


                                </Grid>
                                <Grid
                                    item xs={2} sm={2} md={2} lg={2} xl={2}
                                >
                                    <CssTextField
                                        label=""
                                        type="number"
                                        variant="outlined"
                                        size="small"
                                        helperText="quantidade"
                                        value={produto.quantidade_a_vender}
                                        style={{ width: 90, paddingRight: 10 }}
                                    />
                                </Grid>

                                <Grid
                                    item xs={2} sm={2} md={2} lg={2} xl={2}
                                >
                                    <p style={{ fontSize: 20, lineHeight: '6px', color: 'black', fontWeight: 'bold' }}>{formatter.format(produto.valor_produto)}</p>
                                </Grid>


                            </Grid>

                        )}

                        <Grid
                            container
                            direction="row"
                            item xs={12} sm={12} md={12} lg={12} xl={12}
                            justifyContent="flex-end"
                            alignItems="flex-end"

                        >

                            <Grid
                                item xs={5} sm={5} md={5} lg={5} xl={5}
                                component={Paper}
                                elevation={18}
                                container
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="flex-start"
                                spacing={3}
                                style={{ backgroundColor: '#DCDCDC', margin: 10 }}
                            >
                                <Grid
                                    item xs={6} sm={6} md={6} lg={6} xl={6}
                                    container
                                    justifyContent="flex-end"
                                    alignItems="flex-end"

                                >
                                    <p style={{ margin: 0, fontSize: 25, color: 'black' }}>Valor Total:  </p>

                                </Grid>
                                <Grid
                                    item xs={6} sm={6} md={6} lg={6} xl={6}
                                    container
                                    justifyContent="flex-start"
                                    alignItems="flex-start"
                                >
                                    <p style={{ margin: 0, fontSize: 25, color: 'black', fontWeight: 'bold' }}> {formatter.format(valorTotal)}  </p>
                                </Grid>
                                <Grid
                                    item xs={6} sm={6} md={6} lg={6} xl={6}
                                    container
                                    justifyContent="flex-end"
                                    alignItems="flex-end"

                                >
                                    <p style={{ margin: 0, fontSize: 18, color: 'black' }}>Forma de Pagamento:</p>

                                </Grid>
                                <Grid
                                    item xs={6} sm={6} md={6} lg={6} xl={6}
                                    container
                                    justifyContent="flex-start"
                                    alignItems="flex-start"
                                >
                                    <Select
                                        labelId="formaPagamento"
                                        id="formaPagamento"
                                        value={formaPagamento}
                                        name="formaPagamento"
                                        label="formaPagamento"
                                        onChange={e => setFormaPagamento(e.target.value)}
                                        style={{ width: '100%' }}
                                    >
                                        <MenuItem style={{ paddingLeft: 5, fontSize: 16 }} value={0}>Pix</MenuItem>
                                        <MenuItem value={1}>Débito</MenuItem>
                                        <MenuItem value={2}>Crédito</MenuItem>
                                        <MenuItem value={3}>Dinheiro</MenuItem>

                                    </Select>
                                </Grid>


                                <Grid
                                    item xs={12} sm={12} md={12} lg={12} xl={12}
                                    container
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Button
                                        variant={'contained'}
                                    color={'primary'}
                                    >
                                        <a
                                            style={{ fontWeight: 'bold' }}
                                            href={"https://api.whatsapp.com/send?1=pt_BR&phone=5538999416698&text=" + gerarPedido()}>

                                            Finalizar Pedido</a>

                                    </Button>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>


                    <Grid item xs={12} sm={12} md={12} lg={1} xl={1}
                    >
                    </Grid>
                </Grid>

            </div>

            <div >
                <Rodape />
            </div>
        </div >
    );
}

export default Carrinho;
