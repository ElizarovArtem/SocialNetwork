import React from 'react';
import s from './Paginator.module.css';

type PaginatorPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChange: (newPage: number) => void
}
export function Paginator(props: PaginatorPropsType) {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
            <div className={s.pages}>
                {pages.map((p, i) => {
                    return <span key={i}
                                 onClick={() => props.onPageChange(p)}
                                 className={p === props.currentPage ? s.selectedPage : s.page}>{p}</span>
                })}
            </div>
    )
}


