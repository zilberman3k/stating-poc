import cx from "classnames";
import { observer, useLocalObservable } from "mobx-react-lite";
import { ToloItem } from "../../interface";
import { autorun, makeAutoObservable, reaction } from "mobx";

export class Todo {
  todoItems: ToloItem[] = [
    { text: "aaa", status: "pending" },
    { text: "bbb", status: "pending" },
  ];
  inputText: string = "";

  addItem() {
    this.todoItems.push({ text: this.inputText, status: "pending" });
  }

  removeItem(idx: number) {
    this.todoItems.splice(idx, 1);
  }

  get doneItems() {
    return this.todoItems.filter((item) => item.status === "done").length;
  }

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
}

const _todoStore = new Todo();
const todoStore = makeAutoObservable({
  todoItems: [
    { text: "aaa", status: "pending" },
    { text: "bbb", status: "pending" },
  ],
  inputText: "",

  addItem() {
    this.todoItems.push({ text: this.inputText, status: "pending" });
  },

  removeItem(idx: number) {
    this.todoItems.splice(idx, 1);
  },

  get doneItems() {
    return this.todoItems.filter((item: { status: string; }) => item.status === "done").length;
  },
},{},{autoBind:true});

reaction(
  () => todoStore.todoItems.length,
  (size) => {
    if (size === 5) {
      alert("size is 5!!!");
    }
  }
);

autorun(() => {
  if (todoStore.todoItems.length === 3) {
    alert("size is 3");
  }
});

// for testing:  const Mobx = observer(({store}:{store:Todo}) => {
const Mobx = observer(() => {
  /* const todoStore2 = useLocalObservable(()=>({
        // copy here
    })) */

  return (
    <div>
      Hello From Mobx
      <div className="m-4">
        <div className="flex">
          <input
            type="text"
            className="border border-black"
            onChange={(e) => (todoStore.inputText = e.target.value)}
          />
          <button
            className="m-1 border border-black p-1 rounded bg-slate-400"
            onClick={todoStore.addItem}
          >
            +
          </button>
          <div>done: {todoStore.doneItems}</div>
        </div>
        <ul>
          {todoStore.todoItems.map((item, idx) => (
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
              <span className="ml-1" onClick={() => todoStore.removeItem(idx)}>
                X
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

export { Mobx };
