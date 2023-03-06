import { MyProfileRealtor } from "@/types/MyProfileRealtor";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Link from "next/link";
import styled from "styled-components";

const ProfileContainer = styled.div`
    height: 75rem;
    input {
        font-size: 1.3rem;
    }
`

const FieldsContainer = styled.div`
    /* background-color: violet; */
    width: 90%;
    height: 52rem;
`

const ProfileRow = styled.div`
    .input-row {
        width: 23.6rem;
    }
    .input-first {
        width: 27.2rem;
    }
    .input-areas {
        width: 34.8rem;
    }
    .description {
        resize: none;
        padding: 2rem;
        border-radius: 2rem;
        background-color: var(--surface);
        width: 100.5rem;
        height: 12rem;
    }
    .specializations-services {
        width: 49.2rem;
    }
    button {
        margin-top: 3.6rem;
        width: 7rem;
        height: 3.3rem;
        font-size: 1.3rem;;
    }
`



const MyProfileRealtorPersonal = () => {

    const { register, handleSubmit } = useForm<MyProfileRealtor>()

    const router = useRouter()

    const onSubmit = async (data: MyProfileRealtor) => {

        const fetchData = async () => {

            const { ...body } = data

            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/my-profile/realtorPersonal', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })

            const token = await response.text()
            localStorage.setItem('token', token)
            router.push('/my-profile/realtorPersonal')

        }

        await fetchData()
    }

    return (
        <ProfileContainer className="card my-profile" onSubmit={handleSubmit(onSubmit)}>

            <h2>Meu perfil</h2>

            <FieldsContainer>
                <ProfileRow className="my-profile-row">
                    <div className="my-profile-field">
                        <h4>Nome</h4>
                        <input className="input-first" placeholder="Nome"
                            {...register('firstName', { required: true })} />
                    </div>

                    <div className="my-profile-field">
                        <h4>Sobrenome</h4>
                        <input className="input-first" placeholder="Sobrenome"
                            {...register('lastName', { required: true })} />
                    </div>

                    <div className="my-profile-field">
                        <h4>Foto</h4>
                        <input className="input-first" placeholder="Nenhum arquivo selecionado"
                            {...register('photo', { required: true })} />
                    </div>

                    <button>Buscar arquivo</button>
                </ProfileRow>

                <ProfileRow className="my-profile-row">
                    <div className="my-profile-field">
                        <h4>Contato</h4>
                        <input className="input-row" placeholder="Contato"
                            {...register('contact', { required: true })} />
                    </div>

                    <div className="my-profile-field">
                        <h4>E-mail</h4>
                        <input className="input-row" placeholder="E-mail"
                            {...register('email', { required: true })} />
                    </div>

                    <div className="my-profile-field">
                        <h4>Whatsapp</h4>
                        <input className="input-row" placeholder="Whatsapp"
                            {...register('whatsapp')} />
                    </div>

                    <div className="my-profile-field">
                        <h4>Línguas</h4>
                        <input className="input-row" placeholder="Select"
                            {...register('languages', { required: true })} />
                    </div>
                </ProfileRow>

                <ProfileRow className="my-profile-row">
                    <div className="my-profile-field">
                        <h4>Descrição</h4>
                        <textarea className="description" placeholder="Descrição"
                            {...register('description')} />
                    </div>
                </ProfileRow>

                <ProfileRow className="my-profile-row">
                    <div className="my-profile-field">
                        <h4>Site</h4>
                        <input className="input-row" placeholder="Link para o seu site"
                            {...register('site')} />
                    </div>

                    <div className="my-profile-field">
                        <h4>Facebook</h4>
                        <input className="input-row" placeholder="Link para o seu facebook"
                            {...register('facebook')} />
                    </div>

                    <div className="my-profile-field">
                        <h4>Instagram</h4>
                        <input className="input-row" placeholder="Link para o seu instagram"
                            {...register('instagram')} />
                    </div>

                    <div className="my-profile-field">
                        <h4>Twitter</h4>
                        <input className="input-row" placeholder="Link para o seu twitter"
                            {...register('twitter')} />
                    </div>
                </ProfileRow>

            </FieldsContainer>

            <Link href='/my-profile/realtorProfessional'><button>Próximo</button></Link>

        </ProfileContainer>

    );
};

export default MyProfileRealtorPersonal;