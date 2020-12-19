const moment = require('moment')
const conexao = require('../infraestrutura/conexao')


atendimento = {
    adiciona: function(atendimento, res){
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data,'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        /* validacoes */ 
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteEhValido = atendimento.cliente.length >= 5
        
        const validacao = [
            {
                nome : 'data',
                valido: dataEhValida,
                mensagem : 'A data deve ser maior ou igual a data atual.'
            },
            {
                nome : 'cliente',
                valido: clienteEhValido,
                mensagem : 'O nome do cliente deve ter pelo menos 5 caracteres.'
            }
        ]

        const errors = validacao.filter(campo => !campo.valido)

        if( errors.length ){
            res.status(400).json(errors);
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data}

            const sql = 'INSERT INTO atendimentos SET ?'

            conexao.query(sql,atendimentoDatado, function ( erro , resultados ) {
                if ( erro ) {
                    res.status(400).json ( erro )
                }else{
                    res.status(201).json ( {...atendimento, mensagem: 'atendimento cadastrado com sucesso.'} )
                }
            })
        }
    },
    lista: function ( res ) {
        const sql = "SELECT * FROM atendimentos"

        conexao.query(sql, (error, resultados) => {
            if( error ) {
                res.state(400).json(error)
            } else {
                res.status(200).json(resultados)
            }
        })
    },
    buscaPorId: function ( id , res ) {
        const sql = `SELECT * FROM atendimentos WHERE id = ${id} `

        conexao.query(sql, (error, resultados) => {
            if( error ) {
                res.status(400).json(error)
            } else {
                res.status(200).json( resultados[0] )
            }
        })
    },
    altera: function (id, valores, res) {
        if ( valores.data ) {
            valores.data = moment(valores.data,'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS') 
        }
        const sql = 'UPDATE atendimentos SET ? WHERE id = ?'

        conexao.query(sql,[valores, id], (error,resultados) => {
            if( error ) {
                res.status(400).json(error)
            } else {
                res.status(200).json( {
                    ...valores,
                    id,
                    mensagem: 'atendimento alterado com sucesso'
                } )
            }
        })
    },
    deleta: ( id, res ) => {
        const sql = 'DELETE FROM atendimentos WHERE id=?'
        
        conexao.query( sql , id , ( error , resultados ) => {
            if( error ) {
                res.status(400).json( error )
            } else {
                res.status(200).json( {
                    id: id,
                    mensagem: 'atendimento deletado com sucesso'
                } )
            }
        })
    }
}

module.exports = atendimento