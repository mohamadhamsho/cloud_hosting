import React from 'react'

const Header = () => {
  return (
    <header className="bg-primary mb-8 py-2">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <a href='/' className='text-white text-2xl'>Cloud<span className='text-secondary'>Hosting</span></a>
          </div>

          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <a
                    className="text-white text-[1rem] hover:text-secondary"
                    href="/"
                  >
                    {' '}
                    Home{' '}
                  </a>
                </li>
                <li>
                  <a
                    className="text-white text-[1rem] hover:text-secondary"
                    href="/articles"
                  >
                    {' '}
                    Articles{' '}
                  </a>
                </li>

                <li>
                  <a
                    className="text-white text-[1rem] hover:text-secondary"
                    href="#"
                  >
                    {' '}
                    About{' '}
                  </a>
                </li>

                <li>
                  <a
                    className="text-white text-[1rem] hover:text-secondary"
                    href="#"
                  >
                    {' '}
                    Admin Dashboard{' '}
                  </a>
                </li>

                
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <a
                className="rounded-md bg-secondary hover:bg-secondary/90 px-5 py-2.5 text-sm font-medium text-white shadow"
                href="#"
              >
                Login
              </a>

              <div className="hidden sm:flex">
                <a
                  className="rounded-md border px-5 py-2.5 text-sm font-medium text-white"
                  href="#"
                >
                  Register
                </a>
              </div>
            </div>

            <div className="block md:hidden">
              <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
