import { useRouter } from "next/router"

export default function Page(){
  const router = useRouter()

    return (
      <>
        {router.query.slug} indisponivel
      </>
    )
  }