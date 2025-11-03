import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import opel4 from "../src/assets/25697938.jpg";
import opel3 from "../src/assets/00f4289b46d44967f1a4a677fdc47cda.jpg";
import opel2 from "../src/assets/456x342.webp";
import opel1 from "../src/assets/images.jpeg";

const PhotoSlider = () => {
    const photos = [
        { src: opel1, caption: "Opel Astra H" },
        { src: opel2, caption: "Opel Astra H" },
        { src: opel4, caption: "Hyundai Elantra" },
        { src: opel3, caption: "Hyundai Elantra" },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    return (
        <div className="w-full h-full bg-slate-900/60 border border-slate-700 rounded-xl overflow-hidden">
            <Slider {...settings}>
                {photos.map((p) => (
                    <div key={p.src} className="flex flex-col items-center">
                        <img
                            src={p.src}
                            alt={p.caption}
                            className="w-full h-[400px] object-contain"
                        />
                        <p className="text-sm text-slate-300 mt-2">{p.caption}</p>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default PhotoSlider
