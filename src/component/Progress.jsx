function Progress(props) {
  return (
    <>
      <div className="w-40 m-auto">
        <div className={`${!props.className ? "border-[#242323]" : "border-white"}  border h-full rounded progressAnimation"`}>
          Loading...
        </div>
      </div>
    </>
  );
}

export default Progress;
