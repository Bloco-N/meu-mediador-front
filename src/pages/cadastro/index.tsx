import styles from "../../../src/styles/lp.module.css";
import { Img } from '@components/index';

import man from "../../../public/man-form.webp";
import finalMan from "../../../public/man-final.webp";
import { Carousel } from "components/Carousel";
import { useState, useContext } from "react";
import router, {useRouter} from "next/router";
import { useMediaQuery } from "usehooks-ts";

import UserContext from "context/UserContext";
import LoadingContext from "context/LoadingContext";
import { UserContextType } from "@/types/UserContextType";
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import { decode } from "jsonwebtoken";
import { toast } from "react-toastify";
import api from "@/services/api";
import locales from "locales";

export default function Cadastro() {
  const matches = useMediaQuery("(min-width: 1400px)");
  const matchesTablet = useMediaQuery("(max-width: 1180px)");

  const [type, setType] = useState<"consultor" | "cliente" | "agência">("consultor");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const routerLocale = useRouter()
  const locale = routerLocale.locale
  const t = locales[locale as keyof typeof locales]

  const { setUser } = useContext(UserContext) as UserContextType;
  const { setOpen: setLoadingOpen } = useContext(
    LoadingContext
  ) as ModalOpenContextType;

  const onSubmit = (e: any) => {
    if (type === "agência") {
      fetchAgencyData();
      e.preventDefault();
    } else if (type === "cliente") {
      fetchClientData();
      e.preventDefault();
    } else if (type === "consultor") {
      fetchRealtorData();
      e.preventDefault();
    } else {
      alert("Ops, algo errado!");
      e.preventDefault();
    }
  };

  const fetchAgencyData = async () => {
    if (password != confirmPassword) {
      toast.error(t.toast.errorPassword);
      return;
    }

    const urlFetch = "/agency/sign-up";
    const body = {
      name,
      email,
      password,
    };

    await api
      .post(urlFetch, body)
      .then((response) => {
        loginAgency();
      })
      .catch((error) => {
        toast.error(t.toast.errorRegistration);
      });
  };

  const fetchClientData = async () => {
    if (password != confirmPassword) {
      toast.error(t.toast.errorPassword);
      return;
    }

    const urlFetch = "/client/sign-up";
    const body = {
      firstName: name,
      lastName,
      email,
      password,
    };

    await api
      .post(urlFetch, body)
      .then((response) => {
        loginClient();
      })
      .catch((error) => {
        toast.error(t.toast.errorRegistration);
      });
  };

  const fetchRealtorData = async () => {
    if (password != confirmPassword) {
      toast.error(t.toast.errorPassword);
      return;
    }

    const urlFetch = "/realtor/sign-up";
    const body = {
      firstName: name,
      lastName,
      email,
      password,
    };

    await api
      .post(urlFetch, body)
      .then((response) => {
        realtorLogin();
      })
      .catch((error) => {
        toast.error(t.toast.errorRegistration);
      });
  };

  // LOGIN FUNCTIONS
  const loginAgency = async () => {
    const urlFetch = "/agency/sign-in";
    const body = {
      email,
      password,
    };
    setLoadingOpen(true);
    await api.post(urlFetch, body)
      .then(async (response) => {
        if (!response.data) {
          toast.error(t.toast.errorLogin);
          setLoadingOpen(false);
          return;
        }

        const token = response.data;

        localStorage.setItem("token", token);
        const user = decode(token) as {
          id: number;
          email: string;
          name: string;
        };
        localStorage.setItem("id", String(user.id));

        await api
          .get(`/agency/${user.id}`)
          .then((response) => {
            const agencyData = response.data;
            localStorage.setItem("pic", agencyData.profilePicture);
            localStorage.setItem("accountType", "agency");

            setUser({
              token,
              id: user.id,
              profilePicture: agencyData.profilePicture,
              coverPicture: agencyData.coverPicture,
              accountType: "agency",
            });
            setLoadingOpen(false);
            if (agencyData.verified === false) {
              router.push("/verify/agency");
            } else {
              router.reload();
            }
            toast.success(t.toast.welcome);
          })
          .catch((error) => {
            setLoadingOpen(false);
            toast.error(t.toast.errorLogin);
          });
      })
      .catch((error) => {
        setLoadingOpen(false);
        toast.error(t.toast.errorLogin);
      });
  };

  // CLIENT
  const loginClient = async () => {
    const urlFetch = "/client/sign-in"
    const body = {
      email,
      password,
    };

    setLoadingOpen(true);
    await api.post(urlFetch, body)
    .then(async (response) => {
      if (!response.data) {
        toast.error(t.toast.errorLogin);
        setLoadingOpen(false);
        return;
      }
      const token = response.data;
      localStorage.setItem("token", token);
      const user = decode(token) as {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
      };
      localStorage.setItem("id", String(user.id));

      await api.get(`/client/${user.id}`)
        .then((response) => {
          localStorage.setItem("accountType", "client");
          const clientData = response.data
          setUser({
            token,
            id: user.id,
            profilePicture: null,
            coverPicture: null,
            accountType: "client",
          });
          setLoadingOpen(false);
          if (clientData.verified === false) {
            toast.success(`${t.toast.welcome} ${clientData.firstName}!`)
            router.push("/verify/client");
          } else {
            router.reload();
          }
        })
        .catch((error) => {
          setLoadingOpen(false);
          toast.error(t.toast.errorLogin);
        })
    })
    .catch((error) => {
      setLoadingOpen(false);
      toast.error(t.toast.errorLogin);
    })
  };

  // REALTOR
  const realtorLogin = async () => {
    const urlFetch = "/realtor/sign-in";
    const body = {
      email,
      password,
    };

      setLoadingOpen(true);
      await api.post(urlFetch , body)
      .then(async (response) => {
        if (!response.data) {
          setLoadingOpen(false);
          return;
        }
        const token = response.data;
        localStorage.setItem("token", token);
        const user = decode(token) as {
          id: number;
          email: string;
          firstName: string;
          lastName: string;
        };
        localStorage.setItem("id", String(user.id));
        await api.get(`/realtor/${user.id}`)
        .then((response) => {
          const realtorData = response.data
          localStorage.setItem("pic", realtorData.profilePicture);
          localStorage.setItem("accountType", "realtor");
    
          setUser({
            token,
            id: user.id,
            profilePicture: realtorData.profilePicture,
            coverPicture: realtorData.coverPicture,
            accountType: "realtor",
          });
          setLoadingOpen(false);
          if (realtorData.verified === false) {
            toast.success(`${t.toast.welcome} ${realtorData.firstName}`)
            router.push("/verify/realtor");
          } else {
            router.reload();
          }
        })
        .catch((error) => {
          setLoadingOpen(false);
          toast.error(t.toast.errorLogin);
        })
  
      })
      .catch((error) => {
        setLoadingOpen(false);
        toast.error(t.toast.errorLogin);
      })
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.hero}>
          <div className={styles.contentSection1}>
            <div
              className={styles.textDiv}
              style={{
                paddingTop:
                  type === "agência" && matches
                    ? "100px"
                    : type === "agência" && matchesTablet
                    ? "80px"
                    : "",
              }}
            >
              <h1>A ferramenta obrigatória para todo consultor imobiliário</h1>
              <a href="#cadastro">100% gratuito - Cadastre-se agora!</a>
              <p>
                Tenha mais negócios e eleve sua faturação, seja encontrado por
                mais clientes, consultores e tenha toda sua trajetória vitoriosa
                no imobiliário registrada!
              </p>
              <br />
              <p>
                O Meoagent é um site gratuito onde você pode cadastrar seu
                currículo, imóveis, serviços, histórico, tudo relacionado ao
                imobiliário! Eleve sua credibilidade para outro nível e seja
                encontrado por recrutadores.
              </p>
              <br />
              <p>
                O Meoagent é um site feito para consultores, agências e
                clientes. Solução completa, fácil de usar e meritocrática!
              </p>
            </div>
            <div id="cadastro" className={styles.formDiv}>
              <div className={styles.divImage}>
                <Img file={man} alt="man pointing" />
                <p>Preencha o formulário abaixo e crie seu cadastro!</p>
              </div>
              <div className={styles.form}>
                <form onSubmit={(e) => onSubmit(e)}>
                  <div>
                    <select
                      value={type}
                      onChange={(e: any) => setType(e.target.value)}
                      name="type"
                    >
                      <option value="consultor">Consultor</option>
                      <option value="agência">Agência</option>
                      <option value="cliente">Cliente</option>
                    </select>
                  </div>
                  <div>
                    <input
                      required
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Nome"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  {type === "agência" ? (
                    ""
                  ) : (
                    <div>
                      <input
                        required
                        type="text"
                        name="lastname"
                        id="lastname"
                        placeholder="Sobrenome"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  )}
                  <div>
                    <input
                      required
                      type="text"
                      name="email"
                      id="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      required
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      required
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="Confirme sua senha"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      className={styles.submitButton}
                      type="submit"
                      value="Criar meu cadastro no Meoagent agora!"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.diagonalDiv}>
          <div className={styles.title2}>
            <h2>O que consultores imobiliários falam do Meoagent</h2>
          </div>
          <div className={styles.carouselDiv}>
            <Carousel />
          </div>
        </div>
        <div className={styles.finalDiv}>
          <div className={styles.textFinal}>
            <h3>O que é o Meoagent?</h3>
            <p>
              O Meoagent é uma plataforma criada em Portugal, especializada no
              setor imobiliário que visa facilitar a conexão, visibilidade e
              troca de informação entre consultores, agências e clientes em todo
              o mundo.
            </p>

            <h4>O site é para qual público?</h4>
            <ul>
              <li>
                Para o consultor que quer levar sua credibilidade para outro
                nível.
              </li>
              <li>Para o consultor que quer aumentar seu faturamento.</li>
              <li>
                Para a agência que quer encontrar e recrutar os melhores
                consultores.
              </li>
              <li>
                Para a agência que quer levar sua credibilidade para outro
                nível.
              </li>
              <li>
                Para clientes que querem contratar serviços dos melhores
                consultores e agências imobiliárias.
              </li>
            </ul>
          </div>
          <div className={styles.finalImage}>
            <Img file={finalMan} alt="man with a laptop" />
            <a href="#cadastro">Quero me cadastrar no Meoagent agora!</a>
          </div>
        </div>
        <footer className={styles.footer}>
          Copyright © 2023 Meoagent – Todos os direitos reservados
        </footer>
      </div>
    </>
  );
}
