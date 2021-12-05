var express = require("express");
var router = express.Router();

const con = require("../../modules/mysql");

let todolistArr = [];

// 투두 리스트 생성
// method : POST
// url : /todos
// body : { id : 0, todoContent : '내일 할일'}
// response
// 200
// { message : '생성 완료', data : [{ id: 0, todoContent: '내일 할일'}, { id: 1, todoContent: '내일 할일'}]}
// 400
// {message : '생성 실패.'}

router.post("/", (req, res) => {
  const { todoContent } = req.body;
  const sql = `insert into ssac_todolist (todoContent,checked) values(?,?)`;
  const params = [todoContent, 0];

  con.query(sql, params, (err, result, fields) => {
    if (err) 
      return res.status(400).json({
        message: "생성 실패",
      });
      
      res.status(200).json({
      message : "생성 완료",
    }); 
  });
});

// 투두 리스트 전체 조회
// method : GET
// url : /todos
// response
// 200
// {message : '조회 완료', data : [{ id: 0, todoContent: '내일 할일'}, { id: 1, todoContent: '내일 할일'}]}
// 400
// {message : '조회 실패'}

router.get("/", (req,res) => {
  // 전체 데이터 조회
  con.query("select * from ssac_todolist", 
    (err, result, fields) => {
    if(err)
      return res.status(400).json({
        message: "조회 실패",
      });
    
    res.status(200).json({
      message: "조회 성공",
      data: result,
    });
  });
});

// 투두 리스트 수정 (id)
// method : PUT
// url : /todos/:id
// body :  { todoContent : "모레할 일"}
// params : {id : 0}

// 200
// {message : '수정 완료', data : [{ id: 0, todoContent: '내일 할일'}, { id: 1, todoContent: '내일 할일'}]}
// 400
// {message : '수정 실패'}

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { todoContent, checked } = req.body;
  const sql = "update ssac_todolist set todoContent=?, checked=? where id =?";

  const params = [todoContent, checked, id];
  con.query(sql, params, (err, result) => {
    if(err)
    return res.status(400).json({
      message: "수정 실패",
    });
  
     res.status(200).json({
     message: "수정 완료",
     });
  });
});

// 투두 리스트 삭제 (id)
// method : delete
// url : /todos/:id
// params : {id : 0}
// response
// 200
// {message : '삭제가 완료 되었습니다.', data : [{ id: 0, todoContent: '내일 할일'}, { id: 1, todoContent: '내일 할일'}]}
// 400
// {message : '삭제에 실패 했습니다'}

// const { todoContent } = req.body;
// const sql = `insert into ssac_todolist (todoContent,checked) values(?,?)`;
// const params =[todoContent, 0];
// con.query(sql, params, (err, result, fields) => {
//   console.log(fields); 
// });


router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "delete from ssac_todolist where id = ?";
  const params = [todoContent, checked, id];
    con.query(sql, (err, result) => {
    if(err)
      return res.status(400).json({
        message: "삭제 실패",
    });
  
     res.status(200).json({
     message: "삭제 완료",
     });
  });
});

module.exports = router;