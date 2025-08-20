import ContactSquares from "./ContactSquares"
import Arrow from '/src/assets/DownArrow.png';


function Footer() {
    return (
        <>
            <footer className="flex flex-row justify-between items-center p-6 bg-black text-black">
                <ContactSquares onleft={false} />
                <img src={Arrow} />
                <p className="-z-50">.</p>
            </footer>



        </>
    )
}

export default Footer