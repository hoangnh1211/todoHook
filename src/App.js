import React, { useState, useReducer } from 'react';
import './App.css';
// import Chat from './Chat/Chat';


function App() {
  function Khung(data,index){
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
            <button onClick={()=>dispath({type:data.tt,index:index})}>{data.tt} </button>    
          </div>
          <div > 
              <button className="col" onClick={()=>dispath({type:'delete',index:index})}>X</button>
          </div>
      </div>
    )
  }
  
  function change(e){
    setvalue(e.target.value)
    }
  function enter(e){
    if (e.key==='Enter'){
      dispath({type:'add'})
    }
  }
  
  function reducer(list1,action){
    let date=new Date()
        date=date.toGMTString()
    let arr=list1
    switch (action.type){
      case 'uncompleted' :
        arr[action.index].tt='completed'
        arr[action.index].timeEnd=date
        setcount(count+1)
        return arr
      case 'completed':
        arr[action.index].tt='uncompleted'
        arr[action.index].timeEnd=''
        setcount(count-1)
        return arr
      case 'delete':  
        if (arr[action.index].tt==='completed') setcount(--count)
        arr.splice(action.index)
        return arr.concat([])
      case 'add':
        let tt=arr.findIndex(v=>v.name===value)
        if (tt!==-1){
          alert("cong viec da co")
          setvalue("")
        } else if (value.length===0) {
          alert("chua mo ta cong viec")
          setvalue("")
        } else {
          arr.push({name:value,timeStart:date,timeEnd:"",tt:"uncompleted"})
          setvalue("")
        }
        return arr
      case 'clearAll':
          setcount(0)
          return []
      case 'select':
        for (let i=0;i<arr.length;i++)
        {
          let date=new Date()
          if (arr[i].tt !=='completed') arr[i].timeEnd= date.toGMTString()
          arr[i].tt="completed"
        }
        setcount(arr.length)
        return arr
      default : return arr;
    }
    // setvalue('')
  }
  function show(list){
    let result=null
    if (list.length>0){
      result=list.map((value,index)=>(
        Khung(value,index)
      ))
    }
    return result
  }
  let [count,setcount]=useState(0)
  let [value,setvalue]=useState('')
  let [list1,dispath]=useReducer(reducer,[])
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
              <button onClick={()=>dispath({type:'add'})}> add </button>
            </div>
          </div>

          <div className="body">
              <div className="row">
                <div className="col-5">Name</div>
                <div className="col-2">TimeStart</div>
                <div className="col-2">TimeEnd</div>
                <div className="col-2">Status</div>
              </div>
              {show(list1)}
              <div className="row">
                <div className="col"> uncompleted : {list1.length-count} </div>
                <div className="col"> completed : {count}</div>
                <div className="col-2"> <button onClick={()=>dispath({type:'select'})}>Select All</button></div>
                <div className="col-2"> <button onClick={()=>dispath({type:'clearAll'})}>Clear All </button> </div>
              </div>
          </div>
        </div>
      </div>
      {/* <Chat></Chat> */}
    </div>
  )
}

export default App;
