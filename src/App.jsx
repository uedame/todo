import { useState } from "react";
import "./App.css";
import { InputTodo } from "./compornents/InputTodo";
import { IncompleteTodos } from "./compornents/IncompleteTodos";
import { CompleteTodos } from "./compornents/CompleteTodos";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([
    "タスク1",
    "タスク2",
  ]);
  const [completeTodos, setCompleteTodos] = useState(["タスク3", "タスク4"]);

  const onChangeTodoText = (event) => setTodoText(event.target.value);
  const onClickAdd = () => {
    //todoTextが空文字だったらreturn、つまり処理抜けるって意味。
    if (todoText === "") return;
    //[...配列名]は現在の配列と同じものを生成する。
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    //[...配列名]は現在の配列と同じものを生成する。
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  const onClickComplete = (index) => {
    //未完了のTODOを削除する
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);
    setIncompleteTodos(newIncompleteTodos);
    //完了のTODOを追加する
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setCompleteTodos(newCompleteTodos);
  };

  const onClickReturn = (index) => {
    //未完了のTODOを追加する
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    //完了のTODOを削除する
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    setCompleteTodos(newCompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>
          登録できるTODOは５個までです。消化して下さい。
        </p>
      )}
      <IncompleteTodos
        Todos={incompleteTodos}
        onClickDelete={onClickDelete}
        onClickComplete={onClickComplete}
      />
      <CompleteTodos Todos={completeTodos} onClick={onClickReturn} />
    </>
  );
};
