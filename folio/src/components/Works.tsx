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
                    <SingleWork title="Swipeshare" desc="full-stack mobile dev + design" image="/src/assets/HeadshotCropped.png" />
                    <SingleWork title="VDart" desc="software development internship" image="/src/assets/HeadshotFull.png" />
                    <SingleWork title="Scenic" desc="open source development" image="/src/assets/HeadshotCropped.png" />
                    <SingleWork title="TalkFish" desc="hackathon project" image="/src/assets/HeadshotCropped.png" />
                    <SingleWork title="Rate-My-Dorm" desc="full-stack mobile dev + design" image="/src/assets/HeadshotCropped.png" />
                    <SingleWork title="Phizzicare" desc="front-end" image="/src/assets/HeadshotCropped.png" />
                </section>
            </div>
        </div>
    )
}

export default Works