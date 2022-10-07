import { useState } from "react";


const HomeFirst = ({ data }) => {

    const imagesData = data.images;
    const [nextBtn, setNextBtn] = useState(1)

    const nxtBtn = () => {
        setNextBtn(nextBtn => nextBtn > imagesData.length - 2 ? 1 : nextBtn + 1)
    }



    return (
        <>
            <div className='min-h-[calc(100vh-80px)] bg-gray-300 dark:bg-gray-600 dark:text-white'>
                <div className="">
                    <div className=" relative upto-lab-s:px-10 scrn-mob:py-5 rounded px-40 py-20">
                        {
                            imagesData.map((img, indx) => {
                                return (
                                    <div key={indx} className={nextBtn === indx ? `$bg-black ease-in-out duration-[1000ms] block` : `${"translate-x-full"} block rounded-3xl `}>
                                        {indx === nextBtn &&
                                            (<>
                                                <img src={img.image} alt="" />
                                            </>)}
                                    </div>
                                )
                            })}
                        <div>
                            <button onClick={nxtBtn} className="absolute top-1/2 right-2"><code>nxt</code></button>
                            <button className="absolute top-1/2 left-2">prv</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeFirst;