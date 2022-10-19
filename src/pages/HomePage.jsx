import Searchbar from "../components/Input/Searchbar";
import AddNoteBtn from "../components/Button/AddNoteBtn";
import NotesContainer from "../components/Container/NotesContainer";

const HomePage = () => {
  return (
    <main className="p-5 w-full bg-customSecondary overflow-y-scroll relative z-20">
      <header className="flex flex-col sm:flex-row gap-3 justify-between">
        <Searchbar />
        <AddNoteBtn />
      </header>
      <NotesContainer />
    </main>
  );
};

export default HomePage;
