let express=require('express')
let app=express()
app.use(express.json())
let prodArr = []
let id =0
try{
app.post('/product',(req,res)=>{
    let data=req.body
    data.id = id+1
    id = id+1
    console.log(data)
    prodArr.push(data)
    res.status(201).send({
        isSuccess:true,
        product :data
    })
})
}
catch(err)
{res.status(500).send("message success")}
try{
app.get('/getAllProducts',(req,res)=>{
    let data = prodArr
    res.status(200).send({
        isSuccess:true,
        data:data,
        count :data.length
    })
})
}
catch{res.status(500).send("message success")}

try{
app.delete('/deletprod',(req,res)=>{
    let id = req.query.id
    let arr = prodArr.filter((fld)=> {
        if(fld.id!=id){
            return true
        }
    })
    prodArr = arr
    console.log(arr)
    res.send({isSuccess: true, id: req.query.id})
})
}
catch{res.status(500).send("message success")}

try{
app.put('/updateprod', (req, res) => {
    let id = req.query.id;
    let body = req.body;
    let idx = prodArr.findIndex((item) => item.id === Number(id));
    
    if (idx !== 1) {
      prodArr[idx] = { ...prodArr[idx], ...body };
      console.log(prodArr);
      res.send({ isSuccess: true, id: req.query.id });
    } else {
      res.status(404).send({ isSuccess: false, message: 'Product not found' });
    }
  });
}
catch{res.status(500).send("message success")}



try{
    app.delete('/softdelete', (req, res) => {
        let id = req.query.id;
        let body = req.body;
        let idx = prodArr.findIndex((item) => item.id === Number(id));
      
        if (idx !== -1) {
          prodArr[idx] = { ...prodArr[idx], ...body };
          console.log(prodArr);
          res.send({ isSuccess: true, id: req.query.id });
        } else {
          res.status(404).send({ isSuccess: false, message: 'Product not found' });
        }
      });
    }
    catch{res.status(500).send("message success")}
app.listen(9000,(err)=>{
    if(!err){
    console.log("hello "+ 9000)
} 
})
