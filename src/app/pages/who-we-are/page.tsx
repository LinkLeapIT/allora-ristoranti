import bgImage from "../../../../public/assets/images/baground.jpg";
export default function WhoWeAre() {
    return (
        <div 
            className="relative w-full mx-auto h-[40vh] md:h-[84vh] overflow-hidden flex items-center justify-center"
            style={{
                backgroundImage: `url(${bgImage.src})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
              }}
        >
            <h1 className="text-2xl md:text-9xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-lightText to-lightBg">Allora Ristorante</h1>
        </div>
    );
}