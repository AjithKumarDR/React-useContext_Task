import React, { useContext,useState } from 'react'
import imgbook from '../assets/img/DWK18_3D-Cover_HiRes.png'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {DataContext} from '../utils/CartsContextComponent'
import SimpleImageSlider from "react-simple-image-slider";
import Card from 'react-bootstrap/Card';
import Navbar from 'react-bootstrap/Navbar';
function Cartss() {
  
 
const datas = useContext(DataContext)


const removeitem=(index)=>{
  //console.log(datas)
  var result = datas.carts[0]["products"].filter((item)=> item.id!=index)
       //  setDatabase([...result])
       datas.setCarts([{"products": result}])
       console.log(result)
  //console.log(datas)
}



  
const qtychange=(qty,index,stocks)=>{
  //console.log(datas.carts[0]["products"].findIndex(item => item.id == index))
  // console.log(datas.carts[0]["products"][datas.carts[0]["products"]
  // .findIndex(item => item.id == index)]  )  
  
 if(qty==""||qty==0 ){
  qty=1
 }
 else if (Number(qty)>=stocks){
  qty=stocks
 }

  datas.carts[0]["products"].splice(

  datas.carts[0]["products"].findIndex(item => item.id == index),1,{
    "id": index,
    "title":   datas.carts[0]["products"][datas.carts[0]["products"].findIndex(item => item.id == index)].title,
    "description": datas.carts[0]["products"][datas.carts[0]["products"].findIndex(item => item.id == index)].description,
    "price": datas.carts[0]["products"][datas.carts[0]["products"].findIndex(item => item.id == index)].price,
    "discountPercentage": datas.carts[0]["products"][datas.carts[0]["products"].findIndex(item => item.id == index)].discountPercentage,
    "rating": datas.carts[0]["products"][datas.carts[0]["products"].findIndex(item => item.id == index)].rating,
    "stock": datas.carts[0]["products"][datas.carts[0]["products"].findIndex(item => item.id == index)].stock,
    "orderqty": Math.round(qty) ,
    "brand": datas.carts[0]["products"][datas.carts[0]["products"].findIndex(item => item.id == index)].brand,
    "category": datas.carts[0]["products"][datas.carts[0]["products"].findIndex(item => item.id == index)].category,
    "thumbnail": datas.carts[0]["products"][datas.carts[0]["products"].findIndex(item => item.id == index)].thumbnail,
    "images": datas.carts[0]["products"][datas.carts[0]["products"].findIndex(item => item.id == index)].images


  } 
  
  
  )

  datas.setCarts([datas.carts[0]])
  //console.log(datas.carts[0])

}


//datas.carts[0]["products"].map((val)=>{console.log(val)})
let [qty,setqty]=useState("");



  
  
  return <>
 <Navbar  expand="lg" data-bs-theme="dark" className="head bg-body-tertiary">
      <Container  >
        <Navbar.Brand   href="#"><h4> Cart Page</h4> </Navbar.Brand>
      </Container>
    </Navbar>
  


    <Container >
    <Row >
    {datas.carts[0]["products"].map((val)=>{
    const formattedUrls = val.images.map((val, index) => {
      return { url: val };
  });
 
       //console.log(formattedUrls)

              let ratingstars=[]
              let num =1
              //#region Create Ratting Starts given 
              while(num<=val.rating){
              ratingstars.push(<div  className="bi-star-fill"></div>)
                num++
              }


    return<>
    <Card   className="shadow p-2 mb-3 bg-white rounded">  <Card.Body >
    <Form  >
    <Col  sm={12}>
    <Row >
    <Col  sm={2}>
      {/* <img key={val.id} src={val.thumbnail} alt="" /> */}

      
      
      <SimpleImageSlider
      key={val.id}
        width={150}
        height={150}
        images={formattedUrls}
        // showBullets={true}
        // showNavs={true}
        slideDuration={0.5}
        autoPlay={true}
      />
    
       
      </Col>
      <Col sm={8}>
      <Row  >
      <Col   sm={10}>
        <h1  >{val.title}</h1>
        <h4  >Brand : {val.brand}</h4>
        <h4 >category Type : {val.category}</h4>
        <h6 > Description: {val.description}</h6>
         

      </Col>
      <Col  sm={2}>
        Qty: 
        <Form.Control key={val.id} required  id={val.id} max={val.stock} min={1}
         type="number" 
          onChange={(e)=>qtychange(e.target.value,val.id,val.stock) }  value={ val.orderqty}
         />
        
        

      </Col>
      </Row>
     

      <div   className="d-flex   text-warning mb-2">
                                        
         Rating:      {ratingstars} 
                                       
       </div>
       
       <h6 key={val.id} >Stock: <span className="text-danger">{val.stock}</span> pcs</h6>
       
      </Col>
      < Col  sm={2}>
         
       <h3  > <span  className="text-muted text-decoration-line-through">${val.price}</span></h3>
       <h3 >
        ${(val.price-(val.price*(val.discountPercentage/100))).toFixed(2) }
        
        <span  >
        ({val.discountPercentage}%)</span></h3>
        <Button key={val.id} variant="light text-danger " onClick={(e)=>removeitem(val.id)}>Remove</Button>{' '}
      </Col>
      </Row>
    </Col>
    </Form>
    </Card.Body>   </Card>
    </>


    
  })}
 


    
    <Col sm={12}>
    <Row className='Footer'>
    <Col sm={6}> <h6> Subtotal:</h6></Col>
    <Col sm={6}> <h6> ${datas.carts[0]["products"].reduce((acc,val)=> acc+(val.orderqty *(val.price-(val.price*(val.discountPercentage/100))).toFixed(2) ),0 ).toFixed(2)} </h6></Col>
    <Col sm={6}> <h6>Shipping: </h6></Col>
    <Col sm={6}> < h6>Free </h6></Col>
    <Col sm={6}> <h3>Total:</h3>  </Col>
    <Col sm={6}> <h3> ${datas.carts[0]["products"].reduce((acc,val)=> acc+(val.orderqty *(val.price-(val.price*(val.discountPercentage/100))).toFixed(2) ),0 ).toFixed(2)} </h3> </Col>
    <h6 className='text-danger' >Get Daily Cash With Nespola Card</h6>
    </Row>
    </Col>        
     
    </Row>
  </Container>
  </>
}

export default Cartss