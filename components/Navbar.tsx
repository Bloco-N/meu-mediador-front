import Image from "next/image";
import styled from 'styled-components';

const Container = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 4.5rem 8rem;
`

const Navbar = () => {
    return (
        <Container>
            <h1>Meu mediador</h1>
            <Image src={'/profile.svg'} alt={'Profile'} width={60} height={60}></Image>
        </Container>
    );
};

export default Navbar;