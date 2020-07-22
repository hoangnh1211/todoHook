import React,{useState, useEffect} from 'react';
import Axios from 'axios';
function Chat() {
    const [list,setlist]=useState([])
    const [name,setname]=useState('')
    const [sentence,setsentence]=useState('')
    useEffect(()=>{
        Axios.get("chat").then(res=>{
            setlist(res.data)
        })
    },[list])
    function changename(e){
        setname(e.target.value)
        }
    function changeSentence(e){
        setsentence(e.target.value)
        }
    function send(){
        Axios.post('chat1',{name:name,sentence:sentence})
    }
    return(
        <div >
            <div className="framchat container">
                {list.map(value=>{
                    return(
                        <div>
                            <h5>{value.sentence}</h5>
                            <p>{value.name}</p>
                        </div>
                    )
                })}
                <div className="row" >
                    <div className="col-3">
                        <input type="text" className="tex" name="name" value={name} placeholder="name" onChange={changename} ></input>
                    </div>
                    <div className="col-8" type="text">
                    <textarea type="text" className="tex" name="sentence" value={sentence} onChange={changeSentence}></textarea>
                    </div>
                    <div className="col-1">
                        <button onClick={send}>send </button>
                    </div>
                </div>
            </div>
        </div>
      )
}
export default Chat;