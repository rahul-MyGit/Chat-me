"use client"
import { api } from "../../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";

const Taskspage = () => {
    const tasks = useQuery(api.tasks.getTask)
    const deleteTask = useMutation(api.tasks.deleteTask);

    const products = useQuery(api.products.getProduct);
    const deleteProduct = useMutation(api.products.deleteProduct);

  return (
    <div className="p-10 flex flex-col gap-4">
        <h1 className="text-5xl"> All Task are present in Real time</h1>
        {tasks?.map((task)=>(
            <div key={task._id} className="flex gap-2">
                <span>{task.text}</span>
                <button className="bg-red-500 p-1 rounded-lg" onClick={async ()=> {
                    await deleteTask({id: task._id})
                }}>
                    Delete Task
                </button>
            </div>    
        ))}

        <h1 className="text-5xl">All products are present in Real time</h1>
        {products?.map((product)=> (
            <div key={product._id} className="flex gap-2">
                <span>{product.name} with the price of ${product.price}</span>
                <button className="bg-red-500 p-1 rounded-lg" onClick={async ()=> {
                    await deleteProduct({id: product._id})
                }}> Delete {product.name}</button>
            </div>
        ))}
    </div>
  )
}

export default Taskspage
