const useCoinService = () => {

  const getCommonCoins = async () => {
    const res = await fetch("https://api.coincap.io/v2/rates");
    const data = await res.json();

    const commonCoins = data.data.splice(0, 3);
    
    return(commonCoins);
  }

  return {getCommonCoins};
}

export default useCoinService;