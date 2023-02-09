import noIMG from '../../assets/images/pokeiconSVG.svg';

function Pokeshow(props: any) {


    const img = props.imgPoke.read();

        return (
            <>
                <img loading="lazy" src={img} alt={noIMG} />
            </>
        );
    }

export default Pokeshow