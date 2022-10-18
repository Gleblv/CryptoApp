const useCoinService = () => {

  const getCommonCoins = async () => {
    try {
      const res = await fetch("https://api.coincap.io/v2/rates");
      const data = await res.json();

      const commonCoins = data.data.splice(0, 3);
    
      return(commonCoins);
    } catch {
      throw new Error("Error");
    }
  }

  const getCoinsList = async () => {
    const res = await fetch("https://api.coincap.io/v2/assets?limit=10");
    const data = await res.json();

    return data.data;
  }

  return {getCommonCoins, getCoinsList};
}

export default useCoinService;