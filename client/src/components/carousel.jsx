import Carousel from 'react-bootstrap/Carousel';
import pashupatiImage from "../images/pashupati.jpg";
import baudhaImage from "../images/stupa.webp";
import darbarImage from "../images/darbarSquare.jpg";

function MyCarousel() {
    const carouselImageStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        position: "center"
    };

    const carouselItemStyle = {
        width: '100vw',
        height: '500px',
        margin: 'auto',
    };

    return (
        <Carousel>
            <Carousel.Item>
                <div style={carouselItemStyle}>
                    <img
                        src={pashupatiImage}
                        alt="First slide"
                        style={carouselImageStyle}
                    />
                </div>
                <Carousel.Caption>
                    <h3>Pashupatinath Temple</h3>
                    <p> Hindu temple dedicated to Pashupati, a form of Shiva.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <div style={carouselItemStyle}>
                    <img
                        src={baudhaImage}
                        alt="Second slide"
                        style={carouselImageStyle}
                    />
                </div>
                <Carousel.Caption>
                    <h3>Bouddha Stupa</h3>
                    <p>symbolizing enlightenment and offering a place of peace and meditation.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <div style={carouselItemStyle}>
                    <img
                        src={darbarImage}
                        alt="Third slide"
                        style={carouselImageStyle}
                    />
                </div>
                <Carousel.Caption>
                    <h3>Bhaktapur Durbar Square</h3>
                    <p>former royal palace complex located in Bhaktapur</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default MyCarousel;
