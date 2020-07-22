import React, { useState } from 'react';
import './App.css';
// import Chat from './Chat/Chat';


function App() {
  function changett(value,name,tt){
    let arr=[...list]
    let index=arr.findIndex(value=>value.name===name)
    arr[index].tt=value
    let date= new Date()
    if (tt===1){
      // let tong=count;
      setcount(count+1)
      arr[index].timeEnd=date.toGMTString()
    } else {
      arr[index].timeEnd=""
      setcount(count-1)
    }
    setlist(arr)
  }
  function Khung(data){
    return(
      <div className="row" key={data.name} >
          <div className="col-5"> 
            <p> { data.name}</p>
          </div>
          <div className="col-2">
            {data.timeStart}
          </div>
          <div className="col-2">
            {data.timeEnd}
          </div>
          <div className="col-2" >
            <button onClick={()=>{
            if (data.tt ==='uncompleted') changett('completed',data.name,1); else changett('uncompleted',data.name,0  )
              }}>{data.tt} </button>    
          </div>
          <div > 
              <button className="col" onClick={()=>{
            let arr=[...list]
            let index=arr.findIndex(value=>value.name===data.name)
            if (arr[index].tt==='completed') setcount(--count)
            arr.splice(index,1)
            setlist(arr)
             }}>X</button>
          </div>
          
      </div>
    )
  }
  
  function submit(){
    let arr=[...list]
    let date=new Date()
    date=date.toGMTString()
    let tt=arr.findIndex(v=>v.name===value)
    if (tt!==-1){
      alert("cong viec da co")
      setvalue("")
    } else if (value.length===0) {
      alert("chua mo ta cong viec")
      setvalue("")
    } else {
      arr.push({name:value,timeStart:date,timeEnd:"",tt:"uncompleted"})
      setlist(arr)
      setvalue("")
    }
  }
  function change(e){
    setvalue(e.target.value)
    }
  function enter(e){
    if (e.key==='Enter'){
      submit()
    }
  }
  function selet(){
    var a=list
    for (let i=0;i<a.length;i++)
    {
      let date=new Date()
      if (a[i].tt !=='completed') a[i].timeEnd= date.toGMTString()
      a[i].tt="completed"
    }
    setcount(list.length)
    setlist(a)
  }
  function clearall(){
    setlist([])
    setcount(0)
  }
  let [list,setlist]=useState([])
  let [count,setcount]=useState(0)
  let [value,setvalue]=useState('')
  return (
    <div >
      <div className="todo">
        <h3 className="to">Todo List </h3>
        <div className="container">
          <div className="row">
            <div className="col tex">
              <input type="text" className="tex" value={value} onChange={change} onKeyPress={enter} ></input>
            </div>
            <div className="col">
              <button onClick={submit}> add </button>
            </div>
          </div>

          <div className="body">
              <div className="row">
                <div className="col-5">Name</div>
                <div className="col-2">TimeStart</div>
                <div className="col-2">TimeEnd</div>
                <div className="col-2">Status</div>
              </div>
              {
                list.map(value=>(
                  Khung(value)
                ))
              }
              <div className="row">
                <div className="col"> uncompleted : {list.length-count} </div>
                <div className="col"> completed : {count}</div>
                <div className="col-2"> <button onClick={selet}>Select All</button></div>
                <div className="col-2"> <button onClick={clearall}>Clear All </button> </div>
              </div>
          </div>
        </div>
      </div>
      {/* <Chat></Chat> */}
    </div>
  )
}

export default App;
