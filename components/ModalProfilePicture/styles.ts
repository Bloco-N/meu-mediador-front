import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  z-index: 3;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
  justify-content: center;
  .profile-pic{
    height: 20rem;
    width: 20rem;
    border-radius: 50%;
    object-fit: cover;
  }
  p{
    cursor: pointer;
    position: absolute;
    top: 5rem;
    right: 5rem;
    height: 3rem;
    width: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--surface-2);
    color: var(--surface);
    border-radius: 1rem;
    font-weight: bold;
  }
`