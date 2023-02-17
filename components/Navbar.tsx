import Image from "next/image";
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 100rem;
    padding: 45px 110px;
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