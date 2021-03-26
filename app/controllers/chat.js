module.exports.iniciaChat = (application, req, res) => {
    var dadosForm = req.body;

    req.assert('apelido', 'Nome ou apelido é obrigatório').notEmpty();
    req.assert('apelido', 'Nome ou apelido de conter entre 3 e 15 caracteres').len(3, 15);

    var errors = req.validationErrors();
    if(errors){
        // req.send('erro no formulário');
        console.log(errors);
        res.render('index', { validacao : errors } );
        return;
    }


    res.render('chat');
}