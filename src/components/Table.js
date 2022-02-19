import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Table = ({name, image, symbol, price, volume,priceChange,marketcap}) => {
  const [search, setSearch] = useState('');
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(resp => {
        setCoins(resp.data)

      })
      .catch(error => console.log(error))
  }, []);

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const filterCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  )


  return (
    <div>
      <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark ">
        <div className="container-fluid">
          <a className="navbar-brand" herf="#"><h3>CryptoTracker</h3></a>
          <form>
            <input type="text" placeholder='Search by name' className='coin-input' onChange={handleChange} />
          </form>
        </div>
      </nav>
      <div className='container table-responsive mt-2'>
        <table className="table table-bordered table-hover">
          <thead>
            <tr className=' bg-light table-primary'>
              <th scope="col">Coin</th>
              <th scope="col">Symbol</th>
              <th scope="col">Price(INR)</th>
              <th scope="col">Volume</th>
              <th scope="col">Price Change</th>
              <th scope="col">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {filterCoins.map(coin => {
              return (

                <tr key={coin.id}>
                  <th >
                    <img src={coin.image} height={20} weight={20} alt='crypto' />
                    {" "}{coin.name}{" "}
                  </th>

                  <td> {coin.symbol}</td>
                  <td ><p className='btn btn-success'>₹{coin.current_price} 
                  </p>
                  </td>
                  <td>{coin.total_volume}</td>
                 {/**  <td>₹{coin.price_change_percentage_24h}%</td>*/}
                <td> {coin.price_change_percentage_24h <0 ? (
                    <p className='red text-danger'>{coin.price_change_percentage_24h.toFixed(2)}%</p>
                    ): 
                    ( <p className='gre text-success'>{coin.price_change_percentage_24h.toFixed(2)}%</p>)
            }  </td>
                  <td>{coin.market_cap}</td>
                </tr>
              );




            })}
          </tbody>
        </table>

        <nav aria-label="Page navigation ">
          <ul className="pagination d-flex justify-content-center">
            <li className="page-item">
              <a className="page-link" href="#Table" aria-label="Previous">
                <span aria-hidden="true">«</span>
                <span className="sr-only"></span>
              </a>
            </li>
            <li className="page-item"><a className="page-link" href="#Table">1</a></li>
            <li className="page-item"><a className="page-link" href="#Table">2</a></li>
            <li className="page-item"><a className="page-link" href="#Table">3</a></li>
            <li className="page-item">
              <a className="page-link" href="#Table" aria-label="Next">
                <span aria-hidden="true">»</span>
                <span className="sr-only"></span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Table