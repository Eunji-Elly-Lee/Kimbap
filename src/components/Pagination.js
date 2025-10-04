import { useMemo } from 'react';
import { GrPrevious, GrNext } from "react-icons/gr";
import PropTypes from 'prop-types';
import 'components/Pagination.css';

function Pagination({ currentPage, totalCount, pageSize, onPageChange }) {
  const DOTS = "...";
  const LAST_PAGE = Math.ceil(totalCount / pageSize);
  const paginationBar = useMemo(() => {
    const pageNumbers = [];
    if (LAST_PAGE <= 3) {
      for (let i = 1; i <= LAST_PAGE; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 2) {
        pageNumbers.push(1, 2, 3, DOTS, LAST_PAGE);
      } else if (currentPage >= LAST_PAGE - 1) {
        pageNumbers.push(
          1, DOTS, LAST_PAGE - 2, LAST_PAGE - 1, LAST_PAGE
        );
      } else {
        pageNumbers.push(
          1, DOTS, currentPage - 1, currentPage, currentPage + 1,
          DOTS, LAST_PAGE
        );
      }
    }
    return pageNumbers;
  }, [LAST_PAGE, currentPage]);
  const onNext = () => {
    if (currentPage < LAST_PAGE) {
      onPageChange(currentPage + 1);
    }
  };
  const onPrevious = () => {
    if (currentPage > 1 ) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div>
      <ul className="d-flex justify-content-center mt-5">
        <li className="pagination-button me-1" onClick={() => onPrevious()}>
          <GrPrevious />
        </li>
        {paginationBar.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <li key={index} className="mx-3">
                &#8230;
              </li>
            );
          } else {
            return (
              <li key={index} className={currentPage === pageNumber ?
                "pagination-button mx-1 px-2 bg-secondary bg-opacity-25" :
                "pagination-button mx-1 px-2"}
                onClick={() => onPageChange(pageNumber)}>
                {pageNumber}
              </li>
            );
          }
        })}
        <li className="pagination-button ms-1" onClick={() => onNext()}>
          <GrNext />
        </li>
      </ul>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalCount: PropTypes.number,
  pageSize: PropTypes.number,
  onPageChange: PropTypes.func
};

export default Pagination;
