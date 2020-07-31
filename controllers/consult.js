var pl = require('tau-prolog');
var session = pl.create();
var sql = require('mssql');
var sqlconfig = require('../config/envconfig').database;

// var consult = require('../prolog/prolog')
const setConsult = require('../prolog/prolog')
const professorController = require('./professor');
const subjectController = require('./subject');
const classroomController = require('./classroom');

var predicates = '';

var consult ='classroom(A,B,C,D).';
// session.query("likes(sam, X).");

// var results = [];

// function inform(msg) {
//     results.push(msg)
// }
// likes(sam, salad).
// likes(dean, pie).
// likes(sam, apples).
// likes(dean, whiskey).`
// var count_answers = 0
// var callback = function(answer) {
//     if (answer === false) {
//         results.push(false);
//         return
//     }
//     if (answer === null) {
//         results = [];
//         return
//     }
//     // loop
//     ++count_answers
//     inform(pl.format_answer(answer))
//     session.answer(callback)
// }
// // start the query loop
// const seeAnswer= async ()=>{
//     console.log('Inicia');
//     const aux = await session.answer(callback)
//     console.log('termina');
// }

// seeAnswer();
// console.log(results);

doConsult = async () => {
    try {
        session.consult(predicates);

        //session.query('subject(A,B,C,D,E,F).');
        //session.query('professor(A,B,C,D).');
        session.query(consult);

        var results = [];

        function inform(msg) {
            //console.log('Answer',msg);
            results.push(msg)
        }
        var count_answers = 0
        var callback = function(answer) {
            if (answer === false) {
                results.push(`{'result':${false}}`);
                return
            }
            if (answer === null) {
                results = [];
                return
            }
            // loop
            ++count_answers
            //console.log('Answer',pl.format_answer(answer));
           // console.log('************************************');
           // //console.log(answer);
           // console.log( pl.format_answer(answer) )
            // console.log('W',answer.links.W.value);
            // console.log('X', answer.links.X);
            // console.log('Y', answer.links.Y.args);
            // console.log('Z', answer.links.Z);
          //  console.log('************************************');
            //console.log('Substitution',pl.type.Substitution);
            inform(pl.format_answer(answer))
            session.answer(callback)
        }
        // start the query loop
        // const seeAnswer= async ()=>{
        //     const aux = await session.answer(callback)
        // }

        // seeAnswer();
        session.answer(callback)
        return results;
    }
    catch (excepcion) {
        throw excepcion;
    }
}

exports.SetData = async(req) =>{
    try{
        /*PROFESORES*/
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
            .output('success', sql.Bit, 0)
            .execute('GetProfessors');
        sql.close();
        let professors = result.recordset
        let prof = '';
        for(let professor of professors){
            let subjects = professor.subject_name.split(',');
            for(let subject of subjects){
                prof += ` professor(${professor.professor_id},'${professor.name}',[${professor.schedule}],'${subject}').\n`;
            }
        }
        /* SUBJECTS*/
        let pool2 = await sql.connect(sqlconfig);
        let result2 = await pool2.request()
            // .input('user', sql.VarChar(50), req.user)
            .output('success', sql.Bit, 0)
            .execute('GetSubjects');
        sql.close();
        let subjetcs = result2.recordset
        let sub = ''
        for(let subject of subjetcs){
            sub += ` subject(${subject.subject_id},'${subject.name}',${subject.subject_type},${subject.credits},[${subject.schedule}],${subject.semester}).\n`;
        }
        /*CLASSROOMS*/
        let pool3 = await sql.connect(sqlconfig);
        let result3 = await pool3.request()
            // .input('user', sql.VarChar(50), req.user)
            .output('success', sql.Bit, 0)
            .execute('GetClassrooms');
        sql.close();
        let classrooms = result3.recordset;
        let clas = ''
        for(let classroom of classrooms){
            clas += ` classroom(${classroom.classroom_id},${classroom.number},${classroom.capacity},${classroom.classroomType}).\n`;
        }
        predicates += `\n${prof}${clas}${sub}`
        //console.log(prof);
        return 'Hola'
    }
    catch (err) {
        throw err;
    }
}

exports.FirstConsult = async(req) =>{
    try{
        semesterReq = 2 ;
        /* PROFESSORS */
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
            .output('success', sql.Bit, 0)
            .execute('GetProfessors');
        sql.close();
        let professors = result.recordset
        /* SUBJECTS*/
        let pool2 = await sql.connect(sqlconfig);
        let result2 = await pool2.request()
            // .input('user', sql.VarChar(50), req.user)
            .output('success', sql.Bit, 0)
            .execute('GetSubjects');
        sql.close();
        let subjetcs = result2.recordset
        /*CLASSROOMS*/
        let pool3 = await sql.connect(sqlconfig);
        let result3 = await pool3.request()
            // .input('user', sql.VarChar(50), req.user)
            .output('success', sql.Bit, 0)
            .execute('GetClassrooms');
        sql.close();
        let classrooms = result3.recordset;
        relation = [];
       // console.log('Professors',professors);
        for(let profe of professors){
            let toRelation = {
                professor: '',
                subject: '',
                semester: 0
            };
            toRelation.professor = profe;
            profSubs = profe.subject_name.split(',');
            for(let profSubj of profSubs){
                for(let sub of subjetcs){
                    if((sub.name===profSubj)&&(sub.semester==req.semester)){
                        toRelation.subject += `${sub.name},`;
                        toRelation.semester = sub.semester;
                    }
                }
            }
            toRelation.subject = toRelation.subject.substring(0,toRelation.subject.length-1)
            relation.push(toRelation);
        }
     //  console.log('***********************************RELATIOOOON***********************************',relation);
        predicates += `getSubjectInfoByID(ID,A,B,C,D,E):-subject(ID,A,B,C,D,E).`; //TODO obtiene curso por id 
        predicates += `\ngetProfessorSubjects(ID,X):-professor(ID,_,_,X).` //TODO obtiene las materias de un profe con el ID o obtiene los profes de una materia on el nombre
        //consult = `classroom(A,B,C,D).` //TODO Obtiene todas las aulas
        //consult = 'getSubjectInfoByID(10,A,B,C,D,E).'; //TODO obtiene curso por id 
        //consult = 'getProfessorSubjects(13,X).'  //TODO obtiene las materias de un profe con el ID o obtiene los profes de una materia on el nombre
        consult = 'subject(_,A,_,_,B,_).' //TODO Obtiene el nombre todos las materias
        //let variable = await this.SetData(req)
      //  console.log(predicates);
        doConsult().then(result => {
           // console.log(result);
            for(let i of result){
                let subject =  [];
                //onsole.log(i);
                subject = i.split(' ');
                sub = subject[2];
                if(!sub){
                    break;
                }
               // console.log('subject',sub.substring(0,sub.length-1)); 
                consult = `professor(A,_,B,${sub.substring(0,sub.length-1)}).`
               // console.log(consult );
                doConsult().then(result => {
                    for(let r of result){
                        //console.log('R',r);
                        if(r==="{'result':false}"){
                            
                        } else{
                            //console.log('RESUUULT',r.substring(13,r.length-3));
                            predicates += `\nbuscar([], []).
                            buscar([X|Xs], [true|Tail]):-  member(X,[${r.substring(13,r.length-3)}]),! , buscar(Xs, Tail).
                            buscar([_|Xs], [false|Tail]):-  buscar(Xs, Tail).
                            /*name,subjectType,credits,semester,schedule*/
                            getSubjectInfoByID(ID,A,B,C,D,E):-
                            subject(ID,A,B,C,D,E).

                            getProfessorSubjects(ID,X):-
                            professor(ID,_,_,X).

                            /*verificateDisponibility(scheSubject,scheProfessor):-*/
                            getProfessorDisp(ID,Y):-
                            professor(ID,_,Y,_).

                            /*relationSubjectProfessor():-*/
                            buscar([], []).
                            buscar([X|Xs], [true|Tail]):-  member(X,[a,b,c,d,e]),! , buscar(Xs, Tail).
                            buscar([_|Xs], [false|Tail]):-  buscar(Xs, Tail).

                            verificateSchedule([],_).


                            verificateSchedule([X|T],L):-
                            member(X,L),verificateSchedule(T,L).

                            asociateObjects(ID):-
                            getProfessorSubjects(ID,Subject),subject(_,Subject,_,_,_,SubjectSchedule),
                            verificateSchedule(SubjectSchedule).

`;
                            //console.log('PREDICATES(FINALCONSULT)',predicates);
                        }
                    }
                })
                //subject = i.split('=')
                //console.log(subject[2]);
                //console.log(subject);
                // let resultSplit = i.split(' ');
                // let resultPro = resultSplit[resultSplit.length-2]
                // console.log(resultPro);
                
            }
        });
        return relation;
    }
    catch (err) {
        throw err;
    }

    /*
    listaProfes
    listaCu
    */
}
