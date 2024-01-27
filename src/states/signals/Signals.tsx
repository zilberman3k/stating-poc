import {
  Signal,
  computed,
  effect,
  signal,
  useSignalEffect,
} from "@preact/signals-react";
import { useRef } from "react";
import { ToloItem } from "../../interface";
import { useSignals } from "@preact/signals-react/runtime";
import cx from "classnames";

const todoItems = signal<ToloItem[]>([
  { text: "aaa", status: "pending" },
  { text: "bbb", status: "pending" },
]);

const InputSignal = ({ value }: { value: Signal<string> }) => {
  const valRef = useRef<HTMLInputElement>(null);
  useSignalEffect(() => {
    valRef.current!.value = value.value;
  });
  return (
    <input
      type="text"
      className="border border-black"
      ref={valRef}
      onChange={(e) => (value.value = e.target.value)}
    />
  );
};

const removeItem = (idx: number) => {
  todoItems.value = todoItems.value.filter((_, index) => index !== idx);
};

const doneItems = computed(
  () =>
    todoItems.value.filter((item: { status: string }) => item.status === "done")
      .length
);

// text-black
'text-green-900'
const listTextColor = signal<string>('text-black') 

effect(() => {
  if (todoItems.value.length === 5) {
    listTextColor.value = 'text-green-900'
    setTimeout(()=>{
      listTextColor.value = 'text-black'
    },3000)
  }
});

const inputSig = signal("");

let renders = 0;
const Signals = () => {
  useSignals();
 // console.log("$$$", renders++);
  return (
    <div>
      Hello From Signals
      <div className="m-4">
        <div className="flex">
          <InputSignal value={inputSig} />
          <button
            className="m-1 border border-black p-1 rounded bg-slate-400"
            onClick={() =>
              (todoItems.value = [
                ...todoItems.value,
                { status: "pending", text: inputSig.value },
              ])
            }
          >
            +
          </button>
          <div>done: {doneItems}</div>
        </div>
        <ul className={listTextColor.value}>
          {todoItems.value.map((item, idx) => (
            <li key={idx}>
              <span
                onClick={() => {
                  todoItems.value[idx].status =
                    item.status === "pending" ? "done" : "pending";

                  todoItems.value = structuredClone(todoItems.value);
                }}
                className={cx({ "line-through": item.status === "done" })}
              >
                {item.text}
              </span>
              <span className="ml-1" onClick={() => removeItem(idx)}>
                X
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export { Signals };
