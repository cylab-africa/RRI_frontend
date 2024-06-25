import React, { useState } from 'react';

const ProjectPagination = ({ itemsPerPage, items, changeTab }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handleClick = (number) => {
    setCurrentPage(number);
  };

  const renderProjects = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedProjects = items.slice(startIndex, startIndex + itemsPerPage);

    return selectedProjects.map((project) =>{
        return(
          <>
          {" "}
          <div className="card">
            <div class="card-body">
              <h5>{project.name}</h5>
              <p>
                For more details on the the RRI index score
                for the {project.name} project, click on the
                more button.{" "}
              </p>
             
              <a
                onClick={() => changeTab(project.id)}
                style={{ cursor: "pointer" }}
                className="green_link"
              >
                More
              </a>
            </div>
          </div>
          <br />
        </>
        )
    });
  };

  const renderPaginationControls = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            onClick={() => handleClick(number)}
            className={number === currentPage ? 'page-item active' : 'page-item'}
          >
           <a className='page-link'>{number}</a> 
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      {renderProjects()}
      {renderPaginationControls()}
    </div>
  );
};

export default ProjectPagination;
