
const Create = () => {

    return(
        <form>
            <h1 className="mb-4">Create Post</h1>
            <div className="container">
                <div className="row mb-4">
                    <div className="col-6">
                        <label for="input-title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="input-title"/>
                    </div>
                    <div className="col-6">
                        <label for="input-slug" className="form-label">Slug</label>
                        <input type="text" className="form-control" id="input-slug"/>
                        <div className="form-text">Example: /Challenges-of-Programming</div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row mb-5">
                    <div className="col-6">
                        <label for="input-category" className="form-label">Category</label>
                        <input type="text" className="form-control" id="input-category"/>
                    </div>
                    <div className="col-6">
                        <label for="select-status" className="form-label">Status</label>
                        <select id="select-status" className="form-select form-control">
                            <option>Option 1</option>
                            <option>Option 2</option>
                            <option>Option 3</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row mb-5">
                    <div className="col-6">
                        <label for="input-title" className="form-label">Thumbnail</label>
                        <button type="selectThumbnail" className="btn btn-light ml-3">Select..</button>
                    </div>

                </div>
            </div>

            <div className="mb-3 form-check pl-3">
                <p className="size-20">Featured</p>
                <div className="pl-5">
                    <input type="checkbox" className="form-check-input" id="featured-project"/>
                    <label className="form-check-label" for="featured-project">Featured Project</label>
                </div>
                <div className="pl-5">
                    <input type="checkbox" className="form-check-input" id="featured-post"/>
                    <label className="form-check-label" for="featured-post">Featured Post</label>
                </div>
            </div>

            <div className="mb-3 w-100 p-3">
                <label for="-input-body" className="form-label">Body</label>
                <textarea row="20" className="form-control" id="input-body"/>
            </div>

            <button type="submit" className="btn btn-primary ml-3">Create post</button>
        </form>
    )
}


export default Create