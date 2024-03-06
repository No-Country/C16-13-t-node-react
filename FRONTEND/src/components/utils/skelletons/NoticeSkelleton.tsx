
export const NoticeSkelleton = () => {
  return (
    <>
        <div className='mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative'>
            <div className="rounded-3xl bg-[--neutral-100] h-80"></div>
            <div className="p-4 absolute bottom-0 left-0 z-20">
                <span className='px-14 bg-black mb- '></span>
                <h1 className='rounded-2xl bg-[--neutral-300] h-7 w-96 mt-4'></h1>
            </div>
        </div>

        <div className="px-4 lg:px-0 mt-10 max-w-screen-md mx-auto ">
            <h2 className='my-2 rounded-xl bg-[--neutral-100] h-6 w-96'></h2>
            <p className='mb-2 rounded-xl bg-[--neutral-100] h-4'></p>
            <p className='mb-2 rounded-xl bg-[--neutral-100] h-4'></p>
            <p className='mb-2 rounded-xl bg-[--neutral-100] h-4'></p>
            <p className='mb-2 rounded-xl bg-[--neutral-100] h-4'></p>
        </div>
    </>
  )
}
