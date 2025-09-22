import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';


export interface PaginationProps {
currentPage: number;
pageCount: number;
onPageChange: (page: number) => void;
}


export default function Pagination({ currentPage, pageCount, onPageChange }: PaginationProps) {
if (pageCount <= 1) return null;


return (
<div className={css.wrapper}>
<ReactPaginate
forcePage={currentPage - 1}
pageCount={pageCount}
onPageChange={(sel) => onPageChange(sel.selected + 1)}
containerClassName={css.pagination}
pageClassName={css.page}
pageLinkClassName={css.link}
previousClassName={css.page}
nextClassName={css.page}
activeClassName={css.active}
previousLabel="←"
nextLabel="→"
breakLabel="…"
/>
</div>
);
}