import { MyProfileRealtor } from "@/types/MyProfileRealtor";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const ProfileContainer = styled.div`
    height: 90rem;
    input {
        font-size: 1.3rem;
    }
`

const FieldsContainer = styled.div`
    /* background-color: violet; */
    width: 90%;
    height: 70rem;
`

const ProfileRow = styled.div`
    width: 100%;
    .input-row {
        width: 23.6rem;
    }
    .input-first {
        width: 27.2rem;
    }
    .input-current-job {
        width: 38rem;
    }
    .input-areas {
        width: 34.8rem;
    }
    .input-one-field {
        width: 74.8rem;
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
    .two-fields {
        width: 36.4rem;
    }
    button {
        margin-top: 3.6rem;
        width: 23.6rem;
        height: 3.3rem;
        font-size: 1.3rem;
    }
`

const MyProfileRealtorProfessional = () => {

    const { register, handleSubmit } = useForm<MyProfileRealtor>()

    const router = useRouter()

    const onSubmit = async (data: MyProfileRealtor) => {

        const fetchData = async () => {

            const { ...body } = data

            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/my-profile/realtorProfessional', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })

            const token = await response.text()
            localStorage.setItem('token', token)
            router.push('/my-profile/realtorProfessional')

        }

        await fetchData()
    }

    return (
        <ProfileContainer className="card my-profile" onSubmit={handleSubmit(onSubmit)}>

            <h2>Meu perfil</h2>

            <FieldsContainer>
                <ProfileRow className="my-profile-row">
                    <div className="my-profile-field">
                        <h4>Imobiliária que trabalha atualmente</h4>
                        <input className="input-current-job" placeholder="Escreva o nome do seu local de trabalho"
                            {...register('currentJobPlace', { required: true })} />
                    </div>

                    <div className="my-profile-field">
                        <h4>Áreas de atuação</h4>
                        <input className="input-areas" placeholder="Selecione as áreas em que trabalha"
                            {...register('areas', { required: true })} />
                        {/* <select></select> */}
                    </div>

                    <div className="my-profile-field">
                        <h4>Imóveis à venda</h4>
                        <input className="input-row" placeholder="Link para imóveis à venda"
                            {...register('housesToSale')} />
                    </div>
                </ProfileRow>

                <ProfileRow className="my-profile-row">
                    <div className="my-profile-field">
                        <h4>Imobiliárias que já trabalhou</h4>
                        <input className="input-one-field" placeholder="Selecione as imobiliárias"
                            {...register('oldJobPlaces')} />
                    </div>

                    <button>Adicionar novo local</button>
                </ProfileRow>

                <ProfileRow className="my-profile-row">
                    <div className="my-profile-field">
                        <h4>Nome do Curso</h4>
                        <input className="two-fields" placeholder="Nome"
                            {...register('courseName')} />
                    </div>

                    <div className="my-profile-field">
                        <h4>Descrição</h4>
                        <input className="two-fields" placeholder="Descrição"
                            {...register('courseDescription')} />
                    </div>

                    <button>Adicionar novo curso</button>
                </ProfileRow>

                <ProfileRow className="my-profile-row">
                    <div className="my-profile-field">
                        <h4>Nome do Prêmio</h4>
                        <input className="two-fields" placeholder="Nome"
                            {...register('rewardName')} />
                    </div>

                    <div className="my-profile-field">
                        <h4>Descrição</h4>
                        <input className="two-fields" placeholder="Descrição"
                            {...register('rewardDescription')} />
                    </div>

                    <button>Adicionar novo prêmio</button>
                </ProfileRow>

                <ProfileRow className="my-profile-row">
                    <div className="my-profile-field">
                        <h4>Nome da Especialização</h4>
                        <input className="two-fields" placeholder="Nome"
                            {...register('specializationName')} />
                    </div>

                    <div className="my-profile-field">
                        <h4>Descrição</h4>
                        <input className="two-fields" placeholder="Descrição"
                            {...register('specializationDescription')} />
                    </div>

                    <button>Adicionar nova especialização</button>

                </ProfileRow>

                <ProfileRow className="my-profile-row">
                    <div className="my-profile-field">
                        <h4>Serviços prestados</h4>
                        <input className="input-one-field" placeholder="Serviços prestados"
                            {...register('services')} />
                    </div>

                    <button>Adicionar novo serviço</button>
                </ProfileRow>

            </FieldsContainer>

            <button>Atualizar</button>

        </ProfileContainer>

    );
};

export default MyProfileRealtorProfessional;