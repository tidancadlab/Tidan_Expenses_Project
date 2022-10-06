

function DashBoard(props) {
    return (
        <>
            <div className="bg-gray-400 dark:bg-gray-900 pt-20 h-[calc(100vh-80px)]">
                <div className="max-w-7xl bg-white dark:bg-slate-800 upto-lab-s:flex-wrap justify-center flex gap-7 m-auto rounded p-10">
                    <div className="bg-gray-50 border border-gray-900 dark:border-transparent dark:text-black dark:bg-slate-700 p-2 max-w-xs rounded-md w-full">
                        <h1 className="text-2xl">Fund Status</h1>
                        <div className="p-2 flex flex-col gap-2">
                            <div className="flex bg-purple-500 text-purple-900 px-4 py-2 rounded justify-between text-xl">
                                <h1>Received</h1>
                                <h1>40,000.00/-</h1>
                            </div>
                            <div className="flex bg-pink-500 text-pink-900 px-4 py-2 rounded justify-between text-xl">
                                <h1>Expenses</h1>
                                <h1>10000</h1>
                            </div>
                            <div className="flex bg-orange-500 text-orange-900 px-4 py-2 rounded justify-between text-xl">
                                <h1>Available</h1>
                                <h1>30000</h1>
                            </div>
                        </div>
                    </div>
                    <div className="bg-stone-700 text-white dark:text-black dark:bg-cyan-500 p-2 max-w-xs rounded-md w-full">
                        <h1 className="text-2xl">Approval Status</h1>
                        <div className="p-2 flex flex-col gap-2">
                            <div className="flex bg-green-500 text-green-900 px-4 py-2 rounded justify-between text-xl">
                                <h1>Approved</h1>
                                <h1>40000</h1>
                            </div>
                            <div className="flex bg-yellow-500 text-yellow-900 px-4 py-2 rounded justify-between text-xl">
                                <h1>Pending</h1>
                                <h1>10000</h1>
                            </div>
                            <div className="flex bg-red-500 text-red-900 px-4 py-2 rounded justify-between text-xl">
                                <h1>Rejected</h1>
                                <h1>30000</h1>
                            </div>
                        </div>
                    </div>
                    <div className="bg-amber-700 text-white dark:text-black dark:bg-cyan-500 p-2 max-w-md rounded-md w-full">
                        <h1 className="text-2xl">Approval Status</h1>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DashBoard;