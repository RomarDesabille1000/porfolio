
const Post = () => {

    return(
        <div>
            <div className="search">
                <div className="title">Post</div>
                <div>
                    Search:&nbsp;<input type="text"/>
                </div>
            </div>
            <div className="blog-post">
                <div className="post-img">
                    <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" alt="name" />
                </div>
                <div>
                    <div className="post-details">
                        <div className="post-author">John doe | <span>Created on : 09/2/2021</span></div>
                    </div>
                    <div className="post-title">Title dfsa dfas f dsafas</div>
                    <div>Lorem Ipsum is simply dummy text of the printing and dfsafdsafas...</div>
                </div>
                <div>
                    <button type="editPost" className="btn btn-success post-list-option">Edit</button>
                    <button type="editPost" className="btn btn-danger post-list-option">Delete</button>
                </div>
            </div>
            <div className="blog-post">
                <div className="post-img">
                    <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" alt="name" />
                </div>
                <div>
                    <div className="post-details">
                        <div className="post-author">John doe | <span>Created on : 09/2/2021</span></div>
                    </div>
                    <div className="post-title">Title dfsa dfas f dsafas</div>
                    <div>Lorem Ipsum is simply dummy text of the printing and dfsafdsafas...</div>
                </div>
                <div>
                    <button type="editPost" className="btn btn-success post-list-option">Edit</button>
                    <button type="editPost" className="btn btn-danger post-list-option">Delete</button>
                </div>
            </div>
        </div>
    )
}


export default Post