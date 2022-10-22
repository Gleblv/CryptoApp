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
    try {
      const res = await fetch("https://api.coincap.io/v2/assets?limit=10");
      const data = await res.json();

      return data.data;
    } catch {
      throw new Error("Error");
    }
  }

  const getCoinById = async (id) => {
    try {
      const res = await fetch(`https://api.coincap.io/v2/assets/${id}`);
      const data = await res.json();

      return(data.data);
    } catch {
      throw new Error("Error");
    }
  }

  return {getCommonCoins, getCoinsList, getCoinById};
}

export default useCoinService;