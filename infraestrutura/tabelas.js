Tabelas = {

    Init(conexao) {
        this.conexao = conexao

        this.criarAtendimentos()
    },
    criarAtendimentos(){
        const sql = "CREATE TABLE IF NOT EXISTS atendimentos ("
                        + "id int not null auto_increment primary key,"
                        + "cliente varchar(50) not null,"
                        + "pet varchar(20),"
                        + "servico varchar(20) not null,"
                        + "status varchar(20) not null,"
                        + "observacoes text,"
                        + "data datetime not null,"
                        + "dataCriacao datetime not null"
                        + ")";

        this.conexao.query ( sql , function ( error ) {
            if ( error ) {
                console.log ( "Erro ao criar TABELA ATENDIMENTOS" )
                console.log ( error )
            }
        })
    }
}


module.exports = Tabelas