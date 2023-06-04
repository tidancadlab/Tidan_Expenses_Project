function AssignedFund() {
  return (
    <>
      <div>
        <div className="border-y py-2 my-4">
          <h1 className="text-white text-xl">Assigned Fund</h1>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between px-4 rounded-lg py-2 gap-2 bg-sky-500">
            <h1>Head Office</h1>
            <h1>INR 3,50,000/-</h1>
          </div>
          <div className="flex justify-between px-4 rounded-lg py-2 gap-2 bg-sky-500">
            <h1>Krishan Kumar</h1>
            <h1>INR 51,000/-</h1>
          </div>
          <div className="flex justify-between px-4 rounded-lg py-2 gap-2 bg-sky-500">
            <h1>Dinesh Singh</h1>
            <h1>INR 3,50,000/-</h1>
          </div>
          <div className="flex justify-between px-4 rounded-lg py-2 gap-2 bg-sky-500">
            <h1>Head Office</h1>
            <h1>INR 3,50,000/-</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default AssignedFund;
