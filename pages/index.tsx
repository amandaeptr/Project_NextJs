import Link from 'next/link';
export default function Home() {
  return(
    <div className='container-home'>
        <header>
            <div className="logo">PERPUS'MAN</div>
            <nav>
                <ul>
                    <li><a href="/inputdata">INPUT DATA</a></li>
                    <li><a href="/carddata">CARD DATA</a></li>
                    <li><a href="/listdata">LIST DATA</a></li>
                </ul>
            </nav>
        </header>
    </div>
  )
}