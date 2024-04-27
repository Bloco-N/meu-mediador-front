import locales from "locales";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GoogleLoginButton from "../ButtonAuth";
import iconGoogle from "../../public/icon-google.png";
import iconFacebook from "../../public/icons-facebook.png";
import { signIn } from "next-auth/react";
import * as C from "./styles";
import { isMobileDevice } from "@/utils";

const BaseCardSignUp: React.FC<any> = ({ onSubmit, children }) => {
  const router = useRouter();
  const locale = router.locale;
  const [privacy_policy, setPrivacyPolicy] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const onPrivacyClick = () => {
    setPrivacyPolicy(!privacy_policy);
  };

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  const t = locales[locale as keyof typeof locales];
  return (
    <C.CardSignUp onSubmit={onSubmit}>
      <C.ContainerBaseCardSignUp isMobileDevice={isMobile}>
        <h2>{t.signUp.signUp}</h2>

        <C.ContainerForm>{children}</C.ContainerForm>

        <div className="orSeparator">
          <div className="borderTop"></div>
          <div className="orText">ou</div>
          <div className="borderTop"></div>
        </div>

        <C.ContainerOAuth>
          <GoogleLoginButton
            icon={iconGoogle.src}
            onClick={() => signIn("google")}
            text={t.signIn.google}
          />

          <GoogleLoginButton
            icon={iconFacebook.src}
            onClick={() => signIn("facebook")}
            text={t.signIn.facebook}
          />
        </C.ContainerOAuth>

        <C.ContainerTerms>
          <span className="txt-center">
            <input
              type="checkbox"
              className="check_box"
              checked={privacy_policy}
              onClick={onPrivacyClick}
            />
            {t.signUp.check_police}
          </span>
          <button className="button" type="submit" disabled={!privacy_policy}>
            {t.signUp.signUp}
          </button>
        </C.ContainerTerms>
      </C.ContainerBaseCardSignUp>
    </C.CardSignUp>
  );
};

export default BaseCardSignUp;
