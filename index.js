const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const handlebars = require('express-handlebars');
const app = express();
const urlEncodeParser = bodyParser.urlencoded({extended:false});
const sql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306
});
sql.query("use bd_horario");

app.engine("handlebars",handlebars({defaultLayout:'main'}));
app.set('view engine','handlebars');
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));

app.get("/", (req,res)=>{
    res.render('index'); 
});

app.get("/index", (req,res)=>{
    res.render('index'); 
});

app.post("/loginCoord", urlEncodeParser, (req,res)=>{
    sql.query("select * from tb_coordenador where coo_login = ? and coo_senha = ?", [req.body.coo_login, req.body.coo_senha], (err, results, fields)=>{
        if(results[0] === undefined){
            res.send("<script>alert('Dados incorretos!'); window.location.href='index'</script>");
        }else{
            res.send("<script>window.location.href='paginaInicial'</script>");
        }
    });
});

app.get("/paginaInicial", (req,res)=>{
    res.render("paginaInicial");
});

app.get("/crudProfessor", (req,res)=>{
    sql.query("select * from tb_professor", (err, results, fields)=>{
        res.render('crudProfessor', {data: results});
    });
});

app.post("/inserirProfessor", urlEncodeParser, (req,res)=>{
    sql.query("insert into tb_professor values (default, ?, ?)", [req.body.pro_nome, req.body.pro_aula_semana]);
    res.send("<script>window.location.href = 'crudProfessor'</script>");
});

app.get("/removerProfessor/:pro_id", (req,res)=>{
    sql.query("delete from tb_professor where pro_id = ?", [req.params.pro_id]);
    res.send("<script>window.location.href = '../crudProfessor'</script>");
});

app.get("/atualizarProfessor/:pro_id", (req,res)=>{
    sql.query("select * from tb_professor where pro_id = ?", [req.params.pro_id], (err, results, fields)=>{
        res.render('atualizarProfessor', {pro_id:results[0].pro_id, pro_nome: results[0].pro_nome, pro_aula_semana: results[0].pro_aula_semana});
    });
});

app.post("/atualizarProfessor/atualizarProfessor", urlEncodeParser, (req,res)=>{
    sql.query("update tb_professor set pro_nome = ?, pro_aula_semana = ? where pro_id = ?", [req.body.pro_nome, req.body.pro_aula_semana, req.body.pro_id]);
    res.send("<script>window.location.href = '../crudProfessor'</script>");
});

app.get("/crudTurma", (req,res)=>{
    sql.query("select * from tb_turma", (err, results, fields)=>{
        res.render("crudTurma", {data: results});
    });
});

app.post("/inserirTurma", urlEncodeParser, (req,res)=>{
    sql.query("insert into tb_turma values (default, ?)", [req.body.tur_nome]);
    res.send("<script>window.location.href = 'crudTurma'</script>");
});

app.get("/removerTurma/:tur_id", (req,res)=>{
    sql.query("delete from tb_turma where tur_id = ?", [req.params.tur_id]);
    res.send("<script>window.location.href = '../crudTurma'</script>");
});

app.get("/atualizarTurma/:tur_id", (req,res)=>{
    sql.query("select * from tb_turma where tur_id = ?", [req.params.tur_id], (err, results, fields)=>{
        res.render('atualizarTurma', {tur_id:results[0].tur_id, tur_nome: results[0].tur_nome});
    });
});

app.post("/atualizarTurma/atualizarTurma", urlEncodeParser, (req,res)=>{
    sql.query("update tb_turma set tur_nome = ? where tur_id = ?", [req.body.tur_nome, req.body.tur_id]);
    res.send("<script>window.location.href = '../crudTurma'</script>");
});

app.get("/crudDisciplina", (req,res)=>{
    sql.query("select * from tb_disciplina", (err, results, fields)=>{
        res.render("crudDisciplina", {data: results});
    });
});

app.post("/inserirDisciplina", urlEncodeParser, (req,res)=>{
    sql.query("insert into tb_disciplina values (default, ?)", [req.body.dis_nome]);
    res.send("<script>window.location.href = 'crudDisciplina'</script>");
});

app.get("/removerDisciplina/:dis_id", (req,res)=>{
    sql.query("delete from tb_disciplina where dis_id = ?", [req.params.dis_id]);
    res.send("<script>window.location.href = '../crudDisciplina'</script>");
});

app.get("/atualizarDisciplina/:dis_id", (req,res)=>{
    sql.query("select * from tb_disciplina where dis_id = ?", [req.params.dis_id], (err, results, fields)=>{
        res.render('atualizarDisciplina', {dis_id:results[0].dis_id, dis_nome: results[0].dis_nome});
    });
});

app.post("/atualizarDisciplina/atualizarDisciplina", urlEncodeParser, (req,res)=>{
    sql.query("update tb_disciplina set dis_nome = ? where dis_id = ?", [req.body.dis_nome, req.body.dis_id]);
    res.send("<script>window.location.href = '../crudDisciplina'</script>");
});

app.listen(3000, (req,res)=>{
    console.log('Servidor rodando!');
});