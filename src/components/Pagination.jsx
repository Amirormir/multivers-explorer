function Pagination({ info, page, setPage }) {
  return (
    <div className="pagination">
      <button disabled={!info.prev} onClick={() => setPage(page - 1)}>
        Précédent
      </button>
      <span>Page {page}</span>
      <button disabled={!info.next} onClick={() => setPage(page + 1)}>
        Suivant
      </button>
    </div>
  );
}

export default Pagination;
