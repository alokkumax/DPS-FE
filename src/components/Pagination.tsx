import React from 'react';

interface PaginationProps {
	postPerPage: number;
	totalPosts: number;
	paginate: (pageNumber: number) => void;
	currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
	postPerPage,
	totalPosts,
	paginate,
	currentPage,
}) => {

	// Dividing total rows of data into pagination
	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<nav className="pagination">
			<ul>
				{pageNumbers.map((num) => (
					<button
						key={num}
						onClick={() => paginate(num)}
						className={currentPage == num ? 'active' : ''}
					>
						<span style={{ color: 'black' }}>{num}</span>
					</button>
				))}
			</ul>
		</nav>
	);
};

export default Pagination;
