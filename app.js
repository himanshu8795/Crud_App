const mysql= require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());
var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'8120341188',
    database:'WorkersDB',
    multipleStatements:true
});

mysqlConnection.connect((err)=>{
    if(!err)
    console.log('DB Connection Succesfull');
    else
    console.log('DB Connection Failed \n Error:' + JSON.stringify(err,undefined,2));
});

app.listen(4000,() => {
    console.log('Express server is running on the port no : 4000')
});

//get all employees
app.get('/employees',(req,res) =>{
    mysqlConnection.query('Select *from Employee',(err,rows,fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

//get an employee
app.get('/employees/:id',(req,res)=>{
    mysqlConnection.query('select *from Employee where EmpID = ?',[req.params.id],(err,rows,fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

//delete an employee
app.delete('/employees/:id',(req,res)=>{
    mysqlConnection.query('delete  from Employee where EmpID =?',[req.params.id],(err,rows,fields)=>{
        if(!err)
        res.send('deleted succesfully....');
        else
        console.log(err);
    })
});

//INSERT AN EMPLOYEE
app.post('/employees',(req,res)=>{
    let emp=req.body;
    var sql ="SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
    CALL Employee1AddorEdit(@EmpID,@Name,@EmpCode,@Salary);";
    mysqlConnection.query(sql,[emp.EmpID,emp.Name,emp.EmpCode,emp.Salary],(err,rows,fields)=>{
        if(!err)
        rows.forEach(element => {
            if(element.constructor == Array)
               res.send('Inserted Employee ID :'+element[0].EmpId);   
        });
        else
        console.log(err);
    })
});

//updating employee by put
app.put('/employees',(req,res)=>{
    let emp=req.body;
    var sql ="SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
    CALL Employee1AddorEdit(@EmpID,@Name,@EmpCode,@Salary);";
    mysqlConnection.query(sql,[emp.EmpID,emp.Name,emp.EmpCode,emp.Salary],(err,rows,fields)=>{
        if(!err)
        res.send('updated succesfully...' + [emp.EmpID,emp.Name,emp.EmpCode,emp.Salary]);
        else
        console.log(err);
    })
});








