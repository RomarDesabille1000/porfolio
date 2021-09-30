import Search from "../../components/Search";

const Blog = () => {
    return(
        <div id="content">
            <Search title="Hello World!"/>
            <div className="blog-post">
                <div className="post-img">
                    <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" alt="name" />
                </div>
                <div>
                    <div className="post-details">
                        <div className="post-author">John doe | <span>Created on : 09/2/2021</span></div>
                    </div>
                    <div className="post-title">Title dfsa dfas f dsafas</div>
                    <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has  dfsafdsafas...</div>
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
                    <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has  dfsafdsafas...</div>
                </div>
            </div>
        </div>
    )
}

export default Blog