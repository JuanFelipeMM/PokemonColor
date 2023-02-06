function Pokeshow(props: any) {


    const img = props.imgPoke.read();

        return (
            <>
                <img loading="lazy" src={img} alt="Sprite Indisponível" />
            </>
        );
    }

export default Pokeshow