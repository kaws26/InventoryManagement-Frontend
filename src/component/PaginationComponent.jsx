import React from 'react'

export default function PaginationComponent({currentPage,totalPages,onPageChange}) {
    //generate page numbers based on total pages
    const pageNumbers=Array.from({length:totalPages},(_,i)=>i+1);
  return (
    <div className="pagination-container">
            <button 
            className="pagination-button"
            disabled={currentPage === 1}
            onClick={()=> onPageChange(currentPage - 1)}
            >
                &laquo; Prev
            </button>

            {pageNumbers.map((number) =>(
                <button key={number}
                className={`pagination-button ${currentPage === number ? "active": ""} ` }
                onClick={()=> onPageChange(number)}>
                {number}
                </button>
            ))}

            <button className="pagination-button"
            disabled={currentPage === totalPages}
            onClick={()=> onPageChange(currentPage + 1)}>
                    Next &raquo;
            </button>

        </div>
  )
}
