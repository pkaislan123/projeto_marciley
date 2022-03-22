
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { styled } from '@material-ui/core/styles';


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

const ProdutoItem = ({ produto }) => {

    var formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });



    return (
        <div>
            <Grid
                key={produto.id_produto}
                container
                direction="column"
                item xs={12} sm={12} md={12} lg={3} xl={3}

                style={{ padding: 10 }}
            >
                <Grid
                    item xs={12} sm={12} md={12} lg={12} xl={12}
                    justifyContent="flex-start"
                    alignItems="flex-start"
                >
                    <img alt="img1" style={{ width: '100%' }}
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
                    item xs={12} sm={12} md={12} lg={12} xl={12}
                    justifyContent="flex-start"
                    alignItems="flex-start"
                >
                    <CssTextField
                        shrink
                        id={produto.id_produto}
                        label=""
                        type="number"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-100]*' }}
                        margin="normal"
                        variant="outlined"
                        size="small"
                        helperText="quantidade"


                    />

                </Grid>






            </Grid>
        </div>
    )
}

export default ProdutoItem;