import { MyProfileAgency } from "@/types/MyProfileAgency";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const ProfileContainer = styled.div`
    input {
        font-size: 1.3rem;
    }
`

const FieldsContainer = styled.div`
    width: 90%;
    height: 63rem;
`

const ProfileRow = styled.div`
    .input-row {
        width: 23.6rem;
    }
    .input-address {
        width: 47.2rem;
    }
    .input-name {
        width: 26.8rem;
    }
    .specializations-services {
        width: 49.2rem;
    }
    .description {
        resize: none;
        padding: 2rem;
        border-radius: 2rem;
        background-color: var(--surface);
        width: 100.5rem;
        height: 12rem;
    }
`

const MyProfileAgency = () => {

    const { register, handleSubmit } = useForm<MyProfileAgency>()

    const router = useRouter()

    const onSubmit = async (data: MyProfileAgency) => {

        const fetchData = async () => {

            const { ...body } = data

            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/my-profile/agency', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })

            const token = await response.text()
            localStorage.setItem('token', token)
            router.push('/my-profile/agency')

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
                        <input className="input-name" placeholder="Nome"
                            {...register('name', { required: true })} />
                    </div>

                    <div className="my-profile-field">
                        <h4>Contato</h4>
                        <input placeholder="Contato"
                            {...register('contact', { required: true })} />
                    </div>

                    <div className="my-profile-field">
                        <h4>Endereço</h4>
                        <input className="input-address" placeholder="Endereço"
                            {...register('address', { required: true })} />
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
                        <h4>Áreas de atuação</h4>
                        <input className="input-row" placeholder="Áreas de atuação"
                            {...register('areas', { required: true })} />
                        {/* <select></select> */}
                    </div>

                    <div className="my-profile-field">
                        <h4>Línguas</h4>
                        <input className="input-row" placeholder="Línguas"
                            {...register('languages', { required: true })} />
                        {/* <select></select> */}
                    </div>

                    <div className="my-profile-field">
                        <h4>Equipe</h4>
                        <input className="input-row" placeholder="Nome do consultor"
                            {...register('team')} />
                        {/* <select></select> */}
                    </div>

                    <div className="my-profile-field">
                        <h4>Imóveis à venda</h4>
                        <input className="input-row" placeholder="Link para imóveis à venda"
                            {...register('housesToSale', { required: true })} />
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

                <ProfileRow className="my-profile-row">
                    <div className="my-profile-field">
                        <h4>Especializações</h4>
                        <input className="specializations-services" placeholder="Especializações"
                            {...register('specializations')} />
                    </div>

                    <div className="my-profile-field">
                        <h4>Serviços prestados</h4>
                        <input className="specializations-services" placeholder="Serviços prestados"
                            {...register('services')} />
                    </div>
                </ProfileRow>
            </FieldsContainer>

            <button>Atualizar</button>

        </ProfileContainer>
    );
};

export default MyProfileAgency;