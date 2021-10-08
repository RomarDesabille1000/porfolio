//data from state, dispatch function, pageItems
import {useEffect} from "react";
import {useDispatch} from "react-redux";

export const Pagination = ({ data, dispatchFunc, page, setPage }) => {
    const totalPage = Math.ceil(data.count/page.pageSize)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(dispatchFunc(page.page, page.pageSize))
    },[page.page])

    const handleOnClickPrev = () => {
        setPage({ ...page, page: page.page-1 })
    }

    const handleOnClickNext = () => {
        setPage({ ...page, page: page.page+1 })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        let v = e.target.page.value
        if(!isNaN(v)){
            if(v > totalPage)
                setPage({ ...page, page: totalPage })
            else if(v < 1)
                setPage({ ...page, page: 1 })
            else
                setPage({ ...page, page: Number(v) })
        }
    }

    return (
        <div className="pagination">
            <div className="page-info">
                Page {page.page} of {isNaN(totalPage) ? 1 : totalPage}
            </div>
            <div className="d-flex">
                {data.previous != null ?
                    <button className="prev" onClick={handleOnClickPrev}>Prev</button> :
                    <button className="prev disabled-btn" disabled>Prev</button>}
                <form onSubmit={handleOnSubmit}>
                    <input name="page" type="text" style={{width:50, margin:0}} placeholder={page.page}/>
                    <button type="submit" style={{width:50, margin:0}}>Go</button>
                </form>
                {data.next != null ?
                    <button className="next" onClick={handleOnClickNext}>Next</button> :
                    <button className="next disabled-btn" disabled>Next</button>}
            </div>
        </div>
    )
}
