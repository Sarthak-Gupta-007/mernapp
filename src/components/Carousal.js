import React from 'react'


const Carousal = () => {
    return (
        <>
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{ objectFit: "contain !important " }}>
                <div className="carousel-inner w-100 p-3" style={{ "maxHeight": "200px" }}>

                    <div className='carousel-caption' style={{ zIndex: "10" }}>

                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
                        </form>
                    </div>

                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/?girl" className="d-block w-100" style={{ filter: "brightness(100%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900×700/?sex" className="d-block w-100" style={{ filter: "brightness(100%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/?poop" className="d-block w-100" style={{ filter: "brightness(100%)" }} alt="..." />
                    </div>

                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>


        </>
    )
}

export default Carousal
