
import { proxy , useSnapshot, subscribe } from "valtio"
import {watch, useProxy, subscribeKey } from "valtio/utils"
import cx from "classnames";


const todoStore = proxy({
    todoItems : [
        { text: "aaa", status: "pending" },
        { text: "bbb", status: "pending" },
      ],
      inputText: "",
    
      addItem() {
        todoStore.todoItems.push({ text: todoStore.inputText, status: "pending" });
      },
    
      removeItem(idx: number) {
        todoStore.todoItems.splice(idx, 1);
      },
    
      get doneItems(){
        return this.todoItems.filter((item: { status: string; })=>item.status==='done').length
      },
      get doneItems2(): number{
        return todoStore.todoItems.filter((item: { status: string; })=>item.status==='done').length
      }
  })

globalThis.todoStore = todoStore
subscribe(todoStore.todoItems,()=>{
  //  console.log('state has changed from subscribe!')
})

watch((get)=>{
  //  console.log('watch tracked')
   // if(get(todoStore).todoItems.length>4){
   // console.log('state has changed!')
   // }
})

  const Valtio = ()=>{
    const snap = useSnapshot(todoStore)
    const todoItems = useSnapshot(todoStore.todoItems)
    const {inputText} = useSnapshot(todoStore, {sync:true})
   //  const todoStore2 = useProxy(snap)
  //  console.log('$$$$$', snap, todoStore)
    return (
        <div>
          Hello From Valtio
          <div className="m-4">
            <div className="flex">
              <input
                type="text"
                className="border border-black"
                value={inputText}
                onChange={(e) => (todoStore.inputText = e.target.value)}
              />
              <button
                className="m-1 border border-black p-1 rounded bg-slate-400"
                onClick={()=>snap.addItem()}
              >
                +
              </button>
              <div>
                done: {snap.doneItems} -- {snap.doneItems2}
              </div>
            </div>
            <ul>
              {todoItems.map((item, idx) => (
                <li key={idx}>
                  <span
                    onClick={() =>
                      (todoStore.todoItems[idx].status =
                        item.status === "pending" ? "done" : "pending")
                    }
                    className={cx({ "line-through": item.status === "done" })}
                  >
                    {item.text}
                  </span>
                  <span className="ml-1" onClick={() => snap.removeItem(idx)}>
                    X
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
  }

  export {Valtio}