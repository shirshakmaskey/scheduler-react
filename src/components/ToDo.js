import React from "react"
function ToDo(){
    const styles = {
        fontSize:14
    }
    styles.color = "red"
    return (
        <div>
            <input type="checkbox" />
            <p style={styles}>random text</p>
        </div>
        
        
    )
}
export default ToDo