const Header = () => {
  return (
    <header className="flex items-center justify-between">
      <img src="../../public/logo.png" alt="momentum" className={'h-[38px]'}/>
      <div className="flex gap-4">
        <div className="rounded-md border-[#8239EC] border-[1px] px-2 py-1">
          თანამშრომლის შექმნა
        </div>
        <div className="rounded-md bg-[#8239EC] px-2 py-1 text-white">
          + შექმენი ახალი დავალება
        </div>
      </div>
    </header>
  );
};

export default Header;
