import { useState } from 'react'



function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex flex-col  max-w-[1000px] mx-auto w-full'> 
      <section className='min-h-screen flex flex-col'>
        <header className='flex items-center justify-between gap-4 p-4' href='#'>
          <h1>Echo<span className='text-blue-400'>Text</span></h1>
          <button className='flex items-center gap-2'>
            <p>New</p>
            <i class="fa-solid fa-plus"></i>
          </button>
        </header>
        <main className='flex-1 bg-green-400 p-4 flex flex-col justify-center'>

        </main>
      </section>
      <footer>

      </footer>
    </div>
  )
}

export default App
