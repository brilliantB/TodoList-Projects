var express = require('express');
const con = require('../modules/mysql');
var router = express.Router();

const todosRouter = require('./todos/index');

router.get('/', (req, res) => {
  con.query("select * from ssac_todolist", (error, rows, fields) =>{
    if (error) throw error;
    res.json({
      data: rows,
  });
  });
});

router.use("/todos", todosRouter);

module.exports = router;
