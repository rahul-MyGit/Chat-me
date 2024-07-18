"use client"
import { api } from "../../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";

const Taskspage = () => {
    const tasks = useQuery(api.tasks.getTask)
    const deleteTask = useMutation(api.tasks.deleteTask);

  return (
    <div className="p-10 flex flex-col gap-4">
        <h1 className="text-5xl"> All Task are present in Real time</h1>
        {tasks?.map((task)=>(
            <div key={task._id} className="flex gap-2">
                <span>{task.text}</span>
                <button onClick={async ()=> {
                    await deleteTask({id: task._id})
                }}>
                    Delete Task
                </button>
            </div>    
        ))}
    </div>
  )
}

export default Taskspage
