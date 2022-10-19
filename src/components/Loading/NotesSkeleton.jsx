const NotesSkeleton = () => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 animate-pulse w-full h-full gap-5">
      <div className="bg-customGray-50/5 rounded-2xl"></div>
      <div className="bg-customGray-50/5 rounded-2xl"></div>
      <div className="bg-customGray-50/5 rounded-2xl"></div>
      <div className="bg-customGray-50/5 rounded-2xl"></div>
      <div className="bg-customGray-50/5 rounded-2xl"></div>
      <div className="bg-customGray-50/5 rounded-2xl"></div>
    </div>
  );
};

export default NotesSkeleton;
