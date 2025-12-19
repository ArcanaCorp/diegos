export const useStats = () => {

    const loadData = async (type) => {
        try {
            setLoading(true);
            const data = await getSalesStats(type);
            if (!data.ok) return setVentas([]);
                console.log(data)
                setVentas(data.data)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }
    
    return {
        loadData
    }

}