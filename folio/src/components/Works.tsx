import SingleWork from "./SingleWork"

function Works() {

    return (
        <div className="text-white relative bg-transparent">
            {/* Beams Background */}


            {/* Content */}
            <div className="relative ">
                {/* <h1 className="font-montserrat font-thin text-center text-9xl pt-10 pb-20">
                    Selected Works
                </h1> */}
                <section>
                    <SingleWork
                        title="Swipeshare"
                        desc="full-stack mobile dev + design"
                        image="/src/assets/SwipeshareSS.png"
                        path="/VDart"
                    />
                    <SingleWork
                        title="VDart"
                        desc="software development internship"
                        image="/src/assets/VDartSS.png"
                        path="/VDart"
                    />
                    <SingleWork
                        title="Scenic"
                        desc="open source development"
                        image="/src/assets/Scenic.png"
                        path="/VDart"
                    />
                    <SingleWork
                        title="UG Research"
                        desc="autonomous vehicle lab"
                        image="/src/assets/Research.png"
                        path="/VDart"
                    />
                    <SingleWork
                        title="Portfolio"
                        desc="front-end web dev"
                        image="/src/assets/portfolioSS.png"
                        path="/VDart"
                    />
                    <SingleWork
                        title="Phizzicare"
                        desc="front-end"
                        image="/src/assets/phizzicareSS.png"
                        path="/VDart"
                    />
                </section>
            </div>
        </div>
    )
}

export default Works