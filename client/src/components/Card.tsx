import React, { useState, useRef, useEffect, useReducer } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { IoMdCheckmark } from "react-icons/io";
import { Draggable } from "react-beautiful-dnd";

interface Task {
  id: number;
  summary: string;
  date?: string;
  isDone: boolean;
}

interface CardProps {
  task: Task;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;

  idRef: React.MutableRefObject<number>;
  index: number;
}

const card: React.FC<CardProps> = ({
  task,
  tasks,
  setTasks,
  idRef,

  index,
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editedSummary, setEditedSummary] = useState<string>(task.summary);
  // const [state, dispatch] = useReducer((state: Task[], action: Actions) => {

  // },
  // []);

  const CompleteTask = (id: number) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, isDone: !task.isDone };
        } else {
          return task;
        }
      })
    );
  };

  const DeleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
    idRef.current--;
  };

  const EditTask = (id: number) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, summary: editedSummary };
        } else {
          return task;
        }
      })
    );
  };

  const editRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    editRef.current?.focus();
  }, [edit]);
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          className=""
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {" "}
          {task.isDone ? (
            <div
              className={`flex justify-between items-center border-2 p-3 space-x-3 rounded-md w-[30rem] h-24 border-green-400 bg-green-500 transition-all duration-300 ease-in-out hover:w-[32rem] hover:h-28 hover:cursor-pointer `}
            >
              <div className="w-full">
                <p className="text-white text-lg">{task.summary}</p>
                <p className="text-white text-sm">{task.date}</p>
              </div>

              <div className="flex justify-center items-center space-x-3 w-full">
                <button
                  onClick={() => {
                    CompleteTask(task.id);
                  }}
                >
                  {" "}
                  <IoMdCheckmark className="text-white text-2xl" />{" "}
                </button>
                <button
                  onClick={() => {
                    DeleteTask(task.id);
                  }}
                >
                  {" "}
                  <FaRegTrashAlt className="text-white text-2xl" />{" "}
                </button>
                <button>
                  <CiEdit className="text-white text-2xl" />
                </button>
              </div>
            </div>
          ) : (
            <div
              className={`flex justify-between items-center border-2 p-3 space-x-3 rounded-md w-[30rem] h-24 border-blue-400 bg-blue-500 transition-all duration-300 ease-in-out hover:w-[32rem] hover:h-28 hover:cursor-pointer `}
            >
              <div className="flex space-x-3 justify-between items-center w-full">
                <h1 className="text-xl font-bold text-white">{task.id}</h1>
                <div className="flex flex-col">
                  {edit ? (
                    <div className="flex space-x-3 justify-center items-center bg-gray-700 rounded-md p-3 w-full">
                      <input
                        type="text"
                        className="h-8  rounded-md w-full bg-gray-700 focus:outline-none text-white"
                        value={edit ? editedSummary : task.summary}
                        onChange={(e) => setEditedSummary(e.target.value)}
                        ref={editRef}
                      />

                      <button
                        className="h-fit w-fit bg-blue-500 text-white rounded-full font-bold text-center p-3 "
                        onClick={() => {
                          EditTask(task.id);
                          setEdit(!edit);
                        }}
                      >
                        <CiEdit className="text-xl" />
                      </button>
                    </div>
                  ) : (
                    <p className="text-white text-lg">{task.summary}</p>
                  )}

                  <p className="text-white text-sm">{task.date}</p>
                </div>
              </div>

              <div className="flex justify-center items-center space-x-3 w-full">
                <button
                  onClick={() => {
                    CompleteTask(task.id);
                  }}
                >
                  {" "}
                  <IoMdCheckmark className="text-white text-2xl" />{" "}
                </button>
                <button
                  onClick={() => {
                    DeleteTask(task.id);
                  }}
                >
                  {" "}
                  <FaRegTrashAlt className="text-white text-2xl" />{" "}
                </button>
                <button
                  onClick={() => {
                    if (!edit) {
                      setEdit(!edit);
                      console.log(edit);
                    }
                  }}
                >
                  <CiEdit className="text-white text-2xl" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default card;
