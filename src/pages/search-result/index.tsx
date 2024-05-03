import { SearchResultContextType } from "@/types/SearchResultContextType"
import SearchContext from "context/SearchResultContext"
import { useContext, useEffect, useState } from "react"
import Pagination from "components/Pagination"
import { MainInfo } from "@components/index"
import InfoFooter from "components/InfoFooter"
import { useRouter } from "next/router"
import PopoverBase from "@components/Popover"
import { Checkbox } from "@components/index"
import { VscSettings } from "react-icons/vsc";
import * as C from '@/stylesPages/styles-search-result'
import api from "@/services/api"
import LoadingContext from "context/LoadingContext"
import { ModalOpenContextType } from "@/types/ModalOpenContextType"
interface IItemList {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  wppText: string | null;
  profilePicture: string | null;
  coverPicture: string | null;
  fullCoverPicture: string | null;
  introduction: string | null;
  phone: string | null;
  whatsapp: string | null;
  instagram: string | null;
  professional_email: string | null;
  website: string | null;
  facebook: string | null;
  expTime: string | null;
  phoneCountry: string | null;
  wppCountry: string | null;
  verified: boolean;
  Comments: any[];
  Partnerships: any[];
  RealtorCities: any[];
  RealtorLanguages: any[];
  rating: number;
  agencyName: string | null;
  agencyPic: string | null;
}

export default function SearchResult(){ 

  const { searchResult } = useContext(SearchContext) as SearchResultContextType;
  const [data,setData] = useState<IItemList[] | null>([])
  const [filter,setFilter] = useState<number[] | null>([])
  const { query } = useRouter();
  const idSearch = query.idSearch;
  const router = useRouter();
  const {setOpen:setLoadingOpen} = useContext(LoadingContext) as ModalOpenContextType


  function ordenarPorInformacoesPreenchidas(array:any) {
      function countFilledProperties(obj:any) {
          let count = 0;
          for (let key in obj) {
              if (Array.isArray(obj[key])) {
                  if (obj[key].length > 0) {
                      count++;
                  }
              } else {
                  if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
                      count++;
                  }
              }
          }
          return count;
      }

      function compararPorInformacoesPreenchidas(objetoA:any, objetoB:any) {
          const infoPreenchidasA = countFilledProperties(objetoA);
          const infoPreenchidasB = countFilledProperties(objetoB);
      
          return infoPreenchidasB - infoPreenchidasA;
      }

      array.sort(compararPorInformacoesPreenchidas);

      return array;
  }

  const options = [
    "Melhores avaliações",
    "Quantidades de avaliações",
    "Mais imóveis vendidos",
    "Mais compradores acompanhados",
    "Mais negócios feitos"
  ];

  const onSubmit = async () => {
    setLoadingOpen(true)
    const storageData = window.localStorage.getItem('@lastSearchResult') as any
    const data = JSON.parse(storageData)


    const fetchData = async () => {
      let url = data?.idSearch == 1 ? "/realtor?" : "/agency?";

      if (data?.zipCode) {
        const capitalizedZipCode =
          data.zipCode.charAt(0).toUpperCase() + data.zipCode.slice(1);
        url += "zipCode=" + capitalizedZipCode;
      }

      await api.post(url,{arrayFilter:filter})
        .then((response) => {
          setData(response.data)
        })
        .catch((error) => {
          return error;
        });
    };
    await fetchData();
    setLoadingOpen(false)
  };

  useEffect(() => {
    setData(ordenarPorInformacoesPreenchidas(searchResult.list))
  },[])

  return (
    <C.Container>
      <div className="list">
        <div className="actions-bar">
          <PopoverBase showArrow autoClose={false} triggerNode={<VscSettings style={{ fontSize:30, cursor: "pointer"}}/>} align='end'>
            <C.BaseFilterPopover>
              <C.HeaderBaseFilterPopover>
                <C.TextHeader>Filtrar por:</C.TextHeader>
              </C.HeaderBaseFilterPopover>
              <C.Divider/>
              <FormFilterResult
              options={options}
              onChange={(value:number[]) => setFilter(value)}
              values={filter?.map(item => item - 1)}
              />

              <C.FooterBaseFilterPopover>
                  <button onClick={onSubmit}>Filtrar</button>
              </C.FooterBaseFilterPopover>
            </C.BaseFilterPopover>
          </PopoverBase>
        </div>
        {data?.map((item:IItemList) => (
          <div className="teste" onClick={() => router.push(`/profile/${Number(idSearch) == 1 ? "realtor/" : "agency/"}${item.id}`)} key={item.id}>
            <MainInfo lastExp={{
              name: item.agencyName,
              pic: item.agencyPic,
              agencyId: item.agencyName
            }} isRealtor={true} userSigned={item} isProfile={false} pdfPage={false}/>
          </div>
        ))}
   
      </div>
      <div className="pagination">
          <Pagination currentPage={searchResult.currentPage} totalOfPages={searchResult.totalOfPages}/>
          <InfoFooter/>     
        </div>    
    </C.Container>

  )
}

const FormFilterResult: React.FC<any> = ({ options,values, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState<number[]>(values);

  const handleOptionChange = (optionIndex: number) => {
    const index = selectedOptions.indexOf(optionIndex);
    const newSelectedOptions = [...selectedOptions];

    if (index === -1) {
      newSelectedOptions.push(optionIndex);
    } else {
      newSelectedOptions.splice(index, 1);
    }

    setSelectedOptions(newSelectedOptions);
    onChange(newSelectedOptions?.map(item => item + 1));
  };

  return (
    <div style={{padding: '.2em 1rem 1rem 2rem'}}>
      {options?.map((option: string, index: number) => (
        <div key={index} style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          <Checkbox
            type="checkbox"
            value={index}
            checked={values.includes(index)}
            onChange={() => handleOptionChange(index)}
            name={`option-${index}`}
            id={`option-${index}`}
            label={option}
          />
        </div>
      ))}
    </div>
  );
};


