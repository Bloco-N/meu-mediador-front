import { useRouter } from "next/router"

//page note fold
export default function Page(){
  const router = useRouter()

    return (
      <>
       <p>{router.query.slug} indisponivel</p>
      </>
    )
  }