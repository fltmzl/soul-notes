import ArchivedNotesContainer from "../components/Container/ArchivedNotesContainer";
import Searchbar from "../components/Input/Searchbar";

const ArchivePage = () => {
  return (
    <main className="p-5 w-full bg-customLight-100 dark:bg-customDark-100 overflow-y-scroll relative z-20">
      <header className="flex flex-col sm:flex-row gap-3 justify-between">
        <Searchbar />
      </header>
      <ArchivedNotesContainer />
    </main>
  );
};

export default ArchivePage;
