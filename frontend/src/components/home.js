import { useRef } from "react";
import ButtonAppBar from "./Navbar";
import axios from 'axios';

const Home = ()=>{
    const inputref = useRef();
    
    const submitHandler = async ()=>{
        const res = await axios.post('htpp://localhost:4004/query',{
            query:"Who win IPL last night"
        })
    }

    return <>
    <input ref={inputref}></input>
    <button onClick={submitHandler}> Send</button>
    </>;
}
export default Home;