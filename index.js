const customExpress = require('./config/customExpress')
const conexao = require('./infraestrutura/conexao')
const Tabelas = require('./infraestrutura/tabelas')

conexao.connect((error) => {
    if ( error ) {
        console.log( error )
    } else {
        const app = customExpress();

        Tabelas.Init(conexao)

        app.listen(3000,() => console.log('ouvindo a porta 3000'))
    }
})