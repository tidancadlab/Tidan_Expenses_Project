function Help({titleName}) {
  // titleName.innerHTML = "Help Section"
  return (
    <>
      <div className="min-h-[calc(100vh-56px)] dark:bg-gray-900 bg-gray-300 dark:text-white flex items-center justify-center">
        <div className="max-w-sm p-8 bg-yellow-500 shadow-2xl dark:shadow-black dark:bg-violet-800 rounded w-full">
          <form action="submit" className="">
            <div className="flex flex-col gap-2">
              <div>
                <h1 className="text-xl pb-5">
                  Need any Help? Please write down...
                </h1>
              </div>
              <div className="w-full rounded h-10">
                <input
                  className="w-full h-full outline-none text-black px-2 focus:bg-green-200 rounded"
                  type="text"
                  name="userName"
                  placeholder="Name"
                  id=""
                  required
                />
              </div>
              <div className="w-full rounded h-10">
                <input
                  className="w-full h-full outline-none text-black px-2 focus:bg-green-200 rounded"
                  type="email"
                  name="email"
                  placeholder="Email id"
                  id=""
                  required
                />
              </div>
              <div className="w-full rounded h-10">
                <input
                  className="w-full h-full outline-none text-black px-2 focus:bg-green-200 rounded"
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  id=""
                  required
                />
              </div>
              <div className="w-full rounded">
                <textarea
                  className="w-full min-h-[200px] py-2 outline-none text-black px-2 focus:bg-green-200 rounded"
                  type="text"
                  name="issue"
                  placeholder="Issue in detail..."
                  id=""
                  required
                />
              </div>
              <div className="border h-10 w-full rounded">
                <button
                  className="w-full h-full outline-none text-black dark:text-white px-2 focus:bg-green-200 rounded"
                  type="text"
                  name="issue"
                  placeholder="Issue in detail"
                  id=""
                  required
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Help;
