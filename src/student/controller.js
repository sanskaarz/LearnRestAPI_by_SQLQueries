const pool  = require("../../db");
const queries = require('./queries');

const getStudents = (req, res) =>   {
    pool.query(queries.getStudents, (error, results) =>{
        if(error) throw error
        res.status(200).json(results.rows);
        console.log("GET Request Recived")
    });
}

const getStudentsById = (req, res) =>   {
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentsById, [id], (error, results) =>{
        if(!results.rows.length){
            res.send("no student in database")
        }else{
        if(error) throw error
        res.status(200).json(results.rows);
        console.log(`Table with id ${id} accessed`)
        }
    });
}

const addStudent = (req, res) =>   {
    const {name, email, age, dob} = req.body;
    pool.query(queries.checkEmailExists, [email], (error, results) =>{
        //  Check if email exists
        if(results.rows.length){
            res.send("Email already exist");
            console.log("Duplicate Entry Request Recieved")
        }else{
        pool.query(queries.addStudent, [name,email,age,dob], (error, results) =>{
            if(error) throw error;
            res.status(201).send("Student created successfully!")
            console.log("POST Request Recieved, Student added");
        });
        // console.log(error,"error", results)
        }
    });
}

const removeStudent = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentsById, [id], (error, results) =>{
        if(!results.rows.length){
            res.send("Student Does Not Exist")
        }else{
            pool.query(queries.removeStudent, [id], (error, results) =>{
                if(error) throw error
                res.status(200).json("student deleted successfully");
                console.log(`Table with id ${id} deleted`)
            });
        }
    });
}
const upadteStudent = (req,res) => {
    const id = parseInt(req.params.id);
    const {name} = req.body;
    pool.query(queries.getStudentsById, [id], (error, results) =>{
        if(!results.rows.length){
            res.send("Student Does Not Exist")
        }else{
            pool.query(queries.upadteStudent, [name ,id] ,(error,results) =>{
                if(error) throw error
                res.status(200).send("student updated successfully");
            });
        };
    });
}
module.exports = {
    getStudents,
    getStudentsById,
    addStudent,
    removeStudent,
    upadteStudent
};