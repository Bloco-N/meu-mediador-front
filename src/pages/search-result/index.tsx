import { useContext, useEffect, useState, useCallback, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import { VscSettings } from "react-icons/vsc";
import * as C from '@/stylesPages/styles-search-result';

import SearchContext from "context/SearchResultContext";
import LoadingContext from "context/LoadingContext";

import Pagination from "components/Pagination";
import { MainInfo, Checkbox } from "@components/index";
import InfoFooter from "components/InfoFooter";
import PopoverBase from "@components/Popover";

import api from "@/services/api";
import { SearchResultContextType } from "@/types/SearchResultContextType";
import { ModalOpenContextType } from "@/types/ModalOpenContextType";

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
  agencyId: number | null;
}

interface FormFilterResultProps {
  options: string[];
  values: number[];
  onChange: (value: number[]) => void;
}

const options: string[] = [
  "Melhores avaliações",
  "Quantidades de avaliações",
  "Mais imóveis vendidos",
  "Mais compradores acompanhados",
  "Mais negócios feitos"
];

export default function SearchResult() { 
  const { searchResult } = useContext(SearchContext) as SearchResultContextType;
  const [data, setData] = useState<IItemList[]>([]);
  const [filter, setFilter] = useState<number[]>([]);
  const { query } = useRouter();
  const idSearch = query.idSearch as string;
  const router = useRouter();
  const { setOpen: setLoadingOpen } = useContext(LoadingContext) as ModalOpenContextType;

  const fetchData = useCallback(async (filter: number[]) => {
    setLoadingOpen(true);

    const storageData = window.localStorage.getItem('@lastSearchResult');
    const storedData = storageData ? JSON.parse(storageData) : {};
    const url = storedData?.idSearch == 1 ? "/realtor?" : "/agency?";
    const zipCodeParam = storedData?.zipCode ? `zipCode=${storedData.zipCode}` : '';
    
    try {
      const response = await api.post(`${url}${zipCodeParam}`, { arrayFilter: filter });
      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingOpen(false);
    }
  }, [setLoadingOpen]);

  useEffect(() => {
    return setData(orderByFilledFields(searchResult.list));
  }, [searchResult.list]);

  const handleSubmit = useCallback(() => {
    fetchData(filter);
  }, [fetchData, filter]);

  const handleCardSelection = (item: IItemList) => {
    if (!document.getElementById('simple-popper')) {
      router.push(`/profile/${Number(idSearch) == 1 ? `realtor/` : "agency/"}${item.id}`);
    }
  };

  return (
    <C.Container>
      <div className="list">
        <ActionsBar onSubmit={handleSubmit} options={options} filter={filter} setFilter={setFilter} />
        {data.map((item) => (
          <div key={item.id} className="teste" onClick={() => handleCardSelection(item)}>
            <MainInfo
              lastExp={{ name: item.agencyName, pic: item.agencyPic, agencyId: item.agencyId }}
              isRealtor={true}
              userSigned={item}
              isProfile={false}
              pdfPage={false}
            />
          </div>
        ))}
      </div>
      <div className="pagination">
        <Pagination currentPage={searchResult.currentPage} totalOfPages={searchResult.totalOfPages} />
        <InfoFooter />
      </div>
    </C.Container>
  );
}

interface ActionsBarProps {
  onSubmit: () => void;
  options: string[];
  filter: number[];
  setFilter: Dispatch<SetStateAction<number[]>>;
}

const ActionsBar: React.FC<ActionsBarProps> = ({ onSubmit, options, filter, setFilter }) => {
  return (
    <div className="actions-bar">
      <PopoverBase showArrow autoClose={false} triggerNode={
      <C.ButtonFilter>
        <h3>Filter</h3>    
      </C.ButtonFilter>
    } align='end'>
        <C.BaseFilterPopover>
          <C.HeaderBaseFilterPopover>
            <C.TextHeader>Filtrar por:</C.TextHeader>
          </C.HeaderBaseFilterPopover>
          <C.Divider />
          <FormFilterResult options={options} onChange={setFilter} values={filter} />
          <C.FooterBaseFilterPopover>
            <button onClick={onSubmit}>Filtrar</button>
          </C.FooterBaseFilterPopover>
        </C.BaseFilterPopover>
      </PopoverBase>
    </div>
  );
};

const FormFilterResult: React.FC<FormFilterResultProps> = ({ options, values, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState<number[]>(values);

  const handleOptionChange = (optionIndex: number) => {
    const newSelectedOptions = selectedOptions.includes(optionIndex)
      ? selectedOptions.filter((index) => index !== optionIndex)
      : [...selectedOptions, optionIndex];

    setSelectedOptions(newSelectedOptions);
    onChange(newSelectedOptions.map((item) => item + 1));
  };

  return (
    <div style={{ padding: '.2em 1rem 1rem 2rem', }}>
      {options.map((option, index) => (
        <div key={index} style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          <Checkbox
            type="checkbox"
            value={index}
            checked={selectedOptions.includes(index)}
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

const orderByFilledFields = (array: any): any => {
  const countFilledProperties = (obj: any): number => {
    return Object.values(obj).filter(value => value !== null && value !== undefined && value !== '').length;
  };

  return array.sort((a:any, b:any) => countFilledProperties(b) - countFilledProperties(a));
};
