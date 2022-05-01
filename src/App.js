import { useEffect, useState } from 'react';
import './App.css';


function App() {

  const twitterSvg = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px"><path fill="#03A9F4" d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429" /></svg>;

  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [copied, setCopied] = useState(false);

  const getQuote = async () => {

    const res = await fetch('https://api.quotable.io/random/');

    const data = await res.json();

    setQuote(data ? data.content : '');
    setAuthor(data ? data.author : '');

  }

  useEffect(() => {

    getQuote();

  }, []);

  const copyHandler = () => {
    navigator.clipboard.writeText(quote);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  }

  return (
    <div className="app">
      {quote ? <div className='wrapper'>
        <div className='heading'>GET RANDOM QUOTES</div>
        <div className='quote-section'>
          <p className='quote'>{quote}</p>
          <p className='author'>{author}</p>
        </div>
        <div className='tools'>
          <button className='btn btn-generate' onClick={getQuote}>Generate a new quote</button>
          <a className="btn btn-twitter" target="_blank"
            href={`https://twitter.com/intent/tweet?text=${quote}%0a%0a- ${author}%0a%0aVisit for more: ${window.location.href}`} rel="noreferrer">
            {twitterSvg()} <span>Tweet this quote</span>
          </a>
          <button className='btn btn-copy' onClick={copyHandler}>{copied ? 'Copied!' : 'Copy this quote'}</button>
        </div>
      </div> : 'loading...'}
      <p className='footer'>Developed by Rohan</p>
    </div>
  );
}

export default App;
