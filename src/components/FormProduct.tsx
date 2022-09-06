import React,
  {
    FC,
    useState,
    useEffect,
  } 
from 'react';
import { AiOutlineStepBackward } from 'react-icons/ai';

type Props = {
  price: number; // 寄付金額
  count: number; // 数量
  url: string; // 商品URL
  selectCount: number;
  setSelectCount: any;
};

const MIDDLE_STOCK = '残りわずか。寄付はお早めに';
const NONE_STOCK = '品切れ';

export const FormProduct: FC<Props> = ({ price, count, url, selectCount, setSelectCount }) => {
  const [stockText, setStockText] = useState('');

  useEffect(() => {
    changeStockText();
  }, [])

  const changeStockText = () => {
    if (count >= 6) {
      setStockText(`${count}個`);
    } else if (count <= 5) {
      setStockText(MIDDLE_STOCK);
    } else {
      setStockText(NONE_STOCK);
    }
  }

  const changeStock = (e: any) => {
    setSelectCount(e.target.value);
  }

  const generateOptions = () => {
    let options = [];
    for (let i = 0; i <= count; i++) {
      options.push(<option key={i}>{i}</option>)
    }

    return options;
  }

  return (
    <div
      className='wrapper'
      style={{
        backgroundColor: 'lightgrey',
        width: "100%"
      }}
    >
      <div className='price-box'>
        <div
          className='price'
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <label>寄付額：</label>
          <p
            style={{
              fontWeight: 'bold',
              fontSize: '25px',
              margin: '0 10px'
            }}
          >{price}円</p>
          <p>送料無料</p>
        </div>
        <p
          style={{
            color: 'red'
          }}
        >何回お礼の品をもらっても自室年間2,000円の負担</p>
      </div>

      <div className='inventory-quantity'
        style={{
          paddingTop: '20px'
        }}
      >
        <div className='stock'>
          <label>
            <span>
              在庫：
            </span>
            {stockText}
          </label>
        </div>
        <div
          className='quantity'
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '30px 0'
          }}
        >
          <label
            style={{
              color: 'grey'
            }}
          >数量：</label>
          <select
            onChange={(e: any) => changeStock(e)}
            value={selectCount}
            style={{
              height: '50px',
              width: '80px'
            }}>
            {generateOptions()}
          </select>
          <button
            style={{
              width: '200px',
              height: '50px',
              border: 'none',
              backgroundColor: '#ad0003',
              margin: '0 20px',
              color: 'white'
            }}
          >ふるさと納税でもらう</button>
        </div>
      </div>

      { url.length !== 0 ?
        <div className='back'>

          <a href={url}
            style={{
              textDecoration: 'none',
              color: 'red',
            }}
          ><AiOutlineStepBackward />
            通常購入に戻る</a>
        </div>
        :
        null
      }
    </div>
  )
};
