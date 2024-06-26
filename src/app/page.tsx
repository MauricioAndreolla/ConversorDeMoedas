"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from './components/Loading';
import Currencies from './data/db.json';
import { toast, ToastContainer } from 'react-toastify';
import { ArrowRightIcon } from 'lucide-react';
import { Currency } from './types/Types';

export default function Home() {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const baseURLIcons = process.env.NEXT_PUBLIC_BASE_URL_ICONS;

  const [valueHigh, setValueHigh] = useState(1);
  const [valueLow, setValueLow] = useState(1);

  const [responseValueHigh, setResponseValueHigh] = useState(1);
  const [responseValueLow, setResponseValueLow] = useState(1);

  const [inputValue, setInputValue] = useState(1);
  const [IsLoading, setIsLoading] = useState(true);

  const [currency, setCurrency] = useState([{
    label: '',
    name: '',
    codeCountry: ''
  }]);

  const [icoCurrency, setIcoCurrency] = useState<Currency>({
    code: 'USD',
    CodeCountry: 'US',
    name: 'Dolár Americano'
  });

  const [icoCurrencySecond, setIcoCurrencySecond] = useState<Currency>({
    code: 'BRL',
    CodeCountry: 'BR',
    name: 'Real Brasileiro'
  });

  const [primaryCurrency, setPrimaryCurrency] = useState('USD');
  const [secondCurrency, setSecondCurrency] = useState('BRL');


  function GetValues() {
    const endpoint = `/json/last/${primaryCurrency}-${secondCurrency}`;
    const url = baseURL + endpoint;

    console.log(url)

    axios(`${url}`).then(response => {

      if (response.status == 200) {

        setResponseValueHigh((response.data?.[primaryCurrency + secondCurrency].high));
        setResponseValueLow((response.data?.[primaryCurrency + secondCurrency].low));

        setIsLoading(false);
      }

    }).catch((ex: any) => {

      if (primaryCurrency === secondCurrency) {
        toast.error(`Cotação do ${primaryCurrency} para ${secondCurrency} são iguais`);
      } else {
        toast.error(`Cotação do ${primaryCurrency}-${secondCurrency} não encontrada`);
      }

    })


    handleValues()
  }

  const CalcValues = function () {

    setValueHigh(responseValueHigh * inputValue);
    setValueLow(responseValueLow * inputValue);

    console.log(primaryCurrency)
    console.log(secondCurrency)

  }

  const converNumberToMonetary = function (value: number) {


    return Intl.NumberFormat(navigator.language, {
      style: 'currency',
      maximumFractionDigits: 2,
      currencySign: 'standard',
      currency: `${secondCurrency}`
    }).format(value)
  }

  const handleValues = function () {

    let values = Currencies?.data.map(currency => {
      return {
        label: currency.code,
        name: currency.name,
        codeCountry: currency.code_country
      }
    });

    values = values.sort(compare);

    setCurrency(values);

  }

  const compare = (a: any, b: any) => {
    if (a.name > b.name) {
      return 1;
    } else
      if (a.name < b.name) {
        return -1;
      } else {
        return 0;
      }
  }

  const setIcoCurrencyValue = () => {
    const value = currency.find(x => x.label == primaryCurrency);

    setIcoCurrency({
      code: value?.label ?? 'USD',
      CodeCountry: value?.codeCountry ?? 'US',
      name: value?.name ?? 'Dolár Americano'
    });
  }

  const setIconCorrencySecondValue = () => {
    const value = currency.find(x => x.label == secondCurrency);

    setIcoCurrencySecond({
      code: value?.label ?? 'BRL',
      CodeCountry: value?.codeCountry ?? 'BR',
      name: value?.name ?? 'Real Brasileiro'
    });
  }

  useEffect(() => {
    GetValues()
    setIcoCurrencyValue()
    setIconCorrencySecondValue()

  }, [primaryCurrency, secondCurrency])

  return (
    <div className="flex flex-col justify-center items-center">


      <ToastContainer
        theme='dark'
        draggable={true}
        autoClose={10000}
      />

      {
        IsLoading == true ?

          <Loading />

          :
          <>
            <div className="flex flex-col items-center justify-center w-[550px] h-[470px] rounded bg-zinc-900 hover:shadow-xl hover:shadow-green-900/50 transition duration-500 delay-400 mt-5">

              <div className='h-full w-full'>

                <div className="mt-5 text-center">
                  <h5 className="text-white text-center font-bold text-2xl">Conversão de moedas para <span className='font-bold text-green-700'>{primaryCurrency}</span></h5>
                </div>

                <div className="flex flex-col justify-center items-center mt-3">

                  <label className="text-left my-2">Moeda da cotação <strong>(De)</strong></label>

                  <select className='rounded-lg p-3 hover:opacity-95 text-zinc-900 outline-none' name='currency' id='currency' onChange={(e) => setPrimaryCurrency(e.target.value)} value={primaryCurrency}>
                    {
                      currency.map(e => {
                        return (
                          <option key={`${e.label}`} className='text-zinc-900 text-center' value={`${e.label}`}>{e.name}</option>
                        )
                      })
                    }

                  </select>
                </div>

                <div className="flex flex-col justify-center items-center mt-3">

                  <label className="text-left my-3">Moeda da cotação <strong>(Para)</strong></label>

                  <select className='rounded-lg p-3 hover:opacity-95 text-zinc-900 outline-none' name='currency' id='currency' onChange={(e) => setSecondCurrency(e.target.value)} value={secondCurrency}>
                    {
                      currency.map(e => {
                        return (
                          <option key={`${e.label}`} className='text-zinc-900 text-center' value={`${e.label}`}>{e.name}</option>
                        )
                      })
                    }

                  </select>
                </div>

                <div className="flex flex-row justify-center items-center mt-3">

                  <div className='flex flex-col justify-center items-center'>
                    <div className='flex flex-row justify-center items-center'>
                      <label className="text-left my-3 ">Valor em <span className='font-bold text-red-700'>{primaryCurrency}</span></label>

                      <img
                        id='CodeCountry'
                        className='mx-2 rounded-full hover:animate-ping'
                        width={30}
                        height={10}
                        alt={`${icoCurrency?.name} ?? Not Found`}
                        src={`${baseURLIcons}/country-flag-icons/3x2/${icoCurrency?.CodeCountry}.svg` ?? ''} />

                    </div>

                    <input type="number"
                      className='rounded-lg p-3 hover:opacity-95 text-zinc-900 outline-none'
                      id='value'
                      value={inputValue || ''}
                      onChange={(e) => setInputValue(+e.target.value)}
                    />

                  </div>

                </div>

                <div className='m-2 flex justify-center items-center'>
                  <div className='flex flex-row justify-center items-center'>


                    <img
                      id='CodeCountry'
                      className='m-2'
                      width={30}
                      height={10}
                      alt={`${icoCurrency?.name} ?? Not Found`}
                      src={`${baseURLIcons}/country-flag-icons/3x2/${icoCurrency?.CodeCountry}.svg` ?? ''} />

                    <ArrowRightIcon className='mx-2' />

                    <img
                      id='CodeCountrySecond'
                      className='m-2'
                      width={30}
                      height={10}
                      alt={`${icoCurrencySecond?.name} ?? Not Found`}
                      src={`${baseURLIcons}/country-flag-icons/3x2/${icoCurrencySecond?.CodeCountry}.svg` ?? ''} />

                  </div>
                </div>

                <div className="flex justify-center items-center">
                  <button className='w-[100px] h-[40px] bg-green-800 hover:bg-green-700 rounded-lg' onClick={() => CalcValues()}>Calcular</button>
                </div>

              </div>
            </div>
            <div className='flex flex-col flex-grow flex-wrap bg-zinc-900 w-[350px] h-[220px] items-center justify-center rounded mt-3 hover:shadow-xl hover:shadow-green-900/50 transition duration-500 delay-400'>
              <div className='p-2'>
                <h2 className='font-bold text-2xl'>Cotações</h2>
              </div>

              <div className='p-2'>
                <small>1 {primaryCurrency} = {responseValueHigh} {secondCurrency}</small>
              </div>

              <div className='flex flex-row flex-1 flex-wrap justify-center items-center text-center flex-grow'>

                <div className='mx-3'>
                  <h2 className='font-bold text-2xl'>Baixa</h2 >
                  <small className='text-green-800 text-2xl'>{converNumberToMonetary(responseValueLow)}</small>
                </div>

                <div className='mx-3'>
                  <h2 className='font-bold text-2xl'>Alta</h2>
                  <small className='text-red-800 text-2xl'>{converNumberToMonetary(responseValueHigh)}</small>
                </div>


              </div>


            </div>

            <div className='flex flex-row w-full flex-wrap h-[130px] bg-zinc-900 items-center justify-center rounded mt-3 hover:shadow-xl hover:shadow-green-900/50 transition duration-500 delay-400 mb-10'>

              <div className='mx-3 text-center'>
                <h2 className='font-bold text-3xl'>Baixa</h2>
                <small className='text-green-800 text-2xl'>{converNumberToMonetary(valueLow)}</small>
              </div>

              <div className='mx-3 text-center'>
                <h2 className='font-bold text-3xl'>Alta</h2 >
                <small className='text-red-800 text-2xl'>{converNumberToMonetary(valueHigh)}</small>
              </div>


            </div>


          </>

      }



    </div >
  );

}