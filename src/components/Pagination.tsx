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
						<a
							href="!#"
							style={{ color: 'black', textDecoration: 'none' }}
						>
							{num}
						</a>
					</button>
				))}
			</ul>
		</nav>
	);
};

export default Pagination;
