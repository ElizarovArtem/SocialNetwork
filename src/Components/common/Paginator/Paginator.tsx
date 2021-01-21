import React, {useState} from 'react';
import s from './Paginator.module.css';

type PaginatorPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    portionSize: number
    onPageChange: (newPage: number) => void
}
export function Paginator(props: PaginatorPropsType) {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let [portionNumber, setPortionNumber] = useState<number>(1)
    const portionsCount = props.totalUsersCount / props.portionSize
    const leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1
    const rightPortionPageNumber = portionNumber * props.portionSize

    return (
        <div className={s.pages}>
            {portionNumber > 1 ? <button onClick={() => setPortionNumber((p) => p-1)}>Prev</button> : null}
            {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((p, i) => {
                return <span key={i}
                             onClick={() => props.onPageChange(p)}
                             className={p === props.currentPage ? s.selectedPage : s.page}>{p}</span>
            })}
            {portionNumber < portionsCount ?
                <button onClick={() => setPortionNumber((p) => p+1)}>Next</button>
                :
                null
            }
        </div>
    )
}


