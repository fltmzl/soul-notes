const NavbarBrand = () => {
  return (
    <div className="flex items-center gap-2 text-lg font-semibold">
      <img src="/assets/icons/brand.svg" alt="brand icon" />
      <h2 className="hidden md:block">SoulNotes</h2>
    </div>
  );
};

export default NavbarBrand;
