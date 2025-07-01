import React, { useState } from "react";


function Counter() {

    const [count, setCount] = useState(0);

    return (
        // <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <div className=" flex flex-col items-center justify-center  h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-purple-500">COUNTER :</h1>

            <div className="font-bold text-6xl mb-6 ">{count}</div>

            <div className="flex gap-4">
                <button className="bg-purple-800 text-white px-4 py-2 rounded hover:bg-purple-400"
                    onClick={() => setCount(count + 1)}>
                    ➕Increment
                </button>

                <button className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-500"
                    onClick={() => setCount(count - 1)}>
                    ➖Decrement
                </button>
                
                <button className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-500"
                onClick={() => setCount(0)}>
                    🔄️ Reset
                </button>

            </div>
        </div>

    )
}


export default Counter