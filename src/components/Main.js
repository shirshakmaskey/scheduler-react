import React from "react"
// import ToDo from "ToDo.js"
import ContactCard from "ContactCard.js"
function Main(){
    return(
    <div>
       <ContactCard 
        name="name 1" 
        imgUrl="http://placekitten.com/200/200"
        phone="775458785"
        email="xyz.com"
       />  
       <ContactCard 
        name="name 2" 
        imgUrl="http://placekitten.com/300/200"
        phone="775458785"
        email="xyz.com"
       /> 
      <ContactCard 
        name="name 3" 
        imgUrl="http://placekitten.com/400/200"
        phone="775458785"
        email="xyz.com"
       /> 
    </div>
    )
}
export default Main