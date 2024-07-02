import React, { useState, useReducer, useRef } from "react";
import Card from "./components/Card";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

import "./App.css";

const App: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Task[]>([]);

  const idRef = useRef(1);

  interface Task {
    id: number;
    summary: string;
    date?: string;
    isDone: boolean;
  }

  const AddTask = () => {
    if (text.trim() === "") {
      return;
    }

    const newTask: Task = {
      id: idRef.current++,
      summary: text,
      date: new Date().toISOString().split("T")[0],
      isDone: false,
    };

    console.log(newTask.isDone);
    setTasks([...tasks, newTask]);
    setText("");
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add,
      active = tasks,
      complete = completedTodos;

    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTasks(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col space-y-10 justify-center items-center w-full">
        <div className="flex space-x-3 justify-center items-center bg-gray-700 rounded-md p-3 w-full">
          <input
            type="text"
            className="h-16  rounded-md w-full bg-gray-700 focus:outline-none text-white"
            placeholder="Type here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button
            className="h-16 w-16 bg-blue-500 text-white rounded-full font-bold"
            onClick={AddTask}
          >
            Go
          </button>
        </div>
        <div className="flex flex-col space-y-3 w-full bg-gray-700 rounded-md p-6 md:grid md:grid-cols-1 md:gap-3">
          <div className="flex flex-col space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-3">
            <div className="w-full bg-red-500 p-3 rounded-md space-y-3">
              <h2 className=" w-full h-12 font-bold text-white text-2xl">
                Active Tasks
              </h2>
              <Droppable droppableId="TodosList">
                {(provided, snapshot) => (
                  <div
                    className={`flex flex-col justify-center items-center space-y-3 ${
                      snapshot.isDraggingOver
                        ? " shadow-lg shadow-blue-800"
                        : ""
                    }`}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {tasks.map((task, index) => {
                      return (
                        <Card
                          task={task}
                          tasks={tasks}
                          setTasks={setTasks}
                          idRef={idRef}
                          key={index}
                          index={index}
                        />
                      );
                    })}
                  </div>
                )}
              </Droppable>
            </div>

            <div className="w-full bg-green-500 p-3 rounded-md space-y-3">
              <h2 className="bg-green-500 w-full h-12 font-bold text-white text-2xl">
                Completed Tasks
              </h2>
              <Droppable droppableId="TodosRemove">
                {(provided, snapshot) => (
                  <div
                    className={`flex flex-col justify-center items-center space-y-3 ${
                      snapshot.isDraggingOver
                        ? "shadow-lg shadow-yellow-800"
                        : ""
                    }`}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {completedTodos.map((task, index) => {
                      return (
                        <Card
                          task={task}
                          tasks={completedTodos}
                          setTasks={setCompletedTodos}
                          idRef={idRef}
                          key={index}
                          index={index}
                        />
                      );
                    })}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default App;

// let name: String;
//   let age: number;
//   let isStudent: boolean;
//   let hobbies: String[]; //Defines an array of strings
//   let numbers: number[];
//   let role: [number, string]; //contains one number and one string

//   type Person =  Person2 &{
//     //This defines an object
//     id: number;
//     name: string;
//     age?: number; //Question Mark means that this is attribute is optional
//   };

//   //How to define an interface
//   //What's the point?
//   //In type you can use two types inside each other

//   interface Person2 {
//     id: number;
//     name: string;
//     age?: number;
//   }

//   interface Guy extends Person{
//     profession: string;
//   }
//   //This means that guy has all the properties included in Person2

//   //You can also extend types and interfaces

//   let person: Person = {
//     id: 1,
//     name: "John Doe",
//     age: 30,
//   };

//   let persons: Person[];

//   //Union

//   let v: number | string;

//   v = 10;
//   v = "Hello";

//   //Define a function

//   let printName: (name: string) => void; //void is the return type;

//   let name2: any; //This means that you can assign any value to this variable (not recommmended);

//   //Better type to use, use unknown if you don't know which type it is

//   let name3: unknown

//   //never returns undefined

//   //How to declare a function type

//   role = [5, "student"];
//   name = "Karim";
//   return <div className="">Hello World</div>;
