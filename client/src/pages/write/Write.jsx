import './write.css'

export default function Write() {
    return (
        <div className='write' >
            <form className="writeForm">
                <img src="https://images.pexels.com/photos/13726119/pexels-photo-13726119.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="not found" className='writeFormImage' />
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i class="fileInputIcon fa-solid fa-file-circle-plus"></i>
                    </label>
                    <input className='chooseFile' type="file" id='fileInput' style={{ display: "none" }} />
                    <input className='writeInput' type="text" placeholder='Enter Title' autoFocus={true} />
                </div>
                <div className="writeFormGroup">
                    <textarea placeholder='Tell Your Story...' type="text" className="writeInput writeText" ></textarea>
                </div>
                <button className='writeSubmit'>Publish</button>
            </form>
        </div>
    )
}
