import React from "react";
import styled from "styled-components";
const Container = styled.div`
display: inline-block;
margin-top: 15px;
.texto{
    margin-top: 0px;
    margin-left:-14px;
    position: absolute;
    font-size: 14px;

}

`

const ClassEnergy = ()=>{

    return (
        <Container style={{ height: 40, width: 40 }}>
            
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="house" fill="#32712C">
               
                <rect width="256" height="256" fill="none"></rect>
                <path d="M218.76367,103.7002,138.75684,30.96436a15.93657,15.93657,0,0,0-21.52637.00146L37.2373,103.69971A16.03108,16.03108,0,0,0,32,115.53857l0,92.09522a16.47275,16.47275,0,0,0,4.01066,10.96174A15.91729,15.91729,0,0,0,48.002,223.999H95.96484a8,8,0,0,0,8-8V167.9917a8,8,0,0,1,8-8h32a8,8,0,0,1,8,8V215.999a8,8,0,0,0,8,8h48.05731a15.40625,15.40625,0,0,0,7.53406-1.85584A16.08415,16.08415,0,0,0,224,207.999v-92.46A16.03567,16.03567,0,0,0,218.76367,103.7002Z"></path>
            </svg>
            <a className="texto" style={{color:"black"}}>A</a>
        </Container>
    );
}

export default ClassEnergy;